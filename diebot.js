const discord = require('discord.js')
const client = new discord.Client()
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
client.login(process.env.Token)
let result
let die = ['좋은일하다 죽었음.', '갑분뒤짐', '내 죽음을 알리지말라...']
let live = ['ㄴㄴ, 살아있음', '살아있단깨 나는잘 살아있당께', '나는 살아있다!!!!']

client.on('message', (message) => {
  result = Math.floor(Math.random() * 3) + 1

  if (message.author === client.user) return
  if (message.content === '뮤다이') {
    heroku.get('https://api.heroku.com/apps/mubotapi/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send(live[result])
      } else {
        message.channel.send(die[result])
      }
    }).catch(() => {
      message.channel.send(die[result])
    })
  }
  if (message.content === 'cq다이') {
    heroku.get('https://api.heroku.com/apps/codequizapi/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send(live[result])
      } else {
        message.channel.send(die[result])
      }
    }).catch(() => {
      message.channel.send(die[result])
    })
  }
  if (message.content === '카텐다이') {
    heroku.get('https://api.heroku.com/apps/keeptypingandnobodyexplodes/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send(live[result])
      } else {
        message.channel.send(die[result])
      }
    }).catch(() => {
      message.channel.send(die[result])
    })
  }
  if (message.content === '찻봇다이') {
    heroku.get('https://api.heroku.com/apps/chartbotapi/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send(live[result])
      } else {
        message.channel.send(die[result])
      }
    }).catch(() => {
      message.channel.send(die[result])
    })
  }
  if (message.content === '봇다이다이') {
    message.channel.send('죽을래?')
  }
})
