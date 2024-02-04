const schedule = require("node-schedule");

const scheduleTask = () => {
  const job = schedule.scheduleJob("*/15 * * * *", () => {
    console.log(accountSid, authToken);
  });
  return job;
  sendEmail();
};
module.exports = scheduleTask;

const sendEmail = () => {};
