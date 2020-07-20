window.onload=function(){
    var text="<table>";
    console.log(localStorage,typeof(localStorage));
    for(var key in localStorage){
        console.log(key,localStorage[key]);        
        console.log(localStorage.getItem(key));
        // if(localStorage.getItem(key).indexOf("ggttmm:")===0){
            text+=(
                "<tr><td>"+key+"</td>"+
                "<td>"+localStorage.getItem(key)+"</td></tr>"
            );
        // }
    }
    text+="</table>";
    $("body").prepend(text);
};