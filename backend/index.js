const port = 4000;
const express = require('express')

const app = express();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors');
const { type } = require('os');

app.use(express.json());
app.use(cors())

// DATabase connection with mongo db

mongoose.connect("mongodb://localhost:27017/e-commerce");

// API creation

app.get('/', (req, res) => {
    res.send("Express App is Running")
})

// Image storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

//Creating Upload end point for image
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Shema for creating product 

const Product = mongoose.model("product", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true
    }
})

app.post('/addproduct', async (req, res) => {

    let products = await Product.find({});

    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0];

        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    })
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Creating API  for deleting products

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed ");
    res.json({
        success: true,
        name: req.body.name
    })
})

//Creating api for gettting all product 

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("all Product fetched");
    res.send(products)
})

// Schema creating for user model 

const User = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    cartData: {
        type: Object
    },
    data: {
        type: Date,
        default: Date.now,
    }
})

// Creating end point for registering the user 

app.post('/signup', async (req, res) => {
    let check = await User.findOne({ email: req.body.email });

    if (check) {
        return res.status(400).json({
            success: false,
            errors: "existing user found with same eamil address"
        })
    }
    let cart = {};

    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom')
    res.json({ success: true, token })

})

// Creating end point for user login 

app.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        const passCompare = req.body.password === user.password;

        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom')
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, errors: "Wrong Password" })
        }
    } else {
        res.json({ success: false, errors: "wrong email id" })
    }

})

// Creating new endpoint for newcollection
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New collection Fetched")
    res.send(newcollection)
})

//Creating new endpoint for popular in women 
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popularinwomen = products.slice(0, 4);
    console.log("Popular in women fetched")
    res.send(popularinwomen);

})


//Creating middleware to fetch user 

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({
            errors: "Please authenticate using valid token"
        })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using valid token" })
        }
    }
}


//Creating end point for cart data



app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        let userData = await User.findOne({ _id: req.user.id });

        if (!userData) {
            return res.status(404).send("User not found");
        }



        const itemId = req.body.itemId;

        if (!itemId) {
            return res.status(400).send("Item ID is required");
        }

        if (userData.cartData[itemId]) {
            userData.cartData[itemId] += 1;
        } else {
            userData.cartData[itemId] = 1;
        }

        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Creating endpoint to remove prodict from cart data

app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        let userData = await User.findOne({ _id: req.user.id });

        if (!userData) {
            return res.status(404).send("User not found");
        }



        const itemId = req.body.itemId;

        if (!itemId) {
            return res.status(400).send("Item ID is required");
        }

        if (userData.cartData[itemId] > 0) {
            userData.cartData[itemId] -= 1;
        }

        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})

// creating endpoint for 

app.post('/getcart', fetchUser, async (req, res) => {
    console.log("Get cartData")
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

//  Shema for order list 

const orderList = mongoose.model('orderList', {
    customerName: {
        type: String
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    pin: {
        type: Number,
    },
    paymentMethod: {
        type: String
    },
    qunantity: {
        type: Number
    },
    total: {
        type: Number
    }
})

app.post('/addorderlist', async (req, res) => {
    const order = new orderList({
        customerName: req.body.customerName,
        address: req.body.address,
        city: req.body.city,
        pin: req.body.pin,
        paymentMethod: req.body.paymentMethod,
        quantity: req.body.quantity,
        total: req.body.total

    })
    await order.save();
    console.log("Order list saved")
    res.json({
        success: true
    })
})

app.listen(port, (err) => {
    if (!err) {
        console.log("Server running on Port " + port)
    } else {
        console.log("Error  " + err)
    }
})

