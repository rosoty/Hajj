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


Template.pay.helpers({
	getAmount:function(){
		return 999;
	}
});


Template.pay.events({
	'click button': function(e) {
      e.preventDefault();
      paymentId='abc';  //Replace by payment
      StripeCheckout.open({
        key: 'pk_test_njC2z064KCYm0e0kjilPA26o',
        amount: 5000, // this is equivalent to $50
        name: 'Mecque it easy',
        description: 'Cotisation MIE',
        panelLabel: 'Payer',
        currency: 'eur',
        token: function(res) {
          stripeToken = res.id;
          console.info(res);
          Meteor.call('chargeCard', stripeToken,paymentId);
        }
      });
    }
});

Template.paymentlist.helpers({
	getPaymentlist:function(){
		var result = payment.find({}).map(function(document, index){
	      document.index = index+1;
	      return document;
	    });
	    return result;
	}
});