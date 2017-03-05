
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
			var userType = $("[name='usertype']").val();
			var numpayment = $("[name='numpayment']").val();					
			var affiliate = $("[name='affiliate']").val();
		
		if(userRoles == 'affiliate'){
			obj = {
				username:name,familyname:familyname,dob:dob,phone:phone,type:userType,numpayment:numpayment,affiliate:affiliate
			}
		}else if(userRoles == 'agency'){
			obj = {
				username:name,siret_num:siret_num,contact_name:contact_name,phone:phone,address:address,time:time
			}
		}
		if(userRoles != 'none'){
			Meteor.call("InsertUser",obj, email, password, userRoles, function(res){
				if(!res){
					//alert("insert section successfully!!!!!!!");
					Router.go('/cpanel/user');			
				}
			});
		}else{alert('select roles!!!')}
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
				return Meteor.users.find({'roles':'admin'},{sort:{'createdAt':-1}});
			}else if(type == "agency"){
				return Meteor.users.find({'roles':'agency'},{sort:{'createdAt':-1}});
			}else if(type == "affiliate"){
				return Meteor.users.find({'roles':'affiliate'},{sort:{'createdAt':-1}});
			}else{
				return Meteor.users.find({},{sort:{'createdAt':-1}});
			}
		}else{return Meteor.users.find({},{sort:{'createdAt':-1}});Session.set('TYPEVALUE',undefined);}
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
	this.$('.datetimepicker').datetimepicker();
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
			var dob = $("[name='dob']").val();
			var userType = $("[name='usertype']").val();
			var numpayment = $("[name='numpayment']").val();					
			var affiliate = $("[name='affiliate']").val();
		
		if(userRoles == 'affiliate'){
			obj = {
				username:name,familyname:familyname,dob:dob,phone:phone,type:userType,numpayment:numpayment,affiliate:affiliate
			}
		}else if(userRoles == 'agency'){
			obj = {
				username:name,siret_num:siret_num,contact_name:contact_name,phone:phone,address:address,status:status,time:time
			}
		}
			
		var roles = $("[name='permission'] option:selected").val();
		Meteor.call("UpdateUser",id, obj, email, roles, function(res){
			if(!res){
				alert("Update User successfully!!!!!!!");
				Router.go('/cpanel/user');			}
		});
	}
});	
Template.useredit.helpers({
	IstypeAgency:function(type){
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
		    	if(Roles.userIsInRole(Meteor.userId(), ['agency'])||Roles.userIsInRole(Meteor.userId(), ['affiliate'])){
		    		Router.go("/user/profile")
		    	}else { 	
			    	Router.go('/cpanel/dashboad');		 
			    }   	
		    }else{
		    	alert("your email and password Invalid!!!");
		    }
		});
	}
});

Template.userregister.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
    	format:'YYYY/MM/DD'
    });
    this.$('.datetimepicker1').datetimepicker({
    	format:'YYYY'
    });
});

Template.userregister.events({
/*	"focus input":function(e){
		e.preventDefault();
		 $('#registerform').validate();
	},*/
	'click #btnnext':function(e){
		e.preventDefault();
		var username=$("#firstname").val();
		var familyname=$("#familyname").val();
		var dob=$("#dob").val();
		var phone=$("#phone").val();
		var email=$("#email").val();
		var password=$("#pwd").val();
		var role="affiliate";
		var res_affiliate = Router.current().params.id;
		//console.log('res_affiliate== '+res_affiliate);
		var res = Meteor.users.findOne({'_id':res_affiliate});
		console.log('res== '+res);
		if(typeof(res) == 'undefined'){
			//console.log('undefined');
			if(username==''||familyname==''||dob==''||phone==''||email==''||password==''){
				$("#error").html("<div class='alert alert-danger'><strong>Error!</strong>please fill out the form</div>");
			}else{
				$("#registerform").addClass("hidden");
				$("#nextrgister").removeClass("hidden");
			}
		}else{
			console.log('insert');
			res_affiliate = res._id;
			var res_type = res.profile.type;
			var res_numpayment = res.profile.numpayment;
			var res_depaturedate = res.profile.depaturedate;
			//console.log('type== '+res_type+' ==numpayment== '+res_numpayment+' ==depaturedate== '+res_depaturedate);
			var obj={
				username:username,
				familyname:familyname,
				dob:dob,
				phone:phone,
				type:res_type,
				numpayment:res_numpayment,
				affiliate:res_affiliate,
				depaturedate:res_depaturedate
			}
			if(username==''||familyname==''||dob==''||phone==''||email==''||password==''){
				$("#error").html("<div class='alert alert-danger'><strong>Error!</strong>please fill out the form</div>")
			}else{
				Meteor.call("registerUser",email,password,obj,role,function(err,data){
					if(!err){
						Router.go("/login");
					}
				});
			}
		}		
	},
	'click #btnregister':function(e){
		e.preventDefault();
		var username=$("#firstname").val();
		var familyname=$("#familyname").val();
		var dob=$("#dob").val();
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
		Meteor.call("registerUser",email,password,obj,role,function(err,data){
			if(!err){
				var pay_obj = {"status":"new","created_date":Date.now(),"due_date":depaturedate,"amount":"1500000","userid":data,"updated_date":""}
				Meteor.call("InsertPayment",pay_obj,numpayment);
				Meteor.call("findAffiliate",data);
				Router.go("/login");
			}
		});
		

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
		var result = Meteor.users.find({'profile.affiliate':id, 'roles':'affiliate'}).count();
		var tic = ticket.findOne({'customer':id});
		console.log(tic);
		if(result >= 9 && typeof(tic) == 'undefined'){
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
		var status = 'new';
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
	}
});
Template.editprofile.events({
	'click #btneditprofile':function(e){
		e.preventDefault();
		var username=$("#username").val();
		var familyname=$("#familyname").val();
		var dob=$("#dob").val();
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