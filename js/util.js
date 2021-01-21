/**
 *  example)
 *  key word: "남자 겨울 바지"
 *  some matching results: "남자 겨울바지","남자겨울 바지","남자겨울바지""남자 겨울 바지"
 *                         "남 자겨 울바 지", "남 자 겨 울 바 지"
 */
const isMatch=(base,keyword_)=>{
    const keyword=keyword_.replaceAll(" ","");
    for(let i = 0 ; i < base.length;i++){
        let j;
        let pass;
        for(j=0,pass=0;j<keyword.length;j++){
            if(base[i+j+pass]===' ') {
                pass++; 
                j--;
                continue;
            }
            if(base[i+j+pass]!==keyword[j]) break;
        }
        if(keyword.length===j) return true;
    }
    return false;
};

module.exports = {
    isMatch
};