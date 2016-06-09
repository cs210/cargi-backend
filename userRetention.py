import sys
import os

userDates = {}
distinctUsers = []

cargiUsers = ['53e7bc32-827c-49be-ba50-730b3ad12cce', 'a873b06b-d7b5-43ca-b401-36888fc146f2', 'c5a9520a-12c6-4a04-aef3-55258d855c44', 'e23e0f8f-c4ec-4b9a-9ce3-1f8fb022f7ae', '97c5543f-0b14-4bc0-ad77-9028487e94da', 'b1188729-534d-4018-bbf4-c1681d7087b5', 'f8661f4f-8c5c-43a1-880a-9f4010f7e53c', 'df138ddf-0c16-49ee-8986-4e9436129e4f', '52bcd38a-fb42-446a-951f-b17330bd95e0', '037ba5f5-5e96-46aa-9055-5680d7f39617', '4eb7bfce-0190-41a0-90eb-55e1a4d41fd4', 'b90b1863-40f6-40bf-a3f5-cff4083c0e1f', '4c9fa2a2-94ba-425a-8293-c5bf1c87e064']
f = open('actionsPerUser2.csv')
for line in f:
    vals = line.split(',')
    user = vals[0]
    date = vals[1]
    print date
    if user in cargiUsers:
        continue
    if not(user in userDates):
        userDates[user] = date
    elif not(user in distinctUsers) and not(date == userDates[user]):
             distinctUsers.append(user)

print 'returning users',len(distinctUsers)
print 'total users',len(userDates)

