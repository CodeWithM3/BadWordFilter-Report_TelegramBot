const Bull = require('bull');
require('dotenv').config()
const moderation= new Bull('comment', {
    redis : process.env.REDIS_URL 
});

const moderationQueue = async (id, data, source) =>{
   await moderation.add({ id, comment:data, source});
}
module.exports = moderationQueue;