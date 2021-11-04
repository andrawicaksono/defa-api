const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.urlencoded());
app.use(express.json());

app.listen(PORT, function () {
    console.log(`Demo project at: ${PORT}!`); });

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

function getTS(ts) {
    let date_ob = new Date(ts);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let dateNow = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    return dateNow;
}

app.post('/', async (req, res) => {
    let ts = Date.now() + 3600000*7;
    let dateNow = getTS(ts);
    let docRef = db.collection('sensors').doc(dateNow);
    await docRef.set({
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        light: req.body.light
    });
    res.send('done');
});