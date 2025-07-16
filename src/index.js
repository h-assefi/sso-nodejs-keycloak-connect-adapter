import express from 'express';


const app = express();

// Start the server
app.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});