const amqp = require('amqplib');

async function publishMessage() {
  try {
    // Conectar ao servidor RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Definir a fila de destino
    const queue = 'queue';

    // Criar a mensagem
    const message = '{"name": "Mensagem"}';

    // Publicar a mensagem na fila
    channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message));

    console.log('Mensagem publicada com sucesso.');

    // Fechar a conexão após publicar a mensagem
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error('Erro ao publicar a mensagem:', error);
  }
}

publishMessage();
