import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import {
  publishBlog,
  deleteBlog,
  editBlog,
  getBlog,
  getBlogs,
  saveAsDraft,
} from '../controller/blogController.js'
import multer from 'multer'

const blogRouter = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

blogRouter.get('/blogs', getBlogs)
blogRouter.get('/:slug', getBlog)
blogRouter.post(
  '/publish',
  authMiddleware,
  upload.single('thumbnail'),
  publishBlog
)
blogRouter.put('/edit', authMiddleware, editBlog)
blogRouter.delete('/delete', authMiddleware, deleteBlog)
blogRouter.post(
  '/save-as-draft',
  authMiddleware,
  upload.single('thumbnail'),
  saveAsDraft
)

export default blogRouter
