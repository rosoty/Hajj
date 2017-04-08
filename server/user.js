Meteor.methods({
	InsertUser:function(obj,email,password, roles){
        console.log("Registering user2");
		targetUserId = Accounts.createUser({
            email: email,
            password: password,
            profile: obj
        });
        //var secret="ATnSceN+cnxD/ZO4YsmtVPyziknLQsGW+p6rupUcf1xd7aUHXwZuxdPTlEKr";
        var url="http://www.mecqueiteasy.com/api/user/register/?insecure=cool&username="+obj.username+"&email="+email+"&nonce=67ecdc46b5&display_name="+obj.username+"&notify=both&user_pass="+password;
        //url="http://mecqueiteasy.com/wp-content/plugins/wp-eMember/api/create.php?secret_key="+secret+"&first_name="+obj.username+"&last_name="+obj.familyname+"&email="+email+"&membership_level_id=1&username="+obj.username+"&password="+password;
        console.log(url);
        Meteor.http.call("GET", url);
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
        console.log("Registering user1");
        targetUserId = Accounts.createUser({
            email: email,
            password: password,
            profile: obj
        });
        Roles.setUserRoles(targetUserId,roles);
        //var secret="ATnSceN+cnxD/ZO4YsmtVPyziknLQsGW+p6rupUcf1xd7aUHXwZuxdPTlEKr";
        var url="http://www.mecqueiteasy.com/api/user/register/?insecure=cool&username="+obj.username+"&email="+email+"&nonce=67ecdc46b5&display_name="+obj.username+"&notify=both&user_pass="+password;
        //url="http://mecqueiteasy.com/wp-content/plugins/wp-eMember/api/create.php?secret_key="+secret+"&first_name="+obj.username+"&last_name="+obj.familyname+"&email="+email+"&membership_level_id=1&username="+obj.username+"&password="+password;
        console.log("Register wp: "+url);
        Meteor.http.call("GET", url);
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
            oneuser=alluser.fetch();
           // console.log('COUNT=='+oneuser.length);console.log(oneuser);
            oneuser.forEach(function(data){
                var aa = Meteor.users.find({'profile.affiliate':data._id}).count();
                var aff_num = data.profile.aff_number;
                //console.log('aa =='+aa+'==aff_num =='+aff_num);
                if(aa < aff_num){
                    //console.log('true');
                    return Meteor.users.update({_id:iduser},{$set:{"profile.affiliate":data._id}});
                }else{
                    //console.log('false');
                    return Meteor.users.update({_id:iduser},{$set:{"profile.affiliate":""}});
                }
            });
            
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
            return Meteor.users.update({'_id':data},{$set:{'profile.aff_number':parseInt(num)}});
        }
    }
});