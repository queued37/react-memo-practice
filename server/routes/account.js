import express from 'express'
import Account from '../models/account'

const router = express.Router()

/**
 * Account sign up
 * POST /api/account/sign-up
 * Body example: { "username": "test", "password": "test" }
 * Error codes:
 *   1: BAD USERNAME
 *   2: BAD PASSWORD
 *   3: USERNAME EXISTS
 */
router.post('/sign-up', (req, res) => {
  const usernameRegex = /^[a-z0-9]+$/
  console.log(req.body.username)

  // Check username format
  if (!usernameRegex.test(req.body.username)) {
    return res.status(400).json({
      error: 'BAD USERNAME',
      code: 1
    })
  }

  // Check password length
  if (req.body.password.length < 4 || typeof req.body.password !== 'string') {
    return res.status(400).json({
      error: 'BAD PASSWORD',
      code: 2
    })
  }

  // Check user existence
  Account.findOne({ username: req.body.username }, (err, exists) => {
    if (err) throw err
    if (exists) {
      return res.status(409).json({
        error: 'USERNAME EXISTS',
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

/**
 * Account sign in
 * POST /api/account/sign-in
 * Body example: { "username": "test", "password": "test" }
 * Error codes:
 *   1: LOGIN FAILED
 */
router.post('/sign-in', (req, res) => {
  if (typeof req.body.password !== 'string') {
    return res.status(400).json({
      error: 'LOGIN FAILED',
      code: 1
    })
  }

  Account.findOne({ username: req.body.username }, (err, account) => {
    if (err) throw err

    // Check account existence
    if (!account) {
      return res.status(401).json({
        error: 'LOGIN FAILED',
        code: 1
      })
    }

    // Validate password
    if (!account.validateHash(req.body.password)) {
      return res.status(401).json({
        error: 'LOGIN FAILED',
        code: 1
      })
    }

    // Alter session
    let session = req.session
    session.loginInfo = {
      _id: account._id,
      username: account.username
    }

    return res.json({
      success: true
    })
  })
})

/**
 * Get session info
 * GET /api/account/get-info
 * Error codes:
 *   1: NOT SIGNED IN
 */
router.get('/get-info', (req, res) => {
  console.log(req.session)
  if (typeof req.session.loginInfo === 'undefined') {
    return res.status(401).json({
      error: 'NOT SIGNED IN',
      code: 1
    })
  }

  res.json({ info: req.session.loginInfo })
})

/**
 * Account logout
 * POST /api/account/logout
 */
router.post('/logout', (req, res) => {
  req.session.destroy(err => { if (err) throw err })
  return res.json({ success: true })
})

export default router
