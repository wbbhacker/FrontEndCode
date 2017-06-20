var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Body = Matter.Body;
// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var cH =  1041;
var cW =  616;

var render = Render.create({
    element: document.getElementById('stage'),
    engine: engine,
    options: {
        width: cW,
        height: cH,
        wireframes: false,
        background:'img/canvas-bg.png', 
        left:'10px'
    }
});

Render.run(render);


render.canvas.style.position = 'relative';
render.canvas.style.left = '12px';
render.canvas.style.top = '20px';


// create runner
var runner = Runner.create();
Runner.run(runner, engine);



// add bodies
var boundData = [
    {x:8,y:9,w:601,h:1,opt: { isStatic: true,render:{fillStyle:'#e38c97'} }},
    {x:8,y:9,w:1,h:901,opt: { isStatic: true,render:{fillStyle:'#e38c97'} }},
    {x:608,y:9,w:1,h:901,opt: { isStatic: true,render:{fillStyle:'#e38c97'} }},
    {x:8,y:909,w:601,h:1,opt: { isStatic: true,render:{fillStyle:'#e38c97'} }}
];



var wallData = [
[
    {x:8,y:242,w:114,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line1.png'}}}},
    {x:95,y:126,w:27,h:114,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line2.png'}}}},
    {x:95,y:270,w:27,h:86,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line3.png'}}}},
    {x:124,y:330,w:86,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line4.png'}}}},
    {x:295,y:8,w:27,h:404,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line5.png'}}}},
    {x:494,y:94,w:114,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line6.png'}}}},
    {x:405,y:300,w:114,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line7.png'}}}},
    {x:492,y:329,w:27,h:114,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line8.png'}}}},
    {x:492,y:445,w:27,h:86,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line9.png'}}}},
    {x:316,y:504,w:172,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line10.png'}}}},
    {x:95,y:473,w:27,h:172,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line11.png'}}}},
    {x:95,y:647,w:318,h:28,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line12.png'}}}},
    {x:550,y:621,w:57,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line13.png'}}}},
    {x:95,y:825,w:27,h:86,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line14.png'}}}},
    {x:95,y:794,w:462,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line15.png'}}}},
    {x:530,y:734,w:27,h:57,opt:{ isStatic: true,render:{sprite:{texture:'img/line/1/line16.png'}}}},
],
[
    {x:8,y:95,w:86,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/2/line1.png'}}}},
    {x:45,y:270,w:144,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/2/line2.png'}}}},
    {x:193,y:151,w:28,h:257,opt:{ isStatic: true,render:{sprite:{texture:'img/line/2/line3.png'}}}},
    {x:393,y:95,w:27,h:114,opt:{ isStatic: true,render:{sprite:{texture:'img/line/2/line4.png'}}}},
    {x:422,y:181,w:57,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/2/line5.png'}}}},
    {x:105,y:540,w:86,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/2/line6.png'}}}},
    {x:194,y:480,w:27,h:114,opt:{ isStatic: true,render:{sprite:{texture:'img/line/2/line7.png'}}}},
    {x:394,y:345,w:27,h:460,opt:{ isStatic: true,render:{sprite:{texture:'img/line/2/line8.png'}}}},
    {x:8,y:695,w:201,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/2/line9.png'}}}},
    {x:177,y:740,w:27,h:114,opt:{ isStatic: true,render:{sprite:{texture:'img/line/2/line10.png'}}}},
    {x:394,y:805,w:172,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/2/line11.png'}}}},

],
[
    {x:104,y:98,w:404,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line1.png'}}}},
    {x:8,y:344,w:114,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line2.png'}}}},
    {x:122,y:312,w:27,h:57,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line3.png'}}}},
    {x:229,y:232,w:57,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line4.png'}}}},
    {x:288,y:233,w:27,h:202,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line5.png'}}}},
    {x:288,y:436,w:232,h:28,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line6.png'}}}},
    {x:493,y:466,w:27,h:142,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line7.png'}}}},
    {x:487,y:232,w:114,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line8.png'}}}},
    {x:129,y:594,w:27,h:317,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line9.png'}}}},
    {x:129,y:594,w:201,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line10.png'}}}},
    {x:303,y:623,w:27,h:114,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line11.png'}}}},
    {x:404,y:780,w:86,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line12.png'}}}},
    {x:493,y:693,w:27,h:114,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line13.png'}}}},
    {x:524,y:692,w:85,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/3/line14.png'}}}},
],

[
    {x:8,y:387,w:85,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/4/line1.png'}}}},
    {x:132,y:96,w:114,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/4/line2.png'}}}},
    {x:247,y:65,w:27,h:57,opt:{ isStatic: true,render:{sprite:{texture:'img/line/4/line3.png'}}}},
    {x:406,y:165,w:27,h:57,opt:{ isStatic: true,render:{sprite:{texture:'img/line/4/line4.png'}}}},
    {x:435,y:196,w:172,h:27,opt:{ isStatic: true,render:{sprite:{texture:'img/line/4/line5.png'}}}},
    {x:199,y:286,w:173,h:28,opt:{ isStatic: true,render:{sprite:{texture:'img/line/4/line6.png'}}}},
    {x:533,y:347,w:27,h:86,opt:{ isStatic: true,render:{sprite:{texture:'img/line/4/line7.png'}}}},
    {x:143,y:481,w:27,h:317,opt:{ isStatic: true,render:{sprite:{texture:'img/line/4/line8.png'}}}},
    {x:292,y:481,w:27,h:317,opt:{ isStatic: true,render:{sprite:{texture:'img/line/4/line9.png'}}}},
    {x:443,y:481,w:27,h:317,opt:{ isStatic: true,render:{sprite:{texture:'img/line/4/line10.png'}}}},

]

];
var bodyData = [
    [
        {x:22,y:712,r:37,opt:{density:1,frictionAir:0,restitution:0.1,friction:1,render:{sprite:{texture:'img/ball.png'}}}},
        {x:425,y:145,w:70,h:116,opt:{isStatic:true,isSensor:true,render:{sprite:{texture:'img/card1.jpg'}}}}
    ],
    [
        {x:473,y:646,r:37,opt:{density:1,frictionAir:0,restitution:0.1,friction:1,render:{sprite:{texture:'img/ball.png'}}}},
        {x:66,y:355,w:70,h:116,opt:{isStatic:true,isSensor:true,render:{sprite:{texture:'img/card2.jpg'}}}}
    ],
    [
        {x:266,y:16,r:37,opt:{density:1,frictionAir:0,restitution:0.1,friction:1,render:{sprite:{texture:'img/ball.png'}}}},
        {x:177,y:707,w:70,h:116,opt:{isStatic:true,isSensor:true,render:{sprite:{texture:'img/card3.jpg'}}}}
    ],
    [
        {x:270,y:818,r:37,opt:{density:1,frictionAir:0,restitution:0.1,friction:1,render:{sprite:{texture:'img/ball.png'}}}},
        {x:463,y:38,w:70,h:116,opt:{isStatic:true,isSensor:true,render:{sprite:{texture:'img/card4.jpg'}}}}
    ]
];


var numData = 
[
    [
        {x:9,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num.png'}}}},
        {x:68,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num.png'}}}},
        {x:129,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num.png'}}}},
        {x:189,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num.png'}}}},
        {x:259,y:939,w:329,h:64,opt:{ isStatic: true,render:{sprite:{texture:'img/intr.png'}}}},
    ],
    [
        {x:9,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num-1.png'}}}},
        {x:68,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num.png'}}}},
        {x:129,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num.png'}}}},
        {x:189,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num.png'}}}},
        {x:259,y:939,w:329,h:64,opt:{ isStatic: true,render:{sprite:{texture:'img/intr1.png'}}}},
    ],
    [
        {x:9,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num-1.png'}}}},
        {x:68,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num-2.png'}}}},
        {x:129,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num.png'}}}},
        {x:189,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num.png'}}}},
        {x:259,y:939,w:329,h:64,opt:{ isStatic: true,render:{sprite:{texture:'img/intr2.png'}}}},
    ],
    [
        {x:9,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num-1.png'}}}},
        {x:68,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num-2.png'}}}},
        {x:129,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num-3.png'}}}},
        {x:189,y:926,w:54,h:91,opt:{ isStatic: true,render:{sprite:{texture:'img/num.png'}}}},
        {x:259,y:939,w:329,h:64,opt:{ isStatic: true,render:{sprite:{texture:'img/intr3.png'}}}},
    ]
]




var ball,card,numArr;





function createWord(n){
    addRect(boundData);
    addRect(wallData[n]);
    addBallCard(bodyData[n]);
    numArr = addRect(numData[n]);
}

function addRect(array){
    var arr = [];
    array.map(function(item,idx){
        var body = Bodies.rectangle(item.x+item.w/2,item.y+item.h/2,item.w,item.h,item.opt);
        World.add(world,[body]);
        arr.push(body);
    });
    return arr;
}
function addBallCard(array){
    ball = Bodies.circle(array[0].x+array[0].r, array[0].y+array[0].r,array[0].r,array[0].opt);
    card = Bodies.rectangle(array[1].x+array[1].w/2,array[1].y+array[1].h/2,array[1].w,array[1].h,array[1].opt );
    World.add(world,[ball,card]);
}

// add event

var scaleFlag = false;
var flagF = true;
var numArray = [0,1,2,3];

Events.on(engine,'collisionStart',function(e){
        var pairs = e.pairs;
        for (var i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];
            if (pair.bodyB === card) {
               scaleFlag = true;
            } else if(pair.bodyA === card){
               scaleFlag = true;
            }
        }
});
Events.on(engine,'beforeUpdate',function(e){
    if(scaleFlag){
        Body.rotate(card,10);
    }
    if(scaleFlag && flagF){
        flagF = false;
        setTimeout(function(){
           round(numArray[0]);
           numArray.shift();
        },1000);
    }
})


// add gyro control
var updateGravity = function(event) {
    var orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0,
        gravity = engine.world.gravity;

    if (orientation === 0) {
        gravity.x = Common.clamp(event.gamma, -90, 90) / 90*6;
        gravity.y = Common.clamp(event.beta, -90, 90) / 90*6;
    } else if (orientation === 180) {
        gravity.x = Common.clamp(event.gamma, -90, 90) / 90*6;
        gravity.y = Common.clamp(-event.beta, -90, 90) / 90*6;
    } else if (orientation === 90) {
        gravity.x = Common.clamp(event.beta, -90, 90) / 90*6;
        gravity.y = Common.clamp(-event.gamma, -90, 90) / 90*6;
    } else if (orientation === -90) {
        gravity.x = Common.clamp(-event.beta, -90, 90) / 90*6;
        gravity.y = Common.clamp(event.gamma, -90, 90) / 90*6;
    }
    
};

window.addEventListener('deviceorientation', updateGravity);
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: cW, y: cH }
});

// **************************************************************************
document.addEventListener('touchmove',function(e){
 e.preventDefault();
});

// loading
    var imgArr=['img/ball.png','img/btn-1.png','img/canvas-bg.png','img/card-num1-btn.png','img/card-num1-tips.png','img/card-num1.jpg','img/card1.jpg','img/card2.jpg','img/card3.jpg','img/card4.jpg','img/intr.png','img/intr1.png','img/intr2.png','img/intr3.png','img/last-bg.jpg','img/num-1.png','img/num-2.png','img/num-3.png','img/num.png','img/page1-btn.png','img/page2-1.png','img/page2-2.png','img/page2-3.png','img/page2-bg.png','img/page2-btn.png','img/page2-voice1.png','img/page2-voice2.png','img/page2-voice3.png','img/page2-voice4.png','img/page2-voice5.png','img/page2-z1.png','img/page2-z2.png','img/page2-z3.png','img/page2-z4.png','img/page2-z5.png','img/share-btn.png','img/card/card-show-btn.png','img/card/card-show-tips.png','img/card/card-show1.jpg','img/card/card-show2.jpg','img/card/card-show3.jpg','img/card/card-show4.jpg','img/ti/border.png','img/ti/cue-a.png','img/ti/cue-btn.png','img/ti/cue-e.png','img/ti/cue-f.png','img/ti/cue-z.png','img/ti/dot.png','img/ti/play-btn.png','img/ti/ti-bg-1.jpg','img/ti/ti-r.png','img/ti/ti.png','img/ti/wheel-l.png','img/ti/wheel-r.png','img/ti1/cue-a.png','img/ti1/cue-btn.png','img/ti1/cue-e.png','img/ti1/cue-f.png','img/ti1/cue-z.png','img/ti1/dot.png','img/ti1/play-btn.png','img/ti1/ti-bg-1.jpg','img/ti1/ti-r.png','img/ti1/ti.png','img/ti1/wheel-l.png','img/ti1/wheel-r.png','img/ti2/cue-a.png','img/ti2/cue-btn.png','img/ti2/cue-e.png','img/ti2/cue-f.png','img/ti2/cue-z.png','img/ti2/dot.png','img/ti2/play-btn.png','img/ti2/ti-bg-1.jpg','img/ti2/ti-r.png','img/ti2/ti.png','img/ti2/wheel-l.png','img/ti3/cue-a.png','img/ti3/cue-e.png','img/ti3/cue-btn.png','img/ti3/cue-f.png','img/ti3/cue-z.png','img/ti3/dot.png','img/ti3/play-btn.png','img/ti2/wheel-r.png','img/ti3/ti-bg-1.jpg','img/ti3/ti-r.png','img/ti3/wheel-l.png','img/ti3/ti.png','img/ti3/wheel-r.png','img/line/1/line1.png','img/line/1/line10.png','img/line/1/line12.png','img/line/1/line11.png','img/line/1/line13.png','img/line/1/line14.png','img/line/1/line15.png','img/line/1/line16.png','img/line/1/line2.png','img/line/1/line3.png','img/line/1/line4.png','img/line/1/line5.png','img/line/1/line6.png','img/line/1/line7.png','img/line/1/line8.png','img/line/1/line9.png','img/line/2/line1.png','img/line/2/line10.png','img/line/2/line11.png','img/line/2/line2.png','img/line/2/line3.png','img/line/2/line4.png','img/line/2/line5.png','img/line/2/line6.png','img/line/2/line7.png','img/line/2/line8.png','img/line/3/line1.png','img/line/2/line9.png','img/line/3/line10.png','img/line/3/line11.png','img/line/3/line12.png','img/line/3/line13.png','img/line/3/line14.png','img/line/3/line3.png','img/line/3/line2.png','img/line/3/line4.png','img/line/3/line6.png','img/line/3/line5.png','img/line/3/line7.png','img/line/3/line8.png','img/line/3/line9.png','img/line/4/line1.png','img/line/4/line10.png','img/line/4/line2.png','img/line/4/line3.png','img/line/4/line4.png','img/line/4/line5.png','img/line/4/line6.png','img/line/4/line7.png','img/line/4/line8.png','img/line/4/line9.png'];

    //callback:loading结束后的回调函数
    netease.loading(imgArr,function(){
        netease.autoPlay("bg-music");
    });

    // 分享
    var shareData={
        MsgImg:'http://test.go.163.com/go/2017/0327/school/img/share.jpg',  //分享图片
        link:'http://go.163.com/2017/0327/school/index.html',    //分享链接
        title:'神兽护驾内推网申，来猪场造作啊！',   //分享标题
        desc:'神兽护驾内推网申，来猪场造作啊！',    //分享描述
        fText:'神兽护驾内推网申，来猪场造作啊！',    //分享朋友圈
        callback:function(){
            share_survey(true);
        }
    };
    NeteaseShareInit();
    document.getElementById("share-btn").onclick = function() {
        NeteaseShare(function(){
           $('.share-tips').show();
           fixH();
        },false);
    }
    $('.share-tips').click(function(){
        $(this).hide();
    })
// loading end 

fixH();

function fixH(){    
    var h = document.body.offsetHeight;
    var n = h/1080;
    var arr = ['stage','page1','page2','page3','page4','page5','page6','card-show','page7'];
    for(var i=0; i<arr.length; i++){
        var elem = document.getElementById(arr[i]);
        elem.style['webkitTransformOrigin'] = 'left top';
        elem.style['webkitTransform'] = 'scaleY('+n+')';
        elem.style['transform'] = 'scaleY('+n+')';        
    }
};


var tl = new TimelineMax();
tl.add( TweenLite.to($('.page2-1'), 0.5, {opacity:1}) );
tl.add( TweenLite.to($('.page2-2'), 0.5, {opacity:1}) );
tl.add( TweenLite.to($('.page2-3'), 0.5, {opacity:1}) );
tl.yoyo(false).repeat(-1).repeatDelay(1);

var tl_2 = new TimelineMax();
tl_2.add(TweenLite.to($('.page2-z1'), 0.5, {opacity:1}));
tl_2.add(TweenLite.to($('.page2-z2'), 0.5, {opacity:1}));
tl_2.add(TweenLite.to($('.page2-z3'), 0.5, {opacity:1}));
tl_2.add(TweenLite.to($('.page2-z4'), 0.5, {opacity:1}));

var tl_3 = new TimelineMax();
tl_3.add([TweenLite.to($('.page2-z5'), 0.05, {x:0,opacity:1}),TweenLite.to($('.page2-z5'), 0.05, {x:38,opacity:1}),TweenLite.to($('.page2-z5'), 0.05, {x:90,opacity:1}),TweenLite.to($('.page2-z5'), 0.05, {x:138,opacity:1})],'+=0','sequence',0.5);


var tl_4 = new TimelineMax();
tl_4.add(TweenLite.to($('.page2-btn'), 1, {scale:0.7}))
tl_4.yoyo(true).repeat(-1);

var tl_1 = new TimelineMax();

tl_1.add(TweenLite.to($('.page2-voice1'), 0.1, {opacity:1,delay:2}));
tl_1.add(TweenLite.to($('.page2-voice2'), 0.1, {opacity:1,delay:2}));
tl_1.add(TweenLite.to($('.page2-voice3'), 0.1, {opacity:1,delay:2}));
tl_1.add(TweenLite.to($('.page2-voice4'), 0.1, {opacity:1,delay:2}));
tl_1.add(TweenLite.to($('.page2-voice5'), 0.1, {opacity:1,delay:2}));

tl_1.add(tl_2,'tl_2');
tl_1.add(tl_3,'tl_2');
tl_1.add(tl_4);
tl_1.pause();

tl_3.eventCallback("onComplete",function(){
   $('.page2-btn').click(function(){
        $('.page2').hide();
        $('.page1').hide();
        createWord(0);
        $('#bg-music').get(0).play();
   })
});
var pageArr = ['.page3','.page4','.page5','.page6'];
var rightNum = [0,1,0,2];
var roundMusic = ['#round1','#round2','#round3','#round4'];

$('.page1-btn').click(function(){
    $(this).hide();
    $('.page2').show();
    $('#bg-music').get(0).pause();
    $('#music').get(0).play();
    tl_1.play();
    fixH();
    
})


function round(n){
    var $page = $(pageArr[n]);
    $('.card-show').show();
    fixH();
    $('.card-show-card').hide().eq(n).show();
    $('.card-show-btn').off('click').click(function(){
        $('.card-show').hide();
        $page.show();
        fixH();
        answer($page,n);

    });

}


function answer($page,n){

    $page.find('.play-btn').click(function(){
        $('#bg-music').get(0).pause();
        $(roundMusic[n]).get(0).play();
        $page.find('.wheel-l').addClass('rotate');
        $page.find('.wheel-r').addClass('rotate');
        $(this).remove();
        $page.find('.cue-a').hide();
        $page.find('.ti-r').show();
        $page.find('.ti-r ul li').click(function(){
            $(this).find('img').show();
            $(this).siblings().find('img').hide();
            if($(this).index() == rightNum[n]){
                $page.find('.tip .cue-f').show();
                $page.find('.tip .cue-e').hide();
                $page.find('.tip .cue-z').hide();
                $page.find('.ti-r ul li').off('click');
                setTimeout(function(){

                    $page.hide();
                    $(roundMusic[n]).get(0).pause();
                     $('#bg-music').get(0).play();
                    World.clear(world);
                    if(n == 3){
                        $('.page7').show();
                        fixH();
                        return;
                    }
                    createWord(n+1);
                    scaleFlag = false;
                    flagF = true;

                },1000);
            }else{
                $page.find('.tip .cue-e').show();
                $page.find('.cue-btn').attr('src','img/ti/cue-btn1.gif');
            }
        });
    });

    $('.cue-btn').click(function(){     
        $(this).remove();   
        $page.find('.tip .cue-e').hide();
        $page.find('.tip .cue-z').show();
    });
    
}

// $('.page3').find('.cue-btn').attr('src','img/ti/cue-btn1.gif');

var orient= "onorientationchange" in window ? "orientationchange" : "resize";

window.addEventListener(orient, adaptation, false);

var orienter_tip = document.createElement("div");
orienter_tip.style.cssText = "width:100%;height:1500px;position:fixed;left:15s0px;top:-500px;z-index:999999999;background:#000 url(img/tips.jpg) no-repeat center center;background-size:100% 100%;display:none;transform:rotate(-90deg)"; 
orienter_tip.id='tips';
document.body.appendChild(orienter_tip);

function adaptation(){

    if(window.orientation==180||window.orientation==0){ 
        document.getElementById('tips').style.display = 'none';
    } 
    if(window.orientation==90||window.orientation==-90){    
          document.getElementById('tips').style.display = 'block';
    }
}