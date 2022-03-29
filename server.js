const serviceAccount = require("./serviceProvinecKey.json");
const admin = require("firebase-admin");
var cors = require('cors');
const express = require("express");
const app = express();

app.use(cors());
app.use(express.static('www'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lemonsensors.firebaseio.com"
});


app.get("/", (req, res) => {
    res.json("Working!!");
    //res.sendFile('index.html', { root: __dirname });
});


app.post("/send", (req, res, next) => {
    const message = req.body.message;
    // Send a message to devices subscribed user
    admin.messaging().sendMulticast(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
        res.json(response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
        res.json(error);
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
});