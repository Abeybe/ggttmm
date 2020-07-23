chrome.contextMenus.create({
    "title" : "Add memo",
    "type"  : "normal",
    "contexts" : ["all"],
    "onclick":function(info){
        chrome.tabs.getSelected(null,function(tab){
            chrome.tabs.sendRequest(tab.id,{
                greeting:"changeHiddenStatus",
                function(response) {
                    console.log("step2 "+response.farewell);
                }
            })
        })
    }
});

chrome.contextMenus.create({
    "title" : "Edit memo",
    "type"  : "normal",
    "contexts" : ["all"],
    "onclick":function(info){
        window.open("popup.html");
    }
});
