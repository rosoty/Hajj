var IR_BeforeHooks = {
	checkLogin:function(pause){
		//if (!Roles.userIsInRole(Meteor.userId(), ['admin','member'])) {
		if (!(Meteor.loggingIn() || Meteor.user())) {
				Router.go('/login');
				pause();
		}else{
				this.next();
		}
	},
	checkMemberAffiliate:function(pause){
		if (Roles.userIsInRole(Meteor.userId(), ['affiliate'])) {
			this.next();	
		}else{
				
			Router.go('/');
			pause();
		}
	},
	checkMemberAgency:function(){
		if(Roles.userIsInRole(Meteor.userId(), ['agency'])){
			this.next();	
		}else{
			Router.go('/');
			pause();
		}
	},
	checkIsAdmin:function(){
		if(Roles.userIsInRole(Meteor.userId(), ['admin'])){
			this.next();	
		}else{
			Router.go('/');
			pause();
		}
	},
	alreadyLogin:function(){
		if ((Meteor.loggingIn() || Meteor.user())) {
			Router.go("/");
			pause();
		}else{
			this.next();
		}
	}
};
/*Router.onBeforeAction(IR_BeforeHooks.checkMemberAgency, {
	except: [''] 
});*/

Router.onBeforeAction(IR_BeforeHooks.checkLogin, {
	only: ['ticket','profile'] 
});
Router.onBeforeAction(IR_BeforeHooks.checkIsAdmin, {
	only: [ 'dashboad','adminticket','useredit','adduser','user','category','categoryedit','categoryadd','article','addarticle','editarticle']
	
});
Router.onBeforeAction(IR_BeforeHooks.alreadyLogin, {
	only: ['userregister','agency'] 
});
