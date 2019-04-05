const discord = require('discord.js')
const client = new discord.Client()
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
client.login(process.env.Token)
let result
let apis = ['mubotapi', 'codequizapi', 'keeptypingandnobodyexplodes', 'chartbotapi']
let live = ['ㄴㄴ, 살아있음', '히 어라이브!', '말을 걸어보면 알겠지', '님 읽씹당한거임, 난 잘됨', '응~ 나는되', 'Expected working: Working good on CORE.js 1:0']
let die = ['노동하다 죽었음.', '다이.', '방해금지 킨거임', '우리 읽씹하고있음 함무라비 법전을 따라야함', '방해전파 때문에 봇다이', 'Unexpected Error: Working Bad on die.js 6:66']

client.on('message', (message) => {
  if (message.content === '봇다이') {
    dieDetail(message)
  } if (message.content.split(' ')[0] === 'heroku' && message.content.split(' ')[1]) {
    message.channel.send('wait...').then((msg) => {
      heroku.get(message.content.split(' ')[1]).then((result) => {
        msg.edit('```json\n' + JSON.stringify(result).substring(0, 1500) + '\n```')
        if (JSON.stringify(result).length >= 1500) {
          message.channel.send('... Can\'t see more')
        }
      }).catch((err) => {
        msg.edit('```json\n' + JSON.stringify(err) + '\n```')
      })
    })
  } else {
    dieChecker(message)
  }
})

async function dieDetail (message) {
  let ment1 = '==== Process has Started ===='
  let ment2 = ['Waiting for request..\n']
  let ment3 = 'diebotapi...up\n'
  let result = []
  let embed = new discord.RichEmbed()
    .setColor(0x00ffff)
    .setDescription('처리로그```ini\n' + ment1 + '\n```\nHeroku응답```json\n' + ment2 + '\n```\n산출결과```\n' + ment3 + '\n```')
    .setFooter('Heroku Node Process Checker')
  message.channel.send(embed).then((emb) => {
    let wait = 0
    for (let counter = 0; counter < apis.length; counter++) {
      ment1 += '\n[' + apis[counter] + ']\nRequest Heroku Data (Http/Get)'
      embed.setDescription('처리로그```ini\n' + ment1 + '\n```\nHeroku응답```json\n' + ment2[counter] + '\n```\n산출결과```\n' + ment3 + '\n```')
      emb.edit(embed)
      heroku.get('/apps/' + apis[counter] + '/dynos/worker.1').then((dyno) => {
        ment1 += '\nHeroku Server Response Collected'
        ment2[counter] = JSON.stringify(dyno)
        embed.setDescription('처리로그```ini\n' + ment1 + '\n```\nHeroku응답```json\n' + ment2[counter] + '\n```\n산출결과```\n' + ment3 + '\n```')
        emb.edit(embed)
        ment1 += '\nCaculating Status...' + dyno.state
        ment3 += apis[counter] + '...' + dyno.state + '\n'
        result[counter] = dyno.state
        embed.setDescription('처리로그```ini\n' + ment1 + '\n```\nHeroku응답```json\n' + ment2[counter] + '\n```\n산출결과```\n' + ment3 + '\n```')
        emb.edit(embed)
        wait++
        if (wait === apis.length) {
          embed.setColor(0x00ff00)
            .setDescription('처리결과')
          for (let counter2 = 0; counter2 < apis.length; counter2++) {
            if (result[counter2] === 'up') {
              embed.addField(apis[counter2] + ': ' + '⭕', '```json\n' + ment2[counter2] + '```')
              emb.edit(embed)
            } else {
              embed.addField(apis[counter2] + ': ' + '❌', '```json\n' + ment2[counter2] + '```')
              emb.edit(embed)
            }
          }
        }
      })
    }
  })
}

function dieChecker (message) {
  result = Math.floor(Math.random() * live.length) + 1

  if (message.author === client.user) return
  if (message.content.split(' ')[0] === '뮤다이') {
    heroku.get('/apps/mubotapi/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send(live[result])
      } else {
        message.channel.send(die[result])
      }
    }).catch((err) => {
      if (err) {
        message.channel.send(die[result])
      }
    })
  }
  if (message.content.split(' ')[0] === 'cq다이') {
    heroku.get('/apps/codequizapi/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send(live[result])
      } else {
        message.channel.send(die[result])
      }
    }).catch((err) => {
      if (err) {
        message.channel.send(die[result])
      }
    })
  }
  if (message.content.split(' ')[0] === '카텐다이') {
    heroku.get('/apps/keeptypingandnobodyexplodes/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send(live[result])
      } else {
        message.channel.send(die[result])
      }
    }).catch((err) => {
      if (err) {
        message.channel.send(die[result])
      }
    })
  }
  if (message.content.split(' ')[0] === '찻봇다이') {
    heroku.get('/apps/chartbotapi/dynos/worker.1').then((dyno) => {
      if (dyno.state === 'up') {
        message.channel.send(live[result])
      } else {
        message.channel.send(die[result])
      }
    }).catch((err) => {
      if (err) {
        message.channel.send(die[result])
      }
    })
  }
  if (message.content.split(' ')[0] === '봇다이다이') {
    message.channel.send('죽을래?')
  }
  if (message.content.split(' ')[0] === '뮤리붓') {
    if (JSON.parse(process.env.owners).includes(message.author.id)) {
      heroku.delete('/apps/mubotapi/dynos')
      message.channel.send('처리완료')
    } else {
      message.channel.send('에러: 승인되지 않은 사용자!')
    }
  }
  if (message.content.split(' ')[0] === 'cq리붓') {
    if (JSON.parse(process.env.owners).includes(message.author.id)) {
      heroku.delete('/apps/codequizapi/dynos')
      message.channel.send('처리완료')
    } else {
      message.channel.send('에러: 승인되지 않은 사용자!')
    }
  }
  if (message.content.split(' ')[0] === '카텐리붓') {
    if (JSON.parse(process.env.owners).includes(message.author.id)) {
      heroku.delete('/apps/keeptypingandnobodyexplodes/dynos')
      message.channel.send('처리완료')
    } else {
      message.channel.send('에러: 승인되지 않은 사용자!')
    }
  }
  if (message.content.split(' ')[0] === '찻봇리붓') {
    if (JSON.parse(process.env.owners).includes(message.author.id)) {
      heroku.delete('/apps/chartbotapi/dynos')
      message.channel.send('처리완료')
    } else {
      message.channel.send('에러: 승인되지 않은 사용자!')
    }
  }
}
