Template.addamount.events({
	'click #btn-save':function(e){
		e.preventDefault();
		var product = $('[name="product"]').val();
		var num = $('[name="num-pay"]').val();
		var amount = $('[name="amount"]').val();
		var html = '';
		if(num == '' || amount == ''){
			html += '<div class="alert alert-danger">';
                html += '<strong>Error!</strong> Please fill out the form.';
            html += '</div>';
            $('#msg-error').html(html);
		}else{
			var obj = {product:product,paynum:parseInt(num),amount:parseInt(amount)}
			Meteor.call('InsertAmount',obj, function(err){
				if(!err){console.log('InsertAmount Successfully');Router.go('/cpanel/amount-payment')}
			});
		}
	},
	'click #add-amount':function(e){
		e.preventDefault();
		var arr = [];
		var product = $('[name="product"]').val();
		var paynum = $('[name="num-pay"]').val();
		var amount = $('[name="num-amount"]').val();
			$('.total-amount').val(amount);
		var subtotal = $('[name="amount"]').val();
		//alert(subtotal);
		//alert(parseInt(amount)+parseInt(subtotal))
			//alert(arr.push(subtotal))
		var html = '';
		html += '<tr class="getmount" data-paynum="'+paynum+'" data-product="'+product+'" data-subamount="'+amount+'">';
            html  += '<td>';
                html += '<a  class="btn btn-xs btn-labeled btn-danger btn-del" href="#"><span class="btn-label icon fa fa-minus-square"></span>D</a>';
            html += '</td>';
            html += '<td>'+paynum+'</td>';
            html += '<td>'+product+'</td>';
            html += '<td>'+paynum+'</td>';
            html += '<td>'+amount+'</td>';
        html += '</tr>'
        $('#data-amount').prepend(html);
	},
	'click .btn-del': function(e,tpl){
		$(e.currentTarget).parent().parent().remove();
	}
});
Template.adminamount.helpers({
	Getamount:function(){
		var result = amount.find({}).map(function(document, index){
			document.index = index+1;
			return document;
		});
		return result;
	}
});
Template.adminamount.events({
	'click .btn-del':function(e){
		e.preventDefault();
		if(confirm('Are you sure want to delete this?')){
			Meteor.call('RemoveAmount',this._id);
		}
	}
});
Template.editamount.events({
	'click #btn-update':function(e){
		e.preventDefault();
		var id = $('[name="amountId"]').val();
		var product = $('[name="product"]').val();
		var num = $('[name="num-pay"]').val();
		var amount = $('[name="amount"]').val();
		var html = '';
		if(num == '' || amount == ''){
			html += '<div class="alert alert-danger">';
                html += '<strong>Error!</strong> Please fill out the form.';
            html += '</div>';
            $('#msg-error').append(html);
		}else{
			var obj = {product:product,paynum:parseInt(num),amount:parseInt(amount)}
			Meteor.call('UpdateAmount', id, obj, function(err){
				if(!err){console.log('UpdateAmount Successfully');Router.go('/cpanel/amount-payment')}
			});
		}
	}
});