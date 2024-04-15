import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import crypto from 'crypto';
import Razorpay from 'razorpay';

// Importing routes
import userRoutes from './routes/auth.js';
import courseRoutes from './routes/course.js';
import enrollRoutes from './routes/enroll.js'
import contactusRoutes from './routes/contact.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use('/user', userRoutes);
app.use('/course', courseRoutes);
app.use('/enroll', enrollRoutes);
app.use('/contactus', contactusRoutes);

app.post("/order", async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: "rzp_test_iIdXGzwGVLePDc",
            key_secret: "3sNQy668X3KugreFfmHfvYqC"
        });
        const options = req.body;
        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).send("Error");
        }
        res.json(order);
        //console.log("order",order)
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

app.post('/order/validate', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sha = crypto.createHmac("sha256", "3sNQy668X3KugreFfmHfvYqC");
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const signature = sha.digest("hex");
    if (signature !== razorpay_signature) {
        return res.status(400).json({ msg: "Transaction is not legit!" });
    }
    res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
    });
});

// Connection to MongoDB
mongoose.connect('mongodb+srv://nanoquest:Webdev0224@cluster0.iykisdh.mongodb.net/test',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

// Server connection
app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
});
