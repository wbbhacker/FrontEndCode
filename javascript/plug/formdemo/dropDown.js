var dropDown = function(o) {
    // default options
    var defaults = {};

    o = $.extend({}, defaults, o);

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


    $options.click(function() {
        var tValue = $(this).attr('data-value');
        _slef.close();
        $visibleValue.text($(this).text());
        $hiddenValue.val(tValue);
        _slef.value = tValue;
        if (o.callback)
            o.callback(tValue);
    });

    $fnBtn.click(function() {
        _slef.stateDrop ? _slef.close() : _slef.open();
    });



    $('body').click(bindclose);


    function bindclose() {
        console.log("body click");
        _slef.close();
    }


}
dropDown.prototype = {
    constructor: dropDown,
    edit: function() {
        this.o.dropStyle();
        this.stateEdit = true;
        this.phValue = $(this.o.hC).val();
        this.pvValue = $(this.o.vC).text();
    },
    cancelEdit: function() {
        this.o.normalStyle();
        this.close();
        this.stateEdit = false;
        $(this.o.hC).val(this.phValue);
        $(this.o.vC).text(this.pvValue);
        this.value = this.phValue;
    },
    confirmEdit: function() {
        this.o.normalStyle();
        this.close();
        this.stateEdit = false;
    },
    open: function() {
        var _slef = this;

        // setTimeout 是为了解决两个同时存在时，先让它冒泡，在禁止它冒泡
        setTimeout(function() {

            if (!_slef.stateEdit) return;
            _slef.o.openStyle();
            _slef.stateDrop = true;
            $(_slef.o.op).click(_slef.stopPor);

        }, 10);

    },
    close: function() {
        var _slef = this;
        if (!this.stateEdit) return;
        this.o.closeStyle();
        this.stateDrop = false;
        $(this.o.op).unbind('click', this.stopPor);

    },
    stopPor: function(e) {
        e.stopPropagation();
    }
}
