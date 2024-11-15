# Node.js Clustered Application

This application demonstrates how to set up a Node.js server using clustering to distribute load across multiple CPU cores, allowing for better utilization of system resources.

## Prerequisites

- **Node.js** installed (v18 or higher recommended)
- **Git** for version control
- **Apache Lounge** for `ab` (Apache Benchmark) load testing on Windows

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/rathoraashish/nodejs-multi-core-server.git
cd nodejs-multi-core-server
```

### 2. Install Dependencies

This project does not require additional dependencies, as it uses Node.js built-in modules. However, you can initialize a Node.js project if you haven't done so:

```bash
npm init -y
```

### 3. Running the Application

To start the server, run:

```bash
node cluster-server.js
```

This command will start the server in cluster mode. The master process will fork worker processes based on the number of CPU cores available.

## Code Explanation

In the `cluster-server.js` file:

- **Master Process**: Manages the worker processes and restarts any that crash.
- **Worker Processes**: Handle incoming requests. Each worker logs its `process.pid` when a request is received, so you can observe how requests are distributed across the cluster.

## Using Apache Lounge for Load Testing

### 1. Install Apache Lounge

Download Apache HTTP Server from the Apache Lounge website: https://www.apachelounge.com/download/

- Extract the downloaded file to a folder on your computer (e.g., `C:\Apache24`).

### 2. Locate `ab.exe`

Inside the extracted Apache folder, you will find `ab.exe` in the `bin` directory (e.g., `C:\Apache24\bin\ab.exe`).

### 3. Run Apache Benchmark

Open Command Prompt and navigate to the `bin` directory. Then, run the following command to test the clustered Node.js server:

ab -n 100 -c 10 http://localhost:3000/

Explanation:
- `-n 100` specifies the total number of requests to make.
- `-c 10` specifies the number of concurrent requests to send.

This command will help you see how the Node.js clustered server handles multiple requests and distributes the load across workers.
