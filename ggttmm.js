const APPTAG="[ggttmm]:";

$(function(){
    var eachCount=0;
    var eachCount=($("div.rc")).length-1;
    $("div.rc").each(function(){
        var elem=this;
        var url = $(this).find("a").attr("href");
        var title=$(this).find("h3").html();
        chrome.storage.sync.get(APPTAG+url,function(item){
            var key=APPTAG+url;
            val=(item[key])?(item[key].length>0)?item[key][0]:item[key]:"";
            var formHtml=
                "<form class='myForm' "+((val=="")?"style='display:none'":"style='display:block'")+"' >"+
                    "<input type='text' class='myText' placefolder='' value='"+val+"' />"+
                    "<input type='button' class='myButton' value='保存'  />"+
                    "<input type='text' class='myHiddenText' style='display:none' />"+
                    "<input type='hidden' class='myHiddenURL' value='"+url+"' />"+
                    "<input type='hidden' class='myHiddenTitle' value='"+title+"' />"+
                "</form>";
            $(elem).parent().prepend(formHtml);
            if(eachCount==0)setEvent();
            eachCount--;
        });
    });    
});

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
    var title=$(element).find(".myHiddenTitle").val();
    var text=$(element).find(".myText").val();
    var search=$("input.gLFyf").val();
    if(text==null || text==""){
        chrome.storage.sync.remove(APPTAG+url,function(){});
    }else{
        chrome.storage.sync.set({[APPTAG+url]:[text,search,title]},function(){});
    }
}

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {   
        switch(request.greeting){
            case "changeHiddenStatus":
                changeHiddenStatus();
                break;
            default:break;
        }
        sendResponse({}); 
    }
  );

  function changeHiddenStatus(){
    $(".myForm").css("display","block");  
  }