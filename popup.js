const APPTAG="[ggttmm]:";

window.onload=function(){
    chrome.storage.sync.get(function(items){     
        var tableText=
            "<table class='ggttmmTable'>"+
            "<tr><th>Memo</th><th>Final Search Words</th><th>Site Name</th></tr>";
        for(key in items){
            console.log(key,items[key]);
            if(key && key.indexOf(APPTAG)==0){
                var memo=(items[key])?(items[key].length>0)?items[key][0]:items[key]:"";
                var search=(items[key])?(items[key].length>1)?items[key][1]:items[key]:"";
                var title=(items[key])?(items[key].length>2)?items[key][2]:items[key]:url;
                var url=key.replace(APPTAG,"");
                tableText+=(
                    "<tr>"+
                        "<td><form>"+
                            "<input type='text' class='myText' value='"+memo+"' placeholder='Enter/更新で削除' />"+
                            "<input type='text' class='myHiddenURL' value='"+url+"' style='display:none' />"+
                            "<input type='hidden' class='myHiddenSearch' value='"+search+"' style='display:none' />"+
                            "<input type='hidden' class='myHiddenTitle' value='"+title+"' style='display:none' />"+
                            "<input type='button' class='myButton' value='更新' />"+
                        "</form></td>"+
                        "<td><a href='https://www.google.com/search?q="+search+"' target='_blank'>"+search+"</a></td>"+
                        "<td><a href='"+url+"' target='_blank'>"+title+"</a></td>"+
                    "</tr>"
                );
            }
        }
        $("body").append(tableText);
        setEvent();
    } );
};

function setEvent(){
    $(".myText").on("keypress",function(e){
        var key=e.keyCode || e.which;
        if(key==13){
            changeStorage($(this).parent());
            document.activeElement.blur();
        }
    });
    $(".myButton").on("click",function(e){
        changeStorage($(this).parent());
    });
}

function changeStorage(element){
    var url=$(element).find(".myHiddenURL").val();
    var key=APPTAG+url;
    var text=$(element).find(".myText").val();
    var search=$(element).find(".myHiddenSearch").val();
    var title=$(element).find(".myHiddenTitle").val();
    console.log(key,text,search,title);
    if(text==null || text==""){
        chrome.storage.sync.remove(key,function(){});
    }else{
        chrome.storage.sync.get(key,function(item){
            chrome.storage.sync.set({[key]:[text,search,title]},function(){
                console.log("Updated");
            });
        })
    }
}