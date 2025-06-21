require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const jwt =require('jsonwebtoken')
const cookieParser=require('cookie-parser')
 const userCtrl=require('./controllers/userCtrl')
const fileUpload = require('express-fileupload')



const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true
}))
app.post('/user/refresh_token', userCtrl. refreshtoken);
// Routes
app.get('/', (req, res) => {
    res.json({ msg: "hello there" });
});

app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api',require('./routes/upload'))

process.on('unhandledRejection', (reason) => {
    console.error('UNHANDLED REJECTION:', reason);
});

app.use('/api',require('./routes/productRouter'))

console.log("Cloudinary ENV test:", {
  name: process.env.CLOUD_NAME,
  key: process.env.CLOUD_API_KEY,
  secret: process.env.CLOUD_API_SECRET
});






// MongoDB connection
const URI = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000; // ✅ Also fix casing: process.env.PORT (not `port`)

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ MongoDB connected");

    // ✅ Start server only after DB is connected
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error("❌ MongoDB connection error:", err);
});
