Meteor.methods({
	UpdateProfile:function(id,email,obj){
		var attr={
            emails:[{address: email,verified: "false"}],
            profile:obj
        }
        return Meteor.users.update({_id:id},{$set: attr});
	},
});