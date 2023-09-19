const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://L0ngTr4n:longtd2411@test.nemlrfl.mongodb.net/UserDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Other user fields (name, address, role, etc.)
});

const User = mongoose.model('User', userSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Register a new user
app.post('/register', upload.single('profilePicture'), (req, res) => {
  const { username, password, role } = req.body;
  const profilePicture = req.file.buffer; // Assuming a single file upload field with name 'profilePicture'

  // Create a new user in the database
  const newUser = new User({ username, password, profilePicture, role });

  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Registration failed');
    } else {
      res.status(200).send('Registration successful');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
