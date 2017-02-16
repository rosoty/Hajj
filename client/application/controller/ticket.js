Template.ticket.onCreated(function() {
    Meteor.Loader.loadJs("//api.filestackapi.com/filestack.js");
});
Template.ticket.events({
	/*'click #btnstatus':function(e){
		e.preventDefault();
		var id=this._id;
		var status="validate"
		Meteor.call("updateStaus",id,status);
	},*/
	"click #uploadinvoice":function(e){
		e.preventDefault();
		var ticketid=this._id;
		filepicker.setKey("ACTP7A0fnQou2s5L4f9FBz");
        filepicker.pick({
           //  mimetype:['image/*','text/*','pdf/*'], /* Images only */
          //  mimetype: '*',
            extension: '.pdf',
           // maxSize: 1024 * 1024 * 5, /* 5mb */
          //  imageMax: [1500, 1500], /* 1500x1500px */
           // cropRatio: 1/1, /* Perfect squares */
            services: ['*'] /* All available third-parties */
        }, function(blob){
          
            var filename = blob.filename;
            var url = blob.url;
            var id = blob.id;
            var isWriteable = blob.isWriteable;
            var mimetype = blob.mimetype;
            var size = blob.size;

            console.log(blob)
            Meteor.call('updateInvoice',ticketid,url,function(err){
            	if(!err){
            		console.log("not err")
            	}
            });
        });
        
	}
});
Template.ticket.helpers({
	getallTicket:function () {
    var uid=Meteor.userId();
    var result = ticket.find({'agency':uid}).map(function(document, index){
      document.index = index+1;
      return document;
    });
    return result;
	},
  checkInvoice:function(invoice){
    if(invoice){
      return true;
    }else{
      return false;
    }
  }
});