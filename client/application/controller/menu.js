Template.frontmenu.events({
	"click #logout":function(e){
		e.preventDefault();
		Meteor.logout(function(res){
			if(!res){
				Router.go('/login');
			}
		});
	}
});