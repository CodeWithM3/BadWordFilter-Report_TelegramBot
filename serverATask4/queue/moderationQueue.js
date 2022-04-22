const Bull = require('bull')
require('dotenv').config()
const moderation= new Bull('comment', {
    redis : process.env.REDIS_URL 
});

const moderationQueue = async (data, source) =>{
   await moderation.add({ id: data.id, comment:data.comment,source});
}
module.exports = moderationQueue;