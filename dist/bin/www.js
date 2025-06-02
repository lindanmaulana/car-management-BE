"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app/app"));
const db_1 = __importDefault(require("../app/db"));
const http_1 = __importDefault(require("http"));
const debug_1 = __importDefault(require("debug"));
const port = normalizePort(process.env.PORT || "8000");
if (port === false) {
    console.error("Invalid port");
    process.exit(1);
}
app_1.default.set("port", port);
const server = http_1.default.createServer(app_1.default);
db_1.default.on("error", () => {
    console.log("Connection error tidak bisa tersambung ke db");
});
db_1.default.on("open", () => {
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
});
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + (addr === null || addr === void 0 ? void 0 : addr.port);
    (0, debug_1.default)(`Listening on ${bind}`);
}
