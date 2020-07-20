
$(function(){
    // console.log(localStorage);
    $("div.rc").each(function(){
        var elem=this;
        var url = $(this).find("a").attr("href");
        getStorageA("ggttmm:"+url).then(function(storageVal){
            // console.log("1. "+storageVal);
            var val=(storageVal)?storageVal.replace("ggttmm:",""):"";  
            var formHtml=
                "<form class='myForm' "+((val=="")?"style='display:none'":"style='display:block'")+"' >"+
                    "<input type='text' class='myText' placefolder='' value='"+val+"' />"+
                    "<input type='submit' class='myButton' value='保存' />"+
                    "<input type='hidden' class='myHidden' value='"+url+"' />"+
                "</form>";
                // console.log(formHtml);
            $(elem).parent().prepend(formHtml);
        });
    });    

    $(".myForm").on("submit",function(e){
        var url=$(this).find(".myHidden").val();
        // console.log(url);
        alert();
        var text=$(this).find(".myText").val();
        $(this).find(".myText").val(text);
        $(this).off("submit");
        if(text==null || text==""){
            removeStorage(url).then(function(){
                document.activeElement.blur();
                return e.preventDefault(); 
                // return false;
            });
        }else{
            setStorage("ggttmm:"+url,text).then(function(){
                document.activeElement.blur();
                return e.preventDefault(); 
                // return false;
            });
        }
        return e.preventDefault(); 
        // document.activeElement.blur();
        // return e.preventDefault(); 
    });    
});

// var ret;

// function getStorage(_key){
//     ret="";
//     // chrome.runtime.sendMessage({method:"getItem",key:_key},function(response){
//     //     getStorage.ret=response.data;
//     //     console.log("1."+ret);
//     // });
//     await getStorage2(_key);
//     console.log("2."+ret);
//     return ret;
// }

async function getStorage(_key){
    // return getStorage1();
    // ret="NODATA";
    getStorageA(_key).then(function(res){
        // ret=value;
        // console.log("1. "+_key,res);
        storageVal=res;
        return res;
    });
    // return ret;
}

function getStorageA(_key){
    return new Promise(function(resolve){
        chrome.runtime.sendMessage({method:"getItem",key:_key},function(response){
        // ret=(response.data)?response.data:"";
        // console.log("1."+ret);
        resolve(response.data);
    });
})
    // return ret;
}

function setStorage(_key,_value){
    return new Promise(function(resolve){
        chrome.runtime.sendMessage({method:'setItem',key:_key,value:_value},function(){;});
        resolve();
    });
}

function removeStorage(_key){
    return new Promise(function(resolve){
        chrome.runtime.sendMessage({method:'removeItem',key:_key},function(){;});
        resolve();
    });
}

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