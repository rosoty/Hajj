Meteor.methods({
	updateStaus:function (id,status) {
		return ticket.update({_id:id},{$set:{status:status}});
	},
	updateInvoice:function(id,invoice){
		var status="waiting-for-validation"
		return ticket.update({_id:id},{$set:{invoice:invoice,status:status}})
	},
	SaveTicket:function(obj){
		ticket.insert(obj);
	},
	countTicket:function(){
		return ticket.find({}).count();
	},
	UPDATE_STATUS:function(id,status){
		if(status == 'validated'){
			return ticket.update({_id:id},{$set:{status:'not-validated'}});
		}else if(status == 'not-validated'){
			return ticket.update({_id:id},{$set:{status:'waiting-for-validation'}});
		}else if(status == 'waiting-for-validation'){
			return ticket.update({_id:id},{$set:{status:'validated'}});
		}
	}
});
