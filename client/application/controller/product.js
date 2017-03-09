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
			var result = product.find({'agency':agencyId}).map(function(document, index){
				document.index = index+1;
				return document;
			});
			return result;
		}else{
			var result = product.find({}).map(function(document, index){
				document.index = index+1;
				return document;
			});
			return result;
		}
		
	},
	allagency:function(){
		return Meteor.users.find({roles:"agency"});
	}
});
Template.editproduct.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
    	format:'YYYY/MM/DD'
    });
    this.$('.datetimepicker1').datetimepicker({
    	format:'YYYY/MM/DD'
    });
});
Template.editproduct.events({
	"click #btn-update":function(e){
		e.preventDefault();
		var proId = $('[name="proId"]').val();
		var agency = $('[name="agency"]').val();
		var type = $('[name="type"]').val();
		var name = $('[name="name"]').val();
		var description = $('[name="description"]').val();
		var departure = $('[name="departure"]').val();
			departure = Math.round(Date.parse(departure) / 1000);
		var return_date = $('[name="return"]').val(); 
			return_date = Math.round(Date.parse(return_date) / 1000);
		var obj = {
			agency:agency,type:type,name:name,description:description,date_of_departure:departure,date_of_return:return_date
		}
		Meteor.call('UpdateProduct',proId, obj, function(err){
			if(!err){
				console.log('UpdateProduct Success');
				Router.go('/cpanel/product')
			}
		});
	}
})
