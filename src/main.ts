import express from 'express'
import env from 'dotenv';

env.config()
const app = express();

app.use(express.json())



import authMiddleware from './auth/auth-middleware';
import authRoute from './auth/auth-route'
import meRoute from './auth/me-route'
import userRoute from './user/user-route'
import addressRoute from "./address/address-route"
import cartRoute from "./cart/cart-route"
import categoryRoute from "./category/category-route"
import productRoute from "./product/product-route"


app.use('/authenticate',authRoute)
app.use('/me', authMiddleware,meRoute)
app.use('/user',authMiddleware,userRoute)
app.use('/adress', authMiddleware, addressRoute)
app.use('/cart', authMiddleware, cartRoute)
app.use('/category',categoryRoute)
app.use('/product', productRoute)


app.listen(process.env.PORT, () => {
	console.log(`Servidor ON port ${process.env.PORT} 🚀`)
});