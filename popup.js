const APPTAG="[ggttmm]:";
var colors=["blue","green","yellow","red"];

window.onload=function(){
    writeNote();
}

function writeNote(){
    chrome.storage.sync.get(function(items){     
        chrome.storage.sync.getBytesInUse(function(val){
            var tableText=
                "<div class='memories' >"+
                    "<p>"+Object.keys(items).length+" Memos / "+chrome.storage.sync.MAX_ITEMS+" (Max Items)</p>"+
                    "<p>"+val/1000+" KB / "+chrome.storage.sync.QUOTA_BYTES/1000+" KB (Max Storage)</p>"+
                "</div>"+
                "<form class='search'>"+
                    "<input type='text' class='searchWords' placeholder='Memo Search' />"+
                    "<input type='text' style='display:none' />"+
                "</form>"
                ;
            var forCount=0;

            var sort1={};
            for(var key in items)if(items[key] && items[key]["time"])sort1[key]=items[key]["time"];
            var sort2=[];
            for(var key in sort1)sort2.push(key);
            function compare(a,b){
                return sort1[b]-sort1[a];
            }
            sort2.sort(compare);
            
            for(var i=0;i<sort2.length;i++) {//key in items){
                var key=sort2[i];

                if(key && key.indexOf(APPTAG)==0 ){//&& (searchWords==null || items[key][0].match(searchWords))){
                    // if(Object.prototype.toString.call(items[key]) === "[object Array]"){
                    //     var memo=(items[key])?(items[key].length>0)?items[key][0]:items[key]:"";
                    //     var search=(items[key])?(items[key].length>1)?items[key][1]:items[key]:"";
                    //     var title=(items[key])?(items[key].length>2)?items[key][2]:items[key]:url;
                    //     var time=new Date().getTime();
                    //     chrome.storage.sync.set({[key]:{"text":memo,"search":search,"title":title,"time":time}},function(){});
                    // }
                    console.log(key,items[key]);
                    var memo=(items[key]["text"])?items[key]["text"]:"";
                    var search=(items[key]["search"])?items[key]["search"]:"";
                    var title=(items[key]["title"])?items[key]["title"]:"";
                    var time=(items[key]["time"])?items[key]["time"]:"";
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
                                "<a class='pageLink' href='https://www.google.com/search?q="+search+"' target='_blank'>"+
                                    "<img class='linkIcon' src='source/search.png'/>"+
                                    search+"</a>"+
                                "<a class='pageTitle' href='"+url+"' target='_blank'>"+
                                    "<img class='linkIcon' src='source/openPage.png'/>"+
                                    title+"</a>"+
                            "</div>"+
                        "</div>"
                    );
                }
                forCount++;
            }
            $("body").append(tableText);
            setEvent();
        });
    } );
}

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
    // $(".searchWords").on("click",function(){
    //     let KEvent = new KeyboardEvent( "keydown", {  ctrlKey: true, altKey:false, shiftKey: false,key:"f"});
    //     document.dispatchEvent( KEvent );
    // });
    $(".searchWords").on("keypress",function(e){
        var key=e.keyCode || e.which;
        if(key==13){
            var bodyHeight=$("body").height();
            var searchWords=$(this).val();//.split(/[\u{20}\u{3000}]/u);
            console.log(searchWords);
            $("div.memo").each(function(){
                var text=
                    $(this).find(".myText").val()+
                    $(this).find(".pageLink").text()+
                    $(this).find(".pageTitle").text();
                if(text.match(searchWords)){
                    $(this).css("display","inline-block");
                }else{
                    $(this).css("display","none");
                }
            });
            $("body").height(bodyHeight);
            document.activeElement.blur();
        }
    });
}

function changeStorage(element){
    var url=$(element).find(".myHiddenURL").val();
    var key=APPTAG+url;
    var text=$(element).find(".myText").val();
    var search=$(element).find(".myHiddenSearch").val();
    var title=$(element).find(".myHiddenTitle").val();
    var time=new Date().getTime();
    if(text==null || text==""){
        chrome.storage.sync.remove(key,function(){});
        location.reload();
    }else{
        chrome.storage.sync.get(key,function(item){
            chrome.storage.sync.set({[key]:{"text":text,"search":search,"title":title,"time":time}},function(){
                console.log("Updated");
                $(element).find(".myText").prop("disabled",true);
                $(element).find(".myButton").toggleClass("check");
                $(element).find(".myButton").val("編集");
            });
        })
    }
}