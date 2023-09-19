import express from 'express'
import bodyParser from 'body-parser'
import { PrismaClient } from "@prisma/client"
import cors from "cors"

const app: express.Express = express()
const port = 3000

app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(bodyParser.json())

app.use(cors({
  // origin: 'http://localhost:5173', //アクセス許可するオリジン
  origin: '*', //アクセス許可するオリジン
  credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
  optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}))

const prisma = new PrismaClient()

app.get('/items', async (_req, res) => {
  const allItems = await prisma.item.findMany()
  res.send(allItems)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})