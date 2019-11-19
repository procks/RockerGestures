var LMB = 1, RMB = 3, UNKNOWN = 10, DOWN = 11, UP = 12, NO_ACTION = 20, ACTION_BACK = 21, ACTION_FORWARD = 22;

var buttonStates = [UNKNOWN, UNKNOWN, UNKNOWN, UNKNOWN];
var triggeredAction = NO_ACTION;
var contextMenuSuppressionRequired = true;

function triggerAction(action) {
	triggeredAction = action;
	contextMenuSuppressionRequired = true;
}

function performActionIfReady() {
	//console.log('performActionIfReady');
	if (triggeredAction == NO_ACTION) return;
//	if (contextMenuSuppressionRequired) return;
//	if (buttonStates[LMB] != UP) return;
//	if (buttonStates[RMB] != UP) return;

	if (triggeredAction == ACTION_FORWARD) {
	    //console.log('history.forward');
		history.forward();
	} else if (triggeredAction == ACTION_BACK) {
	    //console.log('history.back');
		history.back();
	}
}
	
window.addEventListener('mousemove', function(e) {
	if (event.which != 0) {
		//console.log('mousemove');
		var mouseButton = event.which;
		buttonStates[mouseButton] = DOWN;
	}
}, true);

window.addEventListener("mousedown", function(e) {
    contextMenuSuppressionRequired = false;
	//console.log('mousedown');
	var mouseButton = event.which;
	
	buttonStates[mouseButton] = DOWN;
	
	if (mouseButton == LMB && buttonStates[RMB] == DOWN) {
		triggerAction(ACTION_BACK);
	    performActionIfReady();
	} else if (mouseButton == RMB && buttonStates[LMB] == DOWN) {
		triggerAction(ACTION_FORWARD);
	    performActionIfReady();
	}
}, true);

window.addEventListener("mouseup", function(e) {
	//console.log('mouseup');
	/*if (buttonStates[event.which] != DOWN) {
		if (event.which == LMB) {
			buttonStates[RMB] = DOWN;
		}
		if (event.which == RMB) {
			buttonStates[LMB] = DOWN;
		}
	}*/
	buttonStates[event.which] = UP;
//	performActionIfReady();
}, true);

window.addEventListener ("contextmenu", function(e) {
	if (contextMenuSuppressionRequired) {
		contextMenuSuppressionRequired = false;
		e.preventDefault();
		e.stopPropagation();
		//performActionIfReady();
	}
}, true);