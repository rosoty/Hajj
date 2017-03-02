Template.categoryadd.events({
	"click #btnaddcategory": function(e){
		e.preventDefault();
		var catname=$("#catname").val();
		var imageurl=$("#imageurl").val();
		Meteor.call("insertCategory",catname,imageurl,function(err){
			if(!err){
				console.log("Successs");
				Router.go("/cpanel/category")
			}
		});

	}
});

Template.category.helpers({
	getallcategory:function(){
		return categories.find({});
	}
});
Template.category.events({
	"click .btn-del": function(e){
		e.preventDefault();
		if(confirm("Are you sure want to delete this???")){
			categories.remove(this._id);
		}
	}
});

Template.categoryedit.events({
	"click #btnupdatecategory": function(e){
		e.preventDefault();
		var id=$("#cat_id").val();
		var catname=$("#catname").val();
		var imageurl=$("#imageurl").val();
		Meteor.call("updateCategory",id,catname,imageurl,function(err){
			if(!err){
				console.log("Successs");
				Router.go("/cpanel/category")
			}
		});
	}
});
