import urllib2
import json
import random

url = 'http://cargi.azurewebsites.net/tables/users'
response = urllib2.urlopen(url).read()
jsonresponse = json.loads(response)

users = dict()
for obj in jsonresponse:
  name = obj["name"]
  email = obj["email"]
  if name not in users:
    users[name] = email

winners = random.sample(users, 5)

print(winners)
for name in winners:
  print name, users[name]