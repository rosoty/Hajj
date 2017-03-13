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
         $('#myModal').modal('hide');
		var ticketid = this._id;
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
        
	},
    "click #fullscreen":function(e){
        e.preventDefault();
        window.parent.location = "http://bootsnipp.com/iframe/Q60Oj";
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
    "click .btn-mais-info":function(e){
        e.preventDefault();
        $( '.open_info' ).toggleClass( "hide" );
    },
    'click .validate-status':function(e){
        e.preventDefault();
        var status = $('[name="select-validate"] option:selected').val();
        var id = Session.get('TICKET_ID');
        Meteor.call('updateStaus', id, status, function(err){
            if(!err){console.log('updateStaus Successfully');$('.close').click()}
        });
    },
    'change #select-filter':function(e){
        e.preventDefault();
        var val = $('[name="select-filter"] option:selected').val();
        Session.set('VAL-STATUS',val);
    }
});
Template.ticket.helpers({
	getallTicket:function () {
        var uid=Meteor.userId();
        var val = Session.get('VAL-STATUS');
        if(val == 'validated'){
            return ticket.find({'agency':uid,'status':val});
        }else if(val == 'not-validated'){
            return ticket.find({'agency':uid,'status':val});
        }else if(val == 'waiting-for-validation'){
            return ticket.find({'agency':uid,'status':val});
        }else{
            return ticket.find({'agency':uid});
        }
	},
    checkInvoice:function(invoice){
        if(invoice){
            return true;
        }else{
            return false;
        }
    }
});