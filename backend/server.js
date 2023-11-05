const express = require('express')
const app = express()

const port = 4000

const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
app.use(bodyParser.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://MakeUC:3OksrbejhBYoxvpK@makeuc.hxhr0pc.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

app.get("/math_questions_count", (req, res) => {
  client.connect().then(() => {
    client.db('QuestionData').collection('math_questions').countDocuments().then(count => {
      console.log('The count is', count);
      res.json({ message: count });
    });
  });
});

app.post("/user_score", (req, res) => {
  const id = req.body.id;
  client.connect().then(() => {
    client.db('UserData').collection('users').findOne({ id: id }).then((user) => {
      const stats = {
        "Reading and Writing": {
          "Information and Ideas": user['Information and Ideas'],
          "Craft and Structure": user['Craft and Structure'],
          "Expression of Ideas": user['Expression of Ideas'],
          "Standard English Conventions": user['Standard English Conventions']
        },
        "Math": {
            "Algebra": user['Algebra'],
            "Advanced Math": user['Advanced Math'],
            "Problem-Solving and Data Analysis": user['Problem-Solving and Data Analysis'],
            "Geometry and Trigonometry": user['Geometry and Trigonometry']
        }
      }
      res.json({ message: stats });
    });
  });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
