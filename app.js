const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const  https = require("https")

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var emailAddress = req.body.emailAddress;

    var data = {
        members: [
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/ab8ed845f4";

    const options = {
        method: "POST",
        auth: "mayurmusale:687048730f8196369318016b704bb6fc-us18"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname +"/success.html")
        }
        else{
            res.sendFile(__dirname +"/failure.html")
        }

        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

    // res.send(jsonData)
})

app.post("/failure", (req, res)=>{
    res.redirect("/")
})



app.listen(process.env.PORT || 3000, () => {
    console.log("Server started at port 3000")
})


//API KEY:  687048730f8196369318016b704bb6fc-us18
//unique id: ab8ed845f4