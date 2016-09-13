var  https = require('https');
var  http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var getData = require('./getData.js');
var handle = require('./handle.js');
var async = require('async');


var url = 'www.baidu.com';



var ProcessData = (data) => {

	//  转化数据

	var $ = cheerio.load(data);
	
	// 处理数据
	handle($,http,fs,async);

}

// 获取数据
getData(url,ProcessData,https,iconv);


