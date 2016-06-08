import urllib2
import json
import random
import sys, code
import datetime as dt
import pickle
from dateutil.parser import parse
import csv
def keyboard(banner=None):
    ''' Function that mimics the matlab keyboard command '''
    # use exception trick to pick up the current frame
    try:
      raise None
    except:
      frame = sys.exc_info()[2].tb_frame.f_back
    print "# Use quit() to exit :) Happy debugging!"
    # evaluate commands in current namespace
    namespace = frame.f_globals.copy()
    namespace.update(frame.f_locals)
    try:
        code.interact(banner=banner, local=namespace)
    except SystemExit:
        return
team_cargi = ['parkedwin@yahoo.com', 'emjtang@stanford.edu', 'ish@cargi.co', 'manning_brady@lycos.com', 'taragb@gmail.com', 'taragb@cs.stanford.edu',
'edpark@stanford.edu', 'edwinpark@stanford.edu','taragb@stanford.edu', 'kartiks2@stanford.edu', 'emily@cargi.co', 'mayanb@gmail.com']
team_cargi_ids = []
# action_url = 'http://cargi.azurewebsites.net/api/actionInfo'
action_url = 'http://cargi.azurewebsites.net/api/getActionsTaken'

# actionInfo
# logInfo
# define constants for action types
def writeDatabaseToFile(objectName, object):
  print 'saving data for', objectName
  now = dt.datetime.now()
  today = now.strftime("%Y-%m-%d")
  filename = today + "." + objectName
  pickle.dump(object, open(filename, 'wb'))

def writeDataToCSV(fields):
  with open('data.csv', 'w') as csvfile:
    fieldnames = ['first_name', 'last_name']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerow({'first_name': 'Baked', 'last_name': 'Beans'})

def analyzeFacebookAdsUser():
  uniqueEmails = []
  print 'getting all users'
  url = 'http://cargi.azurewebsites.net/api/allUsers'
  response = urllib2.urlopen(url).read()
  user_json = json.loads(response)
  now = dt.datetime.now()
  fbDate = parse("2016-05-24").strftime("%Y-%m-%d") # when fb ads were released
  numAds = 0
  users = dict()
  for obj in user_json:
    user_id = obj["id"]
    name = obj["name"]
    email = obj["email"]
    createdAt = obj["createdAt"]
    dateCreated = parse(createdAt).strftime("%Y-%m-%d")
    if email in team_cargi:
      team_cargi_ids.append(user_id)
      continue
    if email not in users.keys():
      users[email] = user_id
      if fbDate < dateCreated:
        numAds = numAds + 1
      print email, name, dateCreated
  print 'num new users after ads', numAds

def getAllUsers():
  uniqueEmails = []
  print 'getting all users'
  url = 'http://cargi.azurewebsites.net/api/allUsers'
  response = urllib2.urlopen(url).read()
  user_json = json.loads(response)
  users = dict()
  users_date = dict() # number of new users per day

  for obj in user_json:
    user_id = obj["id"]
    name = obj["name"]
    email = obj["email"]
    createdAt = obj["createdAt"]
    dateCreated = parse(createdAt).strftime("%Y-%m-%d")
    if email in team_cargi:
      team_cargi_ids.append(user_id)
      continue
    if email not in users.keys():
      users[email] = user_id
      if dateCreated in users_date:
        users_date[dateCreated] += 1
      else:
        users_date[dateCreated] = 1
      # print email, name, createdAt
  print users_date
  with open('usersPerDay.csv', 'w') as csvfile:
    fieldnames = ['date', 'number of users']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for date in users_date:
      writer.writerow({'date': date, 'number of users': users_date[date]})
  return users

def analyzeActions():
  response = urllib2.urlopen(action_url).read()
  jsonresponse = json.loads(response)
  user_actions = dict()
  action_counts = dict()
  fbDate = parse("2016-05-24").strftime("%Y-%m-%d") # when fb ads were released
  actions_date = dict() # num actions per date (to see if there is an increase in user engagement)

  for obj in jsonresponse:
    created_at = obj['createdAt']
    user_id = obj['user_id']
    action = obj['action']
    createdAt = obj["createdAt"]
    # dateCreated = parse(createdAt).strftime("%Y-%m-%d")
    dateCreated = parse(createdAt).strftime("%Y-%m-%d")
    if user_id in team_cargi_ids:
      continue
    if dateCreated in actions_date:
      actions_date[dateCreated] += 1
    else:
      actions_date[dateCreated] = 1
    if action in action_counts:
      action_counts[action] += 1
    else:
      action_counts[action] = 1

  print action_counts
  print actions_date


def writeActionsDateToFile(actions_date):
  with open('actionsPerDay.csv', 'w') as csvfile:
    fieldnames = ['date', 'number of actions']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for date in actions_date:
      writer.writerow({'date': date, 'number of actions': actions_date[date]})
# def getAllActions():
#   print 'Getting all actions taken'
#   url = 'http://cargi.azurewebsites.net/api/getActionsTaken'
#   response = urllib2.urlopen(url).read()
#   jsonresponse = json.loads(response)
#   user_actions = dict()

# def analyzeLogging():
#   print 'analyze logging'
#   url = 'http://cargi.azurewebsites.net/api/logInfo'
#   # url = 'http://cargi.azurewebsites.net/api/allUsers'
#   response = urllib2.urlopen(url).read()
#   jsonresponse = json.loads(response)

#   for obj in jsonresponse:
#     print obj
def main():

  # analyzing users
  users = getAllUsers()
  print 'statistics'
  print 'total number of users:', len(users)

  analyzeFacebookAdsUser()

  # analyzing actions
  analyzeActions()
  # response = urllib2.urlopen(action_url).read()
  # jsonresponse = json.loads(response)
  # now = dt.datetime.now()
  # today = now.strftime("%Y-%m-%d")
  # print today

  # filename = today + ".useractions"
  # user_actions = dict()
  # action_counts = dict()
  # for obj in jsonresponse:
  #   created_at = obj['createdAt']
  #   user_id = obj['user_id']
  #   action = obj['action']
  #   if user_id in team_cargi_ids:
  #     continue
  #   if action in action_counts:
  #     action_counts[action] += 1
  #   else:
  #     action_counts[action] = 1

    # if email in user_actions:
    #   actions_list = user_actions[email]
    # else:
    #   actions_list = list()
    # actions_list.append(action)
    # user_actions[email] = actions_list

  # print(user_actions)

  # total_len = 0
  # for user in user_actions:
  #     total_len += len(user_actions[user])

  # print("total users who have performed an action:", len(user_actions))
  # print("total # actions:", total_len)
  # print("total users:", totalNumUsers)
  keyboard()

if __name__ == '__main__':
  main()