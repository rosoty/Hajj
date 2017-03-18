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
        //var aff = Meteor.users.findOne({'roles':'admin'}).
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
    },
    UpdateNumber:function(num){
        Meteor.users.update({},{$set:{'profile.aff_number':num}},{multi:true});
    },
    UpdateUserAffiliat_number:function(data){
        if(data){
            var num = Meteor.users.findOne({'roles':'admin'}).profile.aff_number;
            return Meteor.users.update({'_id':data},{$set:{'profile.aff_number':num}});
        }
    }
});