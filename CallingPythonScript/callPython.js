var spawn  = require("child_process").spawn;
var process = spawn('python',["script.py",3]);
process.stdout.on('data',function(data){
	console.log("returned from python" + data);
});