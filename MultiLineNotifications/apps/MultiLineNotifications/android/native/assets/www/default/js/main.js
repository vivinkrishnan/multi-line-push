
/* JavaScript content from js/main.js in folder common */
function wlCommonInit() {
	WL.Client.connect({onSuccess: connectSuccess, onFailure: connectFailure});
}

function connectSuccess() {
	WL.Logger.debug ("Successfully connected to MobileFirst Server.");
}

function connectFailure() {
	WL.Logger.debug ("Failed connecting to MobileFirst Server.");
	WL.SimpleDialog.show("Push Notifications", "Failed connecting to MobileFirst Server. Try again later.", 
			[{
				text : 'Reload',
				handler : WL.Client.reloadapp
			},
			{
				text: 'Close',
				handler : function() {}
			}]
		);
}

//---------------------------- Check if push support is available ----------------------
function isPushSupported() {
	var isSupported = false;
	if (WL.Client.Push){
		isSupported = WL.Client.Push.isPushSupported();
	}	
	WL.SimpleDialog.show("Tag Notifications", JSON.stringify(isSupported), [ {
	    text : 'Close',
	    handler : function() {}
	  }
	  ]);
}

//---------------------------- Set up push notifications -------------------------------
if (WL.Client.Push) {	
	WL.Client.Push.onReadyToSubscribe = function() {
		WL.SimpleDialog.show("Tag Notifications", "Ready to subscribe", [ {
		    text : 'Close',
		    handler : function() {}
		  }
		  ]);
		
		$('.subscribeToTagButton').removeAttr('disabled');
		$('.unsubscribeFromTagButton').removeAttr('disabled');
	};
}

// --------------------------------- Subscribe to tag ----------------------------------
function subscribeToSampleTag1() {
	WL.Client.Push.subscribeTag("sample-tag1", {
		onSuccess: subscribeTagSuccess,
		onFailure: subscribeTagFailure
	});
}

function subscribeToSampleTag2() {
	WL.Client.Push.subscribeTag("sample-tag2", {
		onSuccess: subscribeTagSuccess,
		onFailure: subscribeTagFailure
	});
}

function subscribeTagSuccess() {
	WL.SimpleDialog.show("Tag Notifications", "Subscribed to tag", [ {
	    text : 'Close',
	    handler : function() {}
	  }
	  ]);
}

function subscribeTagFailure() {
	WL.SimpleDialog.show("Tag Notifications", "Failed subscribing to tag", [ {
	    text : 'Close',
	    handler : function() {}
	  }
	  ]);
}

// ------------------------------- Check if subscribed ---------------------------------
function isSubscribedToTags() {
	var subscribedTagsSample1 = WL.Client.Push.isTagSubscribed("sample-tag1");
	var subscribedTagsSample2 = WL.Client.Push.isTagSubscribed("sample-tag2");
	
	WL.SimpleDialog.show("Tag Notifications", 'sample-tag1: ' + subscribedTagsSample1 + '\n' + 'sample-tag2: ' + subscribedTagsSample2, [ {
	    text : 'Close',
	    handler : function() {}
	  }
	  ]);
}

// ------------------------------- Unsubscribe from tag --------------------------------
function unsubscribeFromSampleTag1() {
	WL.Client.Push.unsubscribeTag("sample-tag1", {
		onSuccess: unsubscribeTagSuccess,
		onFailure: unsubscribeTagFailure
	});
}

function unsubscribeFromSampleTag2() {
	WL.Client.Push.unsubscribeTag("sample-tag2", {
		onSuccess: unsubscribeTagSuccess,
		onFailure: unsubscribeTagFailure
	});
}

function unsubscribeTagSuccess(response) {
	WL.SimpleDialog.show("Tag Notifications", "Unsubscribe from tag", [ {
	    text : 'Close',
	    handler : function() {}
	  }
	  ]);
}

function unsubscribeTagFailure(response) {
	WL.SimpleDialog.show("Tag Notifications", "Failed subscribing from tag", [ {
	    text : 'Close',
	    handler : function() {}
	  }
	  ]);
}

//------------------------------- Handle received notification ---------------------------------------
WL.Client.Push.onMessage = function (props, payload) {
	WL.SimpleDialog.show("Tag Notifications", "Provider notification data: " + JSON.stringify(props), [ {
	    text : 'Close',
	    handler : function() {
	    	WL.SimpleDialog.show("Tag Notifications", "Application notification data: " + JSON.stringify(payload), [ {
	    	    text : 'Close',
	    	    handler : function() {}
	    	  }]);    	
	    }
	}]);
};

/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}