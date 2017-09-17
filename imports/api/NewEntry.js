import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Email } from 'meteor/email'
import SimpleSchema from 'simpl-schema';

export const Entries = new Mongo.Collection('Entries');

if (Meteor.isServer) {
    Meteor.publish('entries', function () {
        let userId = this.userId;
        return Entries.find({ userId });
    })

    Meteor.methods({
        addNewEntry(newEntry) {
            let userId = this.userId;
            let date = new Date().toISOString();
            // console.log('UserId: ', userId);
            // console.log("Entry : ", newEntry);
            // console.log("Date : ", date);
            Entries.insert({ userId, date, heading: newEntry.heading, body: newEntry.body, createdAt: date });
        },
        deleteEntry(entryId) {
            let userId = this.userId;
            Entries.remove({ _id: entryId, userId });
        },
        editEntry(entryId, newEntry) {
            let userId = this.userId;
            let date = new Date().toISOString();
            // console.log('UserId: ', userId);
            // console.log("Entry : ", newEntry);
            // console.log("Date : ", date);
            Entries.update({ _id: entryId }, { $set: { date: date, heading: newEntry.heading, body: newEntry.body } })
        },
        sendEmail(to, from, subject, text) {
            // Make sure that all arguments are strings.
            // check([to, from, subject, text], [String]);
            // Let other method calls from the same client start running, without
            // waiting for the email sending to complete.
            console.log("To: ", to);
            console.log("From: ", from);
            console.log("Subject: ", subject);
            console.log("Text: ", text);
            // this.unblock();
            // Email.send({ to, from, subject, text });
        },
        currentUser() {
            currentUser = Meteor.users.find({ _id: this.userId }).fetch();
            currentUser = currentUser[0].emails[0].address;
            // console.log("currentUserData : ", currentUser);
            return currentUser;
        },
        showEntry(entryId) {
            entry = Entries.find({ _id: entryId }).fetch()[0];
            console.log("Found entry: ", entry);
            return entry;
        }
    })
}