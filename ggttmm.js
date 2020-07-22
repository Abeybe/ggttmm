
var myLocalStrage;

$(function(){
    var pageUrl=location.href;
    // if(!pageUrl.match("google.com"))return;
    
    console.log("Hello");

    myLocalStrage=localStorage;
    $("div.rc").each(function(){
        var elem=this;
        var url = $(this).find("a").attr("href");        
        var val=(localStorage.getItem("ggttmm:"+url))?localStorage.getItem("ggttmm:"+url).replace("ggttmm:",""):"";  
        var formHtml=
            "<form class='myForm' "+((val=="")?"style='display:none'":"style='display:block'")+"' >"+
                "<input type='text' class='myText' placefolder='' value='"+val+"' />"+
                "<input type='button' class='myButton' value='保存' />"+
                "<input type='text' class='myHiddenText' style='display:none' />"+
                "<input type='hidden' class='myHidden' value='"+url+"' />"+
            "</form>";
        $(elem).parent().prepend(formHtml);
    });    

    // $(".myForm").submit(function(e){
    //     return e.preventDefault(); 
    // });    
});

$(".myText").keydown=function(e){
    console.log("Press:"+e);
    var key=e.keyCode || e.which;
    if(key==13){
        changeStorage(e);
        document.activeElement.blur();
    }
}
$(".myButton").on("click",function(e){
    changeStorage(e.parent());
});

function changeStorage(element){
    console.log("Chaneg Status!!!");
    var url=$(element).find(".myHidden").val();
    var text=$(element).find(".myText").val();
    if(text==null || text==""){
        localStorage.removeItem("ggttmm:"+url);
    }else{
        localStorage.setItem("ggttmm:"+url,text);
    }
}

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {    
      console.log(request.greeting);
      switch(request.greeting){
        case "changeHiddenStatus":changeHiddenStatus();
            break;
        case "getLocalStorage":sendResponse({farewell:localStorage});
            break;
        default:break;
      }
      if (request.greeting == "getLocalStorage")
        return;
      else
        sendResponse({}); 
    }
  );

  function changeHiddenStatus(){
    $(".myForm").css("display","block");  
  }