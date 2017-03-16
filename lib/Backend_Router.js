Router.configure({
    //layoutTemplate: 'mainLayout',
    notFoundTemplate: "notFound"
});
Router.route('/login',{
	layoutTemplate: 'signin'
});
// admin Products
Router.route('/cpanel/dashboad',{
	layoutTemplate: 'mainLayout',
	name:'dashboad'
});

Router.route('/cpanel/category',{
	layoutTemplate: 'mainLayout',
	name:'category',
	waitOn:function(){
		return [Meteor.subscribe("allcategory")]
	}
});
Router.route('/cpanel/category/edit/:id',{
	layoutTemplate: 'mainLayout',
	name:'categoryedit',
	data:function(){
		var id = this.params.id;
		var result = categories.findOne({'_id':id});
		return {GetOneCategory:result};
	},
	waitOn:function(){
		var id = this.params.id;
		return [Meteor.subscribe("oneCategory",id)]
	}
});
Router.route('/cpanel/category/add',{
	layoutTemplate: 'mainLayout',
	name:'categoryadd'
});


Router.route('/cpanel/user/add',{
	layoutTemplate: 'mainLayout',
	name:'adduser'
});
Router.route('/cpanel/user',{
	layoutTemplate: 'mainLayout',
	name:'user',
	waitOn:function(){
		Session.set('CATEGORYDATA', {page:1});
		//return [Meteor.subscribe("allticket")]
	},
	onBeforeAction: function(){
         var pagination = IRLibLoader.load('/js/jquery.simplePagination.js');
        if( pagination.ready() ){
            this.next();
        }
    }
});
Router.route('/cpanel/user/edit/:id',{
	layoutTemplate: 'mainLayout',
	name:'useredit',
	data:function(){
		var id = this.params.id;
		var result = Meteor.users.findOne({'_id':id});
		return {GetOne:result};
	}
});
Router.route('/cpanel/user/edit-affiliator/:id',{
	layoutTemplate: 'mainLayout',
	name:'affiliator'
});


Router.route('/cpanel/article',{
	layoutTemplate: 'mainLayout',
	name:'article'
});
Router.route('/cpanel/article/add',{
	layoutTemplate: 'mainLayout',
	name:'addarticle'
});
Router.route('/cpanel/article/edit/:id',{
	layoutTemplate: 'mainLayout',
	name:'editarticle',
	data:function(){
		var id = this.params.id;
		var result = article.findOne({'_id':id});
		return {GetOne:result};
	}
});

//==================
Router.route('/cpanel/ticket',{
	layoutTemplate: 'mainLayout',
	name:'adminticket',
	waitOn:function(){
		Session.set('CATEGORYDATA', {page:1});
		return [Meteor.subscribe("allticket")]
	},
	onBeforeAction: function(){
         var pagination = IRLibLoader.load('/js/jquery.simplePagination.js');
        if( pagination.ready() ){
            this.next();
        }
    }
});
Router.route('/cpanel/affiliate',{
	layoutTemplate: 'mainLayout',
	name:'adminaffiliate'/*,
	waitOn:function(){
		return [Meteor.subscribe("allticket")]
	}*/
});
Router.route('/cpanel/product',{
	layoutTemplate: 'mainLayout',
	name:'listproduct',
	waitOn:function(){
		Session.set('CATEGORYDATA', {page:1});
		//return [Meteor.subscribe("allagency")]
	},
	onBeforeAction: function(){
         var pagination = IRLibLoader.load('/js/jquery.simplePagination.js');
        if( pagination.ready() ){
            this.next();
        }
    }
});

Router.route('/cpanel/payment',{
	layoutTemplate: 'mainLayout',
	name:'adminpayment',
	waitOn:function(){
		return [Meteor.subscribe("GetAllPayment")]
	}
});
Router.route('/cpanel/payment/edit/:id',{
	layoutTemplate: 'mainLayout',
	name:'editpayment',
	waitOn:function(){
		return [Meteor.subscribe("GetAllPayment")]
	},
	data:function(){
		var id = this.params.id;
		var result = payment.findOne({'_id':id});
		return {GetOne:result};
	}
});

Router.route('/cpanel/product/edit/:id',{
	layoutTemplate: 'mainLayout',
	name:'editproduct',
	waitOn:function(){
		return [Meteor.subscribe("Allproduct")]
	},
	data:function(){
		var id = this.params.id;
		var result = product.findOne({'_id':id});
		return {GetOne:result};
	}
});

// AMOUNT PAYMENT //

Router.route('/cpanel/amount-payment',{
	layoutTemplate: 'mainLayout',
	name:'adminamount',
	waitOn:function(){
		return [Meteor.subscribe("GetAmount")]
	}
});
Router.route('/cpanel/amount-payment/add',{
	layoutTemplate: 'mainLayout',
	name:'addamount'
});
Router.route('/cpanel/amount-payment/edit/:id',{
	layoutTemplate: 'mainLayout',
	name:'editamount',
	waitOn:function(){
		return [Meteor.subscribe("GetAmount")]
	},
	data:function(){
		var id = this.params.id;
		var result = amount.findOne({'_id':id});
		return result;
	}
});

// PLATE FORM //

Router.route('/cpanel/platform',{
	layoutTemplate: 'mainLayout',
	name:'platform',
	waitOn:function(){
		return [Meteor.subscribe("GetPlatform")]
	}
});

Router.route('/cpanel/platform/add',{
	layoutTemplate: 'mainLayout',
	name:'addplatform'
});
Router.route('/cpanel/platform/edit/:id',{
	layoutTemplate: 'mainLayout',
	name:'editplatform',
	waitOn:function(){
		return [Meteor.subscribe("GetPlatform")]
	},
	data:function(){
		var id = this.params.id;
		var result = platform.findOne({'_id':id});
		return result;
	}
});