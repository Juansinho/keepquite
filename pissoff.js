javascript:(function (){
    var jca_title = '★LOC@S★ - PissHimOff v0.2';
 html = '<ul style="margin: 0;padding: 0;width: 650px;">';
var pissoff_values_arr;
var pissoff_values;
var my_timeout;	 
var logs = [];
var data = {
  set: function(key, value) {
    if (!key || !value) {return;}

    if (typeof value == "object") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },
  get: function(key) {
    var value = localStorage.getItem(key);

    if (!value) {return;}

    // assume it is an object that has been stringified
    if (value[0] == "{") {
      value = JSON.parse(value);
    }

    return value;
  }
}   


var the_div = document.getElementById('quest');
  if (document.getElementById('juansinho_main') == undefined){
	  var the_area=document.createElement("div");
	  var the_area_log=document.createElement("div");
		var the_kick_button=document.createElement("a");		
		the_kick_button.className= 'sexy_button_new red short';
		the_kick_button.style.marginLeft='10px';
		the_kick_button.id='juansinho_close_btn';
		the_kick_button.innerHTML = '<span><span>Close</span></span>';
		the_kick_button.href='#';	
		
		var the_start_button=document.createElement("a");		
		the_start_button.className= 'sexy_button_new green short';
		the_start_button.style.marginLeft='10px';
		the_start_button.id='juansinho_start_btn';
		the_start_button.innerHTML = '<span><span>Start</span></span>';
		the_start_button.href='#';			
		
		the_area.id='juansinho_main';	   		
		the_area_log.id='juansinho_log';	   		
		the_area.style.paddingLeft='10px';
		the_area_log.style.paddingLeft='10px';
	   $(the_area).insertAfter(the_div);	   
	   $(the_kick_button).insertAfter(the_area);
	   $(the_start_button).insertAfter(the_area);
	   $(the_area_log).insertAfter(the_area);
	   $('#juansinho_close_btn').click(function(){$('#juansinho_log').remove();$('#juansinho_main').remove();$('#juansinho_start_btn').remove();$('#juansinho_close_btn').remove();clearTimeout(my_timeout);return false;});
	   
	    $('#juansinho_start_btn').click(function(){StartClicking();});
	    getValuesAndCreateMenu();
   }
   else{
	document.getElementById('juansinho_main').innerHTML="";
   }   

function getValuesAndCreateMenu(){
	pissoff_values = data.get('pissoff');

	if (pissoff_values){
	   pissoff_values_arr = pissoff_values.split(',');  
	}
	else{
		 pissoff_values_arr  = new Array(0,0);  
	}
	//alert(pissoff_values_arr);
	var fc2_globalCounter = 0;

	var menu_html=jca_title+'<br><br>'
	+'<table><tr><th>Player IDs (p|xxxxx) one line per ID</th><td><textarea id="pissoff_id_list">'+pissoff_values_arr[0]+'</textarea></td></tr>'
	//+'<tr><th>Bounty</th><td><input type="text" id="pissoff_ammount" value="'+pissoff_values_arr[1]+'"></td></tr>'
	+'<tr><th>Restart every (minutes)</th><td><input type="text" id="pissoff_restart" value="'+pissoff_values_arr[1]+'"></td></tr></table>'
	document.getElementById('juansinho_main').innerHTML=menu_html;
	myLogger('Autostart in 5 seconds.');
	my_timeout = window.setTimeout(StartClicking,5000);
}
function handleSuccess(msg) {

}
function handleError(){myLogger("Something went wrong");}	
function StartClicking(){
  clearTimeout(my_timeout);
  if ($('#pissoff_id_list').val() == ''){
     alert('Please set a target.');
	 return;
  }
  var the_ids = $('#pissoff_id_list').val().split("\n");
  tmp = new Array($('#pissoff_id_list').val(),$('#pissoff_restart').val());    
  pissoff_values_arr = tmp;
  data.set('pissoff',tmp.join(','));
  myLogger('Settings saved.');
  $('#pissoff_id_list').val(tmp[0]);
  $('#pissoff_restart').val(tmp[1]);
  var url = '';
  for(var i = 0;i<the_ids.length;i++){
  
	//url ='html_server.php?xw_controller=stats&xw_action=view&xw_city=1&xw_person='+User.id.substr(2)+'&mwcom=1&user='+escape(btoa(the_ids[i]));    
	var the_id = the_ids[i];
	request('html_server.php?xw_controller=stats&xw_action=view&user='+btoa(the_ids[i])+'&fromfeed=1&install_source=feed',
	function(msg){
		var text = $(msg).find('.message_body:first').text();	
		if(/You do not have any of the items/.test(text)){
			myLogger(the_id+" Added");
		}
		if(/This mafia member was not found/.test(text)){	
		myLogger(the_id+" not found");
		}	
		if($(msg).find('a:contains("Remove from Mafia")').length > 0){
		myLogger(the_id+" was already in mafia");
		}
	},handleError);	 

  }
   if ($('#pissoff_restart').val() != ""){
	var wait = parseInt($('#pissoff_restart').val())*1000*60;
	my_timeout = window.setTimeout(StartClicking,wait);
	myLogger('Restarting in '+$('#pissoff_restart').val()+' minutes');
   }
}

function myLogger(log_txt){
	var CurrentDate=new Date();
	var hours=CurrentDate.getHours();
	var minutes=CurrentDate.getMinutes();
	var seconds=CurrentDate.getSeconds();
	if (minutes <=9){
	  minutes ='0'+minutes;
	}	
	if (seconds <=9){
	  seconds ='0'+seconds;
	}
			var limit = 50;
			if (log_txt != ''){
				log_txt = '['+hours+':'+minutes+':'+seconds+']: ' +log_txt;
			}
			logs.unshift(log_txt);
			if (limit > 0) {
				if (logs.length>limit) {
					message=logs.pop();
				}
			}
			//$('#'+spocklet+'_log').html(logs.concat(extralog,'').join('<br />'));	
	
	var log_area = document.getElementById('juansinho_log');
	log_area.innerHTML=logs.join('<br />');
}

  //Thanks to the Spockholmteam for this	
	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}  
  
var userid =/sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];	
//var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/';
var preurl = MW_BASE_URL+'/remote/';
function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10))
	}   
  
function request(url, handler, errorhandler) {
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+userid+unix_timestamp();
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+unix_timestamp();
		}
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': userid,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: handler,
			error: errorhandler
		});
}
  
  

return;
}())
