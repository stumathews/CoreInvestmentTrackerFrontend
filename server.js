//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {    
	res.sendfile(path.join(__dirname+'/dist/index.html'));
});


let port = process.env.PORT;

if (port == null || port == "") {
	// Start the app by listening on the default Heroku port
  port = 8080;
}
app.listen(port,() => console.log(`API running on localhost:${port}`));