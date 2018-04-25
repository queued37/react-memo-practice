import express from 'express'
import Account from '../models/account'

const router = express.Router()

router.post('/sign-up', (req, res) => {
  const usernameRegex = /^[a-z0-9]+$/
  console.log(req.body.username)

  // Check username format
  if (!usernameRegex.test(req.body.username)) {
    return res.status(400).json({
      error: 'Bad Username',
      code: 1
    })
  }

  // Check password length
  if (req.body.password.length < 4 || typeof req.body.password !== 'string') {
    return res.status(400).json({
      error: 'Bad password',
      code: 2
    })
  }

  // Check user existence
  Account.findOne({ username: req.body.username }, (err, exists) => {
    if (err) throw err
    if (exists) {
      return res.status(409).json({
        error: 'Username exists',
        code: 3
      })
    }

    let account = new Account({
      username: req.body.username,
      password: req.body.password
    })

    account.password = account.generateHash(account.password)

    account.save(err => {
      if (err) throw err
      res.json({ success: true })
    })
  })
})

router.post('/sign-in', (req, res) => {
  res.json({ success: true })
})

router.get('/get-info', (req, res) => {
  res.json({ info: null })
})

router.post('/logout', (req, res) => {
  return res.json({ success: true })
})

export default router
