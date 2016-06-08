$(document).ready(function(){	
	ViewState.MainViews().each(function(i) { 
		$(this).hide();
	});
	DisplayView(0);
	
    /* Preload code goes here */
	$.ajax({
		url: "data/project_data.json",
		contentType: "application/json;",
		dataType: "json",
		success: function(json) {
			Data.SetProjectData(json);
			
			/* images is an array with image metadata */
			var imgSrc = [];
			for(var i = 0; i < Data.GetProjectData().projects.length; ++i)
			{
				for(var j = 0; j < Data.GetProjectData().projects[i].length; ++j)
				{
					imgSrc.push(Data.GetProjectData().projects[i][j].ImageSource);
				}
			}
			PreloadImages(imgSrc, 0);
			
			PopulateProjectView();
			PopulateProjectNav();
			
			PopulateNavButtonCallbacks();
			PopulateTypeNavButtonCallbacks();
			PopulateProjectNavButtonCallbacks();
			PopulateProjectSideNavButtonCallbacks();
		}
	});
	
	$.ajax({
		url: "data/resume_data.json",
		contentType: "application/json;",
		dataType: "json",
		success: function(json) {
			Data.SetResumeData(json);
			console.log(json);
			
			PopulateResumeView();
		}
	});
})

function PreloadImages(imgSrc, index) {
	index = index || 0;
	if(imgSrc && imgSrc.length > index) 
	{
		var img = new Image ();
		img.onload = function() {
			preload(imgSrc, index + 1);
		}
		img.src = imgSrc[index];
	}
}

var Data = (function(){
	var projectData;
	var resumeData;
	
	var data = {};	// Public object - returned at end of module
	
	data.SetProjectData = function(_projectData){
		projectData = _projectData;
	}
	
	data.GetProjectData = function(){
		return projectData;
	}
	
	data.SetResumeData = function(_resumeData){
		resumeData = _resumeData;
	}
	
	data.GetResumeData = function(){
		return resumeData;
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
	
function DisplayView(_viewIndex)
{
	ViewState.MainViews().eq(_viewIndex).fadeTo(400, 1.0);
}

function PopulateProjectView()
{
	var typeIndex = ViewState.GetType();
	var projectIndex = ViewState.GetProject();
	var projectData = Data.GetProjectData().projects[typeIndex][projectIndex];
	
	$(".project-image").attr("src", projectData.ImageSource);
	
	$(".project-title").empty();
	$(".project-title").append(projectData.Title);
	
	$(".project-company").empty();
	$(".project-company").append(projectData.Company);
	
	$(".project-year").empty();
	$(".project-year").append(projectData.Year);
	
	$(".project-environment").empty();
	$(".project-environment").append(projectData.Environment);
	
	$(".project-languages").empty();
	$(".project-languages").append(projectData.Languages);
	
	
	$(".project-link").empty();
	$(".project-link").attr("href", "");
	if(projectData.Link !== "")
	{
		$(".project-link").append(projectData.Title);
		$(".project-link").attr("href", projectData.Link);
	}
	
	$(".project-summary").empty();
	for(var i = 0; i < projectData.Overview.length; ++i)
	{
		$(".project-summary").append("<p></p>");
		// Retrieve last element child
		$(".project-summary p").last().append(projectData.Overview[i]);
	}
}

function PopulateProjectNav()
{
	var typeIndex = ViewState.GetType();
	var projectIndex = ViewState.GetProject();
	var typeData = Data.GetProjectData().projects[typeIndex];
	
	for(var i = 0; i < typeData.length; ++i)
	{
		$(".project-nav").append("<button>&#9898</button>");
		$(".project-nav").children().last().addClass("project-nav-button");
	}
	
	// Set first project-nav-button as active
	$(".project-nav").children().eq(0).addClass("active-nav");
}

function PopulateResumeView()
{
	var resumeData = Data.GetResumeData();
	
	// Create HTML work entries dynamically
	for(var i = 0; i < resumeData.work_entries.length - 1; ++i)
	{
		$(".work-entry").first().clone().appendTo(".work-entry-wrapper");
	}
	
	for(var i = 0; i < resumeData.work_entries.length; ++i)
	{
		$(".work-entry-wrapper").children().eq(i).find(".work-role").append(resumeData.work_entries[i].Role);
		$(".work-entry-wrapper").children().eq(i).find(".work-company").append(resumeData.work_entries[i].Company);
		$(".work-entry-wrapper").children().eq(i).find(".work-duration").append(resumeData.work_entries[i].Duration);
		$(".work-entry-wrapper").children().eq(i).find(".work-summary").append(resumeData.work_entries[i].Summary);
	}
}

function PopulateNavButtonCallbacks()
{
	// Initialise nav-buttons with button callbacks
	$(".nav-button").on("click", function() {
		OnNavButtonClicked($(this));
	});
	// Set 0th element as active
	$(".type-nav").children().first().addClass("active-nav");
}

function PopulateTypeNavButtonCallbacks()
{
	// Initialise type-nav-buttons with button callbacks
	$(".type-nav-button").on("click", function() {
		OnTypeNavButtonClicked($(this));
	});
}

function PopulateProjectNavButtonCallbacks()
{
	// Initialise project-nav-buttons with button callbacks
	$(".project-nav-button").on("click", function() {
		OnProjectNavButtonClicked($(this));
	});
}

function PopulateProjectSideNavButtonCallbacks()
{
	// Initialise project-side-nav-buttons with button callbacks
	$(".project-side-nav-button").on("click", function() {
		OnProjectSideNavButtonClicked($(this));
	});
}

function OnNavButtonClicked($_button)
{
	var buttonIndex = $_button.index();
	var viewIndex = ViewState.GetView();
	
	// Check user is not already in current nav
	if(viewIndex != buttonIndex)
	{
		// Stop all animations (Currently used to terminate .fadeTo, may affect others)
		ViewState.MainViews().eq(viewIndex).stop();
		
		// Fade out previous view
		ViewState.MainViews().eq(viewIndex).fadeTo(400, 0.0, function() {
			// Hide previous view (Prevent div space consumption)
			ViewState.MainViews().eq(viewIndex).hide();
			// Fade in current view
			DisplayView(buttonIndex);
		});
		
		// Remove active nav class from previous
		$(".nav").children().eq(viewIndex).removeClass("active-nav");
		// Add active nav class to current
		$_button.addClass("active-nav");
		
		ViewState.SetView(buttonIndex);
		ViewState.SetProject(0);
	}
}

function OnTypeNavButtonClicked($_button)
{
	var buttonIndex = $_button.index();
	var typeIndex = ViewState.GetType();
	
	// Check user is not already in current nav
	if(typeIndex != buttonIndex)
	{
		// Stop all animations (Currently used to terminate .fadeTo, may affect others)
		$(".project-body").stop();
		
		// Fade out previous view
		$(".project-body").fadeTo(400, 0.0, function() {
			PopulateProjectView();
			
			// Resize project-nav for differences in length
			$(".project-nav").empty();
			PopulateProjectNav();
			// Repopulate project-nav-button callbacks (lost on removal)
			PopulateProjectNavButtonCallbacks();
		
			$(".project-body").fadeTo(400, 1.0);
		});
		
		// Remove active nav class from previous
		$(".type-nav").children().eq(typeIndex).removeClass("active-nav");
		// Add active nav class to current
		$_button.addClass("active-nav");
		
		ViewState.SetType(buttonIndex);
		ViewState.SetProject(0);
	}
}

function OnProjectNavButtonClicked($_button)
{
	var buttonIndex = $_button.index();
	var projectIndex = ViewState.GetProject();
	
	// Check user is not already in current nav
	if(projectIndex != buttonIndex)
	{
		// Stop all animations (Currently used to terminate .fadeTo, may affect others)
		$(".project-content").stop();
		
		// Fade out previous view
		$(".project-content").fadeTo(400, 0.0, function() {
			PopulateProjectView();
			$(".project-content").fadeTo(400, 1.0);
		});
		
		// Remove active nav class from previous
		$(".project-nav").children().eq(projectIndex).removeClass("active-nav");
		// Add active nav class to current
		$_button.addClass("active-nav");
		
		ViewState.SetProject(buttonIndex);
	}
}

function OnProjectSideNavButtonClicked($_button)
{
	var newProjectIndex = ViewState.GetProject();
	if($_button.hasClass("project-side-nav-right-button"))
	{
		++newProjectIndex;
		if(newProjectIndex >= $(".project-nav").children().length)
		{
			newProjectIndex = 0;
		}
	}
	else
	{
		--newProjectIndex;
		if(newProjectIndex < 0)
		{
			newProjectIndex = $(".project-nav").children().length - 1;
		}
	}
	
	// Simulate "Click" on appropriate project-nav-button
	$(".project-nav").children().eq(newProjectIndex).trigger("click");
}