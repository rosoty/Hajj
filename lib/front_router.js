Router.configure({
    layoutTemplate: 'frontLayout',
    notFoundTemplate: "notFound"
});

// admin Products
Router.route('/',{
	name:'homefront'
});
Router.route('/user/register',{
	name:'userregister',
	waitOn:function(){
		return [Meteor.subscribe('GetAmount'),Meteor.subscribe("GetPlatform")];
	}
});

Router.route('/user/profile',{
	name:'profile',
	waitOn:function(){
		return [Meteor.subscribe("myprofile",Meteor.userId()),Meteor.subscribe("Allproduct"),Meteor.subscribe("allticketByUser",Meteor.userId()),Meteor.subscribe("GetPaymentProfile",Meteor.userId())]
	}
});
Router.route('/user/password',{
	name:'changepassword'
});
Router.route('/agency/register',{
	name:'agency',
	waitOn:function(){
		return [Meteor.subscribe("GetPlatform")];
	}
});
/*Router.route('/profile?id=:id',{
	template:'profile'
});*/
Router.route('/profile/edit/:id',{
	name:'editprofile'
});

Router.route('/register/affiliate/:id',{
	template:'userregister',
	waitOn:function(){
		return [Meteor.subscribe("UserRegisterAffiliate"),Meteor.subscribe("GetPlatform"),Meteor.subscribe('GetAmount')];
	}
});
Router.route('/ticket',{
	name:'ticket',
	waitOn:function(){
		return [Meteor.subscribe("allticketByUser",Meteor.userId()),Meteor.subscribe("AllproductAgency",Meteor.userId())]
	}
});
Router.route('/agency/product',{
	name:'agencyproduct',
	waitOn:function(){
		return [Meteor.subscribe("AllproductAgency",Meteor.userId())]
	}
});
Router.route('/agency/product/add',{
	name:'agencyaddproduct'
});
Router.route('/agency/product/edit/:id',{
	name:'agencyeditproduct',
	waitOn:function(){
		return [Meteor.subscribe("AllproductAgency",Meteor.userId())]
	},
	data:function(){
		var id = this.params.id;
		var result = product.findOne({'_id':id});
		return result;
	}
});

Router.route('/payment',{
	name:'payment'
});

Router.route('/pay',{
	name:'pay'
});
Router.route('/profile/payment',{
	name:'paymentlist',
	waitOn:function(){
		return [Meteor.subscribe("GetPayment",Meteor.userId())]
	}
});
Router.route('/mail',{
	name:'indexmail'
});