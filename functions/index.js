const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// READ EVENTS
exports.sendEmail = functions.https.onCall(data => {
  const maxResults = data.maxResults;

  oAuth2Client.setCredentials({
    refresh_token: credentials.refresh_token
  });

  const sendEmail = new Promise((resolve, reject) => {
    calendar.events.list(
      { auth: oAuth2Client, calendarId: calendarId, maxResults: maxResults },
      (err, res) => {
        if (err) {
          console.log("The API returned an error on READ: " + err);
          reject(err);
        }
        console.log("Request READ successful");
        resolve(res.data.items);
      }
    );
  });

  return sendEmail.then(res => {
    return res;
  });
});
