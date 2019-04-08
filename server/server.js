//Importing Require Modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

// Connection URL
const url = 'mongodb://gulnoza:ayajonam1@ds125912.mlab.com:25912/hackaroo2018';

// Database Name
const dbName = 'hackaroo2018';

//Initializing express server.
const app = express();

//Port number
const port = process.env.PORT || 3002;

//Cors is used to allow other domains to access our application.
app.use(cors());

//BodyParser is used to parse in coming request body.
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: false}));


//Static folder
app.use(express.static(path.join(__dirname, 'public')));


//Get method is used to fetch the data.
app.get("/search", (req, res, next) => {
    //Connecting the mongodb
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, client) {
        //If connection failed the it will go to if condition.
        if (err) {
            res.send(JSON.stringify(err));
            res.end();
        }
        console.log(req.query);
        const db = client.db(dbName);
        var query={};
        query[ "LicenseNumber"]= { $eq: req.query.licenseNumber };


        db.collection('Parking').find(query).toArray(function (err, result) {
            if (err) {
                res.write("fetching  top 10 games failed");
                res.end();
            } else {
                res.send(JSON.stringify(result));
            }
        });
    });
});


//Post method is used to add the student in the database.
app.post("/create", (req, res, next) => {
    //Connecting to database
    MongoClient.connect(url, { useNewUrlParser: true },function (err, client) {
        //If connection failed the it will go to if condition.
        if (err) {
            res.write("connecting to Database failed");
            res.end();
        }
        const db = client.db(dbName);
        console.log(req.body);
        //Inserting the record in the database.
        db.collection('Parking').insertOne(req.body, function (err, result) {
            if (err) {
                res.send("Registration Failed, Error While Registering "+err);
                res.end();
            }
            res.json({ msg: 'New Parking added successfully' });
        });
    });
});

//Deleting the record in the database using id.
app.delete("/delete/:studentId", (req, res, next) => {
    //Connecting to database
    MongoClient.connect(url, { useNewUrlParser: true },function (err, client) {
        //If connection failed the it will go to if condition.
        if (err) {
            res.send("connecting to Database failed");
            res.end();
        }
        const db = client.db(dbName);
        console.log(req.params.studentId);
        var myquery = { StudentId: req.params.studentId };
        //Deleteing the record.
        db.collection('Parking').deleteOne(myquery, function (err, result) {
            if (err) {
                res.send("Error while deleting : "+err);
                res.end();
            }
            res.json({ msg: 'Parking deleted successfully' });
        });
    });
});

//Deleting the record in the database using id.
app.get("/getall", (req, res, next) => {
    //Connecting to database
    MongoClient.connect(url, { useNewUrlParser: true },function (err, client) {
        //If connection failed the it will go to if condition.
        if (err) {
            res.send("connecting to Database failed");
            res.end();
        }
        const db = client.db(dbName);

        db.collection('Parking').find().toArray(function (err, result) {
            if (err) {
                res.write("failed");
                res.end();
            } else {
                res.send(JSON.stringify(result));
            }
        });
    });
});

//Required for navigating angular routes without server routes
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Starting the server.
app.listen(port, () => {
    console.log("Sever running in port : " + port);
});
