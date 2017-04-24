//背景自适应
function bg_size(){
    var bg_w = 1920;
    var bg_h = 800;
    var win_h = $(window).height();
    var win_w = $(window).width();
    if(bg_h/bg_w >= win_h/win_w){
        $('.sbg').attr('style',"width:100%;position:absolute;left:0;top:50%;margin-top:-"+bg_h*(win_w/bg_w)/2+"px");
    }else{
        $('.sbg').attr('style',"height:100%;position:absolute;top:0;left:50%;margin-left:-"+bg_w*(win_h/bg_h)/2+"px");
    }
}
//zoom
function zoomForJQuery(eleStr, zoom, center) {
        eleStr = eleStr||'.zoom0';
        if ($(eleStr).length == 0)throw 'DOM is not find';
        this.eleArr = $(eleStr);
        this.zoom = zoom || 1;
        this.center = center === false ? false : true;
        this.isZoom = window.navigator.userAgent.search(/Trident|Chrome/) >= 0 ? true : false;
        this.isChrome = window.navigator.userAgent.search(/Chrome/) >= 0 ? true : false;
        for(var i=0;i < this.eleArr.length; i++){
            this.eleArr[i].initW = this.eleArr.eq(i).width();
            this.eleArr[i].initH = this.eleArr.eq(i).height();
        }
        var _this = this;
        if(!_this.center){
            $('html,body').css({'overflow':'auto','overflow-x':'hidden'});
            $('body').css({'overflow-y':'scroll'});
        }
        this.zoomCtr = function () {
            bg_size();
            for (var i = 0; i < _this.eleArr.length; i++) {
                var parent = $(_this.eleArr[i]).parent();
                var current = $(_this.eleArr[i]);
                var parentW = parent.width();
                var parentH = parent.height();
                var currentW = current[0].initW;
                var currentH = current[0].initH;
                var zoom = null;
                zoom = _this.zoom * (parentW / currentW+parentH / currentH)/2;
                // zoom = _this.zoom * (parentH / currentH);
                if(!_this.center){
                    zoom = _this.zoom * (parentW / currentW);
                }
                if (_this.isZoom) {
                    current.css({
                        position: 'relative',
                        top: 0,
                        left: 0,
                        marginTop: 0,
                        marginLeft: 0,
                        zoom: zoom
                    });
                    if (_this.center) {
                        current.css({position: 'absolute',top: '50%',left: '50%', marginLeft: _this.isChrome?-currentW / 2:(-currentW / 2) * zoom, marginTop: _this.isChrome?-currentH / 2:(-currentH / 2) * zoom});
                    }else{

                        if(parent[0].tagName == 'BODY' || parent[0].tagName == 'HTML')console.warn('zoomForJQuery:Parent element cannot be BODY or HTML,Not supported IE!!');
                        else{
                            parent.css({position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto', overflow: 'hidden'});
                        }
                    }

                    $('.zoom-right').css({
                        zoom: zoom*0.7,
                        //marginLeft: _this.isChrome?-$('.zoom-right').width():(-$('.zoom-right').width()) * (zoom),
                        //marginTop: _this.isChrome?-$('.zoom-right').height() / 2:(-$('.zoom-right').height() / 2) * (zoom)

                    });
                    $('.zoom-top').css({
                        zoom: zoom,
                        marginLeft: _this.isChrome?-$('.zoom-top').width()/2:(-$('.zoom-top').width()/2) * (zoom)
                    });
                    $('.zoom-bottom').css({
                        zoom: zoom,
                        marginTop: _this.isChrome?-$('.zoom-bottom').height():(-$('.zoom-bottom').height()) * (zoom),
                        marginLeft: _this.isChrome?-$('.zoom-bottom').width()/2:(-$('.zoom-bottom').width()/2) * (zoom)
                    });
                } else {
                    current.css({
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginLeft: (-currentW / 2),
                        marginTop: (-currentH / 2),
                        webkitTransform: 'scale(' + zoom + ')',
                        mozWebkitTransform: 'scale(' + zoom + ')',
                        msWebkitTransform: 'scale(' + zoom + ')',
                        oWebkitTransform: 'scale(' + zoom + ')',
                        transform: 'scale(' + zoom + ')'
                    });
                    if (!_this.center) {
                        current.css({
                            position: 'relative',
                            top: 0,
                            marginTop: 0,
                            webkitTransformOrigin: 'center 0',
                            mozTransformOrigin: 'center 0',
                            msTransformOrigin: 'center 0',
                            oTransformOrigin: 'center 0',
                            transformOrigin: 'center 0'
                        });
                        parent.css({
                            height: current[0].scrollHeight*zoom
                        });
                    }
                    $('.zoom-right').css({
                        webkitTransform: 'scale(' + zoom + ')',
                        mozWebkitTransform: 'scale(' + zoom + ')',
                        msWebkitTransform: 'scale(' + zoom + ')',
                        oWebkitTransform: 'scale(' + zoom + ')',
                        transform: 'scale(' + zoom + ')',
                        webkitTransformOrigin: 'right center',
                        mozTransformOrigin: 'right center',
                        msTransformOrigin: 'right center',
                        oTransformOrigin: 'right center',
                        transformOrigin: 'right center'

                    });
                    $('.zoom-top').css({
                        webkitTransform: 'scale(' + zoom + ')',
                        mozWebkitTransform: 'scale(' + zoom + ')',
                        msWebkitTransform: 'scale(' + zoom + ')',
                        oWebkitTransform: 'scale(' + zoom + ')',
                        transform: 'scale(' + zoom + ')',
                        webkitTransformOrigin: 'center top',
                        mozTransformOrigin: 'center top',
                        msTransformOrigin: 'center top',
                        oTransformOrigin: 'center top',
                        transformOrigin: 'center top'
                    });
                    $('.zoom-bottom').css({
                        webkitTransform: 'scale(' + zoom + ')',
                        mozWebkitTransform: 'scale(' + zoom + ')',
                        msWebkitTransform: 'scale(' + zoom + ')',
                        oWebkitTransform: 'scale(' + zoom + ')',
                        transform: 'scale(' + zoom + ')',
                        webkitTransformOrigin: 'center bottom',
                        mozTransformOrigin: 'center bottom',
                        msTransformOrigin: 'center bottom',
                        oTransformOrigin: 'center bottom',
                        transformOrigin: 'center bottom'
                    });
                    $('.zoom-left').css({
                        webkitTransform: 'scale(' + zoom + ')',
                        mozWebkitTransform: 'scale(' + zoom + ')',
                        msWebkitTransform: 'scale(' + zoom + ')',
                        oWebkitTransform: 'scale(' + zoom + ')',
                        transform: 'scale(' + zoom + ')',
                        webkitTransformOrigin: 'left center',
                        mozTransformOrigin: 'left center',
                        msTransformOrigin: 'left center',
                        oTransformOrigin: 'left center',
                        transformOrigin: 'left center'
                    });
                }
            }
        };
        $(window).resize(this.zoomCtr);
        $(window).load(this.zoomCtr);
        this.zoomCtr();
}