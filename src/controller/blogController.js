import { BLOG_STATUS } from '../constants/constants.js'

export const publishBlog = async (req, res) => {
  try {
    const {
      context: {
        models: { Blog },
      },
    } = req
    const { body } = req
    const blog = await Blog.create(body)
    res.status(200).send(blog)
  } catch (error) {
    res.status(400).send(error)
  }
}
export const editBlog = async (req, res) => {
  try {
    const {
      context: {
        models: { Blog },
      },
      params: { id },
      body,
    } = req

    const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true })

    if (!updatedBlog) {
      return res.status(404).send('Blog not found')
    }

    res.status(200).send(updatedBlog)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const deleteBlog = async (req, res) => {
  try {
    const {
      context: {
        models: { Blog },
      },
      params: { id, slug },
    } = req

    const deletedBlog = await Blog.findOneAndDelete({ _id: id, slug })

    if (!deletedBlog) {
      return res.status(404).send('Blog not found')
    }

    res.status(200).send({ message: 'Blog deleted successfully' })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const getBlog = async (req, res) => {
  try {
    const {
      context: {
        models: { Blog },
      },
      params: { id, slug },
    } = req

    const blog = await Blog.findOne({
      _id: id,
      slug,
      status: BLOG_STATUS?.PUBLISHED,
    })
    res.status(200).send(blog)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const getBlogs = async (req, res) => {
  try {
    const {
      context: {
        models: { Blog },
      },
      query: { skip = 0, limit = 10 },
    } = req

    const skipInt = parseInt(skip, 10)
    const limitInt = parseInt(limit, 10)

    const blogs = await Blog.find({ status: BLOG_STATUS?.PUBLISHED })
      .skip(skipInt)
      .limit(limitInt)
      .sort({ date: -1 })

    res.status(200).json(blogs)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
