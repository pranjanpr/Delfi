//tried sending message from popup.js to background.js
// try{
// chrome.runtime.onMessage.addListener( async function(request,sender,sendResponse)
// {   
//     console.log("incoming message from popup.js detected!");
//     if( request.greeting === "GetURL" )
//     {
//         console.log("got the message");
//         var tabURL = "Not set yet";
//         chrome.tabs.query({active:true},function(tabs){
//             if(tabs.length === 0) {
//                 sendResponse({});
//                 return;
//             }
//             tabURL = tabs[0].url;
//             sendResponse( {navURL:tabURL} );
//         });        
//     }
// });
// }catch(e){
//     console.log(e);
// }


// run the following if DOM updates
// also only run on linkedin
try{
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if(changeInfo.status == 'complete' && tab.url && tab.url.includes("linkedin.com/")){

            chrome.scripting.executeScript({
                files: ['contentBack.js'],
                target: {tabId: tab.id}
            });
            chrome.scripting.insertCSS({
                files: ['contentBack.css'],
                target: {tabId: tab.id}
            });
        }
     }); 
}catch(e){
    console.log(e);
}
