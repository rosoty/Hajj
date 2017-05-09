getTimestamp = function(){
	var date = new Date();
	var timestamp = date.getTime() / 1000;
	return timestamp;
}
Template.registerHelper('getHumanDate', function(timestamp){
	var d = new Date(timestamp * 1000),
	month = '' + (d.getMonth() + 1),
	day = '' + d.getDate(),
	year = d.getFullYear();
	hour = d.getHours();
	min = d.getMinutes();
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	//return [year, month, day].join('/')+' '+hour+':'+min;
	return [year, month, day].join('-');
});
Template.registerHelper('getImageurl', function(imageId){
	var img = images.findOne({_id:imageId});
	var path = "/uploads/";
    if(img){
        console.log(img.copies.images.key);
        return path+img.copies.images.key;
    }else{
        return;
    }
});
Template.registerHelper('getTaxiname', function(taxiId){
	var nametaxi = taxi.findOne({'_id':taxiId});
	if(nametaxi){
		return nametaxi.name;
	}
});
Template.registerHelper('getUsername', function(userId){
	var username = Meteor.users.findOne({'_id':userId});
	if(username){
		return username.profile.username;
	}
});
Template.registerHelper('getFirstname', function(userId){
	var username = Meteor.users.findOne({'_id':userId,'roles':'agency'});
	if(username){
		return username.profile.contact_firstname;
	}
});
Template.registerHelper('getLastname', function(userId){
	var username = Meteor.users.findOne({'_id':userId,'roles':'agency'});
	if(username){
		return username.profile.contact_lastname;
	}
});
Template.registerHelper('getProductname', function(id){
	var proname = product.findOne({'_id':id});
	if(proname){
		return proname.name;
	}
});
Template.registerHelper('Istype1', function(type){
	if(type == 'admin'){
		return true;
	}else{
		if(type == 'agency'){
			return true;
		}else{
			return true;
		}
	}
});
Template.registerHelper('CountNumberInvite', function(){
	var id = Meteor.userId();	
	return Meteor.users.find({'profile.affiliate':id}).count();
});

Template.registerHelper('Checkpayment', function(){
	var user = Meteor.users.findOne({'_id':Meteor.userId(),'roles':'affiliate'})
	//console.log('USER==='+user._id);console.log(user)
	var result = payment.find({'userid':user._id,'status':'Paid'}).count();
	//console.log('PAYCOUNT=='+result);
	var countpay = payment.find({'userid':user._id}).count();
	//console.log('Checkpayment=='+countpay); console.log(typeof(countpay))
	if(result == countpay){
		return true;
	}else{
		return false;
	}
});