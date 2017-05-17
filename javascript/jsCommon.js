/**
 *  myLibrary
 *  -----------------------------
 *  作者：小斌
 *  时间：2014-11-06
 *  准则：JS原型
 *  一张网页，要经历怎样的过程，才能抵达用户面前
 *  一个特效，要经历这样的修改，才能让用户点个赞
 *  一个产品，创意源于生活，源于内心，需要慢慢品味
 *********************************************************************************************/
/**
 * @param  {DOM}     poNode       父元素
 * @param  {类名}    psClass      需获取的子元素类名
 */
function getElementsByClassName(poNode,psClass){
	if( poNode.getElementsByClassName )
		 return poNode.getElementsByClassName(psClass)
	var toAryElem = [];
	var toAllElem = poNode.getElementsByTagName("*");
	for( var i = 0; i < toAllElem.length; i++){
		 if( -1 != toAllElem[i].className.indexOf(psClass) )
		     toAryElem.push(toAllElem[i])
	}
	return toAryElem;
}



