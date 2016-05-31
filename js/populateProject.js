$(document).ready(function(){
	// Initialise nav-buttons with button callbacks
	$(".nav-button").on("click", function() {
		OnNavButtonClicked($(this));
    });
	
	// Initialise project-nav-buttons with button callbacks
	$(".project-nav-button").on("click", function() {
		OnProjectNavButtonClicked($(this));
    });
	
	ViewState.MainViews().each(function(i) { 
		$(this).hide();
	});
	DisplayView(0);

	$.ajax({
		url: "data/project_data.json",
		contentType: "application/json;",
		dataType: "json",
		success: function(json) {
			Data.SetProjectData(json);
			console.log(json);
			PopulateProjectView();
			PopulateProjectNav();
		}
	});
})

var Data = (function(){
	var projectData;
	
	var data = {};	// Public object - returned at end of module
	
	data.SetProjectData = function(_projectData){
		projectData = _projectData;
	}
	
	data.GetProjectData = function(){
		return projectData;
	}
	
	return data;	// Expose externally
}());

var ViewState = (function(){
	var viewIndex = 0;		// The active view inside the main content e.g. HOME, PROJECTS
	var typeIndex = 0;		// The category of project being viewed e.g. industry, personal, academic
	var projectIndex = 0;	// The index of the current project being viewed
	var $mainViews;

	var view = {}; 			// Public object - returned at end of module

	view.SetView = function (_viewIndex) {
		viewIndex = _viewIndex;
	};

	view.GetView = function() {
		return viewIndex;
	}
	
	view.SetType = function (_typeIndex) {
		typeIndex = _typeIndex;
	};

	view.GetType = function() {
		return typeIndex;
	}
	
	view.SetProject = function (_projectIndex) {
		projectIndex = _projectIndex;
	};

	view.GetProject = function() {
		return projectIndex;
	}
	
	view.MainViews = function() {
		if($mainViews == undefined)
		{
			$mainViews = $("#main").children();
		}
		return $mainViews;
	}
	
	return view; 	// Expose externally
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

function PopulateProjectView()
{
	var typeIndex = ViewState.GetType();
	var projectIndex = ViewState.GetProject();
	var projectData = Data.GetProjectData().projects[typeIndex][projectIndex];
	
	$(".project-image").attr("src", projectData.ImageSource);
	$(".project-title").append(projectData.Title);
	$(".project-year").append(projectData.Year);
	$(".project-environment").append(projectData.Environment);
	$(".project-languages").append(projectData.Languages);
	
	for(var i = 0; i < projectData.Overview.length; ++i)
	{
		$(".project-body").append("<p></p>");
		// Retrieve last element child
		$(".project-body p").last().append(projectData.Overview[i]);
	}
}

function PopulateProjectNav()
{
	var typeIndex = ViewState.GetType();
	var projectIndex = ViewState.GetProject();
	var typeData = Data.GetProjectData().projects[typeIndex];
	
	for(var i = 0; i < typeData.length; ++i)
	{
		$("<button>&#9898</button>").insertAfter(".project-side-nav-left-button").addClass("project-nav-button");
	}
	
	// Set first project-nav-button as active
	$(".project-nav").children().eq(1).addClass("active-nav");
}

Set

function OnNavButtonClicked($_obj)
{
	var objIndex = $_obj.index();
	var viewIndex = ViewState.GetView();
	
	// Check user is not already in current nav
	if(viewIndex != objIndex)
	{
		// Fade out previous view
		ViewState.MainViews().eq(viewIndex).fadeTo(400, 0.0, function() {
			// Hide previous view (Prevent div space consumption)
			ViewState.MainViews().eq(viewIndex).hide();
			// Fade in current view
			DisplayView(objIndex);
		});
		
		// Remove active nav class from previous
		$(".nav").children().eq(viewIndex).removeClass("active-nav");
		// Add active nav class to current
		$_obj.addClass("active-nav");
		
		ViewState.SetView(objIndex);
		ViewState.SetProject(0);
	}
}

function OnProjectNavButtonClicked($_obj)
{
	var objIndex = $_obj.index();
	var projectIndex = ViewState.GetProject();
	
	// Check user is not already in current nav
	if(projectIndex != objIndex)
	{
		// Fade out previous view
		$(".project-content").fadeTo(400, 0.0, function() {
			$(".project-content").fadeTo(400, 1.0);
		});
		
		// Remove active nav class from previous
		$(".project-nav").children().eq(projectIndex).removeClass("active-nav");
		// Add active nav class to current
		$_obj.addClass("active-nav");
		
		ViewState.SetProject(objIndex);
	}
}

function OnProjectSideNavButtonClicked($_obj)
{
	
}