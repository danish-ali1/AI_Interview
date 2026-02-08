import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import connectDb from './lib/db.js'

const port=process.env.PORT || 8001



app.listen(port,()=>{
    console.log(`app is listening on port:${port}`)
    connectDb()
})