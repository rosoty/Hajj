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
		//return [Meteor.subscribe("allticket")]
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