(function() {

    C3D.createBucket = createBucket;

    function createBucket(imgArr, width) {

        var bucket = new C3D.Sprite();
        var len = imgArr.length;
        var radian = Math.PI * 2 / 20 * i; // 旋转的弧度
        var angle = 360 / 20 * i; // 旋转的角度数
        var radius = calTranslateZ(width, len);


        for (var i = 0; i < len; i++) {
            var plane = new C3D.Plane();
            var radian = Math.PI * 2 / 20 * i; // 旋转的弧度
            var angle = 360 / 20 * i; // 旋转的角度数
            plane.size(134, 1165).position(Math.sin(radian) * radius, 0, -Math.cos(radian) * radius).rotation(0, -angle, 0).material({
                image: imgArr[i],
                repeat: 'no-repeat',
            }).update();
            bucket.addChild(plane);
        }
        return bucket;

    }

    /**
     @method 计算圆桶半径
     @param width 每份宽度
     @param sum 总份数
     @return  半径
    */

    function calTranslateZ(width, sum) {
        return Math.round(width / (2 * Math.tan(Math.PI / sum)));
    }

})()
