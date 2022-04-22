require("dotenv").config();
const Bull = require("bull");
const discordQueue = new Bull("discord");
const moderationQueue = require("./moderationQueue");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
try {
 
    const source = "discordApp";
    client.on("messageCreate", async (message) => {
    const data = message.content;
    const id = message.author.id;
    await moderationQueue(id, data, source);
  });
  
  discordQueue.process(async (job) => {
    const warning = job.data;
    await client.users.cache.get(warning.id).send(warning.data);
  
  });
} catch (error) {
  console.log(error);
}

client.login(process.env.DISCORDJS_BOT_TOKEN);

/* 
discordQueue.process(async(job)=>{
    console.log(job.data)
    const warning = job.data
    try {
        client.on('ready', async()=>{
           console.log(client.user.username)
        await (await client.users.fetch(process.env.USER_ID)).send(JSON.stringify(warning.data))    
    
         })
         client.on('messageCreate', (message)=>{
            if (message.content === 'ping'){
                client.message.send('pong')
            }
         })
        
    } catch (error) {
        console.log('An error occured with discord server', error)
    }
}) 

*/
