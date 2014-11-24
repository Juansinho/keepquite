javascript:(function (){
    var jca_title = '★LOC@S★ - AutoHitlist v0.2';
 html = '<ul style="margin: 0;padding: 0;width: 650px;">';
var auha_values_arr;
var auha_values;
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
	auha_values = data.get('auha');

	if (auha_values){
	   auha_values_arr = auha_values.split(',');  
	}
	else{
		 auha_values_arr  = new Array(0,0);  
	}
	//alert(auha_values_arr);
	var fc2_globalCounter = 0;

	var menu_html='★LOC@S★ - AutoHitlist v0.1 (Beta)<br><br>'
	+'<table><tr><th>Player IDs (p|xxxxx) one line per ID</th><td><textarea id="auha_id_list">'+auha_values_arr[0]+'</textarea></td></tr>'
	//+'<tr><th>Bounty</th><td><input type="text" id="auha_ammount" value="'+auha_values_arr[1]+'"></td></tr>'
	+'<tr><th>Restart every (minutes)</th><td><input type="text" id="auha_restart" value="'+auha_values_arr[1]+'"></td></tr></table>'
	document.getElementById('juansinho_main').innerHTML=menu_html;
	myLogger('Autostart in 5 seconds.');
	my_timeout = window.setTimeout(StartClicking,5000);
}
function handleSuccess(msg) {
var link=$(msg).find('a:contains("Hitlist")').attr('href');   
				if (link) {
					link=link.replace(preurl,'');
					request(link,function(msg){
						var the_form = $(msg+ ' #createhit');
						if (msg.indexOf('to the hitlist because he is already dead or too weak!') != -1){
						  var the_body = $(msg).find('.message_body')[0];
						  myLogger('Error adding to the hitlist! '+$(the_body).text());
						}
						else{
							//var the_form = $(msg+ ' #createhit');//.getElementById('createhit');
							the_form.submit();
							var the_body = $(msg).find('.message_body')[0];
							myLogger('Should be on hitlist now.' +$(the_body).text());
						}
						   

						});
				}				
}
function my_withdraw(msg, city) {
		request("html_server.php?xw_controller=bank&xw_action=withdraw&xw_city=1&xw_person="+User.id.substr(2)+"&amount="+msg+"&city="+city);
		request("html_server.php?xw_controller=hospital&xw_action=heal&xw_city=1&xcity=1");
		request("html_server.php?xw_controller=travel&xw_action=travel&destination=1&from=index&zone=1");
};

function handleError(){myLogger("Something went wrong");}	
function StartClicking(){
  clearTimeout(my_timeout);
  if ($('#auha_id_list').val() == ''){
     alert('Please set a target.');
	 return;
  }
  var the_ids = $('#auha_id_list').val().split("\n");
  /*
  if ($('#auha_ammount').val() == ''){
     alert('Please set a bounty.');
	 return;
  } 
	*/  
  tmp = new Array($('#auha_id_list').val(),$('#auha_restart').val());    
  auha_values_arr = tmp;
  data.set('auha',tmp.join(','));
  myLogger('Settings saved.');
  $('#auha_id_list').val(tmp[0]);
  $('#auha_restart').val(tmp[1]);
  var url = '';
  for(var i = 0;i<the_ids.length;i++){
	my_withdraw('100000', 'new_york'); 		
	url ='html_server.php?xw_controller=stats&xw_action=view&xw_city=1&xw_person='+User.id.substr(2)+'&mwcom=1&user='+escape(btoa(the_ids[i]));    
	request(url,handleSuccess,handleError);	 
	myLogger('Took 100k from bank, healed, travelled to NY and tried to hitlist: '+the_ids[i]);
  }
   if ($('#auha_restart').val() != ""){
	var wait = parseInt($('#auha_restart').val())*1000*60;
	my_timeout = window.setTimeout(StartClicking,wait);
	myLogger('Restarting in '+$('#auha_restart').val()+' minutes');
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
				log_txt = '['+hours+':'+minutes+':'+seconds+']:' +log_txt;
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
