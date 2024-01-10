const amqp = require('amqplib');

async function receiveMessage() {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    const queueName = 'hello-2';

    await channel.assertQueue(queueName, {durable: false});

    console.log(`[*] Waiting for messages. To exit, press CTRL+C`);

    channel.consume(
      queueName,
      (message) => {
        console.log(`[x] Received '${message.content.toString()}'`);
      },
      { noAck: true }
    );
}

receiveMessage();