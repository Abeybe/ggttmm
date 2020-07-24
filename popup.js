const APPTAG="[ggttmm]:";
var colors=["blue","green","yellow","red"];

window.onload=function(){
    chrome.storage.sync.get(function(items){     
        var tableText="";
        var forCount=0;
        for(key in items){
            console.log(key,items[key]);
            if(key && key.indexOf(APPTAG)==0){
                var memo=(items[key])?(items[key].length>0)?items[key][0]:items[key]:"";
                var search=(items[key])?(items[key].length>1)?items[key][1]:items[key]:"";
                var title=(items[key])?(items[key].length>2)?items[key][2]:items[key]:url;
                var url=key.replace(APPTAG,"");
                tableText+=(
                    "<div class='memo "+colors[forCount%colors.length]+"'>"+
                        "<div class='title'>"+
                            "<form class='myForm' >"+
                                "<input type='text' class='myText' value='"+memo+"' placeholder='Enter/更新で削除' disabled/>"+
                                "<input type='text' class='myHiddenURL' value='"+url+"' style='display:none' />"+
                                "<input type='hidden' class='myHiddenSearch' value='"+search+"' style='display:none' />"+
                                "<input type='hidden' class='myHiddenTitle' value='"+title+"' style='display:none' />"+
                                "<input type='button' class='myButton' value='編集' />"+
                            "</form>"+
                        "</div>"+
                        "<div class='links'>"+
                            "<div>Search Words</div><a href='https://www.google.com/search?q="+search+"' target='_blank'>"+search+"</a>"+
                            "<div>Site Link</div><a href='"+url+"' target='_blank'>"+title+"</a>"+
                        "</div>"+
                    "</div>"
                );
            }
            forCount++;
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
        if($(this).val()=="編集"){
            $(this).parent().find(".myText").prop("disabled",false);
            $(this).val("更新");
            $(this).toggleClass("check");
        }else if($(this).val()=="更新"){
            changeStorage($(this).parent());
        }
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
                $(element).find(".myText").prop("disabled",true);
                $(element).find(".myButton").toggleClass("check");
                $(element).find(".myButton").val("編集");
            });
        })
    }
}