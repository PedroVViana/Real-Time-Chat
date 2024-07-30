
//importando express
const app = require('express')()
//Criar server http passando o app como instancia
const server = require('http').createServer(app)
//importando socket.io
//cors é um mecanismo do navegador que consegue limitar de onde vem as requisições
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:5173'}})

//Porta que está o backend
const PORT = 3001

//Conexão com o front, qualquer socket do front vai se conectar com o nosso backend
//o socked cria uma id aleatoriamente para cada conexão feita
io.on('connection', socket => {
    console.log('usuário conectado!', socket.id)

    socket.on('disconnect', reason => {
        console.log('Usuário desconectado')
    })

    socket.on('set_username', username => {
        socket.data.username = username
        console.log(socket.data.username)
    })

    socket.on('message', text => {
        io.emit('receive_message', {
            text,
            authorID: socket.id,
            author: socket.data.username
        })
    })
})

//rodar servidor
server.listen(PORT, () => console.log('Server running...'))