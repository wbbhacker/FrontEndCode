(function() {

    var originTouchPos = {
            x: 0,
            y: 0
        },
        prevTouchPos = {
            x: 0,
            y: 0
        },
        newTouchPos = {
            x: 0,
            y: 0
        },
        firstDir = "",
        originTime = 0,
        oldTime = 0,
        newTime = 0,
        dx = 0,
        dy = 0,
        ax = 0,
        ay = 0,
        time = 0;

    var proObj = {};
    var callbacks;

    function touchTime(elem, opt) {

        var el = document.getElementById(elem);
        callbacks = opt;
        el.addEventListener('touchstart', onTouchStart, false);
        el.addEventListener('touchmove', onTouchMove, false);
        el.addEventListener('touchend', onTouchEnd, false);
    }

    function onTouchStart(t) {
        firstDir = "",
            t = t.changedTouches[0];
        originTouchPos.x = prevTouchPos.x = newTouchPos.x = t.clientX;
        originTouchPos.y = prevTouchPos.y = newTouchPos.y = t.clientY;
        originTime = oldTime = newTime = Date.now();
        dx = dy = ax = ay = 0;

        if (callbacks.onStart) callbacks.onStart();

    };


    function onTouchMove(t) {

        t = t.changedTouches[0];
        newTouchPos.x = t.clientX;
        newTouchPos.y = t.clientY;
        newTime = Date.now();
        combination();
        checkGesture();

        prevTouchPos.x = newTouchPos.x;
        prevTouchPos.y = newTouchPos.y;
        oldTime = newTime;

    };

    function onTouchEnd() {
        var t = (newTime - oldTime) / 1e3;
        newTime = Date.now();
        if (callbacks.onEnd) callbacks.onEnd();
    }

    function checkGesture() {

        dx = fixed2(newTouchPos.x - originTouchPos.x),
            dy = fixed2(newTouchPos.y - originTouchPos.y),
            ax = fixed2(newTouchPos.x - prevTouchPos.x),
            ay = fixed2(newTouchPos.y - prevTouchPos.y),
            time = (newTime - oldTime) / 1e3,
            "" == firstDir && (Math.abs(ax) > Math.abs(ay) ? firstDir = "x" : Math.abs(ax) < Math.abs(ay) && (firstDir = "y"));
        if (callbacks.onMove) callbacks.onMove(proObj);

    }

    function combination() {
        proObj.originTouchPos = originTouchPos;
        proObj.prevTouchPos = prevTouchPos;
        proObj.newTouchPos = newTouchPos;
        proObj.firstDir = firstDir;
        proObj.originTime = originTime;
        proObj.oldTime = oldTime;
        proObj.newTime = newTime;
        proObj.newTime = newTime;
        proObj.dx = dx;
        proObj.dy = dy;
        proObj.ax = ax;
        proObj.ay = ay;
        proObj.time = time;
    }

    function fixed2(t) {
        return Math.floor(100 * t) / 100
    }


    window.touchTime = touchTime;
})()
