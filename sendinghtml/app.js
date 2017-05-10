var http = require('http');
var fs = require('fs');
var util = require('util');
var formidable = require('./node_modules/formidable');
var server = http.createServer(function(req,res){
	if(req.method.toLowerCase()=='get'){
		sendForm(res);
	}else if(req.method.toLowerCase()=='post'){
		//processAllFieldsOfTheForm(req,res);
		processIndividualFields(req,res)
	}
});

function sendForm(res){
	fs.readFile('form.html',function(err,data){
		if(data!=null){
			res.writeHead(200,{'Content-Type':'text/html',
				'Content-Length':data.length});
			res.write(data);
			res.end();
		}else{
			console.log("unabel to read file");
		}
	});	
}

function processAllFieldsOfTheForm(req,res){
	var form  = new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		res.writeHead(200,{
			'Content-type':'text/plain'
		});
		res.write('received the data:\n\n');
		res.end(util.inspect({
			fields:fields,
			files:files
		}));	
	});
}

function processIndividualFields(req,res){
	var fields = [];
	var form = new formidable.IncomingForm();
	form.on('field',function(field,value){
		console.log(field);
		console.log(value);
		fields[field] = value;
	});
	
	form.on('end', function () {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields
        }));
    });
	form.parse(req);
	
	
}

server.listen(8080);

console.log("server is listening on port 8080");