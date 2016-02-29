#!/usr/bin/env python
import sys; sys.path.insert(0, 'lib') # this line is necessary for the rest
import os                             # of the imports to work!
import web
import sqlitedb
import json
import auth
from jinja2 import Environment, FileSystemLoader
from datetime import datetime
import sqlite3
import httplib2
from googleapiclient import discovery
from oauth2client import client
###########################################################################################
##########################DO NOT CHANGE ANYTHING ABOVE THIS LINE!##########################
###########################################################################################
######################BEGIN HELPER METHODS######################
# helper method to render a template in the templates/ directory
#
# `template_name': name of template file to render
#
# `**context': a dictionary of variable names mapped to values
# that is passed to Jinja2's templating engine
#
# See curr_time's `GET' method for sample usage
#
# WARNING: DO NOT CHANGE THIS METHOD
def render_template(template_name, **context):
    extensions = context.pop('extensions', [])
    globals = context.pop('globals', {})
    jinja_env = Environment(autoescape=True,
            loader=FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')),
            extensions=extensions,
            )
    jinja_env.globals.update(globals)
    web.header('Content-Type','text/html; charset=utf-8', unique=True)
    return jinja_env.get_template(template_name).render(context)
#####################END HELPER METHODS#####################
auth.parameters['google']['app_id'] = '320345258333-0fk9366lobp3nfdqa9uet95vu67cbc1m.apps.googleusercontent.com'
auth.parameters['google']['app_secret'] = '2XrSKTC_CzYCmV7UElg2-4pe","redirect_uris'
auth.parameters['facebook']['app_id'] = 'facebook-client-id'
auth.parameters['facebook']['app_secret'] = 'facebook-client-secret'
urls = ('/', 'index',
        '/confirmNavigation', 'confirm_navigation', '/confirmupdates', 'confirm_updates', '/navigation', 'navigation', '/login', 'login', '/logout', 'logout', '/auth/(google|facebook)', 'auth_page', '/auth/(google|facebook)/callback', 'auth_callback_page'
# TODO: add additional URLs here
        # first parameter => URL, second parameter => class name
        )
class index:
    # A simple GET request, to '/'
    def GET(self):
        return render_template('index.html')
class confirm_navigation:
    def GET(self):
        return render_template('confirmNavigation.html')
class confirm_updates:
    def GET(self):
        return render_template('confirmupdates.html')
class navigation:
    def GET(self):
        return render_template('navigation.html')
class handler(auth.handler):
  def callback_uri(self, provider):
    """Please return appropriate url according to your app setting.
    """
    # return 'http://stanford.edu/~kartiks2/cgi-bin/cs210/cargi/cargi.py/callback' % provider
    return 'http://stanford.edu/~kartiks2/cgi-bin/cs210/cargi/cargi.py/'
  def on_signin(self, provider, profile):
    """Callback when the user successfully signs in the account of the provider
    (e.g., Google account or Facebook account).
    Arguments:
      provider: google or facebook
      profile: the user profile of Google or facebook account of the user who
               signs in.
    """
    user_id = '%s:%s' % (provider, profile['id'])
    # set '_id' in the cookie to sign-in the user in our webapp
    web.setcookie('_id', user_id)
    web.setcookie('_profile', json.dumps(profile))
    raise web.seeother('/login')
class auth_page(handler):
  def GET(self, provider):
    self.auth_init(provider)
class auth_callback_page(handler):
  def GET(self, provider):
    self.auth_callback(provider)
class login:
  def GET(self):
    # check '_id' in the cookie to see if the user already sign in
    if web.cookies().get('_id'):
      # user already sign in, retrieve user profile
      profile = json.loads( web.cookies().get('_profile') )
      return """<html><head></head><body>
        <a href="logout">Logout</a><br />
        Hello <b><i>%s</i></b>, your profile<br />
        %s<br />
      </body></html>
      """ % ( profile['id'], json.dumps(profile) )
    else:
      # user not signed in
      return """<html><head></head><body>
        <a href="auth/google">Google Login</a><br />
      </body></html>
      """
class Logout:
  def GET(self):
    # invalidate '_id' in the cookie to logout the user
    web.setcookie('_id', '', 0)
    raise web.seeother('/login')
if __name__ == '__main__':
    web.internalerror = web.debugerror
    app = web.application(urls, globals())
    port = int(os.environ.get('PORT', 5000))
    app.run(host = '0.0.0.0', port = port)