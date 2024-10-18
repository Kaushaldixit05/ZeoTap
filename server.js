import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the Vite dev server
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ruleEngine', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Define Rule schema
const ruleSchema = new mongoose.Schema({
  ruleString: String,
});

const Rule = mongoose.model('Rule', ruleSchema);

// API routes
app.post('/api/rules', async (req, res) => {
  try {
    const { ruleString } = req.body;
    const newRule = new Rule({ ruleString });
    await newRule.save();
    res.status(201).json(newRule);
  } catch (error) {
    console.error('Error adding rule:', error);
    res.status(500).json({ message: 'Error adding rule', error: error.message });
  }
});

app.get('/api/rules', async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (error) {
    console.error('Error fetching rules:', error);
    res.status(500).json({ message: 'Error fetching rules', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});