(function(){var e=".",r=[],a=[],t=$.inidb.exists("chatModerator","linksAllowed")?$.getIniDbBoolean("chatModerator","linksAllowed"):true,s=$.inidb.exists("chatModerator","youtubeLinksAllowed")?$.getIniDbBoolean("chatModerator","youtubeLinksAllowed"):true,o=$.inidb.exists("chatModerator","regsLinksAllowed")?$.getIniDbBoolean("chatModerator","regsLinksAllowed"):true,i=$.inidb.exists("chatModerator","linksAgressive")?$.getIniDbBoolean("chatModerator","linksAgressive"):false,n=$.inidb.exists("chatModerator","linkPurgeMessage")?$.inidb.get("chatModerator","linkPurgeMessage"):"",g=$.inidb.exists("chatModerator","linkPermitTime")?parseInt($.inidb.get("chatModerator","linkPermitTime")):60,l=$.inidb.exists("chatModerator","capsAllowed")?$.getIniDbBoolean("chatModerator","capsAllowed"):true,c=$.inidb.exists("chatModerator","capsTriggerRatio")?parseFloat($.inidb.get("chatModerator","capsTriggerRatio")):0,d=$.inidb.exists("chatModerator","capsTriggerLength")?parseInt($.inidb.get("chatModerator","capsTriggerLength")):10,h=$.inidb.exists("chatModerator","capsPurgeMessage")?$.inidb.get("chatModerator","capsPurgeMessage"):"",m=$.inidb.exists("chatModerator","symbolsAllowed")?$.getIniDbBoolean("chatModerator","symbolsAllowed"):true,u=$.inidb.exists("chatModerator","symbolsTriggerCount")?parseInt($.inidb.get("chatModerator","symbolsTriggerCount")):0,p=$.inidb.exists("chatModerator","symbolsPurgeMessage")?$.inidb.get("chatModerator","symbolsPurgeMessage"):"",f=$.inidb.exists("chatModerator","repeatCharAllowed")?$.getIniDbBoolean("chatModerator","repeatCharAllowed"):true,b=$.inidb.exists("chatModerator","repeatCharTriggerLength")?parseInt($.inidb.get("chatModerator","repeatCharTriggerLength")):0,w=$.inidb.exists("chatModerator","repeatCharPurgeMessage")?$.inidb.get("chatModerator","repeatCharPurgeMessage"):"";function C(){var e=$.inidb.GetKeyList("linkWhitelist",""),r;for(r in e){a.push($.inidb.get("linkWhitelist",e[r]))}}function M(){$.say($.ircPrefix+"clear")}function y(e,r){var a=1,t=setInterval(function(){if(r){$.say($.ircPrefix+"timeout "+e+" "+r)}else{$.say($.ircPrefix+"timeout "+e)}if(a==3){clearInterval(t)}++a},1e3)}function x(e){$.say($.ircPrefix+"ban "+e)}function P(e){$.say($.ircPrefix+"unban "+e)}function I(e){$.timeoutUser(e,1)}function k(e){var a;r.push(e);a=setTimeout(function(){var t;for(t in r){if(r[t].equalsIgnoreCase(e)){r.splice(t,1);break}}clearTimeout(a)},g*1e3)}$.bind("ircChannelMessage",function(e){var i=e.getSender().toLowerCase(),g=$.username.resolve(i,e.getTags()),C=e.getMessage(),M=(C+"").toLowerCase();if($.isModv3(i,e.getTags())){if(!t){$.patternDetector.hasLinks(e)}return}if(!t&&$.patternDetector.hasLinks(e)){var y;for(y in r){if(r[y].equalsIgnoreCase(i)){return}}if(o&&$.getUserGroupId(i)<=6){return}for(y in a){if(M.contains(a[y])){return}}if(s&&(M.indexOf("youtube.com")>-1||M.indexOf("youtube.be")>-1)){return}$.purgeUser(i);$.log("chatMod","Purged "+g+' for posting link in "'+C+'"',i);$.say($.whisperPrefix(i)+n);return}if(!l&&M.length>d){var x=e.getCapsCount(),P=x/M.length;if(P>c){$.purgeUser(i);$.log("chatMod","Purged "+g+" for exceeding the caps ratio (ratio:"+P+", trigger:"+c+') in "'+C+'"',i);$.say($.whisperPrefix(i)+h);return}}if(!m){var I=$.patternDetector.getNumberOfNonLetters(e),k=$.patternDetector.getLongestGraphemeCluster(e);if(I>u||k>u){$.purgeUser(i);$.log("chatMod","Purged "+g+" for exceeding the symbol limit (symbol Count: "+Math.max(I,k)+') in "'+C+'"',i);$.say($.whisperPrefix(i)+p);return}}if(!f){var L=$.patternDetector.getLongestRepeatedSequence(e);if(L>b){$.purgeUser(i);$.log("chatMod","Purged "+g+" for exceeding the repeating character limit (longest chain: "+L+') in "'+C+'"',i);$.say($.whisperPrefix(i)+w)}}});$.bind("command",function(e){var r=e.getSender().toLowerCase(),C=e.getCommand(),M=e.getArgs(),y=e.getArguments(),x=M[0],P=M[1];if(C.equalsIgnoreCase("chat")&&r.equalsIgnoreCase($.botName)){$.say(y)}if(C.equalsIgnoreCase("permit")){if(!x||!$.user.isKnown((x+"").toLowerCase())){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.permit.usage"));return}$.permitUserLink(x.toLowerCase());$.say($.lang.get("chatmoderator.permit.success",$.username.resolve(r),$.username.resolve(x),g/1e3));return}if(C.equalsIgnoreCase("whitelist")){if(!x){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.whitelist.usage"));return}$.inidb.set("linkWhitelist",a.length,x);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.whitelist.success",x));return}if(C.equalsIgnoreCase("purge")){if(!x&&!$.user.isKnown((x+"").toLowerCase())){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.purge.usage"));return}$.purgeUser((x+"").toLowerCase());$.say($.lang.get("chatmoderator.purge.success",$.username.resolve(x)));return}if(C.equalsIgnoreCase("timeout")){if(!x&&!$.user.isKnown((x+"").toLowerCase())){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.timeout.usage"));return}P=parseInt(P);if(P&&!isNaN(P)){$.timeoutUser((x+"").toLowerCase(),P);$.say($.lang.get("chatmoderator.timeout.success.fortime",$.username.resolve(x),P/60));return}else{$.timeoutUser((x+"").toLowerCase());$.say($.lang.get("chatmoderator.timeout.success",$.username.resolve(x)));return}}if(C.equalsIgnoreCase("ban")){P=parseInt(P);if(!x&&isNaN(P)&&!$.user.isKnown((x+"").toLowerCase())){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.ban.usage"));return}$.banUser((x+"").toLowerCase(),P);$.say($.lang.get("chatmoderator.ban.success",$.username.resolve(x),P));return}if(C.equalsIgnoreCase("unban")){if(!x&&!$.user.isKnown((x+"").toLowerCase())){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.unban.usage"));return}$.unBanUser((x+"").toLowerCase());$.say($.lang.get("chatmoderator.unban.success",$.username.resolve(x)));return}if(C.equalsIgnoreCase("clear")){$.clearChat()}if(C.equalsIgnoreCase("chatmod")){if(!x){return}if(x.equalsIgnoreCase("linksallowed")){t=!t;$.setIniDbBoolean("chatModerator","linksAllowed",t);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.toggle.linksallowed",t?$.lang.get("chatmoderator.toggle.common.allowed"):$.lang.get("chatmoderator.toggle.common.moderated")))}if(x.equalsIgnoreCase("youtubelinksallowed")){s=!s;$.setIniDbBoolean("chatModerator","youtubeLinksAllowed",s);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.toggle.youtubelinksallowed",s?$.lang.get("chatmoderator.toggle.common.allowed"):$.lang.get("chatmoderator.toggle.common.moderated")))}if(x.equalsIgnoreCase("regslinksallowed")){o=!o;$.setIniDbBoolean("chatModerator","regsLinksAllowed",o);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.toggle.Regularslinksallowed",o?$.lang.get("chatmoderator.toggle.common.allowed"):$.lang.get("chatmoderator.toggle.common.moderated")))}if(x.equalsIgnoreCase("linksagressive")){i=!i;$.setIniDbBoolean("chatModerator","linksAgressive",i);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.toggle.linksagressive",i?$.lang.get(".common.enabled"):$.lang.get("common.disabled")))}if(x.equalsIgnoreCase("setlinkpurgemessage")){if(!P){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.common.message.usage","setlinkpurgemessage"));return}n=y.replace(x,"").trim();$.inidb.set("chatModerator","linkPurgeMessage",n);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.common.message.success","links",n))}if(x.equalsIgnoreCase("setlinkpermittime")){P=parseInt(P);if(isNaN(P)){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.linkpermittime.usage"));return}g=P;$.inidb.set("chatModerator","linkPermitTime",g);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.linkpermittime.success",g))}if(x.equalsIgnoreCase("capsallowed")){l=!l;$.setIniDbBoolean("chatModerator","capsAllowed",l);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.toggle.capsallowed",l?$.lang.get("chatmoderator.toggle.common.allowed"):$.lang.get("chatmoderator.toggle.common.moderated")))}if(x.equalsIgnoreCase("setcapstriggerratio")){P=parseFloat(P);if(isNaN(P)){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.capstriggerratio.usage"));return}c=P;$.inidb.set("chatModerator","capsTriggerRatio",c);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.capstriggerratio.success",c))}if(x.equalsIgnoreCase("setcapstriggerlength")){P=parseInt(P);if(isNaN(P)){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.capstriggerlength.usage"));return}d=P;$.inidb.set("chatModerator","capsTriggerLength",d);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.capstriggerlength.success",d))}if(x.equalsIgnoreCase("setcapspurgemessage")){if(!P){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.common.message.usage","setcapspurgemessage"));return}h=y.replace(x,"").trim();$.inidb.set("chatModerator","capsPurgeMessage",h);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.common.message.success","caps spam",h))}if(x.equalsIgnoreCase("symbolsallowed")){m=!m;$.setIniDbBoolean("chatModerator","symbolsAllowed",m);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.toggle.symbolsallowed",m?$.lang.get("chatmoderator.toggle.common.allowed"):$.lang.get("chatmoderator.toggle.common.moderated")))}if(x.equalsIgnoreCase("setsymbolstriggercount")){P=parseInt(P);if(isNaN(P)){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.symbolstriggercount.usage"));return}u=P;$.inidb.set("chatModerator","symbolsTriggerCount",u);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.symbolstriggercount.success",u))}if(x.equalsIgnoreCase("setsymbolspurgemessage")){if(!P){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.common.message.usage","setsymbolspurgemessage"));return}p=y.replace(x,"").trim();$.inidb.set("chatModerator","symbolsPurgeMessage",p);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.common.message.success","symbol spam",p))}if(x.equalsIgnoreCase("repeatcharallowed")){f=!f;$.setIniDbBoolean("chatModerator","repeatCharAllowed",f);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.toggle.repeatcharallowed",f?$.lang.get("chatmoderator.toggle.common.allowed"):$.lang.get("chatmoderator.toggle.common.moderated")))}if(x.equalsIgnoreCase("setrepeatchartriggerlength")){P=parseInt(P);if(isNaN(P)){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.repeatchartriggerlength.usage"));return}b=P;$.inidb.set("chatModerator","repeatCharTriggerLength",b);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.repeatchartriggerlength.success",b))}if(x.equalsIgnoreCase("setrepeatcharpurgemessage")){if(!P){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.common.message.usage","setrepeatcharpurgemessage"));return}w=y.replace(x,"").trim();$.inidb.set("chatModerator","repeatCharPurgeMessage",w);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.set.common.message.success","repeated character spam",w))}}});$.bind("initReady",function(){if($.bot.isModuleEnabled("./core/chatModerator.js")){$.registerChatCommand("./core/chatModerator.js","chat",1);$.registerChatCommand("./core/chatModerator.js","whitelist",1);$.registerChatCommand("./core/chatModerator.js","clear",1);$.registerChatCommand("./core/chatModerator.js","chatmod",1);$.registerChatCommand("./core/chatModerator.js","permit",2);$.registerChatCommand("./core/chatModerator.js","purge",2);$.registerChatCommand("./core/chatModerator.js","timeout",2);$.registerChatCommand("./core/chatModerator.js","ban",2);$.registerChatCommand("./core/chatModerator.js","unban",2);C()}});$.ircPrefix=e;$.clearChat=M;$.timeoutUser=y;$.banUser=x;$.unBanUser=P;$.purgeUser=I;$.permitUserLink=k})();