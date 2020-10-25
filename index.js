const express = require('express')
const app = express()
const Agent = require('socks5-https-client/lib/Agent')
const request = require('request')
const port = 5000

app.get('/*', async (REQ, RES) => {
  const q = REQ.query.q
  request(
    {
      url: q,
      agentClass: Agent,
      agentOptions: {
        socksHost: 'localhost',
        socksPort: 9050, // Defaults to 1080.
      },
    },
    (err, res) => {
      RES.send(err || res.body)
    }
  )
})

app.listen(port, () => console.log(`Server on port: ${port}`))
