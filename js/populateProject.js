$(document).ready(function(){
	var viewIndex = 0;
	var projectIndex = 0;
	
	DisplayView(viewIndex);
})

function DisplayView(_viewIndex)
{
	var mainChildren = $("#main").children();
	
	mainChildren.each(function(i) { 
		$(this).hide();
	});
	
	mainChildren.eq(_viewIndex).show();
	
	console.log("HIT");
}