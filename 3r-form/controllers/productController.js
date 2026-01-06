const Product = require('../models/product');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/authMiddleware');
const cloudinary = require('cloudinary').v2;



exports.postProduct = [
  (req, res, next) => {
    console.log('cookie', req.body, req.headers);
    const authorizationHeader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Token not found' });
    }

    let token = authorizationHeader.split(' ')[1];
    if (token && token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1);
    }
    console.log('token', token);
    if (!token) {
      console.log('token not found');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, 'tansukh', (err, decodedToken) => {
      if (err) {
        console.log('invalid token error', err);
        return res.status(401).json({ error: 'Invalid token' });
      }
      console.log('decoded token', decodedToken);
      req.school = decodedToken.schoolId;
      next();
    });
  },
  (req, res, next) => {
    const {
      title,
      donorName,
      donorClass,
      category,
      condition,
      description,
    } = req.body;
    console.log('Received POST /products request with body:', req.body);
    if (!req.files.thumbnail || req.files.thumbnail.length === 0) {
      return res.status(422).send('No image provided');
    }

    cloudinary.uploader.upload(req.files.thumbnail[0].path)
    .then(thumbnailUpload => {
      console.log('thumbnail upload', thumbnailUpload);
      const thumbnailUrl = thumbnailUpload.secure_url;

      let imagesPromises = [];
      if (req.files.images && req.files.images.length > 0) {
        imagesPromises = req.files.images.map(image => {
          return cloudinary.uploader.upload(image.path);
        });
      }
      return Promise.all(imagesPromises).then(imagesUploads => {
        const imagesUrls = imagesUploads.map(upload => upload.secure_url);
        console.log({ school: req.school }, 'images', imagesUrls);

        const product = new Product({
          school: req.school,
          donorName,
          donorClass,
          title,
          category,
          thumbnail: thumbnailUrl,
          images: imagesUrls,
          condition,
          description,
        });
        return product.save();
      });
    })
    .then(() => {
      res.status(201).json({ message: 'Product created successfully' });
    })
    .catch(error => {
      console.error('Error saving thing:', error);
      res.status(500).json({ error: 'Failed to create thing' });
    });
  },
];


exports.postEditProduct = [
  verifyToken,
  (req, res, next) => {
    const {
      title,
      donorName,
      donorClass,
      category,
      condition,
      description,
    } = req.body;
    const availability = Number(req.body.availability);

    let thumbnailUrlPromise = Promise.resolve(req.body.thumbnail);
    if (req.files.thumbnail && req.files.thumbnail[0]) {
      thumbnailUrlPromise = cloudinary.uploader.upload(req.files.thumbnail[0].path).then(thumbnailUpload => thumbnailUpload.secure_url);
    }

    let imagesUrlsPromise = Promise.resolve(req.body.images || []);
    if (req.files.images && req.files.images.length > 0) {
      const newImagesPromises = req.files.images.map((image) => {
        return cloudinary.uploader.upload(image.path).then(imageUpload => imageUpload.secure_url);
      });
      imagesUrlsPromise = Promise.all(newImagesPromises).then(newUrls => {
        const existingUrls = Array.isArray(req.body.images) ? req.body.images : (req.body.images ? [req.body.images] : []);
        return [...existingUrls, ...newUrls];
      });
    }

    Promise.all([thumbnailUrlPromise, imagesUrlsPromise])
      .then(([thumbnailUrl, imagesUrls]) => {
        return Product.findByIdAndUpdate(req.params.id, {
          donorName,
          donorClass,
          title,
          category,
          thumbnail: thumbnailUrl,
          images: imagesUrls,
          condition,
          description,
          availability,
        });
      })
      .then(() => {
        res.status(201).json({ message: 'Product updated successfully' });
      })
      .catch((error) => {
        console.error('Error update thing:', error);
        res.status(500).json({ error: 'Failed to update thing' });
      });
  },
];

exports.getAllProducts = (req, res, next) => {
  Product.find({
    availability: { $gt: 0 }
  })
    .then((things) => {
      console.log('Fetched things:', things);
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch things' });
    });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch product' });
    });
};

exports.getSchoolProducts = async (req, res, next) => {
  const schoolId = req.params.schoolId;

  if (!mongoose.Types.ObjectId.isValid(schoolId)) {
    return res.status(400).json({ message: 'invalid school id' });
  }
  const products = await Product.find({ school: schoolId }).sort({
    createdAt: -1,
  });
  console.log('product from getSchoolProduts', products);
  
  res.status(200).json(products);
};

exports.getProductSearch = (req, res, next) => {
  const { q } = req.query;

  Product.find({ $text: { $search: q } })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};



exports.postAddHelpedStudent = [
  verifyToken,
  (req, res, next) => {
  const { id } = req.params;
  const { helpedStudentName, helpedStudentClass } = req.body;
  
  console.log('body', req.body);
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }

  Product.findByIdAndUpdate(
    id,
    {
      availability: 0,
      helpedStudents: {
        name: helpedStudentName,
        class: helpedStudentClass,
      }
    },
    { new: true }
  )
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json({ message: 'Helped student added successfully', product: updatedProduct });
    })
    .catch((error) => {
      console.error('Error adding helped student:', error);
      res.status(500).json({ error: 'Failed to add helped student' });
    });
}];


exports.getProductsByCategory = (req, res, next) => {
  const { category } = req.query;
  
 
  if (!category) {
    return res.status(400).json({ 
      message: 'Category parameter is required' 
    });
  }
  
 
  const filter = { 
    availability: { $gt: 0 },
    category: category
  };
  
  Product.find(filter)
    .then((products) => {
      console.log(`Fetched ${products.length} products for category ${category}`);
      res.status(200).json(products);
    })
    .catch((error) => {
      console.error(`Error fetching products for category ${category}:`, error);
      res.status(500).json({ 
        error: 'Failed to fetch products by category' 
      });
    });
};

exports.deleteProduct = [
  verifyToken,
  (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: 'Product deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete product' });
    });
}];