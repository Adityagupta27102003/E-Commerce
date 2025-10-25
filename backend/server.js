import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
const app = express()
connectDB()
connectCloudinary()

const whiteList = [
    'https://e-commerce-frontend-kohl-mu.vercel.app/',
    'https://your-custom-domain.com' 
    
]
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {

      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 
};

app.use(express.json())

app.use(cors(corsOptions));

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)


app.get('/', (req, res) => {
    res.send("API Working")
})

export default app;
