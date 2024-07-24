import express from 'express'
import env from 'dotenv';

env.config()
const app = express();

app.use(express.json())



import authMiddleware from './auth/auth-middleware';
import authRoute from './auth/auth-route'
import meRoute from './auth/me-route'
import userRoute from './user/user-route'
import adressRoute from "./adress/adress-route"


app.use('/authenticate',authRoute)
app.use('/me', authMiddleware,meRoute)
app.use('/user',authMiddleware,userRoute)
app.use('/adress', authMiddleware, adressRoute)

app.listen(process.env.PORT, () => {
	console.log(`Servidor ON port ${process.env.PORT} 🚀`)
});