var express = require('express'),
    app = express();
app.use('/', express.static(__dirname + '/'));
app.listen(8080, function() {
    console.log("Server listening on: http://localhost:8080");
});