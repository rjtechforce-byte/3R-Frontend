const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/admin');

const mongoURI = 'mongodb+srv://tansukh:TANSUKH_CHURU@cluster0.tw1aqnk.mongodb.net/3R?appName=wwwCluster0';

const createAdmin = (name, email, password) => {
    if (!name || !email || !password) {
        console.error('Please provide name, email, and password');
        process.exit(1);
    }

    mongoose.connect(mongoURI)
        .then(() => {
            console.log('Connected to MongoDB');
            return Admin.findOne({ email });
        })
        .then(existingAdmin => {
            if (existingAdmin) {
                throw new Error('Admin with this email already exists');
            }
            return bcrypt.hash(password, 12);
        })
        .then(hashedPassword => {
            const admin = new Admin({
                name,
                email,
                password: hashedPassword
            });
            return admin.save();
        })
        .then(() => {
            console.log('Admin created successfully');
        })
        .catch(error => {
            console.error('Error creating admin:', error.message);
        })
        .finally(() => {
            mongoose.disconnect()
                .then(() => {
                    console.log('Disconnected from MongoDB');
                });
        });
};

const [,, name, email, password] = process.argv;
createAdmin(name, email, password);