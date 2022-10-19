import express from 'express'
import mongoose from 'mongoose'
import { register } from './controllers/userControllers.js'
import { registerValidation } from './validations/auth.js'

mongoose
	.connect(
		'mongodb+srv://admin:qwerty12345@cluster0.7blq8ii.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => console.log('Server BD Connected...'))
	.catch(() => console.log('Server BD Connected Error...'))

const app = express()
app.use(express.json())
// { User} 
app.post('/auth/register', registerValidation, register)

app.listen('4000', (err) => {
	if (err) return console.log('Ошибка Сервера... ${err}')
	console.log('Сервер был успешно запущен...')
})


