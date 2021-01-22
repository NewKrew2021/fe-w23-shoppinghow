/**
 *  example)
 *  key word: "남자 겨울 바지"
 *  some matching results: "남자 겨울바지","남자겨울 바지","남자겨울바지""남자 겨울 바지"
 *                         "남 자겨 울바 지", "남 자 겨 울 바 지"
 */
const isMatch=(base,keyword_)=>{
    //keyword:"남자겨울바지"
    //reduced:"남 ?자 ?겨 ?울 ? 바 ?지 ?"
    const keyword=keyword_.replaceAll(" ","");
    const mapped=Array.prototype.map.call(keyword,(c)=>c+" ?");
    const reduced=mapped.reduce((acc,cur)=> acc+cur,"");
    const reg = new RegExp(reduced);
    return reg.test(base);
};

module.exports = {
    isMatch
};