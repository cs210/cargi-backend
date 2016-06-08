import urllib2
import json, csv
import datetime
from dateutil.parser import parse

print 'analyze logging'
team_cargi = ['parkedwin@yahoo.com', 'emjtang@stanford.edu', 'ish@cargi.co', 'manning_brady@lycos.com', 'taragb@gmail.com', 'taragb@cs.stanford.edu',
'edpark@stanford.edu', 'edwinpark@stanford.edu','taragb@stanford.edu', 'kartiks2@stanford.edu', 'emily@cargi.co', 'mayanb@gmail.com']

url = 'http://cargi.azurewebsites.net/api/logInfo'
# url = 'http://cargi.azurewebsites.net/api/allUsers'
response = urllib2.urlopen(url).read()
jsonresponse = json.loads(response)
mostRecentDate="2016-05-17T20:54:02.207Z"


users = set()
dates = dict()
user_usage = dict()
total_duration = 0
num_logs = 0
for obj in jsonresponse:
  email = obj['email']
  if email in team_cargi:
    continue

  duration = obj['duration']
  total_duration += duration
  users.add(email)

  date = parse(obj["startTime"][:10]).strftime("%Y-%m-%d")
  if email in user_usage:    
    user_usage[email].append(date);
  else:
    dateArr = []
    dateArr.append(date)
    user_usage[email] = dateArr
  # fbDate = parse("2016-05-24").strftime("%Y-%m-%d") # when fb ads were released

  if date in dates:
    dates[date] += 1
  else:
    dates[date] = 1
  num_logs += 1
print total_duration
print 'number of logs', num_logs
print user_usage
print 'num users', len(user_usage)
# with open('logsPerDay.csv', 'w') as csvfile:
#     fieldnames = ['date', 'number of users']
#     writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
#     writer.writeheader()
#     for date in dates:
#       writer.writerow({'date': date, 'number of users': dates[date]})

