Template.inviteuser.helpers({
	GetRoot:function(){
		var roots = window.location.href;
		var fullurl = roots.replace(/(http.*?\/\/.*?\/)(.*)/g,"$1");
		return fullurl;
	},
	GetuserInvite:function(){
		var id = Meteor.userId();
		var result = Meteor.users.find({'profile.affiliate':id}).map(function(document, index){
			document.index = index+1;
			return document;
		});
		return result;
	},
	countinvite:function(){
		var id = Meteor.userId();	
		var num = Meteor.users.find({'profile.affiliate':id}).count();
		var html = '';
		var roots = window.location.href;
		var fullurl = roots.replace(/(http.*?\/\/.*?\/)(.*)/g,"$1");
		var member = Meteor.users.findOne({'_id':id});
		var a = parseInt(member.profile.aff_number);
		console.log(typeof a);
		console.log('MYCOUNT==== '+a);
		var i = 0;
		if(num <= a){
			for(num ; num < a ; num++){
				html += '<tr>';
			        html += '<td><b>link '+(i+1)+' :</b></td>';
			        html += '<td><input type="text" readonly name="link1" class="link-text" value="'+fullurl+'register/affiliate/'+Meteor.userId()+'" style="width: 450px;"></td>';
			        html += '<td><input type="button" value="copy link" id="btn-copy"></td>';
			    html += '</tr>';	i++;		
			}
			return html;
		}else{
			return false;
		}
	},
	getallTicket:function () {
    	var uid=Meteor.userId();
    	var result = ticket.find({'customer':uid}).map(function(document, index){
			document.index = index+1;
			return document;
		});
		return result;
	}
});
Template.inviteuser.events({
	"click #btn-copy":function(e){
		e.preventDefault();
		$('.link-text').select();
		try {
		    var successful = document.execCommand('copy');
		    var msg = successful ? 'successful' : 'unsuccessful';
		    console.log('Copying text command was ' + msg);
		} catch (err) {
		    console.log('Oops, unable to copy');
		}
	}
})