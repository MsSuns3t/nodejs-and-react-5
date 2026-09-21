const express = require("express");
const cors = require ("cors")

const app = express();

app.use(cors());

const products = [
    {id:0, name:"bread", price:10.00},
    {id:1, name:"Cheese", price:15.50},
    {id:2, name:"Eggs", price:67.67},
];

app.get('/api/products', (req,res) => {
    res.send(JSON.stringify(products));
});

app.listen(3001, () => {
    console.log("server running on http://localhost:3001");
});
