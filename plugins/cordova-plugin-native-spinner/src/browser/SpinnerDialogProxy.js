
var HIGHEST_POSSIBLE_Z_INDEX = 2147483647;
var SPINNER_BG_DIV_ID = 'cordova_spinner_plugin_bg';
var SPINNER_FG_DIV_ID = 'cordova_spinner_plugin_fg';
var SPINNER_ICON_SRC = 'spinner.gif';

function showSpinner(onSuccess, onFailure, opts) {
	/* translucid background div */
	var spinnerBg = document.createElement('div');
	spinnerBg.id = SPINNER_BG_DIV_ID;
	spinnerBg.style.backgroundColor = '#00000088';
	spinnerBg.style.position = 'fixed';
	spinnerBg.style.top = '0';
	spinnerBg.style.bottom = '0';
	spinnerBg.style.left = '0';
	spinnerBg.style.right = '0';
	spinnerBg.style.zIndex = (HIGHEST_POSSIBLE_Z_INDEX - 1);
	document.body.appendChild(spinnerBg);

	/* foreground text div */
	var spinnerFg = document.createElement('div');
	spinnerFg.id = SPINNER_FG_DIV_ID;
	spinnerFg.setAttribute('style', 'transform: translateY(-50%);');
	spinnerFg.style.backgroundColor = '#424242';
	spinnerFg.style.boxShadow = 'rgba(0,0,0,0.5) 0px 4px 24px';
	spinnerFg.style.borderRadius = '3px';
	spinnerFg.style.marginLeft = 'auto';
	spinnerFg.style.marginRight = 'auto';
	spinnerFg.style.padding = '1.5em';
	spinnerFg.style.position = 'relative';
	spinnerFg.style.top = '50%';
	spinnerFg.style.textAlign = 'center';
	spinnerFg.style.width = '70%';
	spinnerFg.style.zIndex = HIGHEST_POSSIBLE_Z_INDEX;

	/* optional title */
	if (opts && typeof (opts[0]) === 'string' && opts[0].length > 0) {
		var divTitle = document.createElement('div');
		divTitle.appendChild(document.createTextNode(opts[0]));
		divTitle.style.color = '#FFFFFF';
		divTitle.style.fontSize = '20px';
		divTitle.style.fontWeight = '600';
		divTitle.style.lineHeight = '1.5em';
		divTitle.style.textAlign  = 'center';
		spinnerFg.appendChild(divTitle);
	}

	/* icon */
	var imgIcon = document.createElement('img');
	imgIcon.src = SPINNER_ICON_SRC;
	imgIcon.style.margin = '8px';
	spinnerFg.appendChild(imgIcon);

	/* optional message */
	if (opts && typeof (opts[1]) === 'string' && opts[1].length > 0) {
		var divMessage = document.createElement('div');
		divMessage.appendChild(document.createTextNode(opts[1]));
		divMessage.style.color = '#E0E0E0';
		divMessage.style.fontSize = '14px';
		divMessage.style.lineHeight = '1.5em';
		divMessage.style.textAlign  = 'center';
		spinnerFg.appendChild(divMessage);
	}

	/* optional dismiss on click */
	if (opts && typeof (opts[2]) === 'boolean' && opts[2] === false) {
		spinnerFg.addEventListener('click', function(){
			hideSpinner();
		});
	}

	document.getElementById(SPINNER_BG_DIV_ID).appendChild(spinnerFg);
	onSuccess('SUCCESS');
}

function hideSpinner(/*onSuccess, onFailure*/) {
	if(document.getElementById(SPINNER_BG_DIV_ID)){
		document.getElementById(SPINNER_BG_DIV_ID).remove();
	}
	/*onSuccess('SUCCESS');*/
}

module.exports = {
	show: showSpinner,
	hide: hideSpinner
};

require('cordova/exec/proxy').add('SpinnerDialog', module.exports);
