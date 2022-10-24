import { postControllers, userControllers} from "./controllers/index.js"
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import CheckAuth from './utilis/CheckAuth.js'
import { registerValidation } from './validations/authValidation.js'
import { loginValidation } from './validations/loginValidation.js'
import { postValidation } from './validations/PostValidation.js'

mongoose
	.connect('mongodb+srv://admin:admin@cluster0.y2tthyt.mongodb.net/?retryWrites=true&w=majority')
	.then(() => console.log('Server BD Connected...'))
	.catch(() => console.log('Server BD Connected Error...'))

const app = express()
app.use(express.json())
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

// Upload Images
app.post('/upload', CheckAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

app.use('/uploads', express.static('uploads'))
// { User} 
// Created user
app.post('/auth/register', registerValidation, userControllers.register)
//login User
app.post('/auth/login', loginValidation, userControllers.login)

app.get('/auth/profile', CheckAuth, userControllers.getMe  )

//Post
// { Poems }
app.post('/post', CheckAuth, postValidation,  postControllers.createdNewPost)
app.get('/posts',postControllers.getAllPosts )
//Get single post
app.get('/post:id', postControllers.getSinglePost)
//Remove post
app.delete('/post:id', CheckAuth, postControllers.removePosts)
//Update post 
app.patch('/post:id', CheckAuth, postValidation, postControllers.updatePost)


app.listen('4000', (err) => {
	if (err) return console.log('Ошибка Сервера... ${err}')
	console.log('Сервер был успешно запущен...')
})



