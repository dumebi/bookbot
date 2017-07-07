const express = require('express')
const bodyParser = require('body-parser')
const runLogic = require('./src/runLogic')

const app = express()
const {PORT = 3022} = process.env

app.use(bodyParser.json())

app.post('/', ({body: {event_type, data}, hostname}, res) => {
  console.log(`[${hostname}]: "${event_type}" webhook received from Init.ai`)

  if (event_type === 'LogicInvocation') {
    runLogic(data)
      .then(() => console.log('LogicInvocation success!'))
      .catch((error) => console.log('LogicInvocation Error:\n', error))
  }

  res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Webhook server is running on port ${PORT}!`))
