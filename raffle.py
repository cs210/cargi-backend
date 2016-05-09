import urllib2
import json
import random

url = 'http://cargi.azurewebsites.net/api/allUsers'
response = urllib2.urlopen(url).read()
jsonresponse = json.loads(response)

users = dict()
for obj in jsonresponse:
  name = obj["name"]
  email = obj["email"]
  if name not in users:
    users[name] = email
# print(len(users))
winners = random.sample(users, 1)

print(winners)
for name in winners:
  print name, users[name]