import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import {
  createBlog,
  deleteBlog,
  editBlog,
  getBlog,
  getBlogs,
} from '../controller/blogController.js'

const blogRouter = express.Router()

blogRouter.get('/blogs', getBlogs)
blogRouter.get('/:slug', getBlog)
blogRouter.post('/create', authMiddleware, createBlog)
blogRouter.put('/edit', authMiddleware, editBlog)
blogRouter.delete('/delete', authMiddleware, deleteBlog)

export default blogRouter
