var fs = require('fs'); // this is new, see explanation
var file;
var buf = new Buffer(100000);
fs.open(
	'info.txt', 'r',
	function(handle) {
	    file = handle;
	}
);

fs.open(
	'info.txt', 'r',
	function(err, handle) { // we'll see more about the err param in a bit
		var buf = new Buffer(100000);
		fs.read(
			handle, buf, 0, 100000, null,
			function(err, length) {
				console.log(buf.toString('utf8', 0, length));
				fs.close(handle, function () { /* don't care */ });
			}
        );
    }
); 