

var getData = (url,callback,https,iconv) => {

	var req = https.request(url,(res) => {
		
		var list = [];  // 保存所有buffer数据
		var len = 0;    //buffer数据的总长度

		res.on('data', (chunk) => {
		
			list.push(chunk);
			len += chunk.length;
			
		});

		res.on('end',() => {

			var Data = Buffer.concat(list, len);    //合并所有buffer数据

			Data = iconv.decode(Data, 'gb2312');    //解决中文乱码

			Data.toString();                        // 转换成字符串
			
			callback(Data)
		})

	})

	req.end();

	req.on('error',(e) => {
		console.log(e)
	});

}



module.exports = getData;