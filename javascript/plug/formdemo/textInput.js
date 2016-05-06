function textInput (o){

	var textInput = function(o){
		// default options
		var defaults = {};

		o = $.extend({},defaults,o);

		var backObj = {
			value:'',
			edit:edit,
			ableEdit:ableEdit,
			unableEdit:unableEdit,
			cancelEdit:cancelEdit,
			confirmEdit:confirmEdit
		};

		var $hiddenValue = $(o.hC),
			$visibleValue = $(o.vC),
			$editingValue = $(o.iC);
		backObj.value = $visibleValue.text();

		function edit(cb){
			
			o.editStyle();

			$editingValue.val(backObj.value);

			if(cb) cb();

		}

		function ableEdit(cb){
			o.ableStyle();
			if(cb) cb();
		}

		function unableEdit(cb){
			o.unableStyle();
			if(cb) cb();
		}	

		function cancelEdit(cb){
			o.normalStyle();
			$hiddenValue.val(backObj.value);
			if(cb) cb();
		}

		function confirmEdit(cb){
			backObj.value = $(o.iC).val();
			o.normalStyle();
			$hiddenValue.val(backObj.value);
			$visibleValue.text(backObj.value);
			if(cb) cb();
			}
		function init(cb){
			o.normalStyle();
			$hiddenValue.val(backObj.value);
			if(cb) cb();

		}

		init();

		return backObj;

	}(o)
	return textInput;
}

//  被赋值的变量名不能有ID相同

// 增加状态属性 （这个还未增加呢）