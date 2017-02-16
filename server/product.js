Meteor.methods({
	countProduct:function() {
		return product.find({}).count();
	},
	InsertProduct:function(obj){
		product.insert(obj);
	},
	RemoveProduct:function(id){
		product.remove({'_id':id});
	},
	UpdateProduct:function(id,obj){
		product.update({'_id':id},{$set:obj});
	}
})