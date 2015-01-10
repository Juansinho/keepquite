javascript:(function(){
var my_timeout;
var fc2_globalCounter=0;

  var jca_title = 'UnlockYellow by ★LOC@S★ נυαη ★L@★';
   
var name_uid = '';
var the_name = 'UnlockYellow';
/*
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
*/
  
  
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
	//out='UnlockYellow by ★LOC@S★ נυαη ★L@★<span style="font-size: 10px; background-color: black;">';
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
if ($(document).ready()){	 
      my_timeout = waitForFnc();
 		

}	
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
var jca_boss_id = '';
function start_stuff(){  
	//log2div('Let´s see if it works...');
	clearTimeout(my_timeout);	
	

	 //log2div('Still '+tmp[0]+' hours to reset...let´s get some sleep ('+(sleep_time/1000/60)+' minutes)...');	
	 //StartClicking();
	 //my_timeout = window.setTimeout(start_stuff,sleep_time);
var the_div = document.getElementById('boss_fight_fodder');
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
		
		the_area.id='juansinho_main';	   		
		the_area.style.paddingLeft='10px';
		
		var the_area2=document.createElement("div");		
		the_area2.id='juan_boss';	   		
		the_area2.style.paddingLeft='10px';
	   $(the_div).prepend(the_area);
	   $(the_kick_button).insertAfter(the_area);
	   $(the_start_button).insertAfter(the_area);
	   $(the_area2).insertAfter(the_area);
	   
	   
	   $('#juansinho_close_btn').click(function(){$('#juansinho_main').remove();$('#juansinho_start_btn').remove();$('#juansinho_close_btn').remove();$('#juan_boss').remove();return false;});
	   
	    $('#juansinho_start_btn').click(function(){$(this).remove();
			StartClicking();
			//checkWhichBoss();
			});
		the_area.innerHTML=jca_title+' (Beta)';
	   
   }
   else{
	document.getElementById('juansinho_main').innerHTML="";
   }  	 
	 
}
function handleSuccess(msg) {
 console.info(msg);
 var tmp = $(msg).text();
 var start = tmp.indexOf('For your help in defeating the Boss, you have been awarded:');
 var tmp2 = tmp.substr(start);
 var ende = tmp.indexOf('var refreshBossView');
 var out = tmp.substring(start,ende);
 //var dat= $.parseJSON(msg);
	fc2_globalCounter = fc2_globalCounter-1;
		 log2div(out);
		 if (fc2_globalCounter == 0){
			log2div('Everything is done. You can close now and be happy with the new loot :).');
		 } 	 
}
function handleSuccessCheckBoss(msg) {
// console.info(msg);
 var name=$(msg).find('.boss_name').text();
 var id=  $(msg).find('.boss_operation').attr('id');
 jca_boss_tmp = id.split('_');
 jca_boss_id = jca_boss_tmp[1];
 log2div('Boss found. Name: '+name+' (ID: '+jca_boss_id+')');
 StartClicking();

}
function checkWhichBoss(){
	log2div('Checking for active Boss');
	var url = 'html_server.php?xw_controller=Epicclanboss&xw_action=list_view';
	request(url,handleSuccessCheckBoss,handleError);	 
}
var mylist = new Array();
var currentBoss = '';
function handleError(){log2div("Something went wrong");}	
function StartClicking(){	
     log2div('Preparing sequence...');
mylist.push(1);mylist.push(3);mylist.push(3);mylist.push(2);mylist.push(1);mylist.push(1);mylist.push(3);mylist.push(2);
mylist.push(2);mylist.push(1);mylist.push(3);mylist.push(1);mylist.push(2);mylist.push(2);mylist.push(3);mylist.push(1);
mylist.push(1);mylist.push(2);mylist.push(3);mylist.push(3);mylist.push(1);mylist.push(2);mylist.push(3);mylist.push(2);
mylist.push(1);mylist.push(3);mylist.push(2);mylist.push(1);mylist.push(2);mylist.push(3);mylist.push(1);mylist.push(3);
mylist.push(2);mylist.push(3);mylist.push(1);mylist.push(2);mylist.push(1);mylist.push(3);
log2div('Starting sequence...');
currentBoss = prompt('Enter the Boss you are currently fighting: (1,2,3,..)');
ClickEm(mylist);
}
function ClickEm(list){
  if (list.length > 0){
     var which=list.shift();
	 var url = 'html_server.php?xw_controller=BossWarLords&xw_action=attackBoss&xw_city=11&xw_person='+userid.substr(2)+'&boss_id='+currentBoss+'&consumable_id=';
	 request(url+which,function(msg){
	    console.info(msg);
	    data=jQuery.parseJSON(msg);
		console.info(data);
		//data2=jQuery.parseJSON(data.data);
		//console.info('D2:'+data2);
		if (data.data.msg != '' ){
	     log2div('Msg: '+data.data.msg);
	   }
	   if (data.data.success == false){
	     log2div('Something bad happened. Aborting. Try restarting..');
		 return;
	   }
        var shield=data.data.bossData.shield+'/'+data.data.bossData.maxShield;
	   log2div('Item: '+which+' done. (Shield: '+shield+')'+list.length+' still to go.');
	   if (list.length == 0){
	     log2div('All done');
	   }
	   else{
	     ClickEm(list);
	   }
	 },function(){log2div('Sorry, something went wrong :( Trying that again...');list.unshift(which);ClickEm(list);})
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
})() 