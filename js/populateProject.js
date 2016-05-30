$(document).ready(function(){
	ViewState.MainViews().each(function(i) { 
		$(this).hide();
	});
	DisplayView(0);
	
	$(".nav-button").on("click", function() {
		OnNavButtonClicked($(this));
    });
})

var ViewState = (function(){
	var viewIndex = 0;
	var projectIndex = 0;	// Private Variable
	var $mainViews;

	var view = {}; // public object - returned at end of module

	view.SetView = function (_view) {
		viewIndex = _view;
	};

	view.GetView = function() {
		return viewIndex;
	}
	
	view.MainViews = function() {
		if($mainViews == undefined)
		{
			$mainViews = $("#main").children();
		}
		return $mainViews;
	}
	
	return view; // expose externally
}());
	
function ChangeView()
{
	FadeView(ViewState.GetView());
}

function DisplayView(_viewIndex)
{
	ViewState.MainViews().eq(_viewIndex).fadeTo(400, 1.0);
}

function FadeView(_viewIndex)
{
	
}

function OnNavButtonClicked($_obj)
{
	var objIndex = $_obj.index();
	var viewIndex = ViewState.GetView();
	if(viewIndex != objIndex)
	{
		ViewState.MainViews().eq(viewIndex).fadeTo(400, 0.0, function() {
			ViewState.MainViews().eq(viewIndex).hide();
			DisplayView(objIndex);
		});
		ViewState.SetView(objIndex);
	}
}