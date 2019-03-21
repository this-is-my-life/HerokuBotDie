const discord = require('discord.js')
const client = new discord.Client()
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
client.login(process.env.Token)
let result
let live = ['ㄴㄴ, 살아있음', '히 어라이브!', '말을 걸어보면 알겠지', '님 읽씹당한거임, 난 잘됨', '응~ 나는되', 'Expected working: Working good on CORE.js 1:0']
let die = ['노동하다 죽었음.', '다이.', '방해금지 킨거임', '우리 읽씹하고있음 함무라비 법전을 따라야함', '방해전파 때문에 봇다이', 'Unexpected Error: Working Bad on die.js 6:66']

client.on('message', (message) => {
  result = Math.floor(Math.random() * live.length) + 1

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
