console.log(localStorage);

chrome.contextMenus.create({
    "title" : "Add memo",
    "type"  : "normal",
    "contexts" : ["all"],
    "onclick":function(info){
        chrome.tabs.getSelected(null,function(tab){
            chrome.tabs.sendRequest(tab.id,{
                greeting:"changeHiddenStatus",
                function(response) {
                    console.log("step3 "+response.farewell);
                }
            })
        })
    }
});

var googleDotComLocalStorage;
chrome.contextMenus.create({
    "title" : "Edit memo",
    "type"  : "normal",
    "contexts" : ["all"],
    "onclick":function(info){
        chrome.tabs.getSelected(null,function(tab){
            chrome.tabs.sendRequest(tab.id,{
                greeting:"getLocalStorage",
                function(response) {
                    console.log(response.farewell);                    
                }
            })
        })
        window.open("popup.html");
    }
});

function getLocalStorage(){
    return googleDotComLocalStorage;
}