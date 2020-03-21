const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

let app = express();

let dataPath = path.join(__dirname, '../entries.json');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

app.post('/signup-form', (req, res) => {
    let entry = {
        name: req.body.name,
        email: req.body.email
    };

    fs.readFile(dataPath, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        } else {

            let entries = JSON.parse(data);
            entries.push(entry);

            fs.writeFile(dataPath, JSON.stringify(entries), (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Something went wrong");
                } else {
                    console.log('The file has been saved!');
                    res.send("DONE!");
                }
            });
        }
    });
});

app.get('/formsubmissions', (req, res) => {
    fs.readFile(dataPath, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        } else {
            let signups = JSON.parse(data);
            res.status(200).send(signups);
        }
    });
});

app.listen(3000, () => console.log("Server Running on Port 3000"));