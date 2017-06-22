const express = require('express')
const bodyParser = require('body-parser')
const runLogic = require('./src/runLogic')

const app = express()
const PORT = process.env.PORT || 3022 //{PORT = 3022} = process.env

app.use(bodyParser.json())

app.post('/', (req, res) => {
  const body = req.body
  const event_type = body.event_type
  const data = body.data
  const hostname = req.hostname
  console.log(`[${hostname}]: "${event_type}" webhook received from Init.ai`)

  if (event_type === 'LogicInvocation') {
    runLogic(data)
      .then(() => console.log('DONE!'))
      .catch((error) => {
        console.log("2", error)
      })
  }

  res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Webhook server is running on port ${PORT}!`))
