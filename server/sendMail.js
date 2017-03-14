Meteor.startup(function () {
   //  process.env.MAIL_URL="smtp://tinhamly%40gmail.com:0977484889@smtp.gmail.com:465/";
     //process.env.MAIL_URL="smtp://houttyty7%40gmail.com:tytyhout7@smtp.gmail.com:465/";
     //process.env.MAIL_URL="smtp://contact%40safirperfumery.com:Senegal95@smtp.domain.com:465/";
     process.env.MAIL_URL="smtp://houttyty7%40gmail.com:tytyhout7@smtp.domain.com:465";
});
// Meteor.methods({
//   sendEmail: function () {
//    // this.unblock();
//     Email.send({
//       to: 'rosoty24@gmail.com',
//       from: 'houttyty7@gmail.com',
//       subject: 'hello',
//       text: 'my text'
//     });
//   }
// });
// In your server code: define a method that the client can call
Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});
// In your client code: asynchronously send an email
