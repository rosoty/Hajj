
Template.adduser.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});
Template.user.onCreated(function bodyOnCreated() {
    Tracker.autorun(function() {
      var getpage=Session.get("CATEGORYDATA")
       var page = getpage.page;
       var limit=20;
      Meteor.subscribe("myUserPagination",page,limit)
      Meteor.call('countUser', function(err, count){
                if(!err){
                    //Session.set('TOTALPRODUCTS', count);
                    $('#pagination').pagination({ items: count, itemsOnPage: limit, currentPage:page, hrefTextPrefix:'/cpanel/orders/', cssStyle: 'light-theme' });
                   
                }else{
                	console.log("GOTERROR",err.reason);
                }
            })
    });
});

Template.adduser.events({
	"click #btn-save": function(e){
		e.preventDefault();
		var obj = '';
		var html = '';
		var name = $("[name='name']").val();
		var phone = $("[name='phone']").val();
		var email = $("[name='email']").val();
		var password = $("[name='password']").val();
		var userRoles = $("#roles option:selected").val();
		// Agency Field
			var siret_num = $("[name='siretnum']").val();
			var contact_name = $("[name='contactname']").val();
			var address = $("[name='address']").val();
			var time = Date.now();
		// Affiliate Field
			var familyname = $("[name='familyname']").val();
			var dob = $("[name='dob']").val();
				dob = Math.round(Date.parse(dob) / 1000);
			var userType = $("[name='usertype']").val();
			var numpayment = $("[name='numpayment']").val();					
			var affiliate = $("[name='affiliate']").val();
		var phoneno = /^\d{10}$/;
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
		// if(userRoles == 'affiliate'){
			
		// }else if(userRoles == 'agency'){
		// 	obj = {
		// 		username:name,siret_num:siret_num,contact_name:contact_name,phone:phone,address:address,time:time
		// 	}
		// }
		if(userRoles == 'affiliate'){
			obj = {username:name,familyname:familyname,dob:dob,phone:phone,type:userType,numpayment:numpayment,affiliate:affiliate}
			if(name == ""){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> Username</div>';
				$('#msg-error').html(html);
			}else if(!email.match(mailformat)){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> Email format (xxx@xxx.xxx)</div>';
				$('#msg-error').html(html);
			}else if(!phone.match(phoneno)){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> phone number 10 character no text</div>';
				$('#msg-error').html(html);
			}
			else if(familyname == ""){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> Familyname</div>';
				$('#msg-error').html(html);
			}else if(dob == ""){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> Date of birth (dob)</div>';
				$('#msg-error').html(html);
			}else if(userType == ""){
				html += '<div class="alert alert-danger"><strong>Please Select</strong> User type</div>';
				$('#msg-error').html(html);
			}else if(numpayment == ""){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> Number of payment</div>';
				$('#msg-error').html(html);
			}else if(password == ""){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> password</div>';
				$('#msg-error').html(html);
			}else{
				Meteor.call("InsertUser",obj, email, password, userRoles, function(res){
					if(!res){
						Router.go('/cpanel/user');			
					}
				});
			}
		}else if(userRoles == 'agency'){
			obj = {username:name,siret_num:siret_num,contact_name:contact_name,phone:phone,address:address,time:time}
			if(name == ""){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> Username</div>';
				$('#msg-error').html(html);
			}else if(!email.match(mailformat)){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> Email format (xxx@xxx.xxx)</div>';
				$('#msg-error').html(html);
			}else if(!phone.match(phoneno)){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> phone number 10 character no text</div>';
				$('#msg-error').html(html);
			}else if(siret_num == ""){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> Siret Number</div>';
				$('#msg-error').html(html);
			}else if(contact_name == ""){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> Contact name</div>';
				$('#msg-error').html(html);
			}else if(address == ""){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> Address</div>';
				$('#msg-error').html(html);
			}else if(password == ""){
				html += '<div class="alert alert-danger"><strong>Please Fill</strong> password</div>';
				$('#msg-error').html(html);
			}else{
				Meteor.call("InsertUser",obj, email, password, userRoles, function(res){
					if(!res){
						Router.go('/cpanel/user');			
					}
				});
			}
		}
		else{
			html += '<div class="alert alert-danger"><strong>Please Select</strong> Roles</div>';
			$('#msg-error').html(html);
		}
	},
	"change #roles":function(e){
		var roles = $('#roles option:selected').val();
		Session.set('ROLESVALUE',roles);
	}
});	
Template.adduser.helpers({
	CheckRoles:function(){
		var roles = Session.get('ROLESVALUE');
		if(roles == 'agency'){
			return true;
		}else if(roles == 'affiliate'){return false;}
	}
});
Template.user.helpers({
	GetUser:function(){
		var type = Session.get('TYPEVALUE');
		if(type){
			if(type == "admin"){
				return Meteor.users.find({'roles':'admin'},{sort:{'createdAt':1}});
			}else if(type == "agency"){
				return Meteor.users.find({'roles':'agency'},{sort:{'createdAt':1}});
			}else if(type == "affiliate"){
				return Meteor.users.find({'roles':'affiliate'},{sort:{'createdAt':1}});
			}else{
				return Meteor.users.find({},{sort:{'createdAt':1}});
			}
		}else{return Meteor.users.find({},{sort:{'createdAt':1}});Session.set('TYPEVALUE',undefined);}
	},
	Isadmin:function(roles){
		if(roles == "admin"){
			return "disabled";
		}
	}
});
Template.user.events({
	"click .btn-del": function(e){
		e.preventDefault();
		if(confirm("Are you sure want to delete this???")){
			Meteor.call("RemoveUser",this._id);
		}
	},
	"change #usertype":function(e){
		e.preventDefault();
		var type = $('#usertype option:selected').val();
		Session.set('TYPEVALUE',type);
	}
});
Template.useredit.onRendered(function(){
	//this.$('#dobpicker').datetimepicker();
	this.$('#dobpicker').datetimepicker({
    	format:'YYYY/MM/DD'
    });
    this.$('#departuredate').datetimepicker({
    	format:'YYYY'
    });
})
Template.useredit.events({
	"click #btn-update": function(e){
		e.preventDefault();
		var id = $("[name='userid']").val();
		var name = $("[name='name']").val();
		var email = $("[name='email']").val();
		var phone = $("[name='phone']").val();
		var userRoles = $("[name='userRoles']").val();
		var obj = '';
		// Agency Field
			var siret_num = $("[name='siretnum']").val();
			var contact_name = $("[name='contactname']").val();
			var address = $("[name='address']").val();
			var time = $("[name='time']").val();
			var status = $("[name='status']").val();
		// Affiliate Field
			var familyname = $("[name='familyname']").val();
			var dob1 = $("[name='dob']").val();
			var	dob = Math.round(Date.parse(dob1) / 1000);
			var depaturedate = $("[name='depaturedate']").val();
			var payment = $("[name='payment'] option:selected").val();
			var userType = $("[name='usertype']").val();
			var numpayment = $("[name='numpayment']").val();					
			var affiliate = $("[name='affiliate']").val();
		
		if(userRoles == 'affiliate'){
			obj = {
				username:name,familyname:familyname,dob:dob,phone:phone,type:userType,depaturedate:depaturedate,payment:payment,numpayment:numpayment,affiliate:affiliate
			}
		}else if(userRoles == 'agency'){
			obj = {
				username:name,siret_num:siret_num,contact_name:contact_name,phone:phone,address:address,status:status,time:time
			}
		}
			
		var roles = $("[name='permission']").val();
		Meteor.call("UpdateUser",id, obj, email, roles, function(res){
			if(!res){
				alert("Update User successfully!!!!!!!");
				Router.go('/cpanel/user');			}
		});
	}
});	
Template.useredit.helpers({
	IstypeAgency:function(type){
		console.log('MYTYPE=='+type);
		if(type == "agency"){return true}
	},
	IstypeAffiliate:function(type){
		if(type == "affiliate"){return true}
	}
})
Template.signin.events({
	"click #btn-signin":function(e){
		e.preventDefault();

		var email = $("[name='email']").val();
		var password = $("[name='password']").val();
		Meteor.loginWithPassword(email, password, function(res){
		    if(!res){	
		    	if(Roles.userIsInRole(Meteor.userId(), ['affiliate'])){
		    		Router.go("/profile/payment")
		    	}else if(Roles.userIsInRole(Meteor.userId(), ['agency'])){
		    		Router.go("/user/profile")
		    	}
		    	else { 	
			    	Router.go('/cpanel/dashboad');		 
			    }   	
		    }else{
		    	alert("your email and password Invalid!!!");
		    }
		});
	}
});

Template.userregister.onRendered(function() {
	Session.set('SessionRandomId',Random.id());
	paymentId=Session.get('SessionRandomId');
	newPayment={"_id":paymentId, "status":"new","created_date":"now","due_date":"now","amount":amountPayment,"userid":"none","updated_date":""};
      console.log("inserting payment");
      console.log(newPayment);
      Meteor.call("insertFirstPayment",newPayment);
    this.$('.datetimepicker').datetimepicker({
    	format:'YYYY/MM/DD'
    });
    this.$('.datetimepicker1').datetimepicker({
    	format:'YYYY'
    });
});



Template.userregister.helpers({
	getPaymentStatus: function(){
		var rid=payment.find({"_id":Session.get('SessionRandomId')});
		if(rid.count()>0){
			rid=rid[0].status;
			if(status=='Paid')
				return 'false';
			else
				return 'true';
		}else{
			return 'true';
		}	
	},
	Getpayment:function(){
		var product = Session.get('HAJJ-DATE');
		if(product){
			return amount.find({'product':product});
		}
	},
	CheckPlatform:function(){
		var getone = platform.findOne({'status':'active'});
		console.log('mydate=='+getone.date_from+'===to=='+getone.date_to);
		// var result = platform.find( { 'date_from': { $gt: getone.date_from } }, { 'date_to': {$lt: getone.date_to}} );
		// console.log('RESULT platform'+result);
		// console.log(result);
		var mydate = Math.round(Date.parse(new Date()) / 1000);
		console.log('timestamp=='+ mydate);
		if(mydate >= getone.date_from && mydate <= getone.date_to){
			return true;
		}else{
			return false;
		}
	},
	ShowDateRegister:function(){
		var getone = platform.findOne({'status':'active'});
		if(getone){
			return getone;
		}
	},
	CheckIslink:function(){
		var res_affiliate = Router.current().params.id;
		var res = Meteor.users.findOne({'_id':res_affiliate});
		if(res){
			return true;
		}
	},
	GetpaymentAff:function(){
		var res_affiliate = Router.current().params.id;
		var res = Meteor.users.findOne({'_id':res_affiliate});
		if(res){
			return amount.find({'product':res.profile.type});
		}
	}
});

Template.userregister.events({
/*	"focus input":function(e){
		e.preventDefault();
		 $('#registerform').validate();
	},*/
	'click #payer': function(e) {
      e.preventDefault();
      //var paymentId=$("#paymentId").val();
      var amountPayment=Number(Session.get('amountOfCurrentPayment'))*100;
      paymentId=Session.get('SessionRandomId');


      console.log(paymentId);
      console.log(amountPayment);
      StripeCheckout.open({
        key: 'pk_test_njC2z064KCYm0e0kjilPA26o',
        amount: amountPayment, // this is equivalent to $50
        name: 'Mecque it easy',
        description: 'Cotisation MIE',
        panelLabel: 'Payer',
        currency: 'eur',
        token: function(res) {
          stripeToken = res.id;
          console.info(res);
          Meteor.call('chargeCard', stripeToken,Session.get('SessionRandomId'),function(err,ret){
          	var rid=payment.find({"_id":Session.get('SessionRandomId')});
		if(rid.count()>0){
			rid=rid[0].status;
			if(status=='Paid'){
				console.log('Paid');
				$("#btnregister").attr('disabled','false');
			}
				
			
		}	
          });
        }
      });
    },
	'click #btnnext':function(e){
		e.preventDefault();
		var username=$("#firstname").val();
		var familyname=$("#familyname").val();
		var dob=$("#dob").val();
			dob = Math.round(Date.parse(dob) / 1000);
		var phone=$("#phone").val();
		var email=$("#email").val();
		var password=$("#pwd").val();
		var role="affiliate";
		var res_affiliate = Router.current().params.id;
		var res = Meteor.users.findOne({'_id':res_affiliate});
		var phoneno = /^\d{10}$/;
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
		if(username == ''){
			$("#error").html("<div class='alert alert-danger'><strong>Error!</strong>please fill username</div>");
		}else if(familyname == ''){
			$("#error").html("<div class='alert alert-danger'><strong>Error!</strong>please fill Familyname</div>");
		}else if(dob == ''){
			$("#error").html("<div class='alert alert-danger'><strong>Error!</strong>please fill Date of birth</div>");
		}else if(!phone.match(phoneno)){
			$("#error").html("<div class='alert alert-danger'><strong>Error!</strong>please fill phone number 10 character no text word</div>");
		}else if(!email.match(mailformat)){
			$("#error").html("<div class='alert alert-danger'><strong>Error!</strong>please fill email format</div>");
		}else if(password == ''){
			$("#error").html("<div class='alert alert-danger'><strong>Error!</strong>please fill password</div>");
		}else{
			if(typeof(res) == 'undefined'){
				$("#registerform").addClass("hidden");
				$("#nextrgister").removeClass("hidden");

			}else{
				res_affiliate = res._id;
				var res_type = res.profile.type;
				var res_numpayment = $("#numpayment").val();
				var payment = $("#selectpayment").val();
				var res_depaturedate = res.profile.depaturedate;
				var obj={
					username:username,
					familyname:familyname,
					dob:dob,
					phone:phone,
					type:res_type,
					numpayment:res_numpayment,
					affiliate:res_affiliate,
					depaturedate:res_depaturedate,
					payment:payment
				}
				var url="https://www.mecqueiteasy.com/api/user/register/?insecure=cool&username="+obj.username+"&email="+email+"&nonce=67ecdc46b5&display_name="+obj.username+"&notify=both&user_pass="+password;
				//console.log('reg 1'+url);
				//$.get(url);
				if(res_numpayment == "choose"){
					$("#error").html("<div class='alert alert-danger'><strong>Error!</strong>please select number of payment</div>");
				}else if(payment == "nopay"){
					$("#error").html("<div class='alert alert-danger'><strong>Error!</strong>please select payment methods</div>");
				}else{
					Meteor.call("registerUser",email,password,obj,role,function(err,data){
						if(!err){
							var payamount = amount.findOne({'_id':res_numpayment});
							var amountdudate = payamount.amount / payamount.paynum;
							//var montly_amounts = parseInt(result.amount) / parseInt(result.paynum); 
								amountdudate = amountdudate.toFixed(2);
							var pay_obj = {"status":"new","created_date":Math.round(Date.parse(new Date()) / 1000),"due_date":res_depaturedate,"amount":amountdudate,"userid":data,"updated_date":""}
							Meteor.call('UpdateUserAffiliat_number',data);
							Meteor.call("InsertPayment",pay_obj,res_numpayment);
							Router.go("/login");
						}
					});
				}
			}
		}	
	},
	'click #btnregister':function(e){
		e.preventDefault();
		var username=$("#firstname").val();
		var familyname=$("#familyname").val();
		var dob=$("#dob").val();
			dob = Math.round(Date.parse(dob) / 1000);
		var phone=$("#phone").val();
		var email=$("#email").val();
		var password=$("#pwd").val();
		var payment=$("#selectpayment").val();
		var role="affiliate";
		var numpayment=$("#numpayment").val();
		var selecttype=$("#selecttype").val();
		var mydate = Session.get('HAJJ-DATE');
		var depaturedate = '';
		if(mydate == 'hajj'){
			depaturedate = $(".hajjdepaturedate").val();
		}else if(mydate == 'omrah'){
			depaturedate = $(".omrahdepaturedate").val();
		}else{
			depaturedate = $("#depaturedate").val();
		}
		//var paymentmodel=$("#paymentmodel").val();
		var obj={
			username:username,
			familyname:familyname,
			dob:dob,
			phone:phone,
			type:selecttype,
			numpayment:numpayment,
			affiliate:'',
			depaturedate:depaturedate,
			payment:payment
		}
		if(selecttype == 'pro'){
			$("#msg-error").html("<div class='alert alert-danger'><strong>Error!</strong>please select service hajj or omrah</div>");
		}else if(numpayment == 'choose'){
			$("#msg-error").html("<div class='alert alert-danger'><strong>Error!</strong>please select number of payment</div>");
		}else if(depaturedate == ''){
			$("#msg-error").html("<div class='alert alert-danger'><strong>Error!</strong>please select depature date</div>");
		}else if(payment == 'nopay'){
			$("#msg-error").html("<div class='alert alert-danger'><strong>Error!</strong>please select payment type</div>");
		}else{
			var url="https://www.mecqueiteasy.com/api/user/register/?insecure=cool&username="+obj.username+"&email="+email+"&nonce=67ecdc46b5&display_name="+obj.username+"&notify=both&user_pass="+password;
			console.log('reg 2'+url);
			//$.get(url);
			Meteor.call("registerUser",email,password,obj,role,function(err,data){
				if(!err){
					
					//Meteor.call('sendUserRegister',data);
					var payamount = amount.findOne({'_id':numpayment});
					var amountdudate = payamount.amount / payamount.paynum;
						amountdudate = amountdudate.toFixed(2);
					Meteor.call('UpdateUserAffiliat_number',data);
					var pay_obj = {"status":"new","created_date":Math.round(Date.parse(new Date()) / 1000),"due_date":depaturedate,"amount":amountdudate,"userid":data,"updated_date":""};
					Meteor.call("InsertPayment",pay_obj,numpayment);
					//Meteor.call("InsertPayment",data,depaturedate,numpayment);
					Meteor.call("findAffiliate",data);
					Router.go("/login");
				}
			});
		}
	},
	"change #selecttype":function(e){
		e.preventDefault();
		var selecttype=$("#selecttype").val();
		if(selecttype=="hajj"){
			$('.datehajj').removeClass('hidden');
			$('.dateomrah').addClass('hidden');
			Session.set('HAJJ-DATE','hajj');
		}else if(selecttype=="omrah"){
			$('.datehajj').addClass('hidden');
			$('.dateomrah').removeClass('hidden');
			Session.set('HAJJ-DATE','omrah');
		}
	},
	"change #numpayment":function(e){
		e.preventDefault();
		var val = $('[name="numpayment"] option:selected').val();
		var result = amount.findOne({'_id':val});
		var montly_amounts = parseInt(result.amount) / parseInt(result.paynum); 
		var montly = montly_amounts.toFixed(2);
		Session.set('amountOfCurrentPayment',montly_amounts);
		var html = '';
			html += '<label class="control-label col-sm-2"  for="sel1">Total amount </label>';
		    html += '<div class="col-sm-10 btn btn-default image-preview-input">';
	            html += '<input type="text" class="form-control" disabled value="'+result.amount+'" style="color:red;font-weight: bold;border:#000 2px solid">';
	        html += '</div>';
	        html += '<label class="control-label col-sm-2"  for="sel1">Montly debit amounts </label>';
		    html += '<div class="col-sm-10 btn btn-default image-preview-input">';
	            html += '<input type="text" class="form-control" disabled value="'+montly+'" style="color:red;font-weight: bold;border:#000 2px solid">';
	        html += '</div>';
			$('#show-amount').html(html);

	}
});

Template.profile.helpers({
	getProfileEdit:function(){
		var id=Meteor.userId();
		console.log(id);
		return Meteor.users.findOne({_id:id});
	},
	GenerateButton:function(){
		var id = Meteor.userId();	
		var result = Meteor.users.find({'profile.affiliate':id, 'roles':'affiliate','acquired':'full'}).count();
		console.log('MY RESULT COUNT== '+result);
		var tic = ticket.findOne({'customer':id});
		var num = Meteor.user();
		var mynum = parseInt(num.profile.aff_number);
		if(result >= mynum && typeof(tic) == 'undefined'){
			return true;
		}
	},
	
	GetProduct:function(type){
		var agencyId = Session.get('AGENCY-ID');
		if(agencyId){
			var result = product.find({'agency':agencyId,'type':type}).map(function(document, index){
				document.index = index+1;
				return document;
			});
			return result;
		}else{
			var result = product.find({'type':type}).map(function(document, index){
				document.index = index+1;
				return document;
			});
			return result;
		}
	},
	getagencyname:function(id){
		return Meteor.users.findOne({'_id':id}).profile.username;
	},
	GetallAgency:function(){
		return Meteor.users.find({'roles':'agency','profile.status':'validated'});
	},
	Ispassport:function(passport){
		//console.log('passport== '+passport);
		if (passport) {return true}else{return false}
	},
	GetnumberPayment:function(){
		var user = Meteor.userId();
		var result = payment.find({'userid':user,'status':'new'}).count();
		if(result > 0){
			return result;
		}else{
			return false;
		}
	}
});
Template.profile.onRendered(function(){
    
});
Template.profile.events({
	"click .booking":function(e){
		e.preventDefault();
		var customer = Meteor.userId();
		var product = this._id;
		var agency = this.agency;
		var date = Math.floor(Date.now() / 1000);
		var invoice = '';
		var status = 'waiting-for-validation';
		var obj = {
			customer: customer,
			product:product,
			agency:agency,
			date:date,
			invoice:invoice,
			status:status
		}
		Meteor.call('SaveTicket',obj,function(err){
			if(!err){
				console.log('SaveTicket successfully');
				$('#product-options').modal('hide');
			}else{
				console.log(err.reason);
			}
		});
	},
	"click #btn-passport":function(e){
		e.preventDefault();
		var id = Meteor.userId();
		var passport = $('[name="passport"]').val();
		if(passport == ''){
			alert('passport can not empty');
		}else{
			Meteor.call('UpdatePassport',id, passport, function(err){
				if(!err){console.log('UpdatePassport successfully')}
			});
		}
	},
	"change #selAgency":function(e){
		e.preventDefault();
		var val = $('#selAgency').val();
		Session.set('AGENCY-ID',val);
	},
	"click #send":function(e){
		e.preventDefault();
		alert('send');
		var to = "rosoty24@gmail.com";
		var subject = "Test send email";
		var text = "<b>hello rosoty this is my first email</b>";
		Meteor.call("sendEmail");
	}
});
Template.editprofile.events({
	'click #btneditprofile':function(e){
		e.preventDefault();
		var username=$("#username").val();
		var familyname=$("#familyname").val();
		var dob=$("#dob").val();
			dob = Math.round(Date.parse(dob) / 1000);
		var phone=$("#phone").val();
		var email=$("#email").val();
		var numpayment=$("#numpayment").val();
		var selecttype=$("#selecttype").val();
		var obj={
			username:username,
			familyname:familyname,
			dob:dob,
			phone:phone,
			type:selecttype,
			numpayment:numpayment
		}
		var id=Meteor.userId();
		Meteor.call("UpdateProfile",id,email,obj);
	}
});

Template.editprofile.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
    	format:'YYYY/MM/DD'
    });
});

Template.changepassword.events({
	'click #btnchangepwd':function(e){
		e.preventDefault();
		var userid=Meteor.userId();
		var newpwd=$("#newpwd").val();
		var renewpwd=$("#newpwd2").val();
		if(newpwd==renewpwd){
			Meteor.call("changepassword",userid,newpwd,function(err){
				if(!err){Router.go('/login')}
			});
		}else{
			alert("Your password is not match")
		}
		
	}
});

Template.affiliator.events({
	"click #btn-update":function(e){
		e.preventDefault();
		var affnum = $('[name="aff-number"]').val();
		var html = '';
		if(affnum == ''){
			html += '<div class="alert alert-danger">';
                html += '<strong>All Fields!</strong> can not empty please fill it.';
            html += '</div>';
            $('#msg-error').html(html);
		}else{
			Meteor.call('UpdateNumber',affnum,function(err){
				if(!err){
					console.log('UpdateNumber successfully');Router.go('/cpanel/user')
				}else{
					console.log(err.reason);
				}
			});
		}
	}
})