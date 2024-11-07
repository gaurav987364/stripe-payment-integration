const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require('stripe')('sk_test_51Pu9NVCR7xdE1BYxyzA2t6Br4eaRwxSwhdbCqoGIUB9H6Bfrf4PoFtGNsjejx1L2Grnh45Q46ifNvA0kG939Sjh8002d7UAO8O')

// Enable CORS for cross-origin requests

app.use(express.json());
app.use(cors());

// checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;


    const lineItems = products.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.category,
                images:[product.image]
            },
            unit_amount:product.price * 100,
        },
        quantity:product.quantity
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/cancel",
    });

    res.json({id:session.id})
 
})


app.listen(7000,()=>{
    console.log("server start")
})