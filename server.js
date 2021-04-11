var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


//start
const multer  = require('multer');


var upload = multer({ dest: "uploads/" });
app.post("/api/fileanalyse", upload.single("upfile"), function(req, res, next) {
  var upfile = req.file;
  if (typeof upfile === "undefined") res.json({ error: "Invalid file" });
  return res.json({
    name: upfile.originalname,
    type: upfile.mimetype,
    size: upfile.size
  });
});
//end



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
