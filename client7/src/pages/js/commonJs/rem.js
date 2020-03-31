!(function(document,window){
    function setHtmlFontSize(){
        const oHtml = document.documentElement;
        const oHtmlWidth = oHtml.getBoundingClientRect().width;
        if(oHtmlWidth<800){
            oHtml.style.font = oHtmlWidth/20+'px';
        }
    }
})(document,window);