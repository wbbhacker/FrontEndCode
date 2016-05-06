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
	this.value = '';
	this.prevValue = $visibleValue;


	$options.click(function(){
		var tValue = $(this).attr('data-value');
		_slef.close();
		$visibleValue.text($(this).text());
		$hiddenValue.val(tValue);


		_slef.value = tValue;
		console.log(_slef)
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
	},
	cancelEdit:function(){
		this.o.normalStyle();
		this.close();
		this.stateEdit = false;
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