import pickle
import sys, code
import urllib2, json
# def keyboard(banner=None):
#     ''' Function that mimics the matlab keyboard command '''
#     # use exception trick to pick up the current frame
#     try:
#       raise None
#     except:
#       frame = sys.exc_info()[2].tb_frame.f_back
#     print "# Use quit() to exit :) Happy debugging!"
#     # evaluate commands in current namespace
#     namespace = frame.f_globals.copy()
#     namespace.update(frame.f_locals)
#     try:
#         code.interact(banner=banner, local=namespace)
#     except SystemExit:
#         return

allUsers = pickle.load(open('2016-05-31.users', 'rb'))
allActions = pickle.load(open('2016-05-31.useractions', 'rb'))
team_cargi_ids = pickle.load( open('team_ids','rb'))
team_cargi = ['parkedwin@yahoo.com', 'emjtang@stanford.edu', 'ish@cargi.co', 'manning_brady@lycos.com', 'taragb@gmail.com', 'emily@cargi.co', 'mayanb@gmail.com']

# print(users)
users = dict()
for obj in allUsers:
  user_id = obj["id"]
  name = obj["name"]
  email = obj["email"]

  if email in team_cargi:
    continue
  if user_id not in users:
    users[email] = user_id

print(len(users))
print(len(allActions))

# url = 'http://cargi.azurewebsites.net/api/allUsers'
# response = urllib2.urlopen(url).read()
# user_json = json.loads(response)
# keyboard()