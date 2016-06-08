import urllib2
import json
import random
import sys, code
import datetime as dt
import pickle
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
team_cargi = ['parkedwin@yahoo.com', 'emjtang@stanford.edu', 'ish@cargi.co', 'manning_brady@lycos.com', 'taragb@gmail.com', 'emily@cargi.co', 'mayanb@gmail.com']
team_cargi_ids = []
# action_url = 'http://cargi.azurewebsites.net/api/actionInfo'
action_url = 'http://cargi.azurewebsites.net/api/getActionsTaken'

# actionInfo
# logInfo
# define constants for action types
def getAllUsers():
  print 'getting all users'
  url = 'http://cargi.azurewebsites.net/api/allUsers'
  response = urllib2.urlopen(url).read()
  user_json = json.loads(response)
  now = dt.datetime.now()
  today = now.strftime("%Y-%m-%d")
  print today

  filename = today + ".users"
  print 'saving the users database'
  # pickle.dump(user_json, open(filename, 'wb'))
  users = dict()
  for obj in user_json:
    user_id = obj["id"]
    name = obj["name"]
    email = obj["email"]

    if email in team_cargi:
      team_cargi_ids.append(user_id)
      continue
    if user_id not in users:
      users[email] = user_id
  return users

def getNumUsers(users):
   return len(users)
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
  print 'api request'

  # analyzing users
  users = getAllUsers()
  print 'statistics'
  print 'total number of users:', getNumUsers(users)

  now = dt.datetime.now()
  print now
  # analyzing actions
  response = urllib2.urlopen(action_url).read()
  jsonresponse = json.loads(response)
  now = dt.datetime.now()
  today = now.strftime("%Y-%m-%d")
  print today

  filename = today + ".useractions"
  print 'saving user actions'
  # pickle.dump(jsonresponse, open(filename, 'wb'))
  user_actions = dict()
  action_counts = dict()
  # analyzeLogging()
  # pickle.dump(team_cargi_ids, open('team_ids', 'wb'))
  for team_id in team_cargi_ids:
    print team_id
  for obj in jsonresponse:
    created_at = obj['createdAt']
    print created_at
    user_id = obj['user_id']
    action = obj['action']
    if user_id in team_cargi_ids:
      continue
    if action in action_counts:
      action_counts[action] += 1
    else:
      action_counts[action] = 1

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