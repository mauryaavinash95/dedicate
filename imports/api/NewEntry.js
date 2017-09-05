import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Entries = new Mongo.Collection('Entries');
Meteor.methods({
    addNewEntry(newEntry) {
        let userId = this.userId;
        let date = new Date();

        console.log('UserId: ', userId);
        console.log("Entry : ", newEntry);
        console.log("Date : ", date);

        Entries.insert({ userId, date, newEntry });
    }
})