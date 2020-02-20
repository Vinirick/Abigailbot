const Discord = require("discord.js")
const client = new Discord.Client()
const toApng = require('gif-to-apng')
const download = require('download-file')
const config = require("./config.json")

client.on("ready", () => {
    console.log("O Bot foi iniciado"); 
  })
  

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  
  if (comando === "apng"){
    
  let info = {filename: "emoji.gif"}  
  let [nome, emojilink] = args
  if(!args[0]) return message.reply("Você esqueceu de definir os argumentos\n !apng <nome> <link.gif>");
  if(!args[1]) return message.channel.send("Você esqueceu de definir o link do emoji\n !apng <nome> <link.gif>");
    
    download(emojilink, info, function(err){
      if (!err)  {
      console.log("gif identificado")
      toApng('emoji.gif')
     .then(() => {
       message.guild.createEmoji('emoji.png', nome)
       message.channel.send("O gif-emoji foi convertido para o modo NITRO-Pobre é adicionado!!!")
      })
     .catch(error => console.log('não consegui converter a imagem 💀', error))
      }else {
        message.channel.send("Link invalido")
      }
    })
    
  
  }
  
  });
  
  client.login(config.token)