Meteor.methods({
	InsertUser:function(obj,email,password, roles){
		targetUserId = Accounts.createUser({
            email: email,
            password: password,
            profile: obj
        });
        Roles.setUserRoles(targetUserId,roles);
	},
	RemoveUser:function(id){
		Meteor.users.remove({'_id':id});
	},
	UpdateUser:function(id,obj,email, roles){
		var attr={
            emails:[{address: email,verified: "false"}],
            profile:obj,
            roles:[roles]
        }
        return Meteor.users.update({_id:id},{$set: attr});
	},
    UpdatePassport:function(id,passport){
        return Meteor.users.update({'_id':id},{$set:{'profile.passport':passport}});
    },
    registerUser:function(email,password,obj,roles){
        targetUserId = Accounts.createUser({
            email: email,
            password: password,
            profile: obj
        });
        Roles.setUserRoles(targetUserId,roles);
        return targetUserId;
    },
    countUser:function(){
        var alluser=Meteor.users.find({});
        return alluser.count();
    },
    changepassword:function(uid,newpwd){
         Accounts.setPassword(uid,newpwd)
    },
    findAffiliate:function(iduser){
        var alluser=Meteor.users.find( { $and: [ { _id: { $ne: iduser} }, { "profile.affiliate":"" } ] } )
        if(alluser){
            oneuser=alluser.fetch()[0];
            console.log("ID PARAMS"+iduser)
            console.log("ONEUSER "+oneuser)
            return Meteor.users.update({_id:iduser},{$set:{"profile.affiliate":oneuser._id}});
        }else{
             return Meteor.users.update({_id:iduser},{$set:{"profile.affiliate":""}});
        }
    }
});