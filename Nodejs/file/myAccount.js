//获取目录下的所有子目录信息
var node_path=  require('path');
var fs       =  require('fs');

// path 为你要获取图片信息的目录；
var path = '/auto/2016/1125/nissan_wap-2/img';


path = /^\//.test(path) ? path : ('/' + path);


getDir(path,function(over){
	
    console.log('回调函数开始');

    var newArr = [];
    var dirName = path.split('/').splice(0,path.split('/').length-1).join('/');
    var rootDir = /\\$/.test(__dirname) ? __dirname : __dirname.replace('\\','/');

    var reg = new RegExp(rootDir+dirName);

    over.forEach(function(n){
       newArr.push(n.replace(/\\/g,'/').replace(reg,'')); 
    });

    str = 'var imgUrlArray='+JSON.stringify(newArr).replace(/"/g,'\'');

    fs.writeFile('account.js',str,function(err){
        if(!err){
            console.log('写入成功......')
        }else{
            console.log(err)
        }
    });
   
});


function getDir(dir_path,finalCallback){

	var path = node_path.join(__dirname,dir_path);
	var fileDir = [];      // 判断是否遍历成功;
	var resultsImg = [];

	fileDir.push(path);
	forDir(path);

	// 遍历目录下的所有文件信息
	function forDir(path){
		fs.readdir(path,function(err,files){

			if(err) return;

			if(!files || files==0){
				isEnd(path);
				return;
			}

			eachDir(files,function(fileName,cb){
				var paths = node_path.join(path,fileName);

				fs.stat(paths,function(err,file){
					if(file.isDirectory()){
						cb(paths);
					}else{
						resultsImg.push(paths);
						cb('');
					}
				});
			},function(results){
				if(results.join(' ') !== ''){
					results = results.filter(function(item){
						return !!item;
					});
					fileDir = fileDir.concat(results);
					results.forEach(function(item,idx){
						forDir(item);
					});
				}
				isEnd(path);
			})

		});
	}

	// 循环目录
	function eachDir(filesArray,everyCallback,resultCallback){
		var len = filesArray.length;
		var finalResultData = [];
		filesArray.map(function(item,idx){
			setTimeout(function(){
				everyCallback(item,interCall)
			},0);
		});

		function interCall(resultData){
			len--;
			finalResultData.push(resultData);
			if(len == 0){
				resultCallback(finalResultData);
			}
		}

	}

	// 是否结束所有目录遍历
	function isEnd(path){
		fileDir.splice(fileDir.indexOf(path),1);
		if(fileDir.length == 0){
			finalCallback(resultsImg);
		}
	}
}


