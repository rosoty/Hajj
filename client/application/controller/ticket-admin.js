
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
    Session.set('TICKETSTATUS',undefined);
    Session.set('SEARCHTICKET-AGENCY',undefined);
    Session.set('SEARCHTICKET-CUSTOMER',undefined);
    Session.set('SEARCHTICKET-ID',undefined);
});

Template.adminticket.helpers({
	getallTicket:function () {
        var valstatus = Session.get('TICKETSTATUS');
        var agency = Session.get('SEARCHTICKET-AGENCY');
        var firstname = Session.get('SEARCHTICKET-FIRSTNAME');
        var lastname = Session.get('SEARCHTICKET-LASTNAME');
        var tickId = Session.get('SEARCHTICKET-ID');
        var seeall = Session.get('SEEALL');
        if(tickId){
            return ticket.find({ '_id': { '$regex': tickId } });
        }else if(valstatus){
            if(valstatus == 'validated'){
                return ticket.find({'status':valstatus});
            }else if(valstatus == 'not-validated'){
                return ticket.find({'status':valstatus});
            }else if(valstatus == 'waiting-for-validation'){
                return ticket.find({'status':valstatus});
            }else{
                return ticket.find({});
            }
        }
        else if(agency){
            return ticket.find({'agency':agency});
        }else if(firstname){
            return ticket.find({'agency':firstname});
        }else if(lastname){
            return ticket.find({'agency':lastname});
        }else{
            return ticket.find({});
        }
         // var newArr = [];
            // var alltic = ticket.find({});
            // console.log('ticType==');console.log(typeof(alltic))
            // alltic.forEach(function(data){
            //     var name = Meteor.users.findOne({'_id':data.agency});
            //     if(name){
            //         var obj = {
            //             "_id" : data._id,
            //             "customer" : data.customer,
            //             "product" : data.product,
            //             "agency" : name.profile.username,
            //             "date" : data.date,
            //             "invoice" : data.invoice,
            //             "status" : data.status
            //         }
            //         newArr.push(obj);
            //     } 
            // });
            // console.log('MYNEWARR===');console.log(newArr);console.log(typeof(newArr));
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
    },
    GetAgencyname:function(){
        return Meteor.users.find({'roles':'agency'});
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
    "click #selstatus":function(e){
        e.preventDefault();
        var status=$("#choose-status option:selected").val();
        //alert(status)
        Session.set("TICKETSTATUS",status);Session.set('SEARCHTICKET-ID',undefined);
    },
    "click .btn-status":function(e){
        e.preventDefault();
        var id = this._id;
        var status = this.status;
        if(confirm('Do you want to validated this affiliate?')){
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
    'click .btn-searchfirst':function(e){
        e.preventDefault();
        var val = $('#search-firstname option:selected').val();
        Session.set('SEARCHTICKET-FIRSTNAME',val);
    },
    'click .btn-searchlast':function(e){
        e.preventDefault();
        var val = $('#search-lastname option:selected').val();
        Session.set('SEARCHTICKET-LASTNAME',val);
    },
    'click .btn-searchid':function(e){
        e.preventDefault();
        var val = $('[name="search-ticketid"]').val();
        Session.set('SEARCHTICKET-ID',val);
        $('[name="search-ticketid"]').val('');
    },
    'click .btn-searchagency':function(e){
        e.preventDefault();
        var val = $('#search-agency option:selected').val();
         Session.set('TICKETSTATUS',undefined);
        Session.set('SEARCHTICKET-CUSTOMER',undefined);
        Session.set('SEARCHTICKET-ID',undefined);
        Session.set('SEARCHTICKET-AGENCY',val);
        $('[name="search-agency"]').val('');
    },
    'click #seeall':function(e){
        e.preventDefault();
        Session.set('TICKETSTATUS',undefined);
        Session.set('SEARCHTICKET-FIRSTNAME',undefined);
        Session.set('SEARCHTICKET-LASTNAME',undefined);
        Session.set('SEARCHTICKET-ID',undefined);
        Session.set('SEARCHTICKET-AGENCY',undefined);
    }
});