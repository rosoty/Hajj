Meteor.methods({
  'chargeCard': function(stripeToken) {
    var Stripe = StripeAPI('sk_live_gJuqL54p3qAwZMnTUpNZu1b9');

    Stripe.charges.create({
      amount: 1000,
      currency: 'usd',
      source: stripeToken
    }, function(err, charge) {
      console.log(err, charge);
    });
  }
});