const School = require('../models/school');
const bycrypt = require('bcryptjs');
const Product = require('../models/product');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const cloudinary = require('cloudinary').v2;
const { verifyToken } = require('../middlewares/authMiddleware');


exports.postSchoolRegister = async (req, res, next) => {
  const { schoolName, subDistrict, password, schoolEmail, schoolPhone, address, inchargeName, inchargePhone } = req.body;
  console.log('request come from user', req.body);
  if (!req.files.schoolImage) {
    return res.status(422).send("No image provided");
  }

  try {
    const existingSchool = await School.findOne({ schoolEmail: schoolEmail });
    if (existingSchool) {
      return res.status(400).json({ error: "This email is already exist" });
    }

    const hashedPassword = await bycrypt.hash(password, 12);
    const result = await cloudinary.uploader.upload(req.files.schoolImage[0].path);
    const school = new School({
      schoolImage: result.secure_url,
      schoolName,
      subDistrict,
      password: hashedPassword,
      schoolEmail,
      schoolPhone,
      address,
      inchargeName,
      inchargePhone
    });

    await school.save();
    res.status(201).json({ message: 'School created successfully' });
  } catch (error) {
    console.error('Error saving school:', error);
    return res.status(500).json({ error: 'An error occurred while creating the school.' });
  }
};

exports.getCurrentSchool = [
 verifyToken,
  (req, res, next) => {
    if (req.school) {
        const schoolId = req.school; 
        School.findById(schoolId)
          .select('-password -__v') // Exclude sensitive fields
          .then(school => {
            if (!school) {
              return res.status(404).json({ error: 'School not found' });
            }
            res.status(200).json(school);
          })
          .catch(error => {
            res.status(500).json({ error: 'Failed to fetch school' });
          });
    } else if (req.admin) {
        const adminId = req.admin;
        Admin.findById(adminId)
            .select('-password -__v')
            .then(admin => {
                if (!admin) {
                    return res.status(404).json({ error: 'Admin not found' });
                }
                res.status(200).json({ ...admin.toObject(), isAdmin: true });
            })
            .catch(error => {
                res.status(500).json({ error: 'Failed to fetch admin' });
            });
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
  }
];


exports.postSchoolLogin =  async (req, res, next) => {
    const { schoolEmail, password } = req.body;
    const school = await School.findOne({ schoolEmail });
    if (school) {
        if (!school.isApproved) {
            return res.status(401).json({ error: 'School not approved' });
        }
        const isPasswordValid = await bycrypt.compare(password, school.password);
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        req.school =  school._id;
        const token = jwt.sign({ schoolId: school._id }, 'tansukh', { expiresIn: '1h' } );
        res.setHeader('Authorization', 'Bearer ' + token);
       return res.status(200).json({ message: 'Login successful', token: token});
    }

    const admin = await Admin.findOne({ email: schoolEmail });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isPasswordValid = await bycrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ adminId: admin._id }, 'tansukh', { expiresIn: '1h' } );
    console.log('token', token);
    
    res.setHeader('Authorization', 'Bearer ' + token);
    return res.status(200).json({ message: 'Admin login successful', token: token, isAdmin: true });
};


exports.getAllSchool = (req, res, next) => {
  School.find({ isApproved: true }).select("_id schoolName schoolEmail schoolImage subDistrict schoolPhone address inchargeName inchargePhone createdAt updatedAt").then((data) => {
    console.log('datas', data)
    res.status(200).json(data)
  }).catch((err) => {
    res.status(500).json({ message: 'fail to fetch all school' })
  })
}

exports.getSchoolById = (req, res, next) => {
  const schoolId = req.params.schoolId;
  School.findOne({ _id: schoolId, isApproved: true }).select("_id schoolName schoolImage schoolEmail subDistrict schoolPhone address inchargeName inchargePhone createdAt updatedAt").then((data) => {
    if (!data) {
      return res.status(404).json({ message: 'School not found or not approved' });
    }
    console.log('datas', data)
    res.status(200).json(data)
  }).catch((err) => {
    res.status(500).json({ message: 'fail to fetch school' })
  })
}



exports.getSchoolLeaderBoard = async (req, res, next) => {
   const product = await Product.aggregate([
    {
      $group:{
        _id: "$school",
        totalProducts: { $sum: 1 },
        helpedStudents: {
          $addToSet: {
            $cond: [
              { $and: [{ $ne: ["$helpedStudents.name", null] }, { $ne: ["$helpedStudents.name", ""] }] },
              "$helpedStudents.name",
              null
            ]
          }
        }
      }
    },
    {
      $addFields: {
        helpedStudents: {
          $size: {
            $filter: {
              input: "$helpedStudents",
              cond: { $ne: ["$$this", null] }
            }
          }
        }
      }
    },
    {
      $sort: { totalProducts: -1 }
    },
    {
      $lookup: {
        from: "schools",
        let: { schoolId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$schoolId"] },
              isApproved: true
            }
          }
        ],
        as: "school"
      }
    },
    { $unwind: "$school" },
    {
      $project: {
      "school.password": 0,
      "school.__v": 0
      }
    }
  ])
res.status(200).json(product)
}


exports.getSchoolBySubDistrict = (req, res, next) => {
  const { subDistrict } = req.query;
  console.log('get schhool by sub district', req.query);
  
  School.find({subDistrict, isApproved: true}).then((data) => {
    return res.status(200).json(data)
  }).catch(err => {
    console.log('error while getting school by sub district',err)
    res.status(400).json({ message: 'no school in this sub disrtict'})
  })
}

exports.approveSchool = [
  verifyToken,
  (req, res, next) => {
  const schoolId = req.params.schoolId;
  School.findById(schoolId)
    .then(school => {
      if (!school) {
        return res.status(404).json({ message: 'School not found' });
      }
      school.isApproved = true;
      return school.save();
    })
    .then(result => {
      res.status(200).json({ message: 'School approved successfully', school: result });
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to approve school' });
    });
}];

exports.getUnapprovedSchools = [
  verifyToken,
  (req, res, next) => {
  School.find({ isApproved: false }).select("_id schoolName schoolEmail schoolImage subDistrict schoolPhone address inchargeName inchargePhone createdAt updatedAt")
    .then(schools => {
      res.status(200).json(schools);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to fetch unapproved schools' });
    });
}];


exports.deleteSchool = [
  verifyToken,
  (req, res, next) => {
  const schoolId = req.params.schoolId;
  School.findByIdAndDelete(schoolId)
    .then(() => {
      res.status(200).json({ message: 'School deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to delete school' });
    });
}];


exports.updateSchoolDetails = [
  verifyToken,
  async (req, res, next) => {
    const { schoolName, subDistrict, schoolEmail, schoolPhone, address, inchargeName, inchargePhone } = req.body;
    const schoolId = req.school;

    try {
      const school = await School.findById(schoolId);
      if (!school) {
        return res.status(404).json({ message: 'School not found' });
      }

      
      school.schoolName = schoolName || school.schoolName;
      school.subDistrict = subDistrict || school.subDistrict;
      school.schoolEmail = schoolEmail || school.schoolEmail;
      school.schoolPhone = schoolPhone || school.schoolPhone;
      school.address = address || school.address;
      school.inchargeName = inchargeName || school.inchargeName;
      school.inchargePhone = inchargePhone || school.inchargePhone;

      
      if (req.files && req.files.schoolImage) {
        const result = await cloudinary.uploader.upload(req.files.schoolImage[0].path);
        school.schoolImage = result.secure_url;
      }

      const updatedSchool = await school.save();

      res.status(200).json({ message: 'School details updated successfully', school: updatedSchool });
    } catch (error) {
      console.error('Error updating school:', error);
      res.status(500).json({ message: 'An error occurred while updating the school.' });
    }
  }
]; 