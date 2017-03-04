

Meteor.methods({
    'chargeCard': function(stripeToken,paymentId) {
        //check(stripeToken, String);
        var Stripe = StripeAPI('sk_test_pJ0uHKsMcrAwaoCicVAkBctd');

        Stripe.charges.create({
            source: stripeToken,
            amount: 5000, 
            currency: 'eur'
        }, function(err, charge) {
            if(err){

            }
            else if(charge.status=="succeeded"){
                console.log("DJIB SUCCESS");
                //Update payement collection
            }
            else{
                console.log("DJIB FAILED");
            }
            //console.log(err, charge);
        });
    },
    'InsertPayment':function(obj,x){
        for(var i = 0; i<x; i++){
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