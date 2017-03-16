Template.addplatform.onRendered(function(){
	this.$('.d-from').datetimepicker({
    	format:'YYYY/MM/DD'
    });
    this.$('.d-to').datetimepicker({
    	format:'YYYY/MM/DD'
    });
});
Template.addplatform.events({
	"click #btn-save":function(e){
		e.preventDefault();
		var desc = $('[name="desc"]').val();
		var d_from = $('[name="d-from"]').val();
			d_from = Math.round(Date.parse(d_from) / 1000);
		var d_to = $('[name="d-to"]').val();
			d_to = Math.round(Date.parse(d_to) / 1000);
		var status = $('[name="status"] option:selected').val();
		var obj = {
			description:desc,
			date_from:d_from,
			date_to:d_to,
			status:status
		}
		var html = '';
		if(desc == '' || d_from == '' || d_to == '' || status == 'none'){
			html += '<div class="alert alert-danger">';
                html += '<strong>All Fields!</strong> can not empty please fill it.';
            html += '</div>';
            $('#msg-error').html(html);
		}else{
			Meteor.call('InsertPlatform', obj, function(err){
				if(!err){
					Router.go('/cpanel/platform');
				}
			});
		}
	}
});
Template.editplatform.onRendered(function(){
	this.$('.d-from').datetimepicker({
    	format:'YYYY/MM/DD'
    });
    this.$('.d-to').datetimepicker({
    	format:'YYYY/MM/DD'
    });
});
Template.editplatform.events({
	"click #btn-update":function(e){
		e.preventDefault();
		var id = $('[name="pId"]').val();
		var desc = $('[name="desc"]').val();
		var d_from = $('[name="d-from"]').val();
			d_from = Math.round(Date.parse(d_from) / 1000);
		var d_to = $('[name="d-to"]').val();
			d_to = Math.round(Date.parse(d_to) / 1000);
		var status = $('[name="status"] option:selected').val();
		var obj = {
			description:desc,
			date_from:d_from,
			date_to:d_to,
			status:status
		}
		var html = '';
		if(desc == '' || d_from == '' || d_to == '' || status == 'none'){
			html += '<div class="alert alert-danger">';
                html += '<strong>All Fields!</strong> can not empty please fill it.';
            html += '</div>';
            $('#msg-error').html(html);
		}else{
			Meteor.call('UpdatePlatform', id, obj, function(err){
				if(!err){
					Router.go('/cpanel/platform');
				}
			});
		}
	}
});
Template.platform.helpers({
	GetAllPlatform:function(){
		return platform.find();
	},
	IsActive:function(status){
		if(status == 'active'){
			return true;
		}
	},
	IsPandding:function(status){
		if(status == 'pandding'){
			return true;
		}
	}
});
Template.platform.events({
	"click .btn-del":function(){
		if(confirm('Are you sure want to delete this?')){
			Meteor.call('RemovePlatform', this._id);
		}
	}
});