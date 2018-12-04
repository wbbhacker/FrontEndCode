this.pixiUtil = {};

(function() {

    /*
    
    img/frame/flower/flower0.png 0-18

    flower = createAnimatedSprite('img/frame/flower/flower',17,{
            x:0,
            y:0,
            animationSpeed:0.1,
            Zidx:100
    }); 

    flower.play();

    */

    pixiUtil.createAnimatedSprite = function(name, num, opt, ext) {

        ext = ext || '.png';
        var Textures = [],
            i, AnimatedSpriteInstance;
        for (i = 0; i < num; i++) {
            var Texture = PIXI.Texture.fromImage(name + i + ext);

            Textures.push(Texture);
        }

        AnimatedSpriteInstance = new PIXI.extras.AnimatedSprite(Textures);
        _.forIn(opt, function(value, key) {
            AnimatedSpriteInstance[key] = value;
        });
        return AnimatedSpriteInstance;

    };


    /*
        retrun 图片数组
    */

    pixiUtil.makeImgArray = function(url_prev, number, ext) {
        var imgArray = [];
        var i = 0;
        ext = ext || '.png';

        for (; i < number; i++) {
            var imgUrl = url_prev + i + ext;
            imgArray.push(imgUrl);
        }
        return imgArray;
    };



    pixiUtil.Sprite = function(url) {
        return new PIXI.Sprite(new PIXI.Texture.fromImage(url));
    };

    /*
        data.objData = [
                {
                    name:'tip1',
                    url:'img/content/1.png',
                    type:'Sprite',
                    prop:{
                        x:1706,
                        y:559,
                        interactive:true
                    }                   
                },

                {
                    name:'kv',
                    type:'Container',
                    prop:{
                        width:640,
                        height:1030,
                        y:0,
                        x:0,
                    },
                    children:[
                        {
                            name:'img/kv/kv-bg.jpg',
                            url:'img/kv/kv-bg.jpg',
                            type:'Sprite',
                            prop:{
                                x:0,
                                y:0
                            }                   
                        }
                    ]
                }
        ]
    */
    pixiUtil.layout = function(container, data) {

        dataMap(container, data);

        function dataMap(box, data) {

            _.map(data, function(value, idx) {

                var instance;

                if (value.type == 'Container') {

                    instance = new PIXI.Container();
                    instance.name = value.name;
                    setProp(instance, value.prop);
                    dataMap(instance, value.children);

                }

                if (value.type == 'Sprite') {
                    instance = pixiUtil.Sprite(value.url);
                    instance.name = value.name;
                    setProp(instance, value.prop);
                }

                box.addChild(instance);

                function setProp(obj, prop) {
                    _.forEach(prop, function(value, key) {

                        if (_.isObject(value)) {
                            setProp(obj[key], value);
                            return;
                        }
                        obj[key] = value;
                    });
                }

            });

            return box;
        }
    }

    // touchstart 点击延迟
    pixiUtil.click = function(obj, fn, time) {

        var timer;
        time = time || 200;

        obj.on('touchstart', handle);
        obj.on('touchmove', function() {
            clearTimeout(timer);
        });

        function handle() {
            timer = setTimeout(function() {
                fn();
            }, time);
        }

    }

    /**
     ex: showAn(17082,17482,tip6,left)
     对象在min与max 之间显示
    */

    pixiUtil.showAn = function(min, max, obj, x) {

        //  页面高度已1030 为准 小于或大于1030 时适配
        var wh = document.body.offsetHeight;

        min = min+(1030-wh);
        max = max+(1030-wh);

        var customin = min + 105,
            customax = max - 105;

        if (x > min && x < customin) {
            obj.alpha = 1 / (customin - min) * (x - min);
        }

        if (x < max && x > customax) {
            obj.alpha = 1 / (max - customax) * (max - x);
        }

        if (x <= min) {
            obj.alpha = obj.alpha > 0 ? obj.alpha - 0.01 : obj.alpha;
        }
        if (x >= max) {
            obj.alpha = obj.alpha > 0 ? obj.alpha - 0.02 : obj.alpha;
            // obj.alpha = obj.alpha < 1 ? obj.alpha + 0.01 :  obj.alpha;
        }


    }


    pixiUtil.showAna = function(min, max, obj, x) {
       //  页面高度已1030 为准 小于或大于1030 时适配
        var wh = document.body.offsetHeight;

        min = min+(1030-wh);
        max = max+(1030-wh);


        if (x > min && x < max) {
            obj.alpha = 1 / (max - min) * ((max - min) - (x - min));
        }
        if (x <= min) {
            // obj.alpha = obj.alpha > 0 ? obj.alpha - 0.01 :  obj.alpha;
            obj.alpha = obj.alpha < 1 ? obj.alpha + 0.01 : obj.alpha;
        }
        if (x >= max) {
            obj.alpha = obj.alpha < 1 ? obj.alpha + 0.01 : obj.alpha;
        }

    }

    pixiUtil.showAnb = function(min, max, obj, x) {
        //  页面高度已1030 为准 小于或大于1030 时适配
        var wh = document.body.offsetHeight;
        
        min = min+(1030-wh);
        max = max+(1030-wh);


        if (x > min && x < max) {
            obj.alpha = 1 / (max - min) * (x - min);
        }
        if (x <= min) {
            obj.alpha = obj.alpha > 0 ? obj.alpha - 0.01 : obj.alpha;
        }
        if (x >= max) {
            obj.alpha = obj.alpha < 1 ? obj.alpha + 0.01 : obj.alpha;
        }

    }


    /*  
    otherAn(20829,21340,sprite.scale,'sy',0.5,x);
    otherAn(19800,20000,spirte,'x',200,x);
    */ 


    pixiUtil.otherAn = function(min, max, obj, prop, value, x) {
        //  页面高度已1030 为准 小于或大于1030 时适配
        var wh = document.body.offsetHeight;
        
        min = min+(1030-wh);
        max = max+(1030-wh);


        console.log(min,max)

        if (!obj.flag) {
            obj.orgX = obj.x;
            obj.orgY = obj.y;
            obj.orgScaleX = obj.x;
            obj.orgScaleY = obj.y;
            obj.flag = true;
        }
        var orgValue;
        switch (prop) {
            case 'y':
                orgValue = obj.orgY;
                break;
            case 'x':
                orgValue = obj.orgX;
                break;
            case 'sx':
                orgValue = obj.orgScaleX;
                prop = 'x';
                break;
            case 'sy':
                orgValue = obj.orgScaleY;
                prop = 'y';
                break;

        }

        if (x > min && x < max) {
            obj[prop] = orgValue + value / (max - min) * (x - min);
        }
          if (x >= max) {
            obj[prop] = orgValue+value;
        }
        if(x <= min){
            
            obj[prop] = orgValue;
        }
    }

    /*
        var bg1 = longBg('img/content/sky',10,'.jpg')
    */ 

    pixiUtil.longBg =  function(name,num,ext){

        var container = new PIXI.Container();
        var i = 0;
        ext = ext || '.png';
        for ( ; i < num; i++) {

            var bgSprite = new PIXI.Sprite(new PIXI.Texture.fromImage(name + i + ext));

            bgSprite.x = container.width;

            container.addChild(bgSprite);

        }

        return container;

    }
    
    // 设置元素中心点
    // setCentre(v,v.width/2,v.height/2)   设置对象的中心为变换原点

    pixiUtil.setCentre = function(v,l,t){

        v.pivot.x = l;
        v.pivot.y = t;

        v.x = v.x +v.pivot.x;
        v.y = v.y +v.pivot.y;

    }


    // run(dan1, 0);  obj 弹幕对象,delayTime 弹幕延迟播放时间
    pixiUtil.danMuRun = function(obj, delayTime){

        // 页面宽度为640

        var tlb = new TimelineMax();
        var time = 8;
        var w = obj.width;
        var l = obj.x;
        var time1 = time / (w + l + 640 - l) * (w + l);
        var time2 = time / (w + l + 640 - l) * (640 - l);

        tlb.add(TweenMax.fromTo(obj, time1, { x: l }, { x: -1 * (w + l), ease: Power0.easeNone }))
        tlb.add(TweenMax.fromTo(obj, time2, { x: 640 }, { x: l, ease: Power0.easeNone }))
        tlb.repeat(-1).delay(delayTime);


    }


})()