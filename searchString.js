function loadBook(fileName,displayName){
    var currentBook="";
    var url="Books/"+fileName;
    //reset UI
    document.getElementById('filename').innerHTML=displayName;
    document.getElementById('searchstat').innerHTML="";
    document.getElementById('keyword').value="";
    //browser request
    var xhr=new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.send();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            currentBook=xhr.responseText;
            docStats(currentBook);
            currentBook=currentBook.replace(/(?:\r\n|\r|\n)/g,'<br>')
            document.getElementById('filecontent').innerHTML=currentBook;
            var element=document.getElementById('filecontent');
            element.scrollTop=0;
        }
    }
}
function docStats(fileContent){
    var commonWords=[];
    var docLength=document.getElementById('docLength');
    var wordCount=document.getElementById('wordCount');
    var charCount=document.getElementById('charCount');
    var text=fileContent.toLowerCase();
    docLength.innerText="Document length "+ text.length;
    var wordArray=text.match(/\b\S+\b/g);
    wordCount.innerText="Document words: "+wordArray.length
    var wordDictionary={};
    /*
     var uncommonWords=[];
    //count every word in the word array
    //filtering
    
      uncommonWords=filterStopWords(wordArray);
      */
    for(let word in wordArray){
        let wordValue=wordArray[word];
        
        
        if(wordDictionary[wordValue]>0){
            wordDictionary[wordValue]+=1;
        }
        else{
            wordDictionary[wordValue]=1;

        }
    
}

    let wordList=sortProperties(wordDictionary);
//top 5 words
var top5Words=wordList.slice(0,6);
//least 5 words
var least5Words=wordList.slice(-6,wordList.length);
ULTemplate(top5Words,document.getElementById('mostused'));
ULTemplate(least5Words,document.getElementById('leastused'));
    
}


function sortProperties(obj ){
    //convert it to array
   
    
   let  rtnArray=Object.entries(obj);
 
  
    //sort the array
    rtnArray.sort(function(first,second){
        return second[1]-first[1];


    });
    return rtnArray;

}
function ULTemplate(items,element){
    let rowTemplate=document.getElementById('template-ul-items');
    let templateHtml=rowTemplate.innerHTML;
    let resultsHtml="";
    for(i=0;i<items.length-1;i++){
        resultsHtml+=templateHtml.replace('{{val}}',items[i][0]+":"+items[i][1]+"time(s)");
    }
    element.innerHTML=resultsHtml;
}
/*
function filterStopWords(wordArray){
    var commonWords=getStopWords();
    var commonObj={};
    var uncommonArr=[];
    for(i=0;i<commonWords.length;i++){
        commonObj[commonWords[i].trim()]=true;


    }
    for(i=0;i<wordArray.length;i++){
      let   word=wordArray[i].trim().toLowerCase;
        if(!commonObj[word]){
        uncommonArr.push(word);

        }

    }
    return uncommonArr;
}

function getStopWords(){
    return ["the","a"]

}
*/
function performMark(){
    var keyWord=document.getElementById('keyword').value;
    var display=document.getElementById('filecontent');
    var newContent="";
    let spans=document.querySelectorAll('mark');
    /*
    for(i=0;i<spans.length;i++){
        spans[i].outerHTML=spans[i].innerHTML;

    }
    */
    var re=new RegExp(keyWord,"gi");
    var replaceText="<mark id='markme'>$&</mark>"
    var bookContent=display.innerHTML;
    newContent=bookContent.replace(re,replaceText);
    display.innerHTML=newContent;
    var count=document.querySelectorAll('mark').length;
    document.getElementById('searchstat').innerHTML="found "+count+" matches";
    if(count>0){
        document.getElementById('markme').scrollIntoView();
    }

}