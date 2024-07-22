import express from 'express'
import env from 'dotenv';

env.config()
const app = express();

app.use(express.json())

app.listen(process.env.PORT, () => {
	console.log(`Servidor ON port ${process.env.PORT} 🚀`)
});