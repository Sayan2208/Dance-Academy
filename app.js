const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FusionDance', {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
const port = 3000;

const ContactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String,
    address: String,
    state: String,
    city: String,
    pin: String
  });

const Contact = mongoose.model('contact', ContactSchema);

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
    
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.status(200).send("The information has been saved to the database.");
    }).catch(()=>{
        res.status(404).send("Item was not saved to the database.");
    })

    // let name = req.body.name;
    // let age = req.body.age;
    // let phone = req.body.phone;
    // let email = req.body.email;
    // let address = req.body.address;
    // let state = req.body.state;
    // let city = req.body.city;
    // let pin = req.body.pin;

    // let outputToWrite = `The name of the client is ${name}.\nThe age of the client is ${age}.\nThe phone number of the client is ${phone}.\nThe email id of the client is ${email}.\nThe address of the client is ${address}.\nThe state of residence is ${state}.\nThe client is from ${city}.\nPincode is ${pin}.`

    // fs.writeFileSync('output.txt', outputToWrite);

    // const p = { };
    // res.status(200).render('contact.pug', p);
})

app.listen(port, ()=>{
    console.log(`Server running at http://127.0.0.1:${port}`);
});