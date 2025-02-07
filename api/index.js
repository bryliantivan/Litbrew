const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const port = process.env.PORT;
const moongose = require("mongoose");
const cors = require("cors");

// connect DB
// 3EJzdJXsFbkSFKGa
// paundrarangga31
// mongodb+srv://paundrarangga31:3EJzdJXsFbkSFKGa@data.y3hz3.mongodb.net/litbrewdatabase    

moongose.connect(process.env.MONGOOSEDB_RUL).then(()=>console.log("db connected")).then((err)=>{
    err;
})

app.use(cors({
    origin: "http://localhost:5173", // Ganti dengan URL frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./Routes/User");
const productRoute = require("./Routes/Product");
const orderRoute = require("./Routes/Order");

app.use(express.json())

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

app.listen(port, ()=>{
    console.log(`server running in port ${port}`)
})