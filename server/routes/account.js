import express from 'express'

const router = express.Router()

router.post('/sign-up', (req, res) => {
  res.json({ success: true })
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
