
Meteor.publish("myUserPagination", function (page,limit) {
    var limit=parseInt(limit);
    page = (page)? page:1;
    var skip = (page<=1)? 0 : (page - 1) * limit;
    return Meteor.users.find({},{limit:limit, skip:skip})
});

Meteor.publish('images', function (){ 
  return images.find({});
});

/*Meteor.publish('users', function (){ 
  return Meteor.users.find({});

});
*/

Meteor.publish('allcategory', function (){ 
  return categories.find({});
});
Meteor.publish("oneCategory",function(id){
	return categories.find({_id:id});
});

Meteor.publish("article",function(){
  return article.find({});
});
Meteor.publish("AllproductAgency",function(id){
  return product.find({'agency':id});
});
Meteor.publish("Allproduct",function(){
  var allproduct = product.find({});
  var alluser=[]
  allproduct.forEach(function(val){
    alluser.push(val.agency);
  });
  var listuser=Meteor.users.find({_id:{$in:alluser}})
  return [allproduct,listuser];
});
Meteor.publish("allticket",function(){
  return ticket.find({});
});
Meteor.publish("allticketByUser",function(uid){
  var allticket= ticket.find({ $or: [ { agency:uid }, { customer: uid } ] });
  var alluser=[]
  allticket.forEach(function(val){
    alluser.push(val.customer);
    alluser.push(val.agency);
  });
  var listuser=Meteor.users.find({_id:{$in:alluser}})
  return [allticket,listuser];
});
Meteor.publish("myAdminTicket",function(page,limit){
    //var limit = 4;
    var limit=parseInt(limit);
    page = (page)? page:1;
    var skip = (page<=1)? 0 : (page - 1) * limit;
    return ticket.find({},{limit:limit, skip:skip})
});

Meteor.publish("myprofile",function(id){
    var result = Meteor.users.find({ $or: [ { 'profile.affiliate':id }, { 'roles': 'agency' } ] });
    // var user = Meteor.users.find({'profile.affiliate':id});
    // var agency = Meteor.users.find({'roles':'agency'});
    return result;
});

Meteor.publish("productAdminPanel",function(page,limit){
    //var limit = 4;
    var limit=parseInt(limit);
    page = (page)? page:1;
    var skip = (page<=1)? 0 : (page - 1) * limit;
    var allprod=product.find({},{limit:limit, skip:skip})
    var allagency=[]
    allprod.forEach(function(val){
        allagency.push(val.agency)
    });
    var listuser=Meteor.users.find({_id:{$in:allagency}})
    return [allprod,listuser];
   /* var usersid=[]
    allprod.forEach(function(val){
        usersid.push(val.agency);
    });
    var alluser=Meteor.users.find({_id:{$in:usersid}});
    return [allprod,alluser]*/
});
Meteor.publish("allagency",function(){
  return Meteor.users.find({roles:"agency"});
});

Meteor.publish("UserRegisterAffiliate",function(){
  return Meteor.users.find({roles:"affiliate"});
});
Meteor.publish("GetPayment",function(id){
  return payment.find({'userid':id});
});
Meteor.publish("GetAllPayment",function(){
    var userpayment = payment.find({});
    var userArr = [];
    userpayment.forEach(function(val){
      userArr.push(val.userid);
    });
    var listuser=Meteor.users.find({_id:{$in:userArr}})
    return [userpayment, listuser]
});