// worker.js

const { Queue } = require('bull');

// Initialize a queue
const jobQueue = new Queue('task queue');

// Define a job processor
jobQueue.process(async (job) => {
  console.log('Processing job:', job.data);
  // Perform some background task (e.g., email, data processing)
});

// Add a new job to the queue (this would be done elsewhere in your app)
jobQueue.add({ task: 'Send welcome email', email: 'user@example.com' });

// Listen for errors
jobQueue.on('failed', (job, err) => {
  console.error(`Job failed: ${job.id}`, err);
});

console.log('Worker is running...');
