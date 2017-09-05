import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
import SimpleSchema from 'simpl-schema';

import '../imports/api/NewEntry';

// ServiceConfiguration.configurations.upsert(
//   { service: "facebook" },
//   {
//     $set: {
//       appId: '151276462123816',
//       secret: '0bdf69e99d63086e6300d7b1484c34d5'
//     }
//   }
// );

// Will handle events on creation of a new user account by any method.
// Accounts.onCreateUser(function (options, user) {
//   if (user.services.facebook) {
//     user.username = user.services.facebook.name;
//     user.emails = [{ address: user.services.facebook.email }];
//     console.log("New user entered : ", user);
//     return user;
//   }
//   else if (user.service === 'google') {

//     // {
//     // "createdAt": "2017-09-05T05:17:26.887Z",
//     // "_id": "xDgYdELqKA7f6e9tb",
//     // "services": {
//     //     "google": {
//     //         "accessToken": "ya29.Glu9BKbp-XxqbATT2JcqWhGNaO4X_MCnNLlF1Wt1iaihJvnp-IF_jpAPorqJGIesFga5ijvpGzh8yf2zF0-2FG-f16DsBmXcs4pOJ2MJZZgb1CgKY8ajWENuoWgn",
//     //         "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI5ZTM4NmFlMGIxNDg3YjRhZTc2NTg1ODcwYmZiNDFhYWZlZGE0OTUifQ.eyJhenAiOiI2NzEzMTc3MzE5NzctbnJuaGFhdGhtMG85Z290NmZ1NWYwN2F2OTNhczQwM2IuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzEzMTc3MzE5NzctbnJuaGFhdGhtMG85Z290NmZ1NWYwN2F2OTNhczQwM2IuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTU0NTcyNjY5Mzk0NjU4NzUwNTMiLCJlbWFpbCI6InBoZW94YmVhdWdoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiRVMyYmc4X3BEbFZscG5KMmVxVTg4ZyIsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJpYXQiOjE1MDQ1ODg2NDQsImV4cCI6MTUwNDU5MjI0NH0.y8yGlPhrrlCDSjqFd9Tnnvc6pcZFRya6ePSFxXFO1XaoVIw8NuUqJpC1hKq-qe30gIK5JuVHczAGACm_crDZLm9xdQE3cXF2MOkBRRaKf79mySSakvxwD-uLD-OyP9vIIk7E0-pLB3xUR0GpWMpUqmgXo8sOZCCjll4nJWDkaFTyvqzBScZHt9ZdIuyueaYsfsjr0Rn11drkdNwnaKulP-he-XMosw7CmSoJUlMduHy6A_CBM_9GtVoUENheHr7wYa74HNhQdz_dRjRbfUbiB5I8uszMpRWmH1ApCuYIex1cGb8mg51uv0XmwNB9e3fykw2DVt2i9h-6NdN9FdxAvQ",
//     //         "scope": ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
//     //         "id": "115457266939465875053",
//     //         "email": "pheoxbeaugh@gmail.com",
//     //         "verified_email": true,
//     //         "name": "Pheox beaugh",
//     //         "given_name": "Pheox",
//     //         "family_name": "beaugh",
//     //         "picture": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
//     //         "locale": "en",
//     //         "gender": "male"
//     //     }
//     // }
//     // }
//   }

//   return user;
// });


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
});
