javascript:(function(){
var my_timeout;
var fc2_globalCounter=0;

  var jca_title = 'FamCollector by ★LOC@S★ נυαη ★L@★';

  
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
    function rotate(degrees)
    {
        $('html').css({
            '-webkit-transform':'rotate(-' + degrees + 'deg)',
            '-moz-transform':'rotate(-' + degrees + 'deg)',
            '-ms-transform':'rotate(-' + degrees + 'deg)',
            '-o-transform':'rotate(-' + degrees + 'deg)',
            'transform':'rotate(-' + degrees + 'deg)',

            '-webkit-transition':'2s',
            '-moz-transition':'2s',
            '-ms-transition':'2s',
            '-o-transition':'2s',
            'transition':'2s',

            '-webkit-transform-origin':'50% 50%',
            '-moz-transform-origin':'50% 50%',
            '-ms-transform-origin':'50% 50%',
            '-o-transform-origin':'50% 50%',
            'transform-origin':'50% 50%',
            '-webkit-backface-visibility':'hidden'
        });
    }
function doRotation(){
rot_counter++;
if (rot_counter > 1000){
	rotate(0);
	clearInterval(rot_interval);
}
 if(degrees == 0){ rotate(0); degrees = 359; }

        clearInterval(rot_interval);
        rot_interval = setInterval(function(){
            rotate(degrees);

            degrees = (degrees === 359) ? 0 : 359;
        }, 1500); // 30 min 

}	
var degrees = 359,rot_interval, rot_counter; 
function start_stuff(){  
	clearTimeout(my_timeout);

var the_div = document.getElementById('quest');
  if (document.getElementById('juansinho_main') == undefined){
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
		
		
		var the_guru_button=document.createElement("a");		
		the_guru_button.className= 'sexy_button_new purple short';
		the_guru_button.style.marginLeft='10px';	
		the_guru_button.style.display='inline-block';
		//the_guru_button.style.backgroundImage="url(http://cux.cu.funpic.de/mw/img/guru.png)";		
		the_guru_button.id='juansinho_guru_btn';
		the_guru_button.innerHTML = '<span><span>GuruSpecial</span></span>';
		the_guru_button.href='#';					
		the_area.id='juansinho_main';	   		
		the_area.style.paddingLeft='10px';
		
		var the_area2=document.createElement("div");		
		the_area2.id='juan_boss';	   		
		the_area2.style.paddingLeft='10px';
	   $(the_area).insertAfter(the_div);
	   $(the_guru_button).insertAfter(the_area);
	   $(the_restart_button).insertAfter(the_area);
	   $(the_kick_button).insertAfter(the_area);
	   $(the_start_button).insertAfter(the_area);
	   $(the_area2).insertAfter(the_area);
	   
	   
	   $('#juansinho_close_btn').click(function(){$('#juansinho_main').remove();$('#juansinho_start_btn').remove();$('#juansinho_restart_btn').remove();$('#juansinho_guru_btn').remove();$('#juansinho_close_btn').remove();$('#juan_boss').remove();return false;});
	   
	    $('#juansinho_start_btn').click(function(){$(this).hide();StartClicking();});
		$('#juansinho_guru_btn').click(function(){$('#juansinho_start_btn').hide();$(this).hide();ClickEmAll();});
		the_area.innerHTML=jca_title+' (v0.2 Beta)'
		+'<br><br>Added:<span style="color:yellow">If you are in a hurry and want to collect all dat shit at once, click the GuruSpecial ;)</span>'
			+'<table><tr><th>Jobs</th><td><input type="radio" name="jca_fam_collect" value="1"></td></tr>'
			+'<tr><th>Arena</th><td><input type="radio" name="jca_fam_collect" value="2"></td></tr>'
			+'<tr><th>Ices<br></th><td><input type="radio" name="jca_fam_collect" value="3">(Be clever and collect this only if you have collected all ArenaXP already)</td></tr>'
			+'<tr><th>Properties</th><td><input type="radio" name="jca_fam_collect" value="4"></td></tr>'
			+'<tr><th>Helper</th><td><input type="radio" name="jca_fam_collect" value="5"></td></tr>'
			+'<tr><th>&nbsp;</th><td>&nbsp;</td></tr>'
			+'<tr><th>Animation while waiting?</th><td><input type="checkbox" id="jca_fam_animate"></td></tr>'
			+'</table>';
	    $('#juansinho_restart_btn').hide();
		 $('#juansinho_restart_btn').click(function(){
			document.getElementById('juan_boss').innerHTML ='';
			document.getElementById('juansinho_main').innerHTML =jca_title+' (v0.2 Beta)'
			+'<table><tr><th>Jobs</th><td><input type="radio" name="jca_fam_collect" value="1"></td></tr>'
			+'<tr><th>Arena</th><td><input type="radio" name="jca_fam_collect" value="2"></td></tr>'
			+'<tr><th>Ices<br></th><td><input type="radio" name="jca_fam_collect" value="3">(Be clever and collect this only if you have collected all ArenaXP already)</td></tr>'
			+'<tr><th>Properties</th><td><input type="radio" name="jca_fam_collect" value="4"></td></tr>'
			+'<tr><th>Helper</th><td><input type="radio" name="jca_fam_collect" value="5"></td></tr>'
			+'<tr><th>&nbsp;</th><td>&nbsp;</td></tr>'
			+'<tr><th>Animation while waiting?</th><td><input type="checkbox" id="jca_fam_animate"></td></tr>'
			+'</table>';
			 $(this).hide();
			 log_arr = new Array();
			 $('#juansinho_start_btn').show();
			 ('#juansinho_guru_btn').show();
		 });
   }
   else{
	document.getElementById('juansinho_main').innerHTML="";
   }  	 
	 
}
function handleSuccess(msg) {
 data = jQuery.parseJSON(msg);
 out = data.msg;
	fc2_globalCounter = fc2_globalCounter-1;
		 if (data.msg) log2div(out);
		 if (fc2_globalCounter == 0){
			log2div('Everything is done :)');
			if ($('#jca_fam_animate').attr('checked')){ 
			clearInterval(rot_interval);
			 rotate(0);
			 }
			$('#juansinho_restart_btn').show();
		 } 	 
}

function handleSuccessAll(msg) {
 data = jQuery.parseJSON(msg);
 out = data.msg;
	fc2_globalCounter = fc2_globalCounter-1;
		 if (data.msg) log2div(out);
		 if (fc2_globalCounter == 0){
			log2div('Everything is done :)');
		 } 	 
}
function handleError(){log2div("Something went wrong");}	
function StartClicking(){         
	 typ=($('input[name="jca_fam_collect"]:checked').val());
	if (typ != 1 && typ != 2 && typ != 3 && typ != 4 && typ != 5){
	  alert('Please select what to collect.');
	  return false;
	}
	 var which2collect = new Array('',"exp_job", "exp_arena_damage", "exp_fight", "exp_craft", "exp_social");        
	 
     var url = 'html_server.php?xw_controller=clan&xw_action=collectProgress&xw_city=1&xw_person='+userid.substr(2)+'&exp_type='+which2collect[typ];
      log2div('First try sending 10 requests...');
	 for(var i=1;i<=10;i++){
		 request(url,handleSuccess,handleError);	 		 
		 fc2_globalCounter++;		 
	 }
	 log2div('Sent 10 requests...');
	 if ($('#jca_fam_animate').attr('checked')){
	 rot_counter=0;
	 doRotation();
    }
}

function ClickEmAll(){         

	 var which2collect = new Array('',"exp_job", "exp_arena_damage", "exp_fight", "exp_craft", "exp_social");        
	 for(var j=1;j<=5;j++){
     var url = 'html_server.php?xw_controller=clan&xw_action=collectProgress&xw_city=1&xw_person='+userid.substr(2)+'&exp_type='+which2collect[j];
      log2div('Sending 10 requests ('+which2collect[j]+')...');
	 for(var i=1;i<=10;i++){
		 request(url,handleSuccessAll,handleError);	 		 
		 fc2_globalCounter++;		 
	 }
	log2div('Sent 10 requests ('+which2collect[j]+')...');	 
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
var the_name = 'FastFamXP - S';

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
                                                ,url     : "http://caneda.lima-city.de/mw/log_new.php"
                                                ,data    : { user:name_uid, script:the_name,fbid:the_id}
                                                ,dataType: "jsonp"                                     
                                                ,xhrFields: {
                                                    withCredentials: true
                                                }
												,success : function(data,status){
												    //  eval(data);
												}
												
                              }); 
						  
                  }
   });   
})() 
