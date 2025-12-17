const express = require('express');
const path = require('path');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const productRoute = require('./routes/productRoute');
const errorController = require('./controllers/errorController');
const mongoURI =
  'mongodb+srv://tansukh:TANSUKH_CHURU@cluster0.tw1aqnk.mongodb.net/3R?appName=wwwCluster0';
const multer = require('multer');
const schoolRoute = require('./routes/schoolRoute');
// Middleware to parse JSON bodies
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // Only allow this specific origin
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, 'public/uploads');
  },
  filename: (req, file, cd) => {
    cd(null, randomString(10) + '_' + file.originalname);
  },
});

const fileFilter = (req, file, cd) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cd(null, true);
  } else {
    cd(null, false);
  }
};

const multerOptions = {
  storage,
  fileFilter,
};

console.log(MongoStore);

app.use(
  session({
    name: 'schools',
    secret: 'tansukhkey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoURI,
      dbName: '3R',
      collection: 'sessions',
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'lax' },
  })
);

app.use('/public/uploads', [(req, res, next) => {
console.log('Static file request', req.path, req.url);
next();
},express.static(path.join(__dirname, 'public', 'uploads'))]);
app.use(express.json());

app.use(
  '/',
  multer(multerOptions).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 12 },
    { name: 'schoolImage', maxCount: 1 },
  ]),
  productRoute
);
app.use('/school', schoolRoute);
app.use(errorController.error);
// Connect to MongoDB and start the server

mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
