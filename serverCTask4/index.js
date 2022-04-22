const Bull = require("bull");
const axios = require("axios");
require("dotenv").config();
const communicationQueue = new Bull("report");
const token = process.env.TOKEN;
const chat_id = process.env.CHATID;
const URL = "https://api.telegram.org/bot";

communicationQueue.process(async (job) => {
  console.log(job.data);
  try {
    const { data } = job.data;
    await axios.post(
      `${URL}${token}/sendMessage?chat_id=${chat_id}&text=${data}`
    );
    console.log(data);
  } catch (error) {
    console.log("an error occur with sending report to telegram server", error);
  }
});
