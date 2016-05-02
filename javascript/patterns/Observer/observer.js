// Observer 观察者列表


function ObserverList (){

	this.oberverList = []

};

ObserverList.prototype.Add = function (obj) {	
	return this.oberverList.push(obj);

};

ObserverList.prototype.Empty = function () {

	return this.oberverList = [];

};	

ObserverList.prototype.Count = function () {

	return this.oberverList.length;

};

ObserverList.prototype.Get = function (index) {

	if (index > -1 && index < this.oberverList.length){
		return this.oberverList[index];
	}

};

ObserverList.prototype.Insert = function (obj, index) {

	var pointer = -1;
	if (index === 0) {
		this.oberverList.unshift(obj);
		pointer = index;
	} else if ( index === this.oberverList.length ) {
		this.oberverList.push(obj);
		pointer = index;
	}

	return pointer;
}

ObserverList.prototype.IndexOf = function (obj, startIndex) {

	var i = startIndex , pointer = -1;
	while (i < this.oberverList.length) {
		if (this.oberverListp[i] === obj) {
			pointer = i;
		}
		i++;
	}
	return pointer;
}

ObserverList.prototype.RemoveIndexAt = function (index) {
	if (index === 0) {
		this.oberverList.unshift();
	} else if (index === this.oberverList.length-1){
		this.oberverList.pop();
	}

}

//  使用extension 扩展对象

function extend (obj, extension){
	for (var key in obj){
		extension[key] = obj[key];
	}
}

// 目标 Subject
function Subject () {
	this.observer = new ObserverList();
}

Subject.prototype.AddObserver = function (observer) {
	this.observer.Add(observer);
}

Subject.prototype.RemoverObserver = function (observer) {
	this.observer.RemoveIndexAt(this.observer.IndexOf(observer,0));
}
Subject.prototype.Notify = function (context) {

	var observerCount = this.observer.Count();

	console.log("一共%s个观察者",observerCount)

	for (var i = 0; i < observerCount; i++ ){
		this.observer.Get(i).Update(context);
	}
}


// The Observer
function Observer () {
	this.Update = function () {

	};
}