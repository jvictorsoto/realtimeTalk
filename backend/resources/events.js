var io = null;

function build(ioInstance) {
    io = ioInstance;
    io.on('connection', function (socket) {
        console.log('[SocketIO] a user connected...');
    });
    io.on('disconnect', function (socket) {
        console.log('[SocketIO] a user disconnected...');
    });
}

export { io };

export default { build };