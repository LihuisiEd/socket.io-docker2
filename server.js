const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['pkc-03gz2.southamerica-west1.gcp.confluent.cloud:9092'],
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: 'QT5N76SAGJQOBOAV',
    password: 'oxwiv/jX01koWkNHaz593lLru8+bH1r8WsHEqO0p+AWWPE30xJv9WHeGngdfnFN8',
  },
});

const producer = kafka.producer();


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const sendMessageToKafka = (message) => {
  const payloads = [
    {
      topic: 'mensajes',
      messages: message,
    },
  ];

  producer.send(payloads, (err, data) => {
    if (err) {
      console.log('Error al enviar mensaje a Kafka:', err);
    } else {
      console.log('Mensaje enviado a Kafka:', data);
    }
  });
};

const stdin = process.openStdin();
stdin.addListener('data', (data) => {
  const message = data.toString().trim();
  sendMessageToKafka(message);
});

http.listen(3000, () => {
  console.log('Servidor Express en ejecución en http://localhost:3000');
});
