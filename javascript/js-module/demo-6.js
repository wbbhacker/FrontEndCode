var skill = function() {
    this.say = function() {
        console.log(this.name);
    }
}

var person = function() {
    this.arm = 2;
    this.leg = 2;
}

var student = {};

(student.skill = function() {
    this.name = '王彬彬';

}).prototype = new skill();

(student.person = function() {

}).prototype = new person();



var instance = new student.skill();

instance.say();
