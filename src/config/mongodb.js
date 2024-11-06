const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI; // Ambil dari env
        console.log("MONGODB_URI:", uri);
        await mongoose.connect(uri);
        console.log("MongoDB terhubung dengan sukses");
    } catch (error) {
        console.error("Error menghubungkan ke MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
