
$(function(){
    $("div.rc").each(function(){
        var elem=this;
        var url = $(this).find("a").attr("href");        
        var val=(localStorage.getItem("ggttmm:"+url))?localStorage.getItem("ggttmm:"+url).replace("ggttmm:",""):"";  
        var formHtml=
            "<form class='myForm' "+((val=="")?"style='display:none'":"style='display:block'")+"' >"+
                "<input type='text' class='myText' placefolder='' value='"+val+"' />"+
                "<input type='submit' class='myButton' value='保存' />"+
                "<input type='hidden' class='myHidden' value='"+url+"' />"+
            "</form>";
        $(elem).parent().prepend(formHtml);
    });    

    $(".myForm").submit(function(e){
        var url=$(this).find(".myHidden").val();
        var text=$(this).find(".myText").val();
        if(text==null || text==""){
            localStorage.removeItem("ggttmm:"+url);
        }else{
            localStorage.setItem("ggttmm:"+url,text);
        }
        document.activeElement.blur();
        return e.preventDefault(); 
    });    
});

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {    
      console.log(request.greeting);
      $(".myForm").css("display","block");  
      if (request.greeting == "hello")
        sendResponse({farewell: "goodbye"});
      else
        sendResponse({}); 
    }
  );