console.time();
var http = require("http");
var fs   = require("fs");

console.timeEnd();

console.time();
http.createServer(function(req, res) {

	fs.readFile(__dirname + "/text.html", "utf8", function(err, data) {

		res.writeHead(200, {"Content-Type": "text/html"});

		if (err) {
			res.write("Oops!, error reading file");
		} else {
			res.write(data);
		}
		res.end();
	});

}).listen(5000, function() {
	console.log("binded to port 5000");
});
console.timeEnd();

console.log("listening on port 5000");