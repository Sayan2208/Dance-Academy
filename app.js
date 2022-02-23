const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

app.use('/static', express.static('static'));

app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res)=>{
    const p = { };
    res.status(200).render('home.pug', p);
});
app.get('/contact', (req,res)=>{
    const p = { };
    res.status(200).render('contact.pug', p);
});

app.post('/contact', (req,res)=>{
    let name = req.body.name;
    let age = req.body.age;
    let phone = req.body.phone;
    let email = req.body.email;
    let address = req.body.address;
    let state = req.body.state;
    let city = req.body.city;
    let pin = req.body.pin;

    let outputToWrite = `The name of the client is ${name}.\nThe age of the client is ${age}.\nThe phone number of the client is ${phone}.\nThe email id of the client is ${email}.\nThe address of the client is ${address}.\nThe state of residence is ${state}.\nThe client is from ${city}.\nPincode is ${pin}.`

    fs.writeFileSync('output.txt', outputToWrite);

    const p = { };
    res.status(200).render('contact.pug', p);
})

app.listen(port, ()=>{
    console.log(`Server running at http://127.0.0.1:${port}`);
});