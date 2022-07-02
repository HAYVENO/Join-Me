const express = require("express");
const bodyParser = require("body-parser");
// const https = require("https");
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

mailchimp.setConfig({
	apiKey: "cbb9e42bf9789ca015bd05a2b90b8c75-us11",
	server: "us11",
});

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
	const fName = req.body.fName;
	const lName = req.body.lName;
	const Email = req.body.Email;
	console.log(fName, lName, Email);

	const listId = "329c35e482";
	const subscribingUser = {
		firstName: fName,
		lastName: lName,
		email: Email,
	};

	const run = async () => {
		try {
			const response = await mailchimp.lists.addListMember(listId, {
				email_address: subscribingUser.email,
				status: "subscribed",
				merge_fields: {
					FNAME: subscribingUser.firstName,
					LNAME: subscribingUser.lastName,
				},
			});
			console.log(response.full_name);
			res.sendFile(__dirname + "/success.html");
		} catch (err) {
			console.log(err.status);
			res.sendFile(__dirname + "/failure.html");
		}
	};

	run();
});

app.listen(process.env.PORT || 6000, function () {
	console.log("Newsletter  server UP on port 6000: ACCESS GRANTED");
});

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
// app.listen(port);

// API Mailchimp
// cbb9e42bf9789ca015bd05a2b90b8c75 - us11;

// audience ID (List ID)
// 329c35e482

//   //let there be an update, and there was one;
