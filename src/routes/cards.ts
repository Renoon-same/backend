import express from 'express'
import {insertCard} from '../service/database'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    console.log("In card...")
    const data = req.body
    if ((await insertCard(data)).valueOf()) {
      res.status(200).json(data)
    } else {
      res.status(500).json(data)
    }
    
  } catch (error: any) {
    res.status(400).json( { error: error?.message } )
  }
})

export default router