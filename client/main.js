import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import ReactDOM from 'react-dom';
import React from 'react';

import { routes, onAuthChange } from '../imports/routes/routes';

Meteor.startup(() => {
  Tracker.autorun(() => {
    let userAuthStatus = !!Meteor.userId();
    onAuthChange(userAuthStatus);
  });

  ReactDOM.render(routes, document.getElementById("app"));
})
