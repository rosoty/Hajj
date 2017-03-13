Meteor.methods({
	InsertAmount:function(obj){
		amount.insert(obj);
	},
	RemoveAmount:function(id){
		amount.remove({'_id':id});
	},
	UpdateAmount:function(id, obj){
		amount.update({'_id':id},{$set:obj});
	}
});