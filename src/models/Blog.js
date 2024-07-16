import { Schema, model } from 'mongoose'

const blogSchema = new Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: Schema.Types.Mixed,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    tag: {
      type: String,
      index: true,
    },
    slug: {
      type: String,
      index: true,
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
  },
  {
    timestamps: true,
  }
)

const Blog = new model('Blog', blogSchema)

export default Blog
