

function addClass(poElem, psClass) {
	var tsClass = poElem.className;
	if (-1 == tsClass.indexOf(psClass)) {   
		if (tsClass != '')
			tsClass += " ";
		tsClass += psClass;
	}
	poElem.className = tsClass;
}

function delClass(poElem, psClass) {
	var tsClass = poElem.className;
	tsClass = tsClass.replace(psClass, '');
	tsClass = tsClass.replace('  ', ' ');
	poElem.className = tsClass;
}


function obj2json(poObject) {
    var tsResult = '' ;
	if (!poObject)
		return 'null';
	switch(typeof poObject) {
        case 'object': {
            if (poObject instanceof Array) {
                tsResult += '[';
				for (var i = 0; i < poObject.length; i++) {
					if (i > 0) {
                            tsResult += ',';
					}
					tsResult += obj2json(poObject[i]);
				}
				tsResult += ']';
            } 
			else {
                var i = 0;
				tsResult += '{';
				for (var K in poObject) {
					if (i > 0) {
						tsResult += ',';
					}
					tsResult += ('"' + K + '": ');
					tsResult += obj2json(poObject[K]);
					i++;
				}
				tsResult += '}';
            }
			break;
        }
		case 'number': {
            tsResult += poObject;
			break;
        }
		case 'string': {
            tsResult += '"' + poObject + '"';
			break;
        }
		case 'boolean': {
            tsResult += poObject;
			break;
        }
    }
	return tsResult;
}



function mbdbg(psMsg, pbAppend) {
	if (!document.getElementById('dbgarea')) {
		console.log(psMsg);
		return;
	}
		
	if (pbAppend)
		document.getElementById('dbgarea').innerHTML += psMsg;
	else
		document.getElementById('dbgarea').innerHTML = psMsg;
}

/*
poConf {
	bind: dom,
	actdis_v: int,
	actdis_h: int,
	onbegin: function(poEvent) {
	
	},
	onmoving: function(poEvent, poChange) {
	
	},
	onaction: function(poEvent, poChange) {
	
	}
}
*/

var LSwiperMaker = function(poConf) {   // p parameters o object
	LSwiperMaker._start = function(e) {
		
		//if (!( /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion)) )) {
		//}
		//
		var toTarget = this;   //t the o object

		var toConf = toTarget.LSwiperMakerConf;
		
		toConf.mbState = 1;
		toConf.mdStartTime = (new Date()).getTime();

		
		LSwiperMaker.StartElem = this;
		var point = e.touches ? e.touches[0] : e;
		toConf.mdStartCoor = [point.screenX, point.screenY];
		
		if (toConf.onbegin)
			toConf.onbegin(e);
		//e.stopPropagation();
	};
	LSwiperMaker._move = function(e) {
		if (!LSwiperMaker.StartElem)
			return;
			
		var toTarget = LSwiperMaker.StartElem;
		var toConf = toTarget.LSwiperMakerConf;
		
		if (0 == toConf.mbState) {
			toConf.mbState = 0;
			toConf.mdEndTime = (new Date()).getTime();
			LSwiperMaker.StartElem = null;
			return;
		}
		
		
		e.preventDefault();

		toConf.mbState = 2;
		
		var point = e.touches ? e.touches[0] : e;
		toConf.mdEndCoor = [point.screenX, point.screenY];
		//mbdbg(toConf.mdEndCoor);
		if (toConf.onmoving) {
			var toChange = {x:toConf.mdEndCoor[0] - toConf.mdStartCoor[0], 
							y:toConf.mdEndCoor[1] - toConf.mdStartCoor[1], 
							h_way:null, 
							v_way:null};
			toConf.onmoving(e, toChange);
		}
		e.stopPropagation();
	};
	LSwiperMaker._end = function(e) {
		if (!LSwiperMaker.StartElem)
			return;
			
		var toTarget = LSwiperMaker.StartElem;
		var toConf = toTarget.LSwiperMakerConf;
		
		if (2 != toConf.mbState) {
			toConf.mbState = 0;
			toConf.mdEndTime = (new Date()).getTime();
			LSwiperMaker.StartElem = null;
			return;
		}
		if (toConf.onaction) {
			var toChange = {x:toConf.mdEndCoor[0] - toConf.mdStartCoor[0], 
							y:toConf.mdEndCoor[1] - toConf.mdStartCoor[1], 
							h_way:null, 
							v_way:null};
							
			if (toConf.actdis_h && Math.abs(toChange.x) > toConf.actdis_h) {
				toChange.h_way = (toChange.x < 0) ? 'L' : 'R';
			}
			if (toConf.actdis_v && Math.abs(toChange.y) > toConf.actdis_v) {
				toChange.v_way = (toChange.y < 0) ? 'U' : 'D';
			}
			toConf.onaction(e, toChange);
		}
		toConf.mbState = 0;
		toConf.mdEndTime = (new Date()).getTime();
		LSwiperMaker.StartElem = null;
	};
	
	
	LSwiperMaker.StartElem = poConf.bind;
	poConf.mbState = 0;
	poConf.mdEndTime = 0;

	poConf.bind.addEventListener('mousedown', LSwiperMaker._start, false);
	window.addEventListener('mousemove', LSwiperMaker._move, false);
	window.addEventListener('mouseup', LSwiperMaker._end, false);

	poConf.bind.addEventListener('touchstart', LSwiperMaker._start, false);
	window.addEventListener('touchmove', LSwiperMaker._move, false);
	window.addEventListener('touchend', LSwiperMaker._end, false);
	
	poConf.bind.LSwiperMakerConf = poConf;
	
	return poConf;
}



/*
poConf {
	bind: dom,
	way: 'h' | 'v',
	onTransitionEnd: function() { }
}
*/


var LGroupareaMaker = function(poConf) {
	poConf.getNowElem = function() {
		return this.maElem[this.mdNowIdx];
	}
	// pbPrevOrNext: 0 要翻到前一个  1 要翻到后一个
	poConf.gotoElem = function(pdIdx, pbPrevOrNext) {
		var tdLastIdx = this.mdNowIdx;
		this.mdNowIdx = pdIdx;

		if (this.loop) {
			if (this.mdNowIdx < 0)
				this.mdNowIdx = this.maElem.length - 1;
			if (this.mdNowIdx > (this.maElem.length - 1))
				this.mdNowIdx = 0;
		}
		else {
			if (this.mdNowIdx < 0)
				this.mdNowIdx = 0;
			if (this.mdNowIdx > (this.maElem.length - 1))
				this.mdNowIdx = this.maElem.length - 1;
		}

		if (this.way == 'h') {
			if (pbPrevOrNext) {
				this.effect.right(this, tdLastIdx, this.mdNowIdx);
			}
			else{
				this.effect.left(this, tdLastIdx, this.mdNowIdx);
			}

		}
		else {
			if (pbPrevOrNext) {
				this.effect.up(this, tdLastIdx, this.mdNowIdx);
			}
			else{
				this.effect.down(this, tdLastIdx, this.mdNowIdx);
			}
		}
	}
	
	poConf.nextElem = function() {
		this.gotoElem(this.mdNowIdx + 1, 1);
	}
	poConf.prevElem = function() {
		this.gotoElem(this.mdNowIdx - 1, 0);
	}
	
	
	
	
	if (!poConf.effect || !poConf.effect.init) {
		return null;
	}
	
	poConf.moBoxElem = poConf.bind.children[0];
	poConf.maElem = poConf.moBoxElem.children;
	poConf.mdNowIdx = 0;
	poConf.effect.init(poConf);
	
	poConf.bind.LGroupareaMakerConf = poConf;
	return poConf;
}