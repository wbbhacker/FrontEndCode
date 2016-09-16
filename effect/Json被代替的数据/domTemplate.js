
/*
poConf {
	bind:domTemplate,
}

clone 方法:
poConf.clone(填充的数据);
*/
var domTemplate = function(poConf) {

/*
	exm:
	<a href="123123" data-datafill='{"domattr":"href", "dataattr":"href"}'>
	<div class="menu_item">
	<div class="menu_item_img"><img src="123123" alt="" style="width:100%;" data-datafill='{"domattr":"src", "dataattr":"src"}' /></div>
	<div class="menu_item_text">
	<p data-datafill='{"domattr":"innerHTML", "dataattr":"name"}'>32123123</p>
	<p>价格 :￥<span data-datafill='{"domattr":"innerHTML", "dataattr":"price"}'>123123</span></p>
	</div>
	</div>
	</a>


	dom.dataset['datafill']: 填充格式
	{"domattr":dom属性, "dataattr":数据属性}
*/
	domTemplate.fillData = function(poDom, poData) {
		do {
			if (poDom.nodeType != 1)
				continue;

			if (poDom.dataset['datafill']) {
				var toDatafill = JSON.parse(poDom.dataset['datafill']);
				if (poData[toDatafill['dataattr']]) {
					poDom[toDatafill['domattr']] = poData[toDatafill['dataattr']];
					delete poDom.dataset.datafill;
				}
			}

			for (var i = 0; i < poDom.children.length; i++) {
				domTemplate.fillData(poDom.children[i], poData);
			}
		}
		while(poDom = poDom.nextSibling);
	}
	
	poConf.bind.parentElement.removeChild(poConf.bind); //只是在父元素上移除节点
	poConf.bind.className = poConf.bind.className.replace('item_template', '');
	poConf.bind.id = '';
	
	poConf.clone = function(poData) {
		var toNewItem = this.bind.cloneNode(true);
		domTemplate.fillData(toNewItem, poData);
		return toNewItem;
	}
	
	return poConf;
}