require('dotenv').config()
// console.log(process.env);

const IS_IN_CLOUD = Boolean(process.env.IS_IN_CLOUD)

const fs = require('fs'),
	  key = IS_IN_CLOUD ? null : fs.readFileSync('./key.pem'),
	  cert = IS_IN_CLOUD ? null : fs.readFileSync('./cert.pem')
	//   key = IS_IN_CLOUD ? null : fs.readFileSync('./cert.key'),
	//   cert = IS_IN_CLOUD ? null : fs.readFileSync('./cert.crt')

const express = require('express'),
	  https = require('https'),
	  app = express(),
	  server = IS_IN_CLOUD ? app : https.createServer({ key: key, cert: cert }, app),
	  path = require('path'),
	  cors = require('cors'),
	  methodOverride = require('method-override'),
	  PORT = process.env.PORT || 5234

const errorHandler = require('./handlers/error'),
	  mainRoutes = require('./routes/main'),
	  searchRoute = require('./routes/search')

app.set('view engine', 'ejs');
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const { auth, requiresAuth } = require('express-openid-connect');

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.SECRET_KEY,
	baseURL: IS_IN_CLOUD ? 'https://revisao-provas.onrender.com' : 'https://localhost:5234/',
	clientID: 'u6a7CIPqT1iecSPiu1ymGLs7Abs3l5HK',
	issuerBaseURL: 'https://dev-ue37dz04.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
	if (req.oidc.isAuthenticated()) {
		res.redirect('/provas')
	} else {
		res.render('home')
	}
});

app.use('/provas', mainRoutes)
app.use('/search', searchRoute)

app.get('/profile', requiresAuth(), (req, res) => {
	res.send(JSON.stringify(req.oidc.user));
});


app.use(errorHandler);

// Start server
server.listen(PORT, () => {
	console.log(`Revisão de Provas app running on port ${PORT}`);
});


