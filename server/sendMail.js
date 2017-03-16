Meteor.startup(function () {
   //  process.env.MAIL_URL="smtp://tinhamly%40gmail.com:0977484889@smtp.gmail.com:465/";
     //process.env.MAIL_URL="smtp://houttyty7%40gmail.com:tytyhout7@smtp.gmail.com:465/";
     //process.env.MAIL_URL="smtp://contact%40safirperfumery.com:Senegal95@smtp.domain.com:465/";
     process.env.MAIL_URL="smtp://houttyty7%40gmail.com:tytyhout7@smtp.gmail.com:465";
     //process.env.MAIL_URL="smtp://contact%40safirperfumery.com:Senegal95@smtp.domain.com:465/";
});
Meteor.methods({
    sendEmail: function () {
        this.unblock();
        Email.send({
            to: 'houttyty7@gmail.com',
            from: 'houttyty7@gmail.com',
            subject: 'my subject',
            html: 'my html'
        });
    },
    sendUserRegister:function(id){
        console.log('SEND_ID== '+id);
        var res = Meteor.users.findOne({'_id':id});
        console.log('Email === '+ res.emails[0].address);
        Email.send({
            to:'houttyty7@gmail.com',
            from: res.emails[0].address,
            subject:'subject',
            text:'my text'
        });
    }
});