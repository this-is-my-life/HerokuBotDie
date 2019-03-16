const discord = require('discord.js')
const client = new discord.Client()
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
client.login(process.env.Token)

client.on('message', (message) => {
  if (message.author === client.user) return
  if (message.content === '뮤다이') {
    heroku.get('https://api.heroku.com/apps/mubotapi/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send('ㄴㄴ, 뮤봇 살아있음')
      } else {
        message.channel.send('뮤다이')
      }
    }).catch(() => {
      message.channel.send('뮤다이')
    })
  }
  if (message.content === 'cq다이') {
    heroku.get('https://api.heroku.com/apps/codequizapi/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send('ㄴㄴ, cq 살아있음')
      } else {
        message.channel.send('cq다이')
      }
    }).catch(() => {
      message.channel.send('cq다이')
    })
  }
  if (message.content === '카텐다이') {
    heroku.get('https://api.heroku.com/apps/keeptypingandnobodyexplodes/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send('ㄴㄴ, 카텐 살아있음')
      } else {
        message.channel.send('카텐다이')
      }
    }).catch(() => {
      message.channel.send('카텐다이')
    })
  }
  if (message.content === '찻봇다이') {
    heroku.get('https://api.heroku.com/apps/chartbotapi/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send('ㄴㄴ, 찻봇 살아있음')
      } else {
        message.channel.send('찻봇다이')
      }
    }).catch(() => {
      message.channel.send('찻봇다이')
    })
  }
  if (message.content === '봇다이다이') {
    message.channel.send('뒤질?')
  }
})
