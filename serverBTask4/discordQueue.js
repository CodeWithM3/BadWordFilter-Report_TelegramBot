const Bull = require('bull');
require('dotenv').config()

const discordFeedBack = new Bull('discord', {
    redis: process.env.REDIS_URL,
});

const discordQueue = async(data) =>{
    await discordFeedBack.add({id: data.id,data: data.message})
}
module.exports = discordQueue;