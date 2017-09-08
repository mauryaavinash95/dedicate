import {Email} from "meteor/email"
import { Meteor } from "meteor/meteor";
if (Meteor.isServer) {
    Meteor.methods({
        sendEmail(to, from, subject, text) {
            // Make sure that all arguments are strings.
            // check([to, from, subject, text], [String]);
            // Let other method calls from the same client start running, without
            // waiting for the email sending to complete.
            this.unblock();
            console.log("Sending mail");
            Email.send({ to, from, subject, text });
        }
    });
}