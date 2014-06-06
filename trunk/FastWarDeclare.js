
javascript:(function (){
  var jca_title = '★LOC@S★ - Fast War Declare';
	html = '<ul style="margin: 0;padding: 0;width: 650px;">';

	var spocklet='waromatic_jca';
	var version=jca_title+' 0.1';
	var debug = false;
	var logs=[];
	var tries = 0;
	var queue_count = 5;
	var queue = new Array();
	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	//var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';
	preurl = MW_BASE_URL+'/remote/html_server.php?';
	var params=get_params();
	
	function start(){
		do_ajax('inner_page', 'remote/html_server.php?xw_controller=war&xw_action=view', 1, 1, 0, 0);
		$('#'+spocklet+'_reply').remove();
		$('#popup_fodder').append('<div id="'+spocklet+'_reply"><div id="'+spocklet+'_inner">Picking a random player... [<span id="'+spocklet+'_rand"></span>]</div></div>');
		$('#'+spocklet+'_reply').dialog({ title: version, buttons: { 
			'Cancel':function(){
				//clearInterval(intval);
				$('#'+spocklet+'_reply').remove();
			}
		}, width: 500, position: ['center',100]
		} );
		var intval=setInterval(function(){
			$('#'+spocklet+'_rand').text('p|'+parseInt(Math.random()*100000000));
		},100);
		checkRandomPlayer(intval);
	}
	$('head').append('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/ui-darkness/jquery-ui.css" type="text/css" />');
	start();
	
	function checkRandomPlayer(intval){
		if(tries++<20) {						
			var pid='p|'+parseInt(Math.random()*100000000+1000000);
			$('#'+spocklet+'_inner').html('Picking a random player... [<span id="'+spocklet+'_rand">'+pid+'</span>]');			
			var uid=escape(btoa(pid));
			request('xw_controller=stats&xw_action=view&xw_city=1&mwcom=1&user='+uid+'&xw_client_id=8',function(page){
				$p=$('<div>'+page.replace(/<img/ig, '<noimg')+'</div>');
				// get player vars
				var level,name,arch,id;
				try {
					level=parseInt(/level (\d+)\s/.exec($p.find('.stats_title_text').text())[1]);
					name=/\"(.*)\"/.exec($p.find('.stats_title_text').text())[1];
					arch=$p.find('#stats_ach_date_0').text();
					id=atob(unescape(/(cH.*)\%22/.exec($p.find('#profile_link').text())[1]));
				} catch(error){}
				
				if(id==pid) {
					if (level>5) {
						clearInterval(intval);
						if(queue_count-- >0) {
							queue.push(pid)
							$('#'+spocklet+'_reply').append('<div id="'+spocklet+'_reply">'+queue.length+'-> Name: '+name+' ('+pid+') Level: '+level+' Last achievement: '+(arch||'No achievements yet')+'</div>');
							
							if (queue.length < 5){ checkRandomPlayer(intval);}
							else{
							$('#'+spocklet+'_inner').html('Found 5, now go on and declare :)');
							$('#'+spocklet+'_reply').dialog({ title: version, buttons: { 
								'Declare war':function(){
									var out = '';
									for(var i=0;i<queue.length;i++){
									    //var the_url = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=war&xw_action=declare_war&xw_city=7&xw_person='+User.id.substr(2)+'&target_id='+escape(queue[i]);
										//var popupWindow = window.open(the_url);
										//popupWindow.blur();		
									    do_ajax('inner_page', 'remote/html_server.php?xw_controller=war&xw_action=declare_war&xw_city=7&xw_person='+User.id.substr(2)+'&target_id='+escape(queue[i]), 1, 1, 0, 0);
										//request('remote/html_server.php?xw_controller=war&xw_action=declare_war&xw_city=7&xw_person='+User.id.substr(2)+'&target_id='+escape(queue[i]));
									}									
									$('#'+spocklet+'_reply').remove();						
								},
								'Cancel':function(){
									$('#'+spocklet+'_reply').remove();
								}
							}, width: 620, position: ['center',100]
							} );
							}
						}
					} else {
						checkRandomPlayer(intval);
					}
				} else {
					checkRandomPlayer(intval);
				}
					
			});
		} else {
			$('#'+spocklet+'_inner').html('Unable to find a suitable target. Maybe you\'re not ready to declare a war yet, or your connection is broken. Reload the game and try again!');
			clearInterval(intval);
		}
	};
	
	function wait_and_post(i){
		if($('.pop_box:contains("Ask your Mafia for help")').length>0) {
			$('.pop_box:contains("Ask your Mafia for help") a.pop_close').trigger("click");
			if(params.auto) {
				load_spocklet('https://spocklet.com/bookmarklet/war-post.js?auto=true'+(params.type?'type=params.type':''));
			} else {
				load_spocklet('https://spocklet.com/bookmarklet/war-post.js');
			}
		} else {
			if(i++<10) {
				setTimeout(wait_and_post,1000,i);
			} else {
				// give up
			}
		}

	
	
	}

	function load_spocklet(src) {
		var a = document.createElement("script");
		a.type = "text/javascript";
		a.src = src+(src.indexOf('?')==-1?"?":'&')+Math.random();
		document.getElementsByTagName("head")[0].appendChild(a);
	}
	
	
	/*
	 *  Function to check for parameters given to this script. i.e. run it with scriptname.js?action=kill, then do a if(get_param()['action']=='kill') { ... }
	 *
	 *  If you copy this function, change the script name. 
	 *  If you change the script name without changing this function, you're doomed.
	 *  If you copy the script without having the prototype.re, you're doomed too.
	 */
	function get_params() {
		try {
			var foundscript;
			$('script').each(function(){
				var src=$(this).attr('src');
				if(src && (src.indexOf('war-o-matic.js?')!=-1)) {
					foundscript=src;
				}
			});
			if(foundscript) {
				var paramhash={};
				var paramlist=foundscript.re('\\?(.*)$');
				var params=paramlist.split('&');
				for(var i=0;i<params.length;i++) {
					var param=params[i].split('=');
					if(param.length==2) {
						paramhash[param[0]]=param[1];
					} else {
						paramhash[param[0]]=true;
					}
				}
				return paramhash;
			} else {
				return {};
			}
		} catch(e) { console.log(e); return {}; }
	}
	// by Eike
	String.prototype.re = function(regex){
		var r=new RegExp(regex);
		var m;
		if(m=r.exec(this)) {
			return m[1];
		} else {
			return '';
		}
	}	
	
	
	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10));
	}


	
	function request(url, handler, errorhandler) {
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		User.clicks++;
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
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
	
	function min(a,b){
		return a<b?a:b;
	}
	function max(a,b){
		return a>b?a:b;
	}
	function imgurl(img,w,h,a) {
		return '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+img+'" width="'+w+'" height="'+h+'" title="'+a+'" alt="'+a+'" align="absmiddle">';
	}
	function commas(s) {
		while (d=/(-)?(\d+)(\d{3}.*)/.exec(s)) {
			s = (d[1]?d[1]+d[2]+','+d[3]:d[2]+','+d[3]);
		}
		return s;
	}
	function timestamp() {
		now = new Date();
		var CurH = now.getHours();
		CurH = (CurH<10?'0'+CurH:CurH);
		var CurM = now.getMinutes();
		CurM = (CurM<10?'0'+CurM:CurM);
		var CurS = now.getSeconds();
		CurS = (CurS<10?'0'+CurS:CurS);
		return '<span class="more_in">['+CurH+':'+CurM+']</span> ';
	}	
})()
