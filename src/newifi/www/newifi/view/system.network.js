L.ui.view.extend({setLan:function(){L.xapi.getLanIp().then(function(g){var f=new L.cbi.Map("network",{pageaction:false});var h=f.section(L.cbi.DummySection,"network_lan",{caption:L.tr("network-lan-set"),trigger:false,});var e;if(!g||!g.ipaddr){e=""}else{e=g.ipaddr}h.option(L.cbi.InputValue,"lan_ip",{caption:L.tr("network-current-ip"),inputText:e,valueWidth:"lan-ip-width",datatype:"ip4addr"});h.option(L.cbi.ErrorMsgValue,"error",{caption:L.tr(""),});h.option(L.cbi.ButtonValue,"lanipButton",{buttonValue:L.tr("Save"),sectionMargin:"button-IP",bStyle:"ready",saveData:["network_lan","lan_ip"],clickButton:function(b){L.ui.sectionSave("saving","lanipButton");if(!b){return false}var c=b.lan_ip.split(".");if(parseInt(c[3])>254||parseInt(c[0])>223||parseInt(c[0])<1||parseInt(c[3])<1){$("#panel_network_network_lan_network_lan .error-text").show();$("#panel_network_network_lan_network_lan .error-text").text(L.tr("ipformat-fail-validation")).delay(3000).fadeOut(500);L.ui.sectionSave("saveF","lanipButton");setTimeout(function(){L.ui.sectionSave("close","lanipButton")},3000);return false}if(b.lan_ip==g.ipaddr){$("#panel_network_network_lan_network_lan .error-text").show();$("#panel_network_network_lan_network_lan .error-text").text(L.tr("no-change-validation")).delay(3000).fadeOut(500);L.ui.sectionSave("saveF","lanipButton");setTimeout(function(){L.ui.sectionSave("close","lanipButton")},3000);return false}var a=new L.cbi.Modal("local_upload_prompt",{title:L.tr("prompt-message"),bodyText:L.tr("restart-confirm"),footer:"double",btnF:"cancel",btnL:"sure",stopGoing:function(){L.ui.sectionSave("close","lanipButton")},goingOn:function(){L.xapi.setLanIp(b.lan_ip,"255.255.255.0").then(function(j){switch(j.status){case 0:L.ui.sectionSave("saveS","lanipButton");var d=new L.cbi.Modal("system",{textCenter:[L.tr("reboot-now-validation"),L.tr("prompt-danger-validation")],progressBar:true,});d.show();url="http://"+b.lan_ip+"/index.html";setTimeout(function(){var i=window.setInterval(function(){$.ajax({type:"GET",cache:false,url:url,dataType:"jsonp",success:function(l){window.location.href=url},error:function(l){if(l.status==200){window.location.href=url}return}})},5000)},60000);break;case 11:L.ui.sectionSave("saveF","lanipButton");$("#panel_network_network_lan_network_lan .error-text").show();$("#panel_network_network_lan_network_lan .error-text").text(L.tr("ipformat-fail-validation")).delay(3000).fadeOut(500);break;case 12:default:$("#panel_network_network_lan_network_lan .error-text").show();$("#panel_network_network_lan_network_lan .error-text").text(L.tr("save-netmask-fail-validation")).delay(3000).fadeOut(500);L.ui.sectionSave("saveF","lanipButton")}setTimeout(function(){L.ui.sectionSave("close","lanipButton")},3000)})}});a.show()}});return f.insertInto("#network_lan")})},saveDhcp:function(c){var d=[];d=c.ipAssignment.split("_");if(d[0]==""||d[1]==""){$("#panel_network_network_dhcp_network_dhcp .error-text").show();$("#panel_network_network_dhcp_network_dhcp .error-text").text(L.tr("ip-range-null-validation")).delay(3000).fadeOut(500);L.ui.sectionSave("saveF","network_dhcp_Button");setTimeout(function(){L.ui.sectionSave("close","network_dhcp_Button")},3000);return false}if(c.rentTime==""){$("#panel_network_network_dhcp_network_dhcp .error-text").show();$("#panel_network_network_dhcp_network_dhcp .error-text").text(L.tr("lease-time-null-validation")).delay(3000).fadeOut(500);L.ui.sectionSave("saveF","network_dhcp_Button");setTimeout(function(){L.ui.sectionSave("close","network_dhcp_Button")},3000);return false}L.xapi.getLanDhcp().then(function(a){if(d[1]=="255"){$("#panel_network_network_lan_network_lan .error-text").show();$("#panel_network_network_lan_network_lan .error-text").text(L.tr("ipformat-fail-validation")).delay(3000).fadeOut(500);L.ui.sectionSave("saveF","lanipButton");return false}if(a.start==parseInt(d[0])&&a.leasetime==parseInt(c.rentTime)&&a.end==parseInt(d[1])){$("#panel_network_network_dhcp_network_dhcp .error-text").show();$("#panel_network_network_dhcp_network_dhcp .error-text").text(L.tr("no-change-validation")).delay(3000).fadeOut(500);L.ui.sectionSave("saveF","network_dhcp_Button");setTimeout(function(){L.ui.sectionSave("close","network_dhcp_Button")},3000);return false}L.xapi.setLanDhcp("1",parseInt(d[0]),parseInt(d[1]),c.rentTime+"h").then(function(f){switch(f.status){case 0:L.ui.sectionSave("saveS","network_dhcp_Button");setTimeout(function(){L.ui.sectionSave("close","network_dhcp_Button")},3000);break;case 2:L.ui.sectionSave("saveF","network_dhcp_Button");setTimeout(function(){L.ui.sectionSave("close","network_dhcp_Button")},3000);var b=new L.cbi.Modal("system",{pageaction:false,title:L.tr("prompt-message"),footer:"ready",bodyText:L.tr("lease-time-fail-validation"),goingOn:function(){L.ui.popDialog(false);return},});b.show();break;case 11:L.ui.sectionSave("saveF","network_dhcp_Button");setTimeout(function(){L.ui.sectionSave("close","network_dhcp_Button")},3000);break;case 12:var b=new L.cbi.Modal("system",{pageaction:false,title:L.tr("prompt-message"),footer:"ready",bodyText:L.tr("ip-range-fail-validation"),goingOn:function(){L.ui.popDialog(false);return},});b.show();default:var b=new L.cbi.Modal("system",{pageaction:false,title:L.tr("prompt-message"),footer:"ready",bodyText:L.tr("save-failed-validation"),goingOn:function(){L.ui.popDialog(false);return},});b.show();L.ui.sectionSave("saveF","network_dhcp_Button");setTimeout(function(){L.ui.sectionSave("close","network_dhcp_Button")},3000)}})})},dhcp:function(){var e=this;var f=new L.cbi.Map("network",{pageaction:false});var d=f.section(L.cbi.DummySection,"network_dhcp",{saveData:["network_dhcp","ipAssignment"]});L.xapi.getLanIp().then(function(a){L.xapi.getLanDhcp().then(function(j){var i=0;var b=a.ipaddr;if(!b){b="192.168.99.1"}var c=b.split(".");if(!a||!j){i=0}else{i=j.enable}d.option(L.cbi.DHCPValue,"dhcpService",{caption:L.tr("network-dhcp")+":",valueWidth:"dhcpService-width",switchState:j.enable==1?"1":"0",otherAbout:["network_dhcp_ipAssignment","network_dhcp_rentTime","btn_network_dhcp_Button"],clickSwitch:function(g){L.xapi.getLanDhcp().then(function(h){if(g==0){L.xapi.setLanDhcp("0",h.start,h.end,h.leasetime).then(function(n){switch(n.status){case 0:var m=new L.cbi.Modal("dhcp-close-tip",{bodyText:L.tr("network-dhcp-closed"),});m.show();setTimeout(function(){L.ui.popDialog(false)},3000);break;case 2:case 11:case 12:default:var m=new L.cbi.Modal("dhcp-close-tip",{bodyText:L.tr("network-dhcp-close-fail"),footer:"single",btnS:"sure",title:L.tr("modal-notice-title"),});m.show()}})}else{L.xapi.setLanDhcp("1",h.start,h.end,h.leasetime).then(function(l){switch(l.status){case 0:break;case 2:$("#panel_network_network_dhcp_network_dhcp .error-text").show();$("#panel_network_network_dhcp_network_dhcp .error-text").text(L.tr("lease-time-fail-validation")).delay(3000).fadeOut(500);break;case 11:break;case 12:default:$("#panel_network_network_dhcp_network_dhcp .error-text").show();$("#panel_network_network_dhcp_network_dhcp .error-text").text(L.tr("ip-range-fail-validation")).delay(3000).fadeOut(500)}})}})}});var b=a.ipaddr;d.option(L.cbi.IpDealValue,"ipAssignment",{caption:L.tr("network-dhcp-IP")+":",valueWidth:"ipAssignment-width",ipValue:c[0]+"."+c[1]+"."+c[2]+".",comeout:i==1?true:false,defaultT1:j.start!=undefined?j.start:"100",defaultT2:j.end!=undefined?j.end:"254",datatype:function(){var g=parseFloat($(".ip-enter-one").val());var h=parseFloat($(".ip-enter-two").val());if($(".ip-enter-one").val().match(/^-?[0-9]+$/)!=null&&$(".ip-enter-two").val().match(/^-?[0-9]+$/)!=null&&(g>=1&&g<=255)&&(h>=1&&h<=254)&&(g<h)){return true}else{if(h<=g){return L.tr("ase-ip-validation")}else{return L.tr("ase-ip-validation")}}}});d.option(L.cbi.RentTime,"rentTime",{caption:L.tr("network-dhcp-time")+":",valueWidth:"rentTime-width",comeout:i==1?true:false,defaultT:j.leasetime!=undefined?j.leasetime:"36",datatype:"range(1,48)"});d.option(L.cbi.ErrorMsgValue,"error",{caption:L.tr(""),});d.option(L.cbi.ButtonValue,"network_dhcp_Button",{buttonValue:L.tr("Save"),saveData:["network_dhcp","ipAssignment","rentTime"],bStyle:"ready",comeout:i==1?true:false,clickButton:function(g){L.ui.sectionSave("saving","network_dhcp_Button");e.saveDhcp(g)}});return f.insertInto("#network_dhcp")})})},deviceList:function(){var b=new L.ui.table({caption:L.tr("network-device-table"),columns:[{width:2,width_sm:12,format:"%s"},{width:2,width_sm:12,format:"%s"}]});L.xapi.getDeviceInfo().then(function(e){b.row([L.tr("network-device-name"),L.tr("network-device-ip")]);if(e&&e.status==0){var f="";for(var a=0;a<e.info.length;a++){f=e.info[a].device_nickname;if(f!="none"){f=$.base64.atob(f,true)}else{f=e.info[a].device_name}if(e.info[a].device_name.toUpperCase()=="unknown".toUpperCase()){f=L.tr("unknown-device-name")}b.row([f,e.info[a].ip])}}b.insertInto("#network_ip_list")})},execute:function(){this.deviceList();this.setLan();this.dhcp();return}});