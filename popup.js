window.onload=function(){
    var text="<table>";
    var myLocalStorage=chrome.extension.getBackgroundPage().getLocalStorage();
    console.log(myLocalStorage);
    for(var key in myLocalStorage){
        console.log(key,myLocalStorage[key]);        
        console.log(myLocalStorage.getItem(key));
        if(myLocalStorage.getItem(key).indexOf("ggttmm:")===0){
            text+=(
                "<tr><td>"+key+"</td>"+
                "<td>"+myLocalStorage.getItem(key)+"</td></tr>"
            );
        }
    }
    text+="</table>";
    $("body").prepend(text);
};