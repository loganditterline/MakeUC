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

app.get("/questions", (req, res) => {
  client.connect().then(() => {
    let questions = [];
    client.db('QuestionData').collection('math_questions').aggregate([{ $sample: { size: 2 } }]).toArray().then((sub_questions) => {
      questions = questions.concat(sub_questions);
      client.db('QuestionData').collection('ai_math_questions').aggregate([{ $sample: { size: 1 } }]).toArray().then((sub_questions) => {
        questions = questions.concat(sub_questions);
          client.db('QuestionData').collection('reading_writing_questions').aggregate([{ $sample: { size: 2 } }]).toArray().then((sub_questions) => {
            questions = questions.concat(sub_questions);
            client.db('QuestionData').collection('ai_reading_writing_questions').aggregate([{ $sample: { size: 1 } }]).toArray().then((sub_questions) => {
              questions = questions.concat(sub_questions);

              let formattedQuestions = [];
              for(let i = 0; i < questions.length; i++) {
                formattedQuestions[i] = {
                  question: !questions[i].text ? questions[i].prompt : questions[i].text + questions[i].prompt,
                  answerChoices: questions[i].answers,
                  explanations: [questions[i].explanation, questions[i].explanation, questions[i].explanation, questions[i].explanation],
                  correctAnswer: questions[i].correct
                }
              }
              res.json({message: formattedQuestions})
            });
          });
      });
    });
  });
});

app.post("/user_score", (req, res) => {
  const id = req.body.id;
  client.connect().then(() => {
    client.db('UserData').collection('users').findOne({ id: id }).then((user) => {
      const stats = {
        "Reading and Writing": {
          "Information and Ideas": Math.floor(Math.random() * 10) - 5, // user['Information and Ideas'],
          "Craft and Structure": user['Craft and Structure'],
          "Expression of Ideas": Math.floor(Math.random() * 10) - 5, // user['Expression of Ideas'],
          "Standard English Conventions": user['Standard English Conventions']
        },
        "Math": {
            "Algebra": Math.floor(Math.random() * 10) - 5, // user['Algebra'],
            "Advanced Math": user['Advanced Math'],
            "Problem-Solving and Data Analysis": Math.floor(Math.random() * 10) - 5, // user['Problem-Solving and Data Analysis'],
            "Geometry and Trigonometry": user['Geometry and Trigonometry']
        }
      }
      res.json({ message: stats });
    });
  });
});

app.post("/create_user", (req, res) => {
  const id = req.body.id;
  client.connect().then(() => {
    client.db('UserData').collection('users').insertOne({ id: id });
    res.json({ message: 'success' });
  });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
