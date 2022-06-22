const amqp = require('amqplib');
const { RABBITMQ_SERVER } = require('../../env');
const { sendEmail } = require('../../src/helpers/SendEmail.nodemailer');

const EmailVerificationConsumer = async () => {
  const connection = await amqp.connect(RABBITMQ_SERVER);
  const channel = await connection.createChannel();
  console.log('EmailVerificationConsumer connected to RabbitMQ');

  const queue = 'EmailVerification';

  await channel.assertQueue(queue, {
    durable: true
  });

  await channel.consume(queue, async (msg) => {
    console.log('Message received');

    let message = JSON.parse(msg.content.toString());

    let letter = `Hi ${message.full_name},
Thanks for getting started with Jelajah!

We need a little more information to complete your registration, including a confirmation of your email address.

Click below to confirm your email address:

${message.url}

If you have problems, please paste the above URL into your web browser.`;

    const check = await sendEmail(
      message.email,
      'Jelajah Email Verification',
      letter
    );

    if (check) {
      await channel.ack(msg);
    }
  });
};

EmailVerificationConsumer();
