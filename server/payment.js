

Meteor.methods({
    'chargeCard': function(stripeToken,paymentId) {
        //check(stripeToken, String);
        var Stripe = StripeAPI('sk_test_pJ0uHKsMcrAwaoCicVAkBctd');
        var amountPayment=payment.findOne({"_id":paymentId}).amount;
        console.log(paymentId);
        console.log(amountPayment);
        var stripeCharge=Stripe.charges.create({
            source: stripeToken,
            amount: amountPayment, 
            currency: 'eur'
        }, function(err, charge) {
            if(err){
                return 0;
            }
            else if(charge.status=="succeeded"){
                console.log("DJIB SUCCESS");
                return 1;
                //payment.update({'_id':paymentId},{$set:{"status":"Paid"}});
                //Update payement collection
            }
            else{

                console.log("DJIB FAILED");
                return 0
            }
            //console.log(err, charge);
        });
        console.log(stripeCharge);
        if(stripeCharge==1){
          payment.update({'_id':paymentId},{$set:{"status":"Paid"}});
        }
    },
    'InsertPayment':function(obj,x){
      console.log('amountID=='+x);
      var num = amount.findOne({'_id':x}).paynum;
        for(var i = 0; i<num; i++){
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