import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
import SimpleSchema from 'simpl-schema';
import { WebApp } from 'meteor/webapp';

import { Entries } from '../imports/api/NewEntry';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email });
  return true;
});


Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((request, response, next) => {
    // To redirect user from http to https
    if(request.headers['x-forwarded-proto'] && request.headers['x-forwarded-proto'] === "http") {
      // console.log("https://" + request.headers.host + request.url);
      // res.redirect("https://" + req.headers.host + req.url);
    }
    const _id = request.url.slice(1);
    const entry = Entries.findOne({ _id: _id });
    if (entry) {
      console.log("Searched for a valid entry: ", entry);
      response.statusCode = 302;
      response.setHeader('Location', "/showEntry/" + entry._id);
      response.end(JSON.stringify(entry));
    }
    else {
      next();
    }
  });

});
