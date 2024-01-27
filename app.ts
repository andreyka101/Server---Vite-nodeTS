import express from 'express'
const app = express()

app.get('/',(req,res)=>{
  res.send("Hi")
})

// Запуск на проде
if (import.meta.env.PROD)
  app.listen(3900)

// Запуск в DEV режиме
export const viteNodeApp = app