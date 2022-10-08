const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.use(express.static("public")); //access static files like css and images
app.use(express.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const fname=req.body.firstname;
  const lname=req.body.lastname;
  const email=req.body.emailid;

  const data = {
    members: [
      {
      email_address:email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
    }
  ]
};
console.log(data);
  const d_ta = JSON.stringify(data);
  const url = "https://us9.api.mailchimp.com/3.0/lists/9f067f0a5e";
  const options = {
    method: 'POST',
    auth: "itsbacardi:96dff0eb76ed3c187c304744d0a3a6d0-us9"
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode===200)
    {
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  // request.write(d_ta);
  request.end();
});
app.post("/failure",function (req,res){
  res.redirect("/");
})
app.listen(process.env.PORT||3000, function() {
  console.log("SERVER STARTED AT PORT 3000");
});




// Api key
// 96dff0eb76ed3c187c304744d0a3a6d0-us9
//list id : 9f067f0a5e
