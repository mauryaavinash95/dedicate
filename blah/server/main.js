import { Meteor } from 'meteor/meteor';
// import '../imports/client';
Meteor.startup(() => {
    process.env.MAIL_URL = 'smtp://devavinashmaurya@gmail.com:Avinash09@smtp.gmail.com:587';
});
