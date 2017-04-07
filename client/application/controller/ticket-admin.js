
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
        var val = Session.get('TICKETSTATUS');
        var agency = Session.get('SEARCHTICKET-AGENCY');
        var customer = Session.get('SEARCHTICKET-CUSTOMER');
        var tickId = Session.get('SEARCHTICKET-ID');
        // if(agency){
        //     return ticket.find({ 'name': { '$regex': agency } });
        // }else if(customer){
        //     return ticket.find({ 'customer': { '$regex': customer } });
        // }else if(tickId){
        //     return ticket.find({ '_id': { '$regex': tickId } });
        // }else{
        //     if(val == 'validated'){
        //         return ticket.find({'status':val});
        //     }else if(val == 'not-validated'){
        //         return ticket.find({'status':val});
        //     }else if(val == 'waiting-for-validation'){
        //         return ticket.find({'status':val});
        //     }else{
        //         return ticket.find({});
        //     }
        // }
        return ticket.find({});
		
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
    },
    Isvalidated:function(status){
        if(status == 'validated'){return true}
    },
    Isnotvalidated:function(status){
        if(status == 'not-validated'){return true}
    },
    Iswait:function(status){
        if(status == 'waiting-for-validation'){return true}
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
    },
    "click .btn-status":function(e){
        e.preventDefault();
        var id = this._id;
        var status = this.status;
        if(confirm('Do you want to validated this invoice?')){
            Meteor.call('UPDATE_STATUS', id, status, function(err){
                if(!err){
                    console.log('UPDATE_STATUS Successfully');
                }
            });
        } 
    },
    "click .info-view":function(e){
        e.preventDefault();
        $('#InfoModal').modal('show');
        var id = this.customer;
        Session.set('TICKET_ID',this._id);
        var user = Meteor.users.findOne({'_id':id});
        //alert(id);
        var html = '';
            html += '<tr>';
                html += '<td class="h6"><strong>Username</strong></td>';
                html += '<td> </td>';
                html += '<td class="h5 username">'+user.profile.username+'</td>';
            html += '</tr>';
             html += '<tr>';
                html += '<td class="h6"><strong>Family Name</strong></td>';
                html += '<td> </td>';
                html += '<td class="h5">'+user.profile.familyname+'</td>';
            html += '</tr>';
            html += '<tr>';
                html += '<td class="h6"><strong>Date Of Birth</strong></td>';
                html += '<td> </td>';
                html += '<td class="h5">'+user.profile.dob+'</td>';
            html += '</tr>';
            html += '<tr>';
                html += '<td class="h6"><strong>Phone</strong></td>';
                html += '<td> </td>';
                html += '<td class="h5">'+user.profile.phone+'</td>';
            html += '</tr>';
            html += '<tr>';
                html += '<td class="h6"><strong>Type</strong></td>';
                html += '<td> </td>';
                html += '<td class="h5">'+user.profile.type+'</td>';
            html += '</tr>';
            html += '<tr>';
                html += '<td class="h6"><strong>Payment Type</strong></td>';
                html += '<td> </td>';
                html += '<td class="h5">'+user.profile.payment+'</td>';
            html += '</tr>';
            html += '<tr>';
                html += '<td class="h6"><strong>Depature Date</strong></td>';
                html += '<td> </td>';
                html += '<td class="h5">'+user.profile.depaturedate+'</td>';
            html += '</tr>';
            html += '<tr>';
                html += '<td class="h6"><strong>Passport</strong></td>';
                html += '<td> </td>';
                html += '<td class="h5">'+user.profile.passport+'</td>';
            html += '</tr>';
            html += '<tr>';
                html += '<td class="btn-mais-info text-primary">';
                    html += '<i class="open_info fa fa-plus-square-o"></i>';
                    html += '<i class="open_info hide fa fa-minus-square-o"></i> informações';
                html += '</td>';
                html += '<td> </td>';
                html += '<td class="h5"></td>';
            html += '</tr>';
        var title = '<i class="text-muted fa fa-user"></i> <strong>Affiliator</strong> -'+user.profile.username; 
        $('#myModalLabel').html(title);
        $('#userInfo').html(html); 
    },
     'click .view-invoice':function(e){
        e.preventDefault();
        var invoice = this.invoice;
        $('#InvoiceModal').modal('show');
        $('embed#pdfview').attr('src',invoice);
    },
    'click .validate-status':function(e){
        e.preventDefault();
        var status = $('[name="select-validate"] option:selected').val();
        var id = Session.get('TICKET_ID');
        Meteor.call('updateStaus', id, status, function(err){
            if(!err){console.log('updateStaus Successfully');$('.close').click()}
        });
    },
    'click .btn-searchcus':function(e){
        e.preventDefault();
        var val = $('[name="search-customer"]').val();
        alert(val);
        Session.set('SEARCHTICKET-CUSTOMER',val);
    },
    'click .btn-searchid':function(e){
        e.preventDefault();
        var val = $('[name="search-ticketid"]').val();
        Session.set('SEARCHTICKET-ID',val);
        alert(val);
    },
    'click .btn-searchagency':function(e){
        e.preventDefault();
        var val = $('[name="search-agency"]').val();
        alert(val);
        Session.set('SEARCHTICKET-AGENCY',val);
    }
});