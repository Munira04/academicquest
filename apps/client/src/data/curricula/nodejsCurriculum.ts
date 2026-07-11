import type { Course } from '../../types/curriculum';

export const nodejsCourse: Course = {
  id: 'web5',
  title: 'Node.js',
  tagline: 'JavaScript on the server',
  philosophy: 'Node.js is taught through building real APIs — Express routes, middleware, and database connections.',
  icon: '🟢',
  color: 'from-green-500 to-green-700',
  level: 'INTERMEDIATE',
  pillar: 'Web Development',
  xp: 400,
  sections: [
    {
      sectionId: 'node-section-1',
      title: 'Section 1: Node.js Fundamentals',
      learningObjective: 'Master the core concepts of Node.js including modules, file system operations, and asynchronous programming.',
      order: 1,
      isLocked: false,
      xpReward: 150,
      keyConcepts: ['Modules', 'File System', 'Async/Await', 'Streams', 'Events', 'Package Management'],
      estimatedMinutes: 90,
      lessons: [
        {
          lessonId: 'node-01', title: 'Hello Node & Modules', type: 'learn', difficulty: 'intermediate', track: 'nodejs', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 1 of 5',
            conceptText: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine. It runs JavaScript outside the browser, enabling server-side development. console.log() outputs to the terminal. Modules organize code: require() imports CommonJS modules (legacy), import/export for ES6 modules (modern). The global object provides browser-like APIs: global.process, global.__dirname, global.__filename. Node uses an event-driven, non-blocking I/O model.',
            instructions: 'Create a simple Node.js program that prints "Hello from Node.js!" and logs the current directory using __dirname.',
          },
          utilities: {
            hint: 'console.log("Hello from Node.js!");\nconsole.log("Current directory:", __dirname);',
            flashcard: { front: 'What is the difference between require() and import?', back: 'require() is CommonJS (Node legacy), synchronous, works in Node. import is ES6 modules (modern), asynchronous, works in browsers and Node with "type": "module". Use import for new projects, require for legacy compatibility.' },
            solution: 'console.log("Hello from Node.js!");\nconsole.log("Current directory:", __dirname);\nconsole.log("File name:", __filename);\nconsole.log("Node version:", process.version);',
          },
          rightPanel: { startingCode: '// Node.js Lesson 1\n// Print greeting and directory\n\n', expectedOutput: 'Hello from Node.js!' },
        },
        {
          lessonId: 'node-02', title: 'File System Operations', type: 'learn', difficulty: 'intermediate', track: 'nodejs', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 2 of 5',
            conceptText: 'The fs module interacts with the file system. Use fs.promises for async/await: const fs = require("fs").promises;. Key methods: readFile(), writeFile(), appendFile(), mkdir(), readdir(). Paths use forward slashes on all platforms. Always handle errors with try/catch. Use path.join() to build cross-platform paths. File operations are I/O-bound, so async versions prevent blocking.',
            instructions: 'Read a file called data.txt, log its contents, then write "Hello" to output.txt.',
          },
          utilities: {
            hint: 'const fs = require("fs").promises;\nconst data = await fs.readFile("data.txt", "utf8");\nconsole.log(data);\nawait fs.writeFile("output.txt", "Hello");',
            flashcard: { front: 'Why use fs.promises instead of callback-based fs?', back: 'fs.promises provides Promise-based methods that work with async/await, making code cleaner and easier to read than callback hell. Callback-based fs is legacy and harder to maintain.' },
            solution: 'const fs = require("fs").promises;\nconst path = require("path");\n\nasync function handleFiles() {\n  try {\n    const data = await fs.readFile("data.txt", "utf8");\n    console.log("File contents:", data);\n    \n    await fs.writeFile("output.txt", "Hello from Node!");\n    console.log("Written to output.txt");\n  } catch (error) {\n    console.error("Error:", error.message);\n  }\n}\n\nhandleFiles();',
          },
          rightPanel: { startingCode: 'const fs = require("fs").promises;\n// Read and write files\n', expectedOutput: 'File operations completed' },
        },
        {
          lessonId: 'node-03', title: 'Asynchronous Programming', type: 'learn', difficulty: 'intermediate', track: 'nodejs', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 3 of 5',
            conceptText: 'Node.js is built on async/await and Promises. async functions return Promises. await pauses execution until a Promise resolves. This non-blocking model enables handling many concurrent operations efficiently. Avoid mixing callbacks and Promises. Use Promise.all() for parallel operations. Use Promise.race() for the first to complete. Error handling with try/catch around await.',
            instructions: 'Create three async functions that simulate delays with setTimeout. Use Promise.all() to run them in parallel and log when all complete.',
          },
          utilities: {
            hint: 'async function delay(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\nawait Promise.all([delay(100), delay(200), delay(300)]);',
            flashcard: { front: 'What is the difference between Promise.all() and Promise.race()?', back: 'Promise.all() waits for ALL promises to resolve (or any to reject). Promise.race() resolves/rejects as soon as ANY promise settles. Use all for parallel operations, race for timeouts or fastest-response scenarios.' },
            solution: 'function delay(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\n\nasync function task1() {\n  await delay(100);\n  console.log("Task 1 complete");\n  return "Result 1";\n}\n\nasync function task2() {\n  await delay(200);\n  console.log("Task 2 complete");\n  return "Result 2";\n}\n\nasync function task3() {\n  await delay(300);\n  console.log("Task 3 complete");\n  return "Result 3";\n}\n\nasync function runParallel() {\n  console.log("Starting parallel tasks...");\n  const start = Date.now();\n  \n  const results = await Promise.all([task1(), task2(), task3()]);\n  \n  console.log("All tasks complete:", results);\n  console.log("Total time:", Date.now() - start, "ms");\n}\n\nrunParallel();',
          },
          rightPanel: { startingCode: '// Create async tasks with Promise.all\n', expectedOutput: 'All tasks complete' },
        },
        {
          lessonId: 'node-04', title: 'Streams & Buffers', type: 'practice', difficulty: 'intermediate', track: 'nodejs', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 4 of 5',
            conceptText: 'Streams handle data piece by piece instead of loading everything into memory. Types: Readable, Writable, Duplex, Transform. Use fs.createReadStream() and fs.createWriteStream() for large files. Pipes connect streams: readStream.pipe(writeStream). Buffers are fixed-size raw binary data. Streams are memory-efficient for processing large files, network requests, and real-time data.',
            instructions: 'Create a readable stream from a file and pipe it to a writable stream (copy file).',
          },
          utilities: {
            hint: 'const fs = require("fs");\nconst readStream = fs.createReadStream("input.txt");\nconst writeStream = fs.createWriteStream("output.txt");\nreadStream.pipe(writeStream);',
            flashcard: { front: 'Why use streams instead of readFile() for large files?', back: 'Streams process data in chunks, using constant memory regardless of file size. readFile() loads the entire file into memory, which can crash with large files. Streams are essential for video, logs, and big data processing.' },
            solution: 'const fs = require("fs");\n\nconst readStream = fs.createReadStream("large-file.txt", { encoding: "utf8" });\nconst writeStream = fs.createWriteStream("copy.txt");\n\nreadStream.on("data", (chunk) => {\n  console.log("Received chunk:", chunk.length, "bytes");\n});\n\nreadStream.on("end", () => {\n  console.log("Read complete");\n});\n\nwriteStream.on("finish", () => {\n  console.log("Write complete");\n});\n\nreadStream.pipe(writeStream);\n\n// Handle errors\nreadStream.on("error", (err) => console.error("Read error:", err));\nwriteStream.on("error", (err) => console.error("Write error:", err));',
          },
          rightPanel: { startingCode: 'const fs = require("fs");\n// Create streams and pipe\n', expectedOutput: 'Stream copy completed' },
        },
        {
          lessonId: 'node-05', title: 'Events & EventEmitter', type: 'practice', difficulty: 'intermediate', track: 'nodejs', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 5 of 5',
            conceptText: 'The events module implements the Observer pattern. EventEmitter emits named events; listeners respond. const emitter = new EventEmitter(); emitter.on("event", handler); emitter.emit("event", data);. Once listeners fire once and are removed. Remove listeners with off() or removeListener(). Many Node.js core modules inherit from EventEmitter (streams, HTTP). Events enable loose coupling and extensibility.',
            instructions: 'Create an EventEmitter that emits "userJoined" and "userLeft" events with user data. Add listeners that log these events.',
          },
          utilities: {
            hint: 'const EventEmitter = require("events");\nconst emitter = new EventEmitter();\nemitter.on("userJoined", (user) => console.log(user.name + " joined"));\nemitter.emit("userJoined", { name: "Munira" });',
            flashcard: { front: 'What is the difference between on() and once() for event listeners?', back: 'on() adds a persistent listener that fires every time the event occurs. once() adds a listener that fires once and is automatically removed. Use once for one-time setup or initialization.' },
            solution: 'const EventEmitter = require("events");\n\nclass ChatRoom extends EventEmitter {\n  join(user) {\n    this.emit("userJoined", user);\n  }\n  \n  leave(user) {\n    this.emit("userLeft", user);\n  }\n  \n  message(user, text) {\n    this.emit("message", { user, text });\n  }\n}\n\nconst chat = new ChatRoom();\n\nchat.on("userJoined", (user) => {\n  console.log(`👋 ${user.name} joined the chat`);\n});\n\nchat.on("userLeft", (user) => {\n  console.log(`👋 ${user.name} left the chat`);\n});\n\nchat.on("message", ({ user, text }) => {\n  console.log(`💬 ${user.name}: ${text}`);\n});\n\nchat.join({ name: "Munira", id: 1 });\nchat.message({ name: "Munira", id: 1 }, "Hello everyone!");\nchat.leave({ name: "Munira", id: 1 });',
          },
          rightPanel: { startingCode: 'const EventEmitter = require("events");\n// Create event-driven chat system\n', expectedOutput: 'Event-driven chat system' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'node-super-01', title: 'Package Management with npm', type: 'supercharge', difficulty: 'intermediate', track: 'nodejs', xpReward: 35,
          leftPanel: {
            chapterProgress: 'Section 1 — Supercharge Challenge',
            conceptText: 'npm (Node Package Manager) manages dependencies and scripts. package.json defines project metadata and dependencies. npm install adds dependencies to node_modules and package.json. npm install --save-dev adds devDependencies (build tools, testing). npm run executes scripts defined in package.json. npm init creates a new package.json. Use .gitignore to exclude node_modules from version control. Semantic versioning (semver) specifies version ranges.',
            instructions: 'Initialize a package.json, install a popular package (lodash), and create a script to run your application.',
          },
          utilities: {
            hint: 'npm init -y\nnpm install lodash\n// In package.json scripts:\n"start": "node index.js"\n// Run with: npm start',
            flashcard: { front: 'What is the difference between dependencies and devDependencies?', back: 'dependencies are required for production (express, lodash). devDependencies are only for development (testing frameworks, build tools). npm install --production skips devDependencies. Always separate them correctly.' },
            solution: '// package.json\n{\n  "name": "my-node-app",\n  "version": "1.0.0",\n  "description": "A Node.js application",\n  "main": "index.js",\n  "scripts": {\n    "start": "node index.js",\n    "dev": "node --watch index.js",\n    "test": "node test.js"\n  },\n  "dependencies": {\n    "lodash": "^4.17.21"\n  },\n  "devDependencies": {\n    "nodemon": "^3.0.0"\n  }\n}\n\n// index.js\nconst _ = require("lodash");\n\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = _.map(numbers, n => n * 2);\nconsole.log("Doubled:", doubled);\n\nconst sum = _.sum(numbers);\nconsole.log("Sum:", sum);',
          },
          rightPanel: { startingCode: '// Create package.json and use npm packages\n', expectedOutput: 'Package management setup complete' },
        },
      ],
      sectionProject: {
        lessonId: 'node-project-1', title: 'Section Project: File Processor CLI', type: 'project', difficulty: 'intermediate', track: 'nodejs', xpReward: 40,
        leftPanel: {
          chapterProgress: 'Section 1 — Section Project',
          conceptText: 'Build a command-line file processor using Node.js fundamentals. This project will demonstrate file system operations, streams, async programming, and event handling.',
          instructions: 'Build a CLI tool that:\n  • Reads a file specified as command-line argument\n  • Processes the content (count words, lines, characters)\n  • Writes statistics to an output file\n  • Uses streams for large files\n  • Emits events for progress tracking',
        },
        utilities: {
          hint: 'Use process.argv for CLI arguments. Use fs.createReadStream for large files. Use EventEmitter for progress. Use path module for file paths. Add error handling. Create package.json with bin entry.',
          flashcard: { front: 'How do you access command-line arguments in Node.js?', back: 'process.argv is an array where [0] is node executable, [1] is script path, and [2+] are user arguments. Use a library like yargs or commander for sophisticated CLI parsing with flags and options.' },
          solution: 'const fs = require("fs");\nconst path = require("path");\nconst { EventEmitter } = require("events");\n\nclass FileProcessor extends EventEmitter {\n  constructor(inputFile, outputFile) {\n    super();\n    this.inputFile = inputFile;\n    this.outputFile = outputFile;\n  }\n  \n  async process() {\n    this.emit("start", { file: this.inputFile });\n    \n    const readStream = fs.createReadStream(this.inputFile, { encoding: "utf8" });\n    let content = "";\n    let chunks = 0;\n    \n    readStream.on("data", (chunk) => {\n      content += chunk;\n      chunks++;\n      this.emit("progress", { chunks, size: chunk.length });\n    });\n    \n    return new Promise((resolve, reject) => {\n      readStream.on("end", () => {\n        const stats = this.analyze(content);\n        this.emit("analyzed", stats);\n        \n        fs.writeFile(this.outputFile, JSON.stringify(stats, null, 2), (err) => {\n          if (err) {\n            this.emit("error", err);\n            reject(err);\n          } else {\n            this.emit("complete", stats);\n            resolve(stats);\n          }\n        });\n      });\n      \n      readStream.on("error", (err) => {\n        this.emit("error", err);\n        reject(err);\n      });\n    });\n  }\n  \n  analyze(content) {\n    const lines = content.split("\\n").length;\n    const words = content.split(/\\s+/).filter(w => w).length;\n    const characters = content.length;\n    const charactersNoSpaces = content.replace(/\\s/g, "").length;\n    \n    return {\n      file: this.inputFile,\n      lines,\n      words,\n      characters,\n      charactersNoSpaces,\n      processedAt: new Date().toISOString()\n    };\n  }\n}\n\n// CLI usage\nconst inputFile = process.argv[2] || "input.txt";\nconst outputFile = process.argv[3] || "stats.json";\n\nconst processor = new FileProcessor(inputFile, outputFile);\n\nprocessor.on("start", ({ file }) => console.log(`📂 Processing ${file}`));\nprocessor.on("progress", ({ chunks }) => console.log(`📊 Chunks read: ${chunks}`));\nprocessor.on("analyzed", (stats) => console.log(`📝 Analysis complete`));\nprocessor.on("complete", (stats) => console.log(`✅ Results written to ${outputFile}`));\nprocessor.on("error", (err) => console.error(`❌ Error:`, err.message));\n\nprocessor.process().catch(console.error);',
        },
        rightPanel: { startingCode: '// Build file processor CLI\n', expectedOutput: 'Complete CLI file processor' },
      },
    },
    {
      sectionId: 'node-section-2',
      title: 'Section 2: Building APIs with Express',
      learningObjective: 'Learn to build RESTful APIs using Express.js, including routing, middleware, and database integration.',
      order: 2,
      isLocked: true,
      xpReward: 150,
      keyConcepts: ['Express', 'Routing', 'Middleware', 'Request/Response', 'JSON APIs', 'Error Handling'],
      estimatedMinutes: 90,
      lessons: [
        {
          lessonId: 'node-06', title: 'Express Basics & Routing', type: 'learn', difficulty: 'intermediate', track: 'nodejs', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 1 of 5',
            conceptText: 'Express is a minimal web framework for Node.js. const app = express() creates an app. app.get(path, handler) defines routes. app.listen(port) starts the server. req (request) contains URL, headers, query params. res (response) sends data: res.send(), res.json(), res.status(). Routes can have parameters: /users/:id accessed via req.params.id. Express simplifies building HTTP servers and APIs.',
            instructions: 'Create an Express server with routes for GET /, GET /users, and GET /users/:id.',
          },
          utilities: {
            hint: 'const express = require("express");\nconst app = express();\n\napp.get("/", (req, res) => res.send("Hello"));\napp.get("/users", (req, res) => res.json([]));\napp.get("/users/:id", (req, res) => res.json({ id: req.params.id }));\n\napp.listen(3000);',
            flashcard: { front: 'What is the difference between req.params and req.query?', back: 'req.params contains route parameters (/users/:id). req.query contains URL query string parameters (/search?q=node). Use params for required path values, query for optional filters.' },
            solution: 'const express = require("express");\nconst app = express();\n\n// Middleware to parse JSON\napp.use(express.json());\n\n// Routes\napp.get("/", (req, res) => {\n  res.json({ message: "Welcome to the API" });\n});\n\napp.get("/users", (req, res) => {\n  const users = [\n    { id: 1, name: "Munira" },\n    { id: 2, name: "Alex" }\n  ];\n  res.json(users);\n});\n\napp.get("/users/:id", (req, res) => {\n  const user = { id: parseInt(req.params.id), name: "User" };\n  res.json(user);\n});\n\n// 404 handler\napp.use((req, res) => {\n  res.status(404).json({ error: "Not found" });\n});\n\napp.listen(3000, () => {\n  console.log("Server running on port 3000");\n});',
          },
          rightPanel: { startingCode: 'const express = require("express");\nconst app = express();\n// Add routes\n', expectedOutput: 'Express server with routes' },
        },
        {
          lessonId: 'node-07', title: 'Middleware', type: 'learn', difficulty: 'intermediate', track: 'nodejs', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 2 of 5',
            conceptText: 'Middleware functions have access to req, res, and next. app.use(middleware) applies globally. Route-specific middleware: app.get("/", middleware1, middleware2, handler). next() passes control to the next middleware. Built-in middleware: express.json(), express.urlencoded(), express.static(). Custom middleware can log requests, authenticate users, handle errors. Order matters — middleware runs in definition order.',
            instructions: 'Create middleware that logs each request method, URL, and timestamp. Apply it globally.',
          },
          utilities: {
            hint: 'app.use((req, res, next) => {\n  console.log(`${req.method} ${req.url} - ${new Date()}`);\n  next();\n});',
            flashcard: { front: 'What happens if you forget to call next() in middleware?', back: 'The request hangs indefinitely because control never passes to the next handler. The browser will eventually timeout. Always call next() unless you\'re ending the response with res.send() or similar.' },
            solution: 'const express = require("express");\nconst app = express();\n\n// Request logging middleware\napp.use((req, res, next) => {\n  const timestamp = new Date().toISOString();\n  console.log(`[${timestamp}] ${req.method} ${req.url}`);\n  next();\n});\n\n// JSON parsing middleware\napp.use(express.json());\n\n// Authentication middleware (route-specific)\nconst requireAuth = (req, res, next) => {\n  const authHeader = req.headers.authorization;\n  if (authHeader === "secret-token") {\n    next();\n  } else {\n    res.status(401).json({ error: "Unauthorized" });\n  }\n};\n\n// Public route\napp.get("/public", (req, res) => {\n  res.json({ message: "Public data" });\n});\n\n// Protected route\napp.get("/protected", requireAuth, (req, res) => {\n  res.json({ message: "Protected data" });\n});\n\napp.listen(3000);',
          },
          rightPanel: { startingCode: 'const express = require("express");\nconst app = express();\n// Add middleware\n', expectedOutput: 'Middleware implemented' },
        },
        {
          lessonId: 'node-08', title: 'POST Requests & Body Parsing', type: 'learn', difficulty: 'intermediate', track: 'nodejs', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 3 of 5',
            conceptText: 'POST requests send data in the request body. Use express.json() middleware to parse JSON bodies. Access via req.body. POST routes: app.post("/users", handler). Send POST requests with fetch() or curl. Validation: check required fields, validate data types. Return 201 Created on success, 400 Bad Request on validation errors. RESTful conventions: POST creates, GET reads, PUT updates, DELETE removes.',
            instructions: 'Create a POST /users route that accepts JSON with name and email, validates them, and returns the created user.',
          },
          utilities: {
            hint: 'app.post("/users", (req, res) => {\n  const { name, email } = req.body;\n  if (!name || !email) {\n    return res.status(400).json({ error: "Missing fields" });\n  }\n  const user = { id: Date.now(), name, email };\n  res.status(201).json(user);\n});',
            flashcard: { front: 'What HTTP status code should you return for successful POST?', back: '201 Created for successful resource creation. 200 OK is acceptable but less specific. 400 Bad Request for validation errors, 409 Conflict for duplicates, 500 Server Error for unexpected failures.' },
            solution: 'const express = require("express");\nconst app = express();\n\napp.use(express.json());\n\nlet users = [];\n\napp.post("/users", (req, res) => {\n  const { name, email } = req.body;\n  \n  // Validation\n  if (!name || typeof name !== "string" || name.trim().length === 0) {\n    return res.status(400).json({ error: "Name is required" });\n  }\n  \n  if (!email || !email.includes("@")) {\n    return res.status(400).json({ error: "Valid email is required" });\n  }\n  \n  // Check for duplicate email\n  if (users.some(u => u.email === email)) {\n    return res.status(409).json({ error: "Email already exists" });\n  }\n  \n  const user = {\n    id: Date.now(),\n    name: name.trim(),\n    email: email.toLowerCase(),\n    createdAt: new Date().toISOString()\n  };\n  \n  users.push(user);\n  res.status(201).json(user);\n});\n\napp.listen(3000);',
          },
          rightPanel: { startingCode: 'const express = require("express");\nconst app = express();\napp.use(express.json());\n// Add POST route with validation\n', expectedOutput: 'POST route with validation' },
        },
        {
          lessonId: 'node-09', title: 'Error Handling', type: 'practice', difficulty: 'intermediate', track: 'nodejs', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 4 of 5',
            conceptText: 'Express error handling uses middleware with four parameters: (err, req, res, next). Pass errors with next(err). Async errors need try/catch or express-async-errors. Custom error classes improve error handling. Always send appropriate status codes: 400 for client errors, 500 for server errors. Error responses should include message and possibly details. Never expose stack traces in production.',
            instructions: 'Create error handling middleware and a route that throws errors. Handle validation errors and not-found errors.',
          },
          utilities: {
            hint: '// Error class\nclass AppError extends Error {\n  constructor(message, statusCode) {\n    super(message);\n    this.statusCode = statusCode;\n  }\n}\n\n// Error middleware\napp.use((err, req, res, next) => {\n  res.status(err.statusCode || 500).json({ error: err.message });\n});',
            flashcard: { front: 'How do you handle errors in async Express route handlers?', back: 'Use try/catch inside the handler and pass errors to next(err). Or use a library like express-async-errors that automatically catches async errors. Without it, unhandled async errors crash the server.' },
            solution: 'const express = require("express");\nconst app = express();\n\napp.use(express.json());\n\n// Custom error class\nclass AppError extends Error {\n  constructor(message, statusCode) {\n    super(message);\n    this.statusCode = statusCode;\n    this.isOperational = true;\n  }\n}\n\n// 404 handler\napp.use((req, res, next) => {\n  next(new AppError(`Cannot ${req.method} ${req.url}`, 404));\n});\n\n// Error handling middleware\napp.use((err, req, res, next) => {\n  const statusCode = err.statusCode || 500;\n  const response = {\n    error: err.message,\n    ...(process.env.NODE_ENV === "development" && { stack: err.stack })\n  };\n  res.status(statusCode).json(response);\n});\n\n// Route with error\napp.get("/error", (req, res, next) => {\n  next(new AppError("This is a test error", 400));\n});\n\napp.get("/users/:id", (req, res, next) => {\n  const id = parseInt(req.params.id);\n  if (isNaN(id)) {\n    return next(new AppError("Invalid ID format", 400));\n  }\n  res.json({ id });\n});\n\napp.listen(3000);',
          },
          rightPanel: { startingCode: 'const express = require("express");\nconst app = express();\n// Add error handling\n', expectedOutput: 'Error handling middleware' },
        },
        {
          lessonId: 'node-10', title: 'RESTful API Design', type: 'practice', difficulty: 'intermediate', track: 'nodejs', xpReward: 30,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 5 of 5',
            conceptText: 'RESTful APIs follow conventions: Resources are nouns (/users, /posts). HTTP verbs indicate actions: GET (read), POST (create), PUT/PATCH (update), DELETE (remove). Use plural nouns for collections. Return proper status codes. Support filtering, sorting, pagination via query params. Version APIs (/api/v1/users). HATEOAS includes links to related resources. Consistent structure improves developer experience.',
            instructions: 'Design a complete RESTful API for a blog with posts: GET /posts, GET /posts/:id, POST /posts, PUT /posts/:id, DELETE /posts/:id.',
          },
          utilities: {
            hint: '// GET /posts - list\n// GET /posts/:id - get one\n// POST /posts - create\n// PUT /posts/:id - update\n// DELETE /posts/:id - delete\n// Use proper status codes and validation',
            flashcard: { front: 'What is the difference between PUT and PATCH?', back: 'PUT replaces the entire resource with the provided data. PATCH updates only the specified fields. Use PUT for complete replacements, PATCH for partial updates. Both are valid for updates.' },
            solution: 'const express = require("express");\nconst app = express();\n\napp.use(express.json());\n\nlet posts = [\n  { id: 1, title: "First Post", content: "Hello world", author: "Munira" },\n  { id: 2, title: "Second Post", content: "Node.js is great", author: "Alex" }\n];\n\n// GET /posts - List all posts\napp.get("/posts", (req, res) => {\n  const { author } = req.query;\n  const filtered = author ? posts.filter(p => p.author === author) : posts;\n  res.json(filtered);\n});\n\n// GET /posts/:id - Get single post\napp.get("/posts/:id", (req, res) => {\n  const post = posts.find(p => p.id === parseInt(req.params.id));\n  if (!post) return res.status(404).json({ error: "Post not found" });\n  res.json(post);\n});\n\n// POST /posts - Create post\napp.post("/posts", (req, res) => {\n  const { title, content, author } = req.body;\n  if (!title || !content) {\n    return res.status(400).json({ error: "Title and content required" });\n  }\n  const post = { id: Date.now(), title, content, author, createdAt: new Date() };\n  posts.push(post);\n  res.status(201).json(post);\n});\n\n// PUT /posts/:id - Update post (replace)\napp.put("/posts/:id", (req, res) => {\n  const index = posts.findIndex(p => p.id === parseInt(req.params.id));\n  if (index === -1) return res.status(404).json({ error: "Post not found" });\n  posts[index] = { ...posts[index], ...req.body, id: posts[index].id };\n  res.json(posts[index]);\n});\n\n// DELETE /posts/:id - Delete post\napp.delete("/posts/:id", (req, res) => {\n  const index = posts.findIndex(p => p.id === parseInt(req.params.id));\n  if (index === -1) return res.status(404).json({ error: "Post not found" });\n  posts.splice(index, 1);\n  res.status(204).send();\n});\n\napp.listen(3000);',
          },
          rightPanel: { startingCode: 'const express = require("express");\nconst app = express();\n// Build RESTful API\n', expectedOutput: 'Complete RESTful API' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'node-super-02', title: 'Environment Variables & Configuration', type: 'supercharge', difficulty: 'advanced', track: 'nodejs', xpReward: 35,
          leftPanel: {
            chapterProgress: 'Section 2 — Supercharge Challenge',
            conceptText: 'Environment variables store configuration outside code. Use process.env.VAR_NAME to access. The dotenv package loads .env files into process.env. Never commit .env files — add to .gitignore. Use environment variables for: API keys, database URLs, port numbers, feature flags. Create config.js to centralize configuration with validation. Different environments (development, staging, production) use different .env files.',
            instructions: 'Set up environment configuration using dotenv. Create a config module with validation for required variables.',
          },
          utilities: {
            hint: 'require("dotenv").config();\nconst config = {\n  port: process.env.PORT || 3000,\n  dbUrl: process.env.DATABASE_URL\n};\n// .env file: PORT=3000 DATABASE_URL=mongodb://localhost',
            flashcard: { front: 'Why use environment variables instead of hardcoding configuration?', back: 'Security (API keys not in code), flexibility (different configs per environment), deployment (container-friendly), and separation of concerns (code vs config). Never commit secrets to version control.' },
            solution: 'require("dotenv").config();\n\nconst config = {\n  port: parseInt(process.env.PORT) || 3000,\n  nodeEnv: process.env.NODE_ENV || "development",\n  databaseUrl: process.env.DATABASE_URL,\n  apiKey: process.env.API_KEY,\n  jwtSecret: process.env.JWT_SECRET\n};\n\n// Validate required config\nconst required = ["databaseUrl", "jwtSecret"];\nconst missing = required.filter(key => !config[key]);\nif (missing.length > 0) {\n  throw new Error(`Missing required env vars: ${missing.join(", ")}`);\n}\n\n// Export validated config\nmodule.exports = config;\n\n// Usage in app\nconst express = require("express");\nconst config = require("./config");\nconst app = express();\n\napp.listen(config.port, () => {\n  console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);\n});',
          },
          rightPanel: { startingCode: '// Set up environment configuration\n', expectedOutput: 'Environment configuration system' },
        },
      ],
      sectionProject: {
        lessonId: 'node-project-2', title: 'Section Project: RESTful API Server', type: 'project', difficulty: 'intermediate', track: 'nodejs', xpReward: 40,
        leftPanel: {
          chapterProgress: 'Section 2 — Section Project',
          conceptText: 'Build a complete RESTful API server using Express. This project will demonstrate routing, middleware, error handling, and RESTful design principles.',
          instructions: 'Build an API server with:\n  • CRUD operations for resources\n  • Proper HTTP status codes\n  • Request validation\n  • Error handling middleware\n  • Environment configuration\n  • Logging middleware',
        },
        utilities: {
          hint: 'Use Express for routing. Create resource controllers. Add validation middleware. Implement error handling. Use dotenv for config. Add request logging. Follow REST conventions. Test with curl or Postman.',
          flashcard: { front: 'What makes a production-ready Express API?', back: 'Structured routing, validation middleware, error handling, logging, security headers (helmet), rate limiting, CORS configuration, environment variables, input sanitization, and comprehensive testing.' },
          solution: 'require("dotenv").config();\nconst express = require("express");\nconst app = express();\n\n// Middleware\napp.use(express.json());\napp.use((req, res, next) => {\n  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);\n  next();\n});\n\n// In-memory database\nlet users = [];\n\n// Validation middleware\nconst validateUser = (req, res, next) => {\n  const { name, email } = req.body;\n  if (!name || typeof name !== "string") {\n    return res.status(400).json({ error: "Valid name required" });\n  }\n  if (!email || !email.includes("@")) {\n    return res.status(400).json({ error: "Valid email required" });\n  }\n  next();\n};\n\n// Routes\napp.get("/users", (req, res) => {\n  const { limit = 10, offset = 0 } = req.query;\n  const paginated = users.slice(Number(offset), Number(offset) + Number(limit));\n  res.json({ data: paginated, total: users.length });\n});\n\napp.get("/users/:id", (req, res) => {\n  const user = users.find(u => u.id === parseInt(req.params.id));\n  if (!user) return res.status(404).json({ error: "User not found" });\n  res.json(user);\n});\n\napp.post("/users", validateUser, (req, res) => {\n  const { name, email } = req.body;\n  if (users.some(u => u.email === email)) {\n    return res.status(409).json({ error: "Email exists" });\n  }\n  const user = {\n    id: Date.now(),\n    name: name.trim(),\n    email: email.toLowerCase(),\n    createdAt: new Date().toISOString()\n  };\n  users.push(user);\n  res.status(201).json(user);\n});\n\napp.put("/users/:id", validateUser, (req, res) => {\n  const index = users.findIndex(u => u.id === parseInt(req.params.id));\n  if (index === -1) return res.status(404).json({ error: "User not found" });\n  users[index] = { ...users[index], ...req.body, id: users[index].id };\n  res.json(users[index]);\n});\n\napp.delete("/users/:id", (req, res) => {\n  const index = users.findIndex(u => u.id === parseInt(req.params.id));\n  if (index === -1) return res.status(404).json({ error: "User not found" });\n  users.splice(index, 1);\n  res.status(204).send();\n});\n\n// Error handling\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(err.status || 500).json({ error: err.message || "Internal server error" });\n});\n\n// 404\napp.use((req, res) => {\n  res.status(404).json({ error: "Route not found" });\n});\n\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => console.log(`API server on port ${PORT}`));',
        },
        rightPanel: { startingCode: '// Build complete RESTful API\n', expectedOutput: 'Production-ready API server' },
      },
    },
  ],
  capstoneProject: {
    lessonId: 'node-capstone', title: 'Course Capstone: AcademicQuest Backend API', type: 'project', difficulty: 'advanced', track: 'nodejs', xpReward: 100,
    leftPanel: {
      chapterProgress: 'Course Capstone — Final Project',
      conceptText: 'Build a complete backend API for AcademicQuest using all Node.js concepts learned. This capstone will demonstrate Express routing, middleware, error handling, file operations, and production-ready patterns.',
      instructions: 'Build a backend API with:\n  • User authentication endpoints\n  • Course progress tracking\n  • XP calculation system\n  • File upload for assignments\n  • Comprehensive error handling\n  • Environment configuration\n  • Request logging\n  • Input validation',
    },
    utilities: {
      hint: 'Use Express with modular route files. Implement JWT-like auth. Create progress tracking logic. Use multer for file uploads. Add comprehensive middleware. Use environment variables. Structure code with controllers and services.',
      flashcard: { front: 'What makes a scalable Node.js backend?', back: 'Modular architecture, separation of concerns (routes/controllers/services), proper error handling, logging, validation, security (CORS, rate limiting), database abstraction, caching, and horizontal readiness.' },
      solution: 'require("dotenv").config();\nconst express = require("express");\nconst app = express();\n\n// Middleware\napp.use(express.json());\napp.use((req, res, next) => {\n  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);\n  next();\n});\n\n// Mock database\nconst db = {\n  users: [],\n  courses: [\n    { id: "py1", title: "Python", xp: 200, lessons: 10 },\n    { id: "web1", title: "HTML", xp: 150, lessons: 10 },\n    { id: "web2", title: "CSS", xp: 200, lessons: 10 }\n  ],\n  progress: {}\n};\n\n// Auth middleware (simplified)\nconst authenticate = (req, res, next) => {\n  const token = req.headers.authorization;\n  if (!token) return res.status(401).json({ error: "No token" });\n  const user = db.users.find(u => u.token === token);\n  if (!user) return res.status(401).json({ error: "Invalid token" });\n  req.user = user;\n  next();\n};\n\n// Routes\napp.post("/auth/register", (req, res) => {\n  const { name, email } = req.body;\n  if (db.users.some(u => u.email === email)) {\n    return res.status(409).json({ error: "Email exists" });\n  }\n  const user = {\n    id: Date.now(),\n    name,\n    email,\n    token: `token-${Date.now()}`,\n    xp: 0,\n    level: 1\n  };\n  db.users.push(user);\n  res.status(201).json({ user, token: user.token });\n});\n\napp.post("/auth/login", (req, res) => {\n  const { email } = req.body;\n  const user = db.users.find(u => u.email === email);\n  if (!user) return res.status(401).json({ error: "Invalid credentials" });\n  res.json({ user, token: user.token });\n});\n\napp.get("/courses", (req, res) => {\n  res.json(db.courses);\n});\n\napp.get("/courses/:id", (req, res) => {\n  const course = db.courses.find(c => c.id === req.params.id);\n  if (!course) return res.status(404).json({ error: "Course not found" });\n  res.json(course);\n});\n\napp.get("/progress", authenticate, (req, res) => {\n  const userProgress = db.progress[req.user.id] || {};\n  res.json(userProgress);\n});\n\napp.post("/progress/:courseId", authenticate, (req, res) => {\n  const { courseId } = req.params;\n  const { lessonId, completed } = req.body;\n  \n  if (!db.progress[req.user.id]) {\n    db.progress[req.user.id] = {};\n  }\n  if (!db.progress[req.user.id][courseId]) {\n    db.progress[req.user.id][courseId] = { completedLessons: [], progress: 0 };\n  }\n  \n  const progress = db.progress[req.user.id][courseId];\n  if (completed && !progress.completedLessons.includes(lessonId)) {\n    progress.completedLessons.push(lessonId);\n    const course = db.courses.find(c => c.id === courseId);\n    progress.progress = Math.round((progress.completedLessons.length / course.lessons) * 100);\n    \n    if (progress.progress === 100 && !progress.completed) {\n      progress.completed = true;\n      req.user.xp += course.xp;\n      req.user.level = Math.floor(req.user.xp / 500) + 1;\n    }\n  }\n  \n  res.json(progress);\n});\n\napp.get("/user/profile", authenticate, (req, res) => {\n  res.json({\n    user: req.user,\n    progress: db.progress[req.user.id] || {}\n  });\n});\n\n// Error handling\napp.use((err, req, res, next) => {\n  console.error(err);\n  res.status(err.status || 500).json({ error: err.message || "Server error" });\n});\n\napp.use((req, res) => {\n  res.status(404).json({ error: "Not found" });\n});\n\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => console.log(`AcademicQuest API on port ${PORT}`));',
    },
    rightPanel: { startingCode: '// Build complete backend API\n', expectedOutput: 'Production-ready backend API' },
  },
  totalLessons: 10,
  totalXP: 400,
};
