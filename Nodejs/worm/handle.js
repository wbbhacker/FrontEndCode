var handle = ($,http,fs,async) => {
	 var imgSrcColl = [];

	 $('img').each(function(i,elem){
	 	var imgSrc = $(this).attr('src');
	 	imgSrc = encodeURI(imgSrc);   
	 	imgSrcColl.push(imgSrc)

	 });

	 console.log(imgSrcColl.length);
	 
	 var count = 1;

	 async.map(imgSrcColl,(item, callback) => {

	 	  	var imgName = 'image/'+new Date().getTime()+parseInt(1000*Math.random())+'.jpg';
	 	

		 	var req = http.request(item,(res) => {
		 			
		 			var imgData = '';

		 			res.setEncoding("binary"); 

					res.on('data', (chunk) => {
						imgData += chunk;
					})

					res.on('end',() => {
						fs.writeFile(imgName, imgData, "binary", (err) => {
								  if (err) throw err;
								  console.log('It\'s saved!'+count);
								  count++;
						});
							
					})
		 	});

		 	req.end();

	 } ,function(err,results){
	 	console.log(results)
	 })


};



module.exports = handle;