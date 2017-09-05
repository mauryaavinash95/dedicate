import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
      appId: '151276462123816',
      secret: '0bdf69e99d63086e6300d7b1484c34d5'
    }
  }
);

// Will handle events on creation of a new user account by any method.
Accounts.onCreateUser(function (options, user) {
  if (!user.services.facebook) {
    return user;
  }
  user.username = user.services.facebook.name;
  user.emails = [{ address: user.services.facebook.email }];
  console.log("new user entered : ", user);
  return user;
});

Meteor.startup(() => {
  // code to run on server at startup
});
