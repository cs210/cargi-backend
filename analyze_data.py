import urllib2
import json
import random
import sys, code
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
team_cargi = ['parkedwin@yahoo.com', 'emjtang@stanford.edu', 'ish@cargi.co', 'manning_brady@lycos.com', 'taragb@gmail.com', 'emily@cargi.co', 'mayanb@stanford.edu', 'mayanb@gmail.com']

# action_url = 'http://cargi.azurewebsites.net/api/actionInfo'
action_url = 'http://cargi.azurewebsites.net/api/getActionsTaken'
# actionInfo
# logInfo
# define constants for action types
def getAllUsers():
  print 'Getting total number of users'
  url = 'http://cargi.azurewebsites.net/api/getUsers'
  response = urllib2.urlopen(url).read()
  jsonresponse = json.loads(response)

  users = dict()
  for obj in jsonresponse:
    user_id = obj["user_id"]
    name = obj["name"]
    email = obj["email"]
    if user_id not in users:
      users[user_id] = tuple(name, email)
  return users

# def getAllActions():
  # print 'Getting all actions taken'
  # url = 'http://cargi.azurewebsites.net/api/getActionsTaken'
  # response = urllib2.urlopen(url).read()
  # jsonresponse = json.loads(response)
  # user_actions = dict()

def main():
  print 'api request'
  response = urllib2.urlopen(action_url).read()
  jsonresponse = json.loads(response)
  user_actions = dict()
  action_counts = dict()
  users = getAllUsers()

  keyboard()
  for obj in jsonresponse:
    user_id = obj['user_id']
    action = obj['action']

    if email in team_cargi: 
      continue
    if action in action_counts:
      action_counts[action] += 1
    else:
      action_counts[action] = 1

    if email in user_actions:
      actions_list = user_actions[email]
    else:
      actions_list = list()
    actions_list.append(action)
    user_actions[email] = actions_list
  # for obj in jsonresponse:
  #   email = obj['email']
  #   action = obj['action']

  #   if email in team_cargi: 
  #     continue
  #   if action in action_counts:
  #     action_counts[action] += 1
  #   else:
  #     action_counts[action] = 1

  #   if email in user_actions:
  #     actions_list = user_actions[email]
  #   else:
  #     actions_list = list()
  #   actions_list.append(action)
  #   user_actions[email] = actions_list

  # print(user_actions)

  total_len = 0
  for user in user_actions:
      total_len += len(user_actions[user])

  print("total users who have performed an action:", len(user_actions))
  print("total # actions:", total_len)
  print("total users:", totalNumUsers)
  # keyboard()

if __name__ == '__main__':
  main()