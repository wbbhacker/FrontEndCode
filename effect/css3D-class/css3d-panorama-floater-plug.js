// w 宽度
// h 高度
// imgUrl 图片的url
// radian 旋转的弧度
// radius 旋转半径

(function() {
    C3D.createFloater = createFloater;


    function createFloater(w, h, imgUrl, radian, radius) {

        var plane = new C3D.Plane();
        var angle = 360 * radian / (2 * Math.PI); // 旋转的角度数    

        plane.size(w, h).position(Math.sin(radian) * radius, 0, -Math.cos(radian) * radius).rotation(0, -angle, 0).material({
            image: imgUrl,
            repeat: 'no-repeat',
        }).update();

        return plane;

    }

})()
