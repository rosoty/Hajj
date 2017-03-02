Meteor.methods({
	insertCategory:function(catname,imageurl){
		return categories.insert({name:catname,imageurl:imageurl})
	},
	updateCategory:function(id,catname,imageurl){
		return categories.update({_id:id},{$set:{name:catname,imageurl:imageurl}});
	}
});