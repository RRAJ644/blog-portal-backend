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

    const { content, title, slug, id } = body

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
      file,
    } = req

    const { content, title, slug } = body

    let payload = {
      description: content,
      title,
      slug,
    }

    if (file) {
      payload.thumbnail = `data:image/webp;base64,${file.buffer.toString(
        'base64'
      )}`
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, payload, { new: true })
    if (!updatedBlog) {
      return res.status(404).send('Blog not found')
    }
    res.status(200).json(updatedBlog)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

export const deleteBlog = async (req, res) => {
  try {
    const {
      context: {
        models: { Blog },
      },
      params: { id },
    } = req

    const deletedBlog = await Blog.findByIdAndDelete(id)

    if (!deletedBlog) {
      return res.status(404).send({ message: 'An Error Occurred' })
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

    let filter

    if (status === 'drafts') {
      filter = BLOG_STATUS?.DRAFT
    } else {
      filter = BLOG_STATUS?.PUBLISHED
    }

    const blogs = await Blog.find({ status: filter }).sort({ createdAt: -1 })

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

    let payload = {
      description: content,
      title,
      slug,
    }

    if (file) {
      payload = {
        ...payload,
        thumbnail: `data:image/webp;base64,${file.buffer.toString('base64')}`,
      }
    }

    const draft = await Blog.create({ ...payload, status: BLOG_STATUS?.DRAFT })
    res.status(200).send(draft)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const publishDraft = async (req, res) => {
  try {
    const {
      context: {
        models: { Blog },
      },
      params: { id },
    } = req

    const draft = await Blog.findByIdAndUpdate(
      id,
      { status: BLOG_STATUS.PUBLISHED },
      { new: true }
    )

    if (!draft) {
      return res.status(404).send({ message: 'Draft not found' })
    }

    res.status(200).send({ message: 'Published Successfully', draft })
  } catch (error) {
    res.status(500).send(error)
  }
}
export const searchBlogs = async (req, res) => {
  try {
    const {
      context: {
        models: { Blog },
      },
      query: { search },
    } = req

    let query = {}

    if (search && typeof search === 'string' && search.trim().length > 0) {
      query = { title: { $regex: search, $options: 'i' } }
    }

    const blogs = await Blog.find(query)

    res.status(200).send(blogs)
  } catch (error) {
    console.error('Error searching blogs:', error)
    res.status(500).send({ message: 'An error occurred while searching blogs' })
  }
}

export const getSlugs = async (req, res) => {
  try {
    const {
      context: {
        models: { Blog },
      },
    } = req
    const slugs = await Blog.aggregate([
      { $project: { _id: 0, slug: 1 } },
      { $match: { slug: { $ne: null } } },
      { $group: { _id: null, slugs: { $push: '$slug' } } },
    ])
    res.status(200).send(slugs)
  } catch (error) {
    console.error('Error searching blogs:', error)
    res.status(500).send({ message: 'An error occurred while searching blogs' })
  }
}
