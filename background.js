chrome.contextMenus.create({
    "title" : "Add memo",
    "type"  : "normal",
    "contexts" : ["all"],
    "onclick":function(info){
        chrome.tabs.getSelected(null,function(tab){
            chrome.tabs.sendRequest(tab.id,{
                greeting:"hello",
                function(response) {
                    console.log("step3 "+response.farewell);
                }
            })
        })
    }
});