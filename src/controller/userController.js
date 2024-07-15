export const register = async (req, res) => {
  try {
    const {
      context: {
        models: { User },
      },
    } = req
    const { body } = req
    await User.create(body)
    console.log(body)
    res.status(200).send(body)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

export const login = async (req, res) => {
  try {
    const {
      context: {
        models: { User },
      },
    } = req
    const {
      body: { email, password },
    } = req

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      return res.status(404).send({ message: 'User not found' })
    }

    const passwordCorrect = await existingUser.isPasswordCorrect(password)
    if (!passwordCorrect) {
      return res.status(404).send({ message: 'incorrect password' })
    }
    const token = existingUser.generateAccessToken()
    res.status(200).send({ token, message: 'User logged in successfully' })
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}



