var num = 0;

var dropDown = function(o){
	// default options
	var defaults = {};

	o = $.extend({},defaults,o);

	var $options = $(o.oC),
		$visibleValue = $(o.vC),
		$hiddenValue = $(o.hC),
		$fnBtn = $(o.cC),
		_slef = this;

	this.o = o;

	this.stateEdit = false;
	this.stateDrop = false;
	this.phValue = '';
	this.pvValue = '';
	this.value = '';

	//  多个下拉选项出现错位

	num += 1;
	$(this.o.op).css('z-index',num);
	
	$options.click(function(){
		var tValue = $(this).attr('data-value');
		_slef.close();
		$visibleValue.text($(this).text());
		$hiddenValue.val(tValue);
		_slef.value = tValue;
	});


	$fnBtn.click(function(){
		_slef.stateDrop ? _slef.close() : _slef.open();
	});


}
dropDown.prototype = {
	constructor:dropDown,
	edit:function(){
		this.o.dropStyle();
		this.stateEdit = true;
		this.phValue = $(this.o.hC).val();
		this.pvValue = $(this.o.vC).text();
	},
	cancelEdit:function(){
		this.o.normalStyle();
		this.close();
		this.stateEdit = false;
		$(this.o.hC).val(this.phValue);
		$(this.o.vC).text(this.pvValue);
		this.value = this.phValue;
	},
	confirmEdit:function(){
		this.o.normalStyle();
		this.close();
		this.stateEdit = false;
	},
	open:function(){
		if(!this.stateEdit) return;
		this.o.openStyle();
		this.stateDrop = true;
	},
	close:function(){
		if(!this.stateEdit) return;
		this.o.closeStyle();
		this.stateDrop = false;
	}
} 