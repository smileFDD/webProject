L.ui.view.extend({deleteFile:function(b){L.xapi.deleteFile(b).then(function(){})},resetFormElement:function(b){b.wrap("<form>").closest("form").get(0).reset();b.unwrap()},installPlucin:function(g,h,f){var e=this;L.xapi.installAppDirect(g,"","").then(function(a){switch(a.status){case 0:e.resetFormElement($("#plugin_local_file"));e.deleteFile(h);var b=new L.cbi.Modal("local_upload_prompt",{bodyText:L.tr("install-success")});b.show();setTimeout(function(){L.ui.popDialog(false);top.location.reload()},3000);break;default:e.resetFormElement($("#plugin_local_file"));e.deleteFile(h);var b=new L.cbi.Modal("local_upload_prompt",{title:L.tr("prompt-message"),bodyText:L.tr("install-failed")+L.tr(",")+L.tr("weit-retry")+"…",footer:"ready",goingOn:function(){L.ui.popDialog(false)},});b.show()}})},pluginLocal:function(){var c=this;var d;$("#plugin_local_sid").attr("value",L.globals.sid);$(".input-local").on("change",function(p){var b=$(this).val();var s=b.substring(b.lastIndexOf("\\")+1,b.length);var n=s.substring(s.lastIndexOf(".")+1,s.length);var a="/tmp/localapp.xipk";var i=0;var t;var q;if(!b){return}else{if(n!="xipk"){c.resetFormElement($("#plugin_local_file"));var r=new L.cbi.Modal("local_upload_prompt",{title:L.tr("prompt-message"),bodyText:L.tr("plucin-local-notXipk"),footer:"ready",goingOn:function(){L.ui.popDialog(false)},});r.show();return}}$("#plugin_local_form").submit();var r=new L.cbi.Modal("local_upload_prompt",{bodyText:L.tr("plucin-local-uploading")+L.tr(",")+L.tr("weiting")+"……"});r.show();window.frames["plugin-local-iframe"].document.getElementsByTagName("body")[0].innerHTML="";var o=setInterval(function(){i++;t=window.frames["plugin-local-iframe"].document.getElementsByTagName("body")[0].innerHTML;if(t==""||t==undefined){return}else{try{var f=window.frames["plugin-local-iframe"].document.getElementsByTagName("pre")[0].innerHTML;q=$.parseJSON(f)}catch(e){d=false}d=true}if(i>80){d=false}if(d==true){clearInterval(o);L.xapi.checkAppPackage(a).then(function(h){switch(h.status){case 0:var j=h.extract_path;var k=new L.cbi.Modal("local_upload_prompt",{title:L.tr("prompt-message"),bodyText:L.tr(s)+L.tr("plucin-local-upload-confirm"),footer:"double",btnF:"cancel",btnL:"sure",stopGoing:function(){c.deleteFile(a);c.resetFormElement($("#plugin_local_file"))},goingOn:function(){var l=new L.cbi.Modal("local_upload_prompt",{bodyText:L.tr("installing")+"……"});l.show();c.installPlucin(j,a,s)}});k.show();break;case 2:c.deleteFile(a);c.resetFormElement($("#plugin_local_file"));var k=new L.cbi.Modal("local_upload_prompt",{title:L.tr("prompt-message"),bodyText:L.tr("plucin-local-noDisk"),footer:"ready",goingOn:function(){L.ui.popDialog(false)},});k.show();break;case 3:c.deleteFile(a);c.resetFormElement($("#plugin_local_file"));var k=new L.cbi.Modal("local_upload_prompt",{title:L.tr("prompt-message"),bodyText:L.tr("upload-filed")+L.tr(",")+L.tr("plucin-local-disk-useless"),footer:"ready",goingOn:function(){L.ui.popDialog(false)},});k.show();break;case 4:case 5:c.deleteFile(a);c.resetFormElement($("#plugin_local_file"));var k=new L.cbi.Modal("local_upload_prompt",{title:L.tr("prompt-message"),bodyText:L.tr("plucin-local-file-error")+L.tr("……"),footer:"ready",goingOn:function(){L.ui.popDialog(false)},});k.show();break;case 6:var j=h.extract_path;var k=new L.cbi.Modal("local_upload_prompt",{title:L.tr("prompt-message"),bodyText:L.tr("plucin-local-install-cover"),footer:"double",btnF:"cancel",btnL:"sure",stopGoing:function(){c.deleteFile(a);c.resetFormElement($("#plugin_local_file"))},goingOn:function(){var l=new L.cbi.Modal("local_upload_prompt",{bodyText:L.tr("installing")+"……"});l.show();c.installPlucin(j,a,s)}});k.show();break;default:c.resetFormElement($("#plugin_local_file"));c.deleteFile(a);clearInterval(o);var k=new L.cbi.Modal("local_upload_prompt",{title:L.tr("prompt-message"),bodyText:L.tr(s)+L.tr("upload-filed")+L.tr(",")+L.tr("weit-retry")+"……",footer:"ready",goingOn:function(){L.ui.popDialog(false)}});k.show()}})}else{if(d==false){c.resetFormElement($("#plugin_local_file"));c.deleteFile(a);clearInterval(o);var g=new L.cbi.Modal("local_upload_prompt",{title:L.tr("prompt-message"),bodyText:L.tr(s)+L.tr("upload-filed")+L.tr(",")+L.tr("weit-retry")+"……",footer:"ready",goingOn:function(){L.ui.popDialog(false)}});g.show()}}},500)})},execute:function(){var b=this;b.pluginLocal()}});