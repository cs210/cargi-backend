import urllib2
import json
import random

url = 'http://cargi.azurewebsites.net/api/allUsers'
print 'hitting api'
response = urllib2.urlopen(url).read()
jsonresponse = json.loads(response)
print 'done'
team_cargi = ['parkedwin@yahoo.com', 'emjtang@stanford.edu', 'ish@cargi.co', 'manning_brady@lycos.com', 'taragb@gmail.com', 'emily@cargi.co', 'mayanb@stanford.edu', 'mayanb@gmail.com']

users = dict()
for obj in jsonresponse:
  name = obj["name"]
  email = obj["email"]
  if email in team_cargi:
    continue
  if name not in users:
    users[name] = email
print(len(users))
# winners = random.sample(users, 1)

# print(winners)
# for name in winners:
#   print name, users[name]