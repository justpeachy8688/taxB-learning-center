import express from "express";
import cors from "cors";

// create express app
const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());
//create a route
app.get("/", (req, res) => {
  res.send("Hello from the Express backend.");
});

const videos = [
    {
      id: 1,
      title: "How to File a 1099 - Updated",
      category: "1099s",
      description: "Learn how to file your 1099 forms."
    },
    {
      id: 2,
      title: "Understanding W-2 Forms",
      category: "W-2",
      description: "A beginner's guide to W-2 forms."
    },
    {
      id: 3,
      title: "Getting Started with Tax Filing",
      category: "Getting Started",
      description: "Everything you need to get started."
    },
    {
      id: 4,
      title: "Important Tax Deadlines",
      category: "Deadlines",
      description: "Learn about important filing dates."
    }
  ];
  
  app.get("/api/videos", (req, res) => {
    res.json(videos);
  });

// start server
// express will run on port 3001
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});