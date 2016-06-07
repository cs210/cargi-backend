import urllib2
import json
import datetime
print 'analyze logging'
team_cargi = ['parkedwin@yahoo.com', 'emjtang@stanford.edu', 'ish@cargi.co', 'manning_brady@lycos.com', 'taragb@gmail.com', 'emily@cargi.co', 'mayanb@stanford.edu', 'mayanb@gmail.com']

url = 'http://cargi.azurewebsites.net/api/logInfo'
# url = 'http://cargi.azurewebsites.net/api/allUsers'
response = urllib2.urlopen(url).read()
jsonresponse = json.loads(response)
mostRecentDate="2016-05-17T20:54:02.207Z"

users = set()
dates = dict()
total_duration = 0
num_logs = 0
for obj in jsonresponse:
  email = obj['email']
  if email in team_cargi:
    continue
  duration = obj['duration']
  total_duration += duration
  users.add(email)

  date = obj["startTime"][:10]
  if date in dates:
    dates[date] += 1
  else:
    dates[date] = 1
  num_logs += 1
print total_duration
print num_logs
print len(users)
print dates

