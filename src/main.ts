import express from 'express'
import env from 'dotenv';

env.config()
const app = express();

app.use(express.json())



import authRoute from './auth/auth-route'
import meRoute from './auth/me-route'
import authMiddleware from './auth/auth-middleware';


app.use(authRoute)
app.use(authMiddleware, meRoute)

app.listen(process.env.PORT, () => {
	console.log(`Servidor ON port ${process.env.PORT} 🚀`)
});