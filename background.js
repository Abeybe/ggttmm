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

// chrome.contextMenus.create({
//     "title" : "Edit Memo",
//     "type"  : "normal",
//     "contexts" : ["all"],
//     "onclick":function(info){
//         chrome.tabs.getSelected(null,function(tab){
//             window.open("popup.html");
//         })
//     }
// });

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
  // console.log(localStorage);
    switch (request.method) {
      case 'getLength': // 保存されているデータ数を取得
        sendResponse({data: localStorage.length});
        break;
      case 'getKeyName': // 指定されたn番目のkey名を取得
        sendResponse({data: localStorage.key(request.number)});
        break;
      case 'getItem': // 指定されたkeyの値を取得
        sendResponse({data: localStorage.getItem(request.key)});
        break;
      case 'setItem': // 指定されたkeyと値を保存（更新）
        sendResponse({data: localStorage.setItem(request.key, request.value)});
        break;
      case 'removeItem': // 指定されたkeyの値を削除
        sendResponse({data: localStorage.removeItem[request.key]});
        break;
      case 'clearAll' : //　すべてのデータを削除
        sendResponse({data: localStorage.clear()});
        break;
      default:
        console.log('no method');
        break;
    }
  });