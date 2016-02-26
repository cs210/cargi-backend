import web, os
import json

import flask
import httplib2

from apiclient import discovery
from oauth2client import client

app = flask.Flask(__name__)

render = web.template.render('templates/')

urls = (
    '/', 'index', '/confirmNavigation', 'confirmNavigation', '/confirmupdates', 'updates', '/navigation', 'navigation'
)

class index:
    def GET(self):
        flow = client.flow_from_clientsecrets(
        'client_secrets.json',
        scope='https://www.googleapis.com/auth/drive.metadata.readonly',
        redirect_uri='http://www.example.com/oauth2callback')
        auth_uri = flow.step1_get_authorize_url()
        credentials = flow.step2_exchange(auth_code)
        http_auth = credentials.authorize(httplib2.Http())
        drive_service = build('drive', 'v2', http=http_auth)
        return render.index();
class confirmNavigation:
    def GET(self):
        return render.confirmNavigation();
class updates:
    def GET(self):
        return render.confirmupdates();
class navigation:
   def GET(self):
        return render.navigation();
# class images:
#     def GET(self,name):
#         ext = name.split(".")[-1] # Gather extension

#         cType = {
#             "png":"images/png",
#             "jpg":"images/jpeg",
#             "gif":"images/gif",
#             "ico":"images/x-icon"            }

#         if name in os.listdir('images'):  # Security
#             web.header("Content-Type", cType[ext]) # Set the Header
#             return open('images/%s'%name,"rb").read() # Notice 'rb' for reading images
#         else:
#             raise web.notfound()

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()