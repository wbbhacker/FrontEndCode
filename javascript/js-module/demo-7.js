// Class 类
var Class = { 
    create: function() { 
        return function() { 
            this.initialize.apply(this , arguments); 
        } 
    } 
} 

var A = Class.create(); 
A. prototype={ 
    initialize:function(v){ 
        this .value=v; 
    } ,
    showValue:function(){ 
        console.log(this.value); 
    } 
} 
var a = new A('helloWord!'); 

a.showValue();