// ==UserScript==
// @name        CheckFRs
// @version     1.00
// @description Add all or Remove all. Your choice :)
// @namespace  ★LOC@S★  נυαη  ★L@★
// @author  ★LOC@S★  נυαη  ★L@★
// @include     http://*.facebook.com/friends/requests*
// @include     https://*.facebook.com/friends/requests*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js
// @run-at document-end
// ==/UserScript==
$.noConflict();
jQuery( document ).ready(function( $ ) {

function AutoAdd(){		
		var count = $('div[class="ruResponse ruResponseSimple"]').length;
		var counter = 0;
		
		if (0 == count){
					myLogger('No requests found. Have a nice day :)');
					
		}
		else{
		   myLogger('Found: '+count+' requests.');
		   $('div[class="ruResponse ruResponseSimple"]').each(
		   function (i,e){
		      var add = $(e).find('button')[0];
			  $(add).click();
			  //$(add).css({ "border": "1px solid red" });
			  myLogger('Click');
			  count--;
			  if (count == 0){
				myLogger('All done. Have a nice day :)');
			  }
		   });
            
		}
}
function AutoClear(){		
		var count = $('div[class="ruResponse ruResponseSimple"]').length;
		var counter = 0;
		
		if (0 == count){
					myLogger('No requests found. Have a nice day :)');
					
		}
		else{
		   myLogger('Found: '+count+' requests.');
		   $('div[class="ruResponse ruResponseSimple"]').each(
		   function (i,e){
		      var add = $(e).find('button')[1];
			  $(add).click();
			  //$(add).css({ "border": "1px solid green" });
			  myLogger('Click');
			  count--;
			  if (count == 0){
				myLogger('All done. Have a nice day :)');
			  }
		   });
            
		}
}
function myLogger(log_txt){
	var CurrentDate=new Date();
	var hours=CurrentDate.getHours();
	var minutes=CurrentDate.getMinutes();
	var seconds=CurrentDate.getSeconds();
	if (minutes <=9){
	   minutes = '0'+minutes;
	}
	if (seconds <=9){
	   seconds = '0'+seconds;
	}
	var log_area = document.getElementById('juansinho_log');
	log_area.innerHTML+='<br>['+hours+':'+minutes+':'+seconds+']: '+log_txt;
}
var button;

 if(!button){
	button = document.createElement("div");
	button.innerHTML = "<center><span id=\"juansinho_toggleArea\" style='margin-bottom: 10px;padding:3px 8px' class='uiButton uiButtonDefault uiButtonMedium'>Accept ALL FRs</span></center>";
	$(button).insertBefore('#content');
	buttoni = document.createElement("div");
	buttoni.innerHTML = "<center><span id=\"juansinho_toggleArea\" style='margin-bottom: 10px;padding:3px 8px' class='uiButton uiButtonDefault uiButtonMedium'>Ignore ALL FRs</span></center>";	
	$(buttoni).insertBefore('#content');	
	button2 =document.createElement("div");
	button2.innerHTML = "<div id='juansinho_log'></div>"
	$(button2).insertAfter('#juansinho_toggleArea');
	$(button).click(function(){AutoAdd();return false;});
	$(buttoni).click(function(){AutoClear();return false;});
	//myLogger('Starting :)');
	//AutoAdd();

	}
});
