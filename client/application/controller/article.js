Template.addarticle.events({
	'click #btn-save':function(e){
		e.preventDefault();
		var inputdate = $('[name="date"]').val();
		var	date = new Date(inputdate).getTime() / 1000;
		var article_id = $('#bodyadd .btn-del');
		var Idarr = [];
		for(var i=0;i<article_id.length;i++){
			var a = article_id[i].getAttribute('data-id');
			Idarr.push({'id':a});		
		}
		var obj = {
			article_id:Idarr,
			date:date
		}
		if(article_id.length == 0){
			alert('Article Id can not empty');
		}else{
			Meteor.call("InsertArticleId",obj,function(error){
				if(!error){
					console.log("InsertArticleId Success");
					Router.go('/cpanel/article');
				}
			});
		}
	},
	'click #btn-id':function(e){
		e.preventDefault();
		var id = $('[name="article-id"]').val();
		var html = '';
		html += '<tr>';
        	html += '<td>'+id+'</td>';
            html += '<td style="width:10%">';
                html += '<a class="btn btn-xs btn-labeled btn-danger btn-del" href="#" data-id="'+id+'">';
                	html += '<span class="btn-label icon fa fa-minus-square"></span>D';
                html += '</a>';
            html += '</td>';
        html += '</tr>';
        if(id == ''){
        	alert('article id can not empty');
        }else{
        	$('#bodyadd').prepend(html);
        	$('[name="article-id"]').val('');
        }
	},
	'click .btn-del':function(e){
		e.preventDefault();
		$(e.currentTarget).parent().parent().remove();
	}
});

Template.article.helpers({
	GetArticle:function(){
		var result = article.find({}).map(function(document, index){
			document.index = index+1;
			return document;
		});
		return result;
	}
});

Template.article.events({
	"click .btn-del": function(e){
		e.preventDefault();
		if(confirm("Are you sure want to delete this???")){
			Meteor.call("RemoveArticleId",this._id);
		}
	},
});

Template.editarticle.events({
	'click #btn-update':function(e){
		e.preventDefault();
		var id = $('[name="id"]').val();
		var inputdate = $('[name="date"]').val();
		var	date = new Date(inputdate).getTime() / 1000;
		var article_id = $('#bodyadd .btn-del');
		var Idarr = [];
		for(var i=0;i<article_id.length;i++){
			var a = article_id[i].getAttribute('data-id');
			Idarr.push({'id':a});		
		}
		var obj = {
			article_id:Idarr,
			date:date
		}
		if(article_id.length == 0){
			alert('Article Id can not empty');
		}else{
			Meteor.call("UpdateArticleId",id, obj, function(error){
				if(!error){
					console.log("UpdateArticleId Success");
					Router.go('/cpanel/article');
				}
			});
		}
	},
	'click #btn-id':function(e){
		e.preventDefault();
		var id = $('[name="article-id"]').val();
		var html = '';
		html += '<tr>';
        	html += '<td>'+id+'</td>';
            html += '<td style="width:10%">';
                html += '<a class="btn btn-xs btn-labeled btn-danger btn-del" href="#" data-id="'+id+'">';
                	html += '<span class="btn-label icon fa fa-minus-square"></span>D';
                html += '</a>';
            html += '</td>';
        html += '</tr>';
        if(id == ''){
        	alert('article id can not empty');
        }else{
        	$('#bodyadd').prepend(html);
        	$('[name="article-id"]').val('');
        }
	},
	'click .btn-del':function(e){
		e.preventDefault();
		$(e.currentTarget).parent().parent().remove();
	}
});