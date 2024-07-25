import { BLOG_STATUS } from '../constants/constants.js'

export const publishBlog = async (req, res) => {
  try {
    const {
      context: {
        models: { Blog },
      },
      body,
      file,
    } = req

    const { content, title, slug } = body
    const payload = {
      title,
      description: content,
      thumbnail: `data:image/webp;base64,${file?.buffer?.toString('base64')}`,
      slug,
    }

    const blog = await Blog.create({
      ...payload,
      status: BLOG_STATUS?.PUBLISHED,
    })
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

    const updatedBlog = await Blog.findOneAndUpdate(id, body, { new: true })

    if (!updatedBlog) {
      return res.status(404).send('Blog not found')
    }

    res.status(200).send(updatedBlog)
  } catch (error) {
    res.status(400).send(error)
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
    res.status(400).send(error)
  }
}

export const getBlog = async (req, res) => {
  try {
    const {
      context: {
        models: { Blog },
      },
      params: { id },
    } = req

    const blog = await Blog.findById(id)
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
      query: { status },
    } = req

    console.log(status)
    const blogs = await Blog.find({
      status: status === 'drafts' ? BLOG_STATUS.DRAFT : BLOG_STATUS?.PUBLISHED,
    }).sort({
      date: -1,
    })

    res.status(200).send(blogs)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const saveAsDraft = async (req, res) => {
  try {
    const {
      context: {
        models: { Blog },
      },
      body,
      file,
    } = req

    const { content, title, slug } = body

    const payload = {
      description: content,
      title,
      slug,
      thumbnail: `data:image/webp;base64,${file.buffer.toString('base64')}`,
    }

    const draft = await Blog.create({ ...payload, status: BLOG_STATUS?.DRAFT })
    res.status(200).send(draft)
  } catch (error) {
    res.status(400).send(error)
  }
}
