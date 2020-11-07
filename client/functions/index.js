const functions = require('firebase-functions');
var admin = require('firebase-admin');
var webpush = require('web-push');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

var serviceAccount = require('./hotelmanager-848af-firebase-adminsdk-jlexl-2c1efa5005.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://hotelmanager-848af.firebaseio.com/'
});

exports.storePostData = functions.https.onRequest(function (request, response) {
    response.send("Hello World!!");
});

exports.scheduledFunctionCrontab = functions.pubsub.schedule('0 11 * * *')
// exports.scheduledFunctionCrontab = functions.pubsub.schedule('every 1 minutes')
    .timeZone('Asia/Taipei')
    .onRun(() => {
      webpush.setVapidDetails('mailto:qazx62486@gmail.com', 'BDsoBTxagj-zJcEl50RUzykFqBd9SCnp_cup1UHnrsrWzKg4FBoiYzBrm8NGLq2Ca3U4EsjZ0nP-JwD8f9S4u9w', '_Phn7PTGLy3IDuLsPcbQ8uC1HRNTvBZP8XahCq6BzcY');
      console.log('This will be run every day at 7:00 AM !!');
      admin.database().ref('subscriptions').once('value')
        .then((subscriptions) => {
          console.log('[Firebase] Subscription', subscriptions);
          subscriptions.forEach((sub) => {
            var pushConfig = {
              endpoint: sub.val().endpoint,
              keys: {
                auth: sub.val().keys.auth,
                p256dh: sub.val().keys.p256dh
              }
            };
            webpush.sendNotification(pushConfig, JSON.stringify({ title: 'Push Notification', content: 'Daily push notification' }))
              .catch((err) => {
                console.log(err);
              })
          });
        });
    });

// ======================================================================
// Server Key 
// ======================================================================
// Public Key:
// BDsoBTxagj-zJcEl50RUzykFqBd9SCnp_cup1UHnrsrWzKg4FBoiYzBrm8NGLq2Ca3U4EsjZ0nP-JwD8f9S4u9w
// 
// Private Key:
// _Phn7PTGLy3IDuLsPcbQ8uC1HRNTvBZP8XahCq6BzcY
// ======================================================================
// Server Key 
// ======================================================================
