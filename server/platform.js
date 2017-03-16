Meteor.methods({
	InsertPlatform:function(obj){
		platform.insert(obj);
	},
	RemovePlatform:function(id){
		platform.remove({'_id':id});
	},
	UpdatePlatform:function(id,obj){
		platform.update({'_id':id},{$set:obj});
	},
	UpdatePlatform_status:function(id,status){
		if(status == 'active'){
			platform.update({'_id':id},{$set:{'status':'pandding'}})
		}else{
			platform.update({'_id':id},{$set:{'status':'active'}})
			platform.update( { "_id": { $ne: id } }, { $set: { "status": "pandding" } },{multi:true} );
		}
	}
})