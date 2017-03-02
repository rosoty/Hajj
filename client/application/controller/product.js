Template.listproduct.onCreated(function bodyOnCreated() {
    Tracker.autorun(function() {
      var getpage=Session.get("CATEGORYDATA")
       var page = getpage.page;
       var limit=5;
      Meteor.subscribe("productAdminPanel",page,limit)
      Meteor.call('countProduct', function(err, count){
                if(!err){
                    //Session.set('TOTALPRODUCTS', count);
                    $('#pagination').pagination({ items: count, itemsOnPage: limit, currentPage:page, hrefTextPrefix:'/cpanel/orders/', cssStyle: 'light-theme' });
                   
                }
            })
    });
});
Template.listproduct.events({
	"click #btnremove": function(e){
		e.preventDefault();
		if(confirm("Are you sure to delete this ?")){
			product.remove(this._id);
		}
	},
	"change #seltagency":function(){
		var agencyId=$("#seltagency").val();
		Session.set("SELECTAGENCY",agencyId);
	}
});
Template.listproduct.helpers({
	getallProduct:function(){
		var agencyId=Session.get("SELECTAGENCY");
		if(agencyId){
			return product.find({agency:agencyId});
		}else{
			return product.find({});
		}
		
	},
	allagency:function(){
		return Meteor.users.find({roles:"agency"});
	}
});