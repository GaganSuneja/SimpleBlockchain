	var http = require('http')
	var url  = require('url')
	var express = require('express')
	var fs  = require('fs')
	var bodyParser = require('body-parser');
	var morgan = require('morgan');
	var jwt = require('jsonwebtoken');
	var config = require('./config');
	var axios = require('axios');

// ===================================================
// constants

	const updateJsonFile = require('update-json-file');
	const filePath = __dirname+'/user.json'; 
	const loadJsonFile = require('load-json-file');


// ===================================================
// app intialiser

	var app = express();

// ===================================================
// app router
	
	var apiRoutes = express.Router();

// ===================================================
// app sets 
	
	app.set('secret',config.secret);

// ===================================================
// app use modules
	
	app.use(bodyParser.json());
	app.use(morgan('dev'))

// ===================================================
// file handler

	function userExists(email,password){		

			
	}
	
	function getData(){

		return fs.readFileSync(filePath)
	}

// ===================================================
// token generation and verfication

	function generateJwtToken(payload){
		return jwt.sign(payload,app.get('secret'),{
			expiresIn: 86400 //
		});
	}

// ===================================================
// helper functions
 
   	function getblock(req,res,next){
		 var options =  {
			hostname:'127.0.0.1',
			port:5001,
			path:'/getblock',
			method:'GET'
		}

		var block = http.request(options,function(data){
			console.log(`HEADERS: ${JSON.stringify(data.headers)}`);
			data.on('data',(chunk)=>{
				console.log("data is",JSON.parse(chunk));
				res.end(JSON.parse(chunk));
			})
			data.on('end',()=>{
				console.log('No more data in');
			})
			
		});
		block.end();
		
	}	

// ===================================================
// middleware

	apiRoutes.use(function(req,res,next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if(token){
				console.log("token found");
				jwt.verify(token,app.get('secret'),function(err,decoded){
					if(err){
						return res.json({success:"success",message:'Failed to authenticate'});
					}
					req.decoded = decoded;
					next();

				});
		}
		else{
				return res.status(403).send({ 
			        success: false, 
			        message: 'No token provided.' 
			    });
		}
	})

// ===================================================
// routes
	apiRoutes.get('/get',function(req,res){
		res.end("ba");
	});
	
	apiRoutes.get('/profile/:id',function(req,res){
		var url = req.url.split('/');
		console.log(url[1]);
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end('hello world');

	})

// ===================================================
//  login urls
	
	app.get('/test',function (req,res,next){
		 var options =  {
			hostname:'127.0.0.1',
			port:5001,
			path:'/getblock',
			method:'GET'
		}

		var block = http.request(options,function(data){
			console.log(`HEADERS: ${JSON.stringify(data.headers)}`);
			console.log("status code is ",data.statusCode);
			if(data.statusCode!=200){
				res.writeHead(400,{'Content-Type':'text/html'});
				res.end('error in response');
			}
			else{
				data.on('data',(chunk)=>{
					res.end(JSON.parse(chunk));
				})
			data.on('end',()=>{
				console.log('No more data in');
				})	
			}	
		});
		block.on('error',()=>{
			res.end("sorry");
		})
		block.end();
		
	});

	app.get('/',function(req,res){
		res.writeHead(200,{'Content-Type':'text/html'})
		console.log('hello world!');
	})

	app.post('/addtransaction',function(req,res){
		
		const option= {
			hostname:'127.0.0.1',
			port:5001,
			path:'/transactions/new',
			method:'POST',
			headers: {
			    'Content-Type': 'application/json'
			 }
		}
		res.header('Access-Control-Allow-Origin', '*');
  		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		
	/*	let url = "http://127.0.0.1:5001/transactions/new";*/
		
		let data = {
			sender:req.body.sender,
			recipient:req.body.receiver,
			amount:req.body.amount
		}

	/*  axios.post(url,data)
  		.then((res)=>{
  			res.json({
  				success:true,
  				message:"transaction added"
  			});
  		})
  		.catch((error)=>{
  			res.end(error)
  		})*/
		var blockreq = http.request(option,function(data){
				if(data.statusCode!=200){
					res.writeHead(400,{'Content-Type':'text/html'});
					res.end('error in response');
				}
				else
				{
					data.on('data',(chunk)=>{
								console.log(JSON.parse(chunk));
								res.json();
							})
					data.on('end',()=>{
							console.log('No more data in');
							})	
				}	
			});
			
			blockreq.write(JSON.stringify(data));
			

			blockreq.on('error',()=>{
				res.json("sorry");
			})
			
			blockreq.end();

	});

	app.get('/viewtransactions',function(req,res){

			res.header('Access-Control-Allow-Origin', '*');
	  		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	  		let option = {
	  				hostname:'127.0.0.1',
					port:5001,
					path:'/chains',
					method:'GET',
	  		}
	  		var blockreq = http.request(option,function(data){
	  				
	  				//res.writeHead(200,{'Content-Type':'application/json'});
	  				data.on('data',(chunk)=>{
	  					console.log(chunk);
	  					console.log(JSON.parse(chunk));
	  					res.json(JSON.parse(chunk));
	  					res.end();
	  				})
	  		});

	  		blockreq.end();


	});
	
	app.get('/mineblocks',function(req,res){
			let option = {
					hostname:'127.0.0.1',
					port:5001,
					path:'/mine',
					method:'GET',
			}
			res.header('Access-Control-Allow-Origin', '*');
	  		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
			
			let blockreq = http.request(option,function(data){
				data.on('data',(chunk)=>{
					console.log(JSON.parse(chunk))
					res.json(JSON.parse(chunk));
					res.end();
				});
			});

			blockreq.end();

	});
	app.get('/unminedtransactions',function(req,res){

			let option = {
					hostname:'127.0.0.1',
					port:5001,
					path:'/unminedtransactions',
					method:'GET',
			}
			res.header('Access-Control-Allow-Origin', '*');
	  		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
			
			let blockreq = http.request(option,function(data){
				data.on('data',(chunk)=>{
					console.log(chunk);
					console.log(JSON.parse(chunk));
					res.json(JSON.parse(chunk));
					res.end();
				});
			});

			blockreq.end();

	});
// ===================================================
// authenticate user

	app.post('/login',function(req,res){
		const payload = {
			admin:req.body.email
		};
		console.log(req.body.email);
		

		fs.readFile(filePath,'utf-8',function(err,data){
			data = JSON.parse(data);
			
			for(var i=0;i<data.length;i++){
				if(data[i].email == req.body.email && data[i].password == req.body.password){
					let token = generateJwtToken(payload);
					res.header('Access-Control-Allow-Origin', '*');
  					res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
					res.json({
						success:true,
						message:"Enjoy Your Token",
						token:token
					});
					break;
				}
				if(data[i].email == req.body.email && data[i].password != req.body.password ){
					res.header('Access-Control-Allow-Origin', '*');
  					res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
					res.json({
						success:false,
						message:"Denied",
					});
					break;
				}
			}
		});
	
	});

	app.post('/signup',function(req,res){
		var user = req.body;
		updateJsonFile(filePath, (data) => {

			data.push(user);
			const payload = {
				admin:req.body.email
			}
	  		let token = generateJwtToken(payload);
	
			const obj = {
				"success":true,
				"token" :token,
				"message":"Grab your token"
			}
			res.header('Access-Control-Allow-Origin', '*');
  			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
			res.json(obj);	
		});
	});
	
	app.post('/addnode',function(req,res){
		var node = req.body.node;

	});
	
// ===================================================
// route prefix
	
	app.use('/api', apiRoutes);
	app.use(function(req,res,next){
		res.header('Access-Control-Allow-Origin', '*');
  		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	})
// ==================================
// server config
	
	var server = app.listen(6000, function () {
	   var host = server.address().address
	   var port = server.address().port
	   
	   console.log("Example app listening at http://%s:%s", host, port)
	});

