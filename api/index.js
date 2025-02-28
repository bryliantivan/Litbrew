// index.js (atau file utama server kamu)

const express = require('express');
const mongoose = require('mongoose'); // Jika menggunakan MongoDB
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const port = process.env.PORT;
const moongose = require("mongoose");
const cors = require("cors");
const protect = require("./middleware/Auth"); //Ganti dari auth ke protect

// ... (koneksi database, middleware lain, dll.)

// Buat folder 'uploads' menjadi statis.  Ini PENTING agar gambar bisa diakses.
app.use('/uploads', express.static('uploads'));

app.use(express.json()); // Middleware untuk parsing JSON

//cors configuration
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./Routes/User");
const productRoute = require("./Routes/Product");
const orderRoute = require("./Routes/Order");
const voucherRoute = require("./Routes/Voucher");


// database Seeder Route
app.use('/api/seed', databaseSeeder)

//routes buat user
// api/users/login
app.use('/api/users', userRoute);

//routes buat product
// api/products
app.use('/api/products', productRoute);

//routes buat orders
// api/orders
app.use('/api/orders', orderRoute);

app.use('/api/vouchers', voucherRoute);

// ... (start server)

moongose.connect(process.env.MONGOOSEDB_RUL)
.then(()=>console.log("db connected"))
.catch((err)=>{ //then kedua diubah jadi catch
    console.log(err); //tampilkan error di console, jangan diabaikan
})

app.listen(port, '0.0.0.0', ()=>{
    console.log(`server running in port ${port}`)
})