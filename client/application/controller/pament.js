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
      var paymentId=$("#paymentId").val();
      var amountPayment=Number($("#amount").val())*100;
      console.log(paymentId);
      console.log(amountPayment);
      StripeCheckout.open({
        key: 'pk_test_njC2z064KCYm0e0kjilPA26o',
        amount: amountPayment, // this is equivalent to $50
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
	paid :function(id){
		if(payment.findOne({"_id":id}).count()>0 && payment.findOne({"_id":id}).status=='Paid'){
			return true;
		}else{
			return false;
		}
	},
	getPaymentlist:function(){
		var user = Meteor.userId();
		//var num = payment.find({'userid':user}).count();
		var result = payment.find({'userid':user}).map(function(document, index){
	      document.index = index+1;
	      return document;
	    });
	    return result;
	    // if(num > 0 ){
	    // 	return result;
	    // }
	}
});


// ADMIN PAGE //

Template.adminpayment.helpers({
	GetAllpayment:function(){
		var result = payment.find({}).map(function(document, index){
	      document.index = index+1;
	      return document;
	    });
	    return result;
	}
});
Template.adminpayment.events({
	"click .btn-del":function(e){
		e.preventDefault();
		if(confirm("Are you sure want to delete this?")){
			Meteor.call('RemovePayment',this._id, function(err){
				if(!err){console.log('RemovePayment Success')}
			});
		}
	}
});
Template.editpayment.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
    	format:'YYYY'
    });
});
Template.editpayment.helpers({
	getUserPayment:function(){
		return Meteor.users.find();
	}
});
Template.editpayment.events({
	"click #btn-update":function(e){
		e.preventDefault();
		var id = $('[name = "paymentId"]').val();
		var amount = $('[name = "amount"]').val();
		var status = $('[name = "status"]').val();
		var due_date = $('[name = "due_date"]').val();
		var userid = $('[name = "userid"]').val();
		var created_date = $('[name = "created_date"]').val();
		var updated_date = new Date().getTime();
		//alert(amount+status+due_date+userid+"==="+updated_date);
		var obj = {
			status:status,created_date:created_date,due_date:due_date,amount:amount,userid:userid,updated_date:updated_date
		}
		Meteor.call('UpdatePayment',obj, id, function(err){
			if(!err){console.log('UpdatePayment Success');Router.go('/cpanel/payment')}
		})
	}
})
