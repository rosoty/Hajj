
Template.adminticket.onCreated(function bodyOnCreated() {
    Tracker.autorun(function() {
      var getpage=Session.get("CATEGORYDATA")
       var page = getpage.page;
       var limit=20;
      Meteor.subscribe("myAdminTicket",page,limit)
      Meteor.call('countTicket', function(err, count){
                if(!err){
                    //Session.set('TOTALPRODUCTS', count);
                    $('#pagination').pagination({ items: count, itemsOnPage: limit, currentPage:page, hrefTextPrefix:'/cpanel/orders/', cssStyle: 'light-theme' });
                   
                }
            })
    });
});

Template.adminticket.helpers({
	getallTicket:function () {
    var status=Session.get("TICKETSTATUS");
    if(status && status!=="all"){
      return ticket.find({status:status})
    }else{
      return ticket.find({});  
    }
		
	},
  checkInvoice:function(invoice){
    if(invoice){
      return true;
    }else{
      return false;
    }
  },
  checkStatus:function(st){
    if(st=="ready"){
      return false;
    }else{
      return true;
    }
  }
});
Template.adminticket.events({
  'click #btnstatus':function(e){
    e.preventDefault();
    var id=this._id;
    var status="ready"
    if(confirm("Are You Sure to update status to ready")){
       Meteor.call("updateStaus",id,status);
    }
   
  },
  'click #btnstatuspending':function(e){
    e.preventDefault();
    var id=this._id;
    var status="pending"
    if(confirm("Are You Sure to update status to pending")){
       Meteor.call("updateStaus",id,status);
    }
   
  },
  'click #btnremove':function(e){
    e.preventDefault();
    var id=this._id;
    if (confirm("Are you sure to delete this")) {
      ticket.remove(id);
    }
    
  },
  "change #selstatus":function(e){
    e.preventDefault();
    var status=$("#selstatus").val();
    Session.set("TICKETSTATUS",status);
  }
});