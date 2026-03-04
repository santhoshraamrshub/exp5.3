const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
mongoose.connect("mongodb+srv://666688santhosh_db_user:RmoT49xDlcLWIsjX@cluster0.gzt4qen.mongodb.net/?appName=Cluster0")
.then(()=>console.log("MongoDB Connected"));
app.post("/add-product", async (req,res)=>{
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});
app.get("/products", async (req,res)=>{
    const products = await Product.find();
    res.json(products);
});
app.get("/low-stock", async (req,res)=>{
    const result = await Product.aggregate([
        { $unwind: "$variants" },
        { $match: { "variants.stock": { $lt: 10 } } },
        { $project: { name:1, variants:1 } }
    ]);
    res.json(result);
});
app.get("/category-ratings", async (req,res)=>{
    const result = await Product.aggregate([
        {
            $group:{
                _id:"$category",
                avgCategoryRating:{ $avg:"$avgRating" }
            }
        }
    ]);
    res.json(result);
});
app.listen(3000,()=>console.log("Server running on port 3000"));
app.post("/reset", async (req, res) => {
await Product.deleteMany({});
res.json({ message: "All products deleted" });
});