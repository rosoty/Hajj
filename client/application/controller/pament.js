Meteor.startup(function() {
    Stripe.setPublishableKey('pk_live_4zJGKgC5QFWYxwoaA1mNrWVK');
    var handler = StripeCheckout.configure({
		key: 'pk_live_4zJGKgC5QFWYxwoaA1mNrWVK',
		token: function(token) {}
	});
});

Template.payment.events({
	"click #btncheckout": function(e){
		e.preventDefault();
		ccNum = $('#ccnum').val();
		cvc = $('#cvc').val();
		expMo = $('#exp-month').val();
		expYr = $('#exp-year').val();
		console.log(ccNum,cvc,expMo,expYr);
		Stripe.card.createToken({
			number: ccNum,
			cvc: cvc,
			exp_month: expMo,
			exp_year: expYr,
		}, function(status, response) {
			stripeToken = response.id;
			console.log(response);
			console.log("stripeToken "+stripeToken)
			Meteor.call('chargeCard', stripeToken);
		});
	}
});