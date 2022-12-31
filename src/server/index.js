const express = require('express')();
const os = require('os');
const fetch = require('node-fetch');

const app = express();
const server = require('http').createServer(app);

const { Server } = require('socket.io');

const io = new Server(server);
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(express.static('dist'));
app.use(express.json());

app.get('/api/getUsername', (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.get('/', (req, res) => {
  res.send('Front Page');
});
app.post('/api/check-auth', async (req, res) => {
  const { login, password } = req.body.user;
  const url = `http://localhost:3004/users?login=${login}`;

  const data = await fetch(url);
  const users = await data.json();
  const [user] = users;

  if (user && user.password === password) {
    res.json({ user: user.login });
  } else {
    res.status(403).end();
  }
});

server.listen(process.env.PORT || 8000, () =>
  console.log(`Listening on port ${process.env.PORT || 8000}!`)
);
