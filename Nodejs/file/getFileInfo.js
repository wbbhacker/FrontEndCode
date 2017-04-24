//获取目录下的所有子目录信息
var node_path=require('path');
var fs=require('fs');
//模拟async.map的执行
function myMap(arrayData,call,resultCallback){
    var p=arrayData;
    var finalResultData=[];
    var intercall=function(error,resultData){
        watchLength--;
        finalResultData.push(resultData);
        if(watchLength==0){
            resultCallback(null,finalResultData);
        }
    };
    var watchLength=p.length;
    for(var i=0;i< p.length;i++){
        (function(index){
            setTimeout(function(){
                call(index,intercall);
            },100);
        }(p[i]));
    }

}

//获取目录下的所有文件信息
function getDir(dir_path,finalCallback){
    var path=node_path.join(__dirname,dir_path);
    console.log(path);
    var over=[];
    var watchProcessDir=[];
    watchProcessDir.push(path);
    function judgeAllDone(path){
        watchProcessDir.splice(watchProcessDir.indexOf(path),1);
        //console.log(watchProcessDir.length);
        if(watchProcessDir.length==0){
            //全部结束了
            finalCallback(over);
            return true;
        }else{
            return false;
        }
    }

    function forDir(path){
        var fi=fs.readdir(path,function(err,files){
            //console.log(files);
            if(err){
                return false;
            }
            if(!files||files.length==0){
                judgeAllDone(path);
                return;
            }
            myMap(files,function(e,cb){
                //console.log('file:'+e);
                var paths=node_path.join(path,e);
                fs.stat(paths,function(err,file){
                    if(file.isDirectory()){
                        //如果是目录那么将paths放入result，等待files遍历完了后，执行[2]
                        cb(null,paths)
                    }else{
                        //如果是文件，设置为空字符串
                        over.push(paths)
                        cb(null,'');
                        //移动到cb上面
                        //over.push(paths);
                    }
                });
            },function(err,results){//[2],进入子目录进行递归
                if(results.join('')!=''){
                    //去掉空字符串
                    results=results.filter(function(item){
                        return !!item;
                    });
                    watchProcessDir=watchProcessDir.concat(results);
                    results.forEach(function(e,i){
                        forDir(e);
                    });
                }

                judgeAllDone(path);

            })
        })
    }

    forDir(path);


}

getDir('img',function(over){
   console.log('~~~done~~~~file size：%d',over.length);
});