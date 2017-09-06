import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Entries = new Mongo.Collection('Entries');

if (Meteor.isServer) {
    Meteor.publish('entries', function () {
        let userId = this.userId;
        return Entries.find({ userId });
    })
}

Meteor.methods({
    addNewEntry(newEntry) {
        let userId = this.userId;
        let date = new Date();

        console.log('UserId: ', userId);
        console.log("Entry : ", newEntry);
        console.log("Date : ", date);

        Entries.insert({ userId, date, newEntry });
    },
    deleteEntry(entryId) {
        let userId = this.userId;
        Entries.remove({ _id: entryId, userId });
    },
    editEntry(entryId, newEntry) {
        let userId = this.userId;
        let date = new Date();
        Entries.update({ _id: entryId }, { $set: { date: date, newEntry: newEntry } })
    }

})