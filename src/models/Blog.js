import { Schema, model } from 'mongoose'

const blogSchema = new Schema({})

const Blog = new model('Blog', blogSchema)

export default Blog
