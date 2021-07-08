const express = require('express');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const fs = require("fs");
const app = express();
port = 8080


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(fileUpload());

app.get('/waf', function (req, res) {
    res.sendFile(__dirname+'/static/.html');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/static/upload.html');
});

app.post('/upload', function(req, res) {
    let uploadFile;
    let uploadPath;
    if(req.body.pin !== "673307-0496-8812"){
        console.log(req.body.pin)
        return res.send('bad pin')
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    uploadFile = req.files.uploadFile;
    uploadPath = __dirname + '/package.json' ;
    uploadFile.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).send(err);
        const config = require('config-handler')();
        console.log(config['version'],config['name'],config['author'],config['license'],config['dependencies'])
        const src = "package1.json";
        const dest = "package.json";
        fs.copyFile(src, dest, (error) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log("Copied Successfully!");
        });
        res.render('test.ejs')
    });
});



var server= app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
server.setTimeout(10000);