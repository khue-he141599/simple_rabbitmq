const amqp =require('amqplib');

async function sendMessage() {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    const queueName = 'hello-2';

    await channel.assertQueue(queueName, {durable: false});
    const message = 'Hello, RabbitMQ';

    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`[x] Sent`, Buffer.from(message));
    
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);

}

sendMessage();