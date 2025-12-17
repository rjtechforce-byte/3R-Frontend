const Product = require('../models/product');
const mongoose = require('mongoose');
exports.postProduct = [
  (req, res, next) => {
    console.log('cookie', req.body, req);
    if (!req.session.school) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
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
    //console.log('Received POST /products request with body:', req.body, req.file);
    if (!req.files || !req.files.thumbnail) {
      return res.status(422).send('No image provided');
    }
    const thumbnail = req.files.thumbnail[0].path;
    const images = req.files.images
      ? req.files.images.map((file) => file.path)
      : [];

    console.log({ school: req.session.school });

    const product = new Product({
      school: req.session.school,
      donorName,
      donorClass,
      title,
      category,
      thumbnail,
      images,
      condition,
      description,
    });
    product
      .save()
      .then(() => {
        res.status(201).json({ message: 'Product created successfully' });
      })
      .catch((error) => {
        console.error('Error saving thing:', error);
        res.status(500).json({ error: 'Failed to create thing' });
      });
  },
];


exports.postEditProduct = [
  (req, res, next) => {
    console.log('cookie', req.body, req);
    if (!req.session.school) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  },
  (req, res, next) => {
    if (!req.session.school) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
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
    const availability = Number(req.body.availability);
    let thumbnail;
    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      thumbnail = req.files.thumbnail[0].path;
    } else if (req.body.thumbnail && typeof req.body.thumbnail === "string") {
      thumbnail = req.body.thumbnail;
    } else {
      return res.status(422).send('No image provided');
    }

    let images = [];
    if (req.files && req.files.images) {
      images = req.files.images.map((file) => file.path);
    }
    if (req.body.images) {
      if (Array.isArray(req.body.images)) {
        images = images.concat(req.body.images.filter(img => typeof img === "string"));
      } else if (typeof req.body.images === "string") {
        images.push(req.body.images);
      }
    }
    images = [...new Set(images)];

    Product.findByIdAndUpdate(req.params.id, {
      donorName,
      donorClass,
      title,
      category,
      thumbnail,
      images,
      condition,
      description,
      availability,
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
      const fixedThings = things.map(p => {
        if (p.thumbnail && p.thumbnail.includes('badkend')) {
          p.thumbnail = p.thumbnail.replace('badkend', 'backend');
        }
        if (p.images && p.images.length > 0) {
          p.images = p.images.map(i => i.includes('badkend') ? i.replace('badkend', 'backend') : i);
        }
        return p;
      });
      console.log('Fetched things:', fixedThings);
      res.status(200).json(fixedThings);
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
      if (product.thumbnail && product.thumbnail.includes('badkend')) {
        product.thumbnail = product.thumbnail.replace('badkend', 'backend');
      }
      if (product.images && product.images.length > 0) {
        product.images = product.images.map(i => i.includes('badkend') ? i.replace('badkend', 'backend') : i);
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

  const fixedProducts = products.map(p => {
    if (p.thumbnail && p.thumbnail.includes('badkend')) {
      p.thumbnail = p.thumbnail.replace('badkend', 'backend');
    }
    if (p.images && p.images.length > 0) {
      p.images = p.images.map(i => i.includes('badkend') ? i.replace('badkend', 'backend') : i);
    }
    return p;
  });

  console.log('product from getSchoolProduts', fixedProducts);
  
  res.status(200).json(fixedProducts);
};



exports.getProductSearch = (req, res, next) => {
  const { q } = req.query;

  Product.find({ $text: { $search: q } })
    .then((product) => {
      const fixedProducts = product.map(p => {
        if (p.thumbnail && p.thumbnail.includes('badkend')) {
          p.thumbnail = p.thumbnail.replace('badkend', 'backend');
        }
        if (p.images && p.images.length > 0) {
          p.images = p.images.map(i => i.includes('badkend') ? i.replace('badkend', 'backend') : i);
        }
        return p;
      });
      res.status(200).json(fixedProducts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};




exports.postAddHelpedStudent = (req, res, next) => {
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
};


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
