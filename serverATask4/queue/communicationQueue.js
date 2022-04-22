const Bull = require('bull');
require('dotenv').config()

const feedBack = new Bull('report', {
    redis: process.env.REDIS_URL,
});

const communicationQueue = async(data) =>{
    await feedBack.add({data: data.message})
}
module.exports = communicationQueue;