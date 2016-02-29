import web
import sqlite3

db = web.database(dbn='sqlite',
        db='AuctionBase.db' #TODO: add your SQLite database filename
    )

######################BEGIN HELPER METHODS######################

# Enforce foreign key constraints
# WARNING: DO NOT REMOVE THIS!
def enforceForeignKey():
    db.query('PRAGMA foreign_keys = ON')

# initiates a transaction on the database
def transaction():
    return db.transaction()
# Sample usage (in auctionbase.py):
#
# t = sqlitedb.transaction()
# try:
#     sqlitedb.query('[FIRST QUERY STATEMENT]')
#     sqlitedb.query('[SECOND QUERY STATEMENT]')
# except Exception as e:
#     t.rollback()
#     print str(e)
# else:
#     t.commit()
#
# check out http://webpy.org/cookbook/transactions for examples

# returns the current time from your database
def getTime():
    # TODO: update the query string to match
    # the correct column and table name in your database
    query_string = 'select presentTime from currentTime'
    results = query(query_string)
    # alternatively: return results[0]['currenttime']
    return results[0].presentTime # TODO: update this as well to match the
                                  # column name

# returns a single item specified by the Item's ID in the database

def getItemById(itemID):
    # TODO: rewrite this method to catch the Exception in case `result' is empty
    query_string = 'select * from Items where ItemID = $itemId'
    result = query(query_string, {'itemId': itemID})
    return result
def getAllItems():
    query_string = 'select * from Items'
    result = query(query_string)
    return result
def getItemByPrice(minPrice, maxPrice):
    if minPrice==0:
        query_string = 'select * from Items where Buy_Price <= $maxprice ORDER BY Currently LIMIT 1000'
        result = query(query_string, {'maxprice': maxPrice})
    elif maxPrice == 0:
        query_string = 'select * from Items where Buy_Price >= $minprice ORDER BY Currently LIMIT 1000'
        result = query(query_string, {'minprice': minPrice})
    else:
        query_string = 'select * from Items where Buy_Price >= $minprice and Buy_Price <= $maxprice ORDER BY Currently LIMIT 1000'
        result = query(query_string, {'minprice': minPrice, 'maxprice': maxPrice})
    return result
def getItemByDesc(desc):
    query_string = 'select * from Items where Description like $description ORDER BY Currently LIMIT 1000'
    result = query(query_string, {'description': '%'+desc+'%'})
    return result
def getItemByCategory(cat):
    query_string = 'select i.ItemID, i.Name, i.Currently, i.Started, i.Ends from Items i, Categories c where c.ItemID = i.ItemID and c.Category = $category ORDER BY i.Currently LIMIT 1000'
    result = query(query_string, {'category': cat})
    return result
def getItemByStatus(stat, current):
    if stat=='open':
        query_string = 'select * from Items where (Started<=$currtime and Ends>=$currtime and Buy_Price is not NULL and Currently<Buy_Price) or (Started<=$currtime and Ends>=$currtime and Buy_Price is NULL) ORDER BY Currently LIMIT 1000'
        result = query(query_string, {'currtime': current})
    elif stat == 'close':
        query_string = 'select * from Items where Currently >= Buy_Price or Started>$currtime or Ends<$currtime ORDER BY Currently LIMIT 1000' 
        result = query(query_string, {'currtime': current})
    else:
        query_string = 'select * from Items where Started>$currtime ORDER BY Currently LIMIT 1000'
        result = query(query_string, {'currtime': current})
    return result

def getStatusByItem(itemID, currTime):
    result = getItemById(itemID)
    if result[0]['Buy_Price'] is not None:
        if result[0]['Started']<=currTime and result[0]['Ends']>=currTime and result[0]['Currently']<result[0]['Buy_Price']:
            msg = 'Opened'
        else:
            msg = 'Closed'
    else:
        if result[0]['Started']<=currTime and result[0]['Ends']>=currTime:
            msg = 'Opened'
        else:
            msg = 'Closed'
    return msg
def getBidInfo(itemID):
    query_string = 'select * from Bids where ItemID = $itemid'
    result = query(query_string, {'itemid': itemID})
    return result
def getBidWinner(itemID):
    query_string = 'select b.UserID from Bids b, Items i where b.ItemID = $itemid and b.ItemID = i.ItemID and b.Amount = i.Currently'
    result = query(query_string, {'itemid': itemID})
    return result

#This method updates the current time
def updateCurrentTime(changedTime):
    query_string = 'update currentTime set presentTime=$newPresentTime'
    result = db.query(query_string, {'newPresentTime': changedTime})

#This method adds a new bid
def addBid(itemID, userID, time, price):
    message = ""
    try:
        db.insert('Bids', ItemID = itemID, UserID = userID, Time = time, Amount = price)
        message = 'The bid was successfully added.'
    except sqlite3.IntegrityError as e:
        message = str(e)
    return message
# wrapper method around web.py's db.query method
# check out http://webpy.org/cookbook/query for more info
def query(query_string, vars = {}):
    return list(db.query(query_string, vars))

#####################END HELPER METHODS#####################

#TODO: additional methods to interact with your database,
# e.g. to update the current time
