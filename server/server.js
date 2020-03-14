const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
let app = express();

let dataPath = path.join(__dirname, '../entries.json');


// logic to handle adding onto entries.json file
let data = fs.readFileSync(dataPath);
let entries = JSON.parse(data);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use(express.static(path.join(__dirname, '../public')));

app.post('/signup-form', (req, res) => {
    let entry = {
        name: req.body.name,
        email: req.body.email
    };
    entries.push(entry);

    fs.writeFile(dataPath, JSON.stringify(entries), (err) => {
        if (err) console.log(err);
        console.log('The file has been saved!');
    });
    res.send('Thank you for submitting your contact form!');
});

app.get('/formsubmissions', (req, res) => {
    fs.readFile(dataPath, (err, data) => {
        if (err) console.log(err);
        let signups = JSON.parse(data);
        res.render('submissions', {data: signups});
    });
});

app.listen(3000);