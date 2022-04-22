const Bull = require("bull");
const URL = "https://neutrinoapi.net/bad-word-filter";
const axios = require("axios");
const discordQueue = require('./discordQueue')

require("dotenv").config();

const moderationQueue = new Bull("comment");
console.log("hello");

moderationQueue.process(async (job) => {
  try {
   
    const incomingComment = job.data;
    const { data } = await axios.post(URL, {
      userId: process.env.USERID,
      apiKey: process.env.APIKEY,
      content: incomingComment.comment,
    });
    const commentFilterResult = data["is-bad"];
    if (commentFilterResult && incomingComment.source === 'Blog') {
      await axios.delete(
        `http://localhost:4000/api/delete/${incomingComment.id}`
      );
    }else if(commentFilterResult && incomingComment.source === 'discordApp'){
      console.log(incomingComment.id)
      const data = ({id: incomingComment.id,message: 'You just used a word that is offensive to other users'})
      await discordQueue(data)
    }
  } catch (error) {
    console.log("error with Language Moderation Queue", error);
  }
});
