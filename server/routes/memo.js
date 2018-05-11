import express from 'express'
import Memo from '../models/memo'
import mongoose from 'mongoose'

const router = express.Router()

/**
 * Write memo
 * POST /api/memo
 * Body example: { "contents": "Insert memo here" }
 * Error codes:
 *   1: NOT LOGGED IN
 *   2: EMPTY CONTENTS
 */
router.post('/', (req, res) => {
  // Check login status
  if (typeof req.session.loginInfo === 'undefined') {
    return res.status(403).json({
      error: 'NOT LOGGED IN',
      code: 1
    })
  }

  // Check if contents is empty
  if (typeof req.body.contents !== 'string' || req.body.contents === '') {
    return res.status(400).json({
      error: 'EMPTY CONTENTS',
      code: 2
    })
  }

  // Create new memo and save
  let memo = new Memo({
    author: req.session.loginInfo.username,
    contents: req.body.contents
  })

  memo.save(err => {
    if (err) throw err
    return res.json({ success: true })
  })
})

/**
 * Get memo list
 * GET /api/memo
 */
router.get('/', (req, res) => {
  Memo.find()
    .sort({'_id': -1})
    .limit(5)
    .exec((err, memos) => {
      if (err) throw err
      res.json(memos)
    })
})

/**
 * Modify memo
 * PUT /api/memo/:id
 * Body example: { "contents": "Insert modified memo here" }
 * Error codes:
 *   1: INVALID ID
 *   2: EMPTY CONTENTS
 *   3: NOT LOGGED IN
 *   4: MEMO NOT FOUND
 *   5: PERMISSION DENIED
 */
router.put('/:id', (req, res) => {
  // Validate memo id
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: 'INVALID ID',
      code: 1
    })
  }

  // Check if contents is empty
  if (typeof req.body.contents !== 'string' || req.body.contents === '') {
    return res.status(400).json({
      error: 'EMPTY CONTENTS',
      code: 2
    })
  }

  // Check login status
  if (typeof req.session.loginInfo === 'undefined') {
    return res.status(403).json({
      error: 'NOT LOGGED IN',
      code: 3
    })
  }

  // Find memo and check author
  Memo.findById(req.params.id, (err, memo) => {
    if (err) throw err
    if (!memo) {
      return res.status(404).json({
        error: 'MEMO NOT FOUND',
        code: 4
      })
    }
    if (memo.author !== req.session.loginInfo.username) {
      return res.status(403).json({
        error: 'PERMISSION DENIED',
        code: 5
      })
    }

    memo.contents = req.body.contents
    memo.date.edited = new Date()
    memo.isEdited = true

    memo.save((err, memo) => {
      if (err) throw err
      return res.json({
        success: true,
        memo
      })
    })
  })
})

/**
 * Delete memo
 * DELETE /api/memo/:id
 * Error codes:
 *   1: INVALID ID
 *   2: NOT LOGGED IN
 *   3: MEMO NOT FOUND
 *   4: PERMISSION DENIED
 */
router.delete('/:id', (req, res) => {
  // Validate memo id
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: 'INVALID ID',
      code: 1
    })
  }

  // Check login status
  if (typeof req.session.loginInfo === 'undefined') {
    return res.status(403).json({
      error: 'NOT LOGGED IN',
      code: 2
    })
  }

  // Find memo and check author
  Memo.findById(req.params.id, (err, memo) => {
    if (err) throw err
    if (!memo) {
      return res.status(404).json({
        error: 'MEMO NOT FOUND',
        code: 3
      })
    }
    if (memo.author !== req.session.loginInfo.username) {
      return res.status(403).json({
        error: 'PERMISSION DENIED',
        code: 4
      })
    }

    // Remove memo
    memo.remove({_id: req.params.id}, err => {
      if (err) throw err
      res.json({ success: true })
    })
  })
})

export default router
