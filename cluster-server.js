import cluster from 'cluster';
import os from 'os';
import { createServer } from 'http';

if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(`Master process is running with PID ${process.pid}`);
    console.log(`Forking ${numCPUs} workers...`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Listen for worker exit and replace with a new one
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Spawning a new worker...`);
        cluster.fork();
    });
} else {
    // Code for each worker process
    createServer((req, res) => {
        // Log the worker PID handling the request
        console.log(`Worker ${process.pid} handling request`);
        res.writeHead(200);
        res.end(`Hello from worker ${process.pid}`);
    }).listen(3000, () => {
        console.log(`Worker ${process.pid} started`);
    });
}
