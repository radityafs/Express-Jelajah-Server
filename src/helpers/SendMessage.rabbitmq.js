const amqp = require('amqplib');
const { RABBITMQ_SERVER } = require('../../env');

module.exports = {
  sendMessageVerificationEmail: async (message) => {
    const connection = await amqp.connect(RABBITMQ_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue('EmailVerification', {
      durable: true
    });

    await channel.sendToQueue(
      'EmailVerification',
      Buffer.from(JSON.stringify(message))
    );

    setTimeout(() => {
      connection.close();
    }, 1000);
  }
};
