Router.configure({
    layoutTemplate: 'frontLayout',
    notFoundTemplate: "notFound"
});

// admin Products
Router.route('/',{
	name:'homefront'
});
Router.route('/user/register',{
	name:'userregister'
});

Router.route('/user/profile',{
	name:'profile',
	waitOn:function(){
		return [Meteor.subscribe("myprofile",Meteor.userId()),Meteor.subscribe("Allproduct"),Meteor.subscribe("allticketByUser",Meteor.userId())]
	}
});
Router.route('/user/password',{
	name:'changepassword'
});
Router.route('/agency/register',{
	name:'agency'
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
		return [Meteor.subscribe("UserRegisterAffiliate")];
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