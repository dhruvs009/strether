const Web3= require('web3');

const ganache = require("ganache-cli");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const formidable = require('formidable');
const cors = require('cors')

app.use(bodyParser.json())


r = Session.post(URL+':'+PORT+'/login',headers = {}, data={'name':'AuthedUserName'})



const port = 5000;


var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.net.isListening().then(console.log);

let userMapping = {};

web3.eth.getAccounts(function(err,accounts) {
	if(err) {
		console.log(err);
	}
	userMapping["Vitalik"] = accounts[0];
	userMapping["Sahnan"] = accounts[1];
	userMapping["Vasu"] = accounts[2];
	userMapping["Aditya"] = accounts[3];
	userMapping["Parth"] = accounts[4];
	userMapping["Matic"] = accounts[5];
	web3.eth.getBalance(userMapping['Vitalik']).then(function(data) {
		console.log(data);
	// 	setInterval(buyStream('Vitalik',1,'Aditya',function(err,data) {
	// 	if(err) {
	// 		console.log(err);
	// 	}
	// 	else {
	// 		console.log(data);
	// 	}
		
	// 	}))
	})
	
		
	console.log(userMapping);
});

async function buyStream(username, price, streamerName,callback) {

	userAddress = await userMapping[username];
	userBalance = await web3.eth.getBalance(userAddress);
	if(userBalance > price) {

	web3.eth.sendTransaction({
    from: userAddress,
    gasPrice: "20000000000",
    gas: "21000",
    to: userMapping[streamerName],
    value: "1000000000000000000",
	}).then(function(err,receipt) {
		if(err) {
			callback(err,receipt);
		}
		else {
			callback(null,receipt);
		}
	});
	}
	else {
		web3.eth.getBalance(userAddress).then(function(data) {
			console.log(data);
			callback(null,"Insufficient Balance");
		})
		
	}
}



app.post("/userAddress", (req,res) => {
	console.log("request .....")
	console.log(req.body); 
	var userName = req.body.username;
	if(userMapping[userName]) {
		res.send(userMapping[userName]);
	}
	else {
		res.send(0x0);
	}
})

app.post('/buyStream',(req,res) => {

	buyStream(req.body.username,req.body.price,req.body.streamerAddress,function (err,data) {
		if(err) {
			res.send("Some error");
		}
		else {
			res.send(data);
		}
	})
})

// const forLoop = async => {
// 	console.log("something");
// 	buyStream('Vitalik',1,'Aditya',function(err,data) {
// 		if(err) {
// 			console.log(err);
// 		}
// 		else {
// 			console.log(data);
// 		}
		
// 		})
// } 
setInterval(() => buyStream('Vitalik',1,'Aditya',function(err,data) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(data);
		}
		
		}),10000)

// app.post('/payGoStream',(req,res) => {
// 	buyStream(req.body.username,req.body.price,req.body.streamerAddress,function (err,data) {
// 		if(err) {
// 			res.send("Some error");
// 		}
// 		else {
// 			res.send(data);
// 		}
// 	})
// })






app.listen(port, () => console.log(`server started on port ${port}`))



