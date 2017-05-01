

Meteor.methods({
    'chargeCard': function(stripeToken,paymentId) {
        //check(stripeToken, String);
        var Stripe = StripeAPI('sk_test_pJ0uHKsMcrAwaoCicVAkBctd');
        var amountPayment=Number(payment.findOne({"_id":paymentId}).amount);
        console.log(paymentId);
        console.log(amountPayment);
        var userId=payment.findOne({"_id":paymentId}).userid;
        //var userCurrent=Meteor.users.findOne({'_id':userid});
        var stripeCharge=Stripe.charges.create({
            source: stripeToken,
            amount: amountPayment, 
            currency: 'eur'
        }, Meteor.bindEnvironment(function(err, charge) {
            if(err){
                return 0;
            }
            else if(charge.status=="succeeded"){
                console.log("DJIB SUCCESS");
                //return 1;
                payment.update({'_id':paymentId},{$set:{"status":"Paid"}});
                if(payment.find({"userid":userId,"status":"new"}).count()==0){
                  Meteor.users.update({_id:userId},{$set: {"acquired":"full"}});
                }
                //Update payement collection
            }
            else{

                console.log("DJIB FAILED");
                return 0
            }
            //console.log(err, charge);
        }, function () { console.log('Failed to bind environment'); }));

    },
    'InsertPayment':function(obj,x){
      console.log('amountID=='+x);
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      mm=mm+1;
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd='0'+dd;
      }

      var num = amount.findOne({'_id':x}).paynum;
      for(var i = 0; i<num; i++){
              if(mm<10) {
                  today = dd+'/'+'0'+mm+'/'+yyyy;
              }else{
                today = dd+'/'+mm+'/'+yyyy;
              }
              obj["due_date"]=today;
              mm=mm+1;
              if(mm>12){
                mm=1;
                yyyy=yyyy+1;
              }
             payment.insert(obj);
        }
    },
    RemovePayment:function(id){
      payment.remove({'_id':id});
    },
    UpdatePayment:function(obj,id){
        payment.update({'_id':id},{$set:obj});
    }
});
/*
When register create x Payment. x=number of payment. 
I decide number of payment=3. SO when register insert 3 payment:
{
  "_id":"abc",
  "status":"new",
  "created_date":"18736972684784074";
  "due_date":"298748074084",
  "amount":"1500000",
  "userid":"82730837",
  "updated_date":"29489470847"
}
{
  "_id":"abf",
  "status":"new",
  "created_date":"18736972684784074";
  "due_date":"298748074084",
  "amount":"1500000",
  "userid":"82730837",
  "updated_date":"29489470847"
}
{
  "_id":"abd",
  "status":"new",
  "created_date":"18736972684784074";
  "due_date":"298748074084",
  "amount":"1500000",
  "userid":"82730837",
  "updated_date":"29489470847"
}

Payment after payment:
{
  "_id":"abc",
  "status":"paid",
  "created_date":"18736972684784074";
  "due_date":"298748074084",
  "amount":"1500000",
  "userid":"82730837",
  "updated_date":"29489470847"
}*/