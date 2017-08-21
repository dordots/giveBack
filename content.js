
var times = 0 ;

var redirects_url=[];


function insertnode(cdiv,data){
	var myc=cdiv.childNodes[1].childNodes[0].childNodes[0].childNodes[0];
	myc.setAttribute("href", data); 
	myc.baseURI='';
}

(function(win){
    'use strict';
    
    var listeners = [], 
    doc = win.document, 
    MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
    observer;
    
    function ready(selector, fn){
        // Store the selector and callback to be monitored
        listeners.push({
            selector: selector,
            fn: fn
        });
        if(!observer){
            // Watch for changes in the document
            observer = new MutationObserver(check);
            observer.observe(doc.documentElement, {
                childList: true,
                subtree: true
            });
        }
        // Check if the element is currently in the DOM
        check();
    }
        
    function check(){
        // Check the DOM for elements matching a stored selector
        for(var i = 0, len = listeners.length, listener, elements; i < len; i++){
            listener = listeners[i];
            // Query for elements matching the specified selector
            elements = doc.querySelectorAll(listener.selector);
            for(var j = 0, jLen = elements.length, element; j < jLen; j++){
                element = elements[j];
                // Make sure the callback isn't invoked with the 
                // same element more than once
                if(!element.ready){
                    element.ready = true;
                    // Invoke the callback with the element
                    listener.fn.call(element, element);
                }
            }
        }
    }

    // Expose `ready`
    win.ready = ready;
            
})(this);

var currentPapgeURL = '';
ready('.g', function(element){
    // do something

        console.log("----------Trying to create---------");
        var actualCites = element.getElementsByTagName("cite");
    console.log(element, actualCites);
    console.log(element != null && actualCites.length > 0 && actualCites[0] != null && actualCites[0].innerText);
        if(element != null && actualCites.length > 0 && actualCites[0] != null && actualCites[0].innerText)
        {
           
            console.log(actualCites[0]);
            var actualUrl = (actualCites[0].innerText);

            if(actualUrl.indexOf("wikipedia") > -1)
                return;

            try {
                // 1. trim Url
                console.log(actualUrl);                
                var url = actualUrl;//customTrimUrl(actualUrl);
                console.log("url1: "+url);

                if(url != null && url.length > 0   ){
                    // console.log("url2: "+url[0]);
                    var emp = url;//extractDomain(url[0]);//url[0].split(".");
                    
                    if(emp != null && emp.length > 0 ){
                        console.log("url3: "+emp);
						redirects_url=JSON.parse('[["www.ebay.com","ad.admitad.com/g/kz1hwx56ivf78e368e1764d9e52862",1],["www.dreslily.com","ad.admitad.com/g/dru1fiprm497bcc4f3adc54bdbf551/",0],["www.banggood.com","ad.admitad.com/g/gbfv5idq4b97bcc4f3adfa569f1ad8/",0],["www.lightinthebox.com","ad.admitad.com/g/83ee6455797bcc4f3ad7d95a12660/",0],["www.rotita.com","ad.admitad.com/g/wo18bv3kmr97bcc4f3ad9144236bbd/",0],["www.gearbest.com","pafutos.com/g/2316b8f856f78e368e1722af2ed61b/",0],["www.choice.com","ad.admitad.com/g/vch2nnm7lef78e368e1713563ae751/",0],["www.soufeel.com","ad.admitad.com/g/pd0v4ornhkd3b21153d3bb079099f1/",0],["www.aliexpress.com","alitems.com/g/1e8d114494d3b21153d316525dc3e8/",0],["www.amazon.com","www.amazon.com?&_encoding=UTF8&tag=talnir-20&linkCode=ur2&linkId=3d834509f3846f2f56269f9433553542&camp=1789&creative=9325",0]]');
						for (var i=0; i<redirects_url.length; i++) {
							from = redirects_url[i][0];
							to = redirects_url[i][1];
							try {
								pattern = new RegExp(from, 'ig');
							} catch(err) {
								//bad pattern
								continue;
							}
							  match = emp.match(pattern);
							  if (match) {
								redirectUrl = emp.replace(pattern, to);
								if (redirectUrl != emp) {
								  insertnode( element,redirectUrl);
								}
							  }
							}
						
                    }
                }
            }   
            catch(err) {
                console.log(err.message);
            }
        }
});