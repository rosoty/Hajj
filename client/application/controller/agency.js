Tracker.autorun(function () {
  
    
});
Template.agency.onRendered(function(){
	// Tracker.afterFlush(function(){
 //      $('.reg').validate();
 //    });
    $('.reg').validate();
    //Session.set('creating',true); 
});
Template.editprofile.onRendered(function(){
    // $('.regedit').validate();
});
Template.agency.events({
	"click #btn-register": function(e){
		e.preventDefault();
		var html = '';
		var username = $('[name="username"]').val();
		var email = $('[name="email"]').val();
		var siret_num = $('[name="siretnum"]').val();
		var contact_firstname = $('[name="firstname"]').val();
		var contact_lastname = $('[name="lastname"]').val();
		var phone = $('[name="phone"]').val();
		var address = $('[name="address"]').val();
		var password = $('[name="password"]').val();
		var roles = 'agency';
		var timestamp = Date.now();
		var obj = {
			username:username,
			contact_firstname:contact_firstname,
        	contact_lastname:contact_lastname,
        	siret_num:siret_num,
        	phone:phone,
        	address:address,
        	time:timestamp
		}
		
		if(username == "" || email == "" || siret_num == "" || phone == "" || address == "" || contact_firstname == "" || contact_lastname == "" || password == ""){
			html += '<div class="alert alert-danger">';
			  	html += '<strong>Input Field!</strong> can not be empty.';
			html += '</div>';
			$('#msg-error').append(html);
		}
		else{
			if($('.checkbox').is(':checked')){
				Meteor.call('registerUser',email,password,obj,roles,function(error, response){
					if(error){
						console.log('error: '+error.reason);
					}else{
						Meteor.loginWithPassword(email, password, function(res){
						    if(!res){	
						    	Router.go('/user/profile');		 
						    } 
						});
					}
				});
			}else{
				html += '<p style="color:red">please check to confirm</p>';
				$('.confirm').html(html);
			}
		}
	},
	"focus input":function(e){
		e.preventDefault();
		$('#msg-error').html('');
	},
	"change .checkbox":function(e){
		e.preventDefault();
		if($('.checkbox').is(':checked')){
	        $('#btn-register').prop('disabled', false);
	    } else {
	        $('#btn-register').prop('disabled', true);
	    }
	}
});
Template.editprofile.events({
	"click #btn-update": function(e){
		e.preventDefault();
		var html = '';
		var id = $('[name="profileId"]').val();
		var username = $('[name="username"]').val();
		var email = $('[name="email"]').val();
		var siret_num = $('[name="siretnum"]').val();
		var contact_firstname = $('[name="firstname"]').val();
		var contact_lastname = $('[name="lastname"]').val();
		var phone = $('[name="phone"]').val();
		var address = $('[name="address"]').val();
		var timestamp = $('[name="timestamp"]').val();
		var obj = {
			username:username,
			contact_firstname:contact_firstname,
			contact_lastname:contact_lastname,
        	siret_num:siret_num,
        	phone:phone,
        	address:address,
        	time:timestamp
		}
		if(username == "" || email == "" || siret_num == "" || phone == "" || address == "" || contact_firstname == "" || contact_lastname == ""){
			html += '<div class="alert alert-danger">';
			  	html += '<strong>Input Field!</strong> can not be empty.';
			html += '</div>';
			$('#msg-error').append(html);
		}else{
			Meteor.call('UpdateProfile',id,email,obj,function(error, response){
				if(error){
					console.log('error: '+error.reason);
				}else{
					console.log('UpdateProfile Successfully');
					Router.go('/user/profile');
				}
			});
		}
	}
});

Template.agencyproduct.helpers({
	getallProduct:function(){
		var usi = Meteor.userId();
		var result = product.find({'agency':usi}).map(function(document, index){
			document.index = index+1;
			return document;
		});
		return result;
	}
});
Template.agencyproduct.events({
	'click .del':function(e){
		e.preventDefault();
		if(confirm('Are you sure want to delete this?')){
			Meteor.call('RemoveProduct',this._id);
		}
	}
});
Template.agencyaddproduct.onRendered(function(){
	this.$('.dod').datetimepicker();
	this.$('.dor').datetimepicker();
});
Template.agencyaddproduct.events({
	"click #btn-save":function(e){
		e.preventDefault();
		var html = '';
		var agency = Meteor.userId();
		var name = $('[name="name"]').val();
		var type = $('[name="type"] option:selected').val();
		var description = $('[name="description"]').val();
		var date_of_departure = $('[name="dod"]').val();
			date_of_departure = Math.floor(Date.now(date_of_departure) / 1000);
		var date_of_return = $('[name="dor"]').val();
			date_of_return = Math.floor(Date.now(date_of_return) / 1000);
		var obj = {
			agency:agency,
			type:type,
			name:name,
			description:description,
			date_of_departure:date_of_departure,
			date_of_return:date_of_return
		}
		if(agency == '' || type == '' || description == '' || date_of_departure == '' || date_of_return == ''){
			html += '<div class="alert alert-danger">';
                html += '<strong>All Fields!</strong> can not empty please fill it.';
            html += '</div>';
            $('#msg-error').append(html);
		}else{
			Meteor.call('InsertProduct',obj, function(error){
				if(!error){
					console.log('InsertProduct Successfully');
					Router.go('/agency/product');
				}
			});
		}
	}
});
Template.agencyeditproduct.onRendered(function(){
	this.$('.dod').datetimepicker();
	this.$('.dor').datetimepicker();
});
Template.agencyeditproduct.events({
	"click #btn-update":function(e){
		e.preventDefault();
		var html = '';
		var id = this._id;
		alert(id);
		var agency = Meteor.userId();
		var name = $('[name="name"]').val();
		var description = $('[name="description"]').val();
		var date_of_departure = $('[name="dod"]').val();
			date_of_departure = Date.now();
		var date_of_return = $('[name="dor"]').val();
			date_of_return = Date.now();
		var obj = {
			agency:agency,
			name:name,
			description:description,
			date_of_departure:date_of_departure,
			date_of_return:date_of_return
		}
		if(agency == '' || description == '' || date_of_departure == '' || date_of_return == ''){
			html += '<div class="alert alert-danger">';
                html += '<strong>All Fields!</strong> can not empty please fill it.';
            html += '</div>';
            $('#msg-error').append(html);
		}else{
			Meteor.call('UpdateProduct',id,obj, function(error){
				if(!error){
					console.log('UpdateProduct Successfully');
					Router.go('/agency/product');
				}
			});
		}
	}
});
