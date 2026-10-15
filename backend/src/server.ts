import express from "express";
import cors from "cors";
import { pool } from "./db.js";

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

/*
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
  ];*/
  
  // GET endpoint
  // using asynchronous JS to wait for results w/out blocking other requests
  app.get("/api/videos", async (req, res) => {
    try { // if db fails, server returns 500 error 
      const result = await pool.query( // sends query to psql
        "SELECT id, title, category, description FROM videos ORDER BY id"
      );
  
      res.json(result.rows); //psql returns matching records in an array called rows > Express converts array to JSON for React frontend
    } catch (error) {
      console.error("Database error:", error);
  
      res.status(500).json({
        error: "Cannot retrieve videos",
      });
    }
  });

// POST endpoint
app.post("/api/videos", async (req, res) => {
    try {
      const { title, category, description } = req.body; // contains JSON data sent by client
  
      if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof category !== "string" ||
        !category.trim() ||
        (description !== undefined &&
          description !== null &&
          typeof description !== "string")
      ) {
        res.status(400).json({
          error: "A valid title and category are required",
        });
        return;
      }
  
      const result = await pool.query(
        // add a new record into PostgreSQL
        // $1, $2, $3 - sql placeholders
        // RETURNING * tells Psql to return newly created record
        `INSERT INTO videos (title, category, description)
         VALUES ($1, $2, $3) 
         RETURNING *`,
        [title.trim(), category.trim(), description ?? null]
      );
  
      res.status(201).json(result.rows[0]); // indicates new resource created
    } catch (error) {
      console.error("Error creating video:", error);
      res.status(500).json({
        error: "Failed to create video",
      });
    }
});

// PUT endpoint
app.put("/api/videos/:id", async (req, res) => { // :id is route parameter
    try {
      const id = Number(req.params.id); // retrieves that id from url
      const { title, category, description } = req.body;
  
      if (!Number.isSafeInteger(id) || id <= 0) {
        res.status(400).json({ error: "Invalid video ID" });
        return;
      }
  
      if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof category !== "string" ||
        !category.trim() ||
        (description !== undefined &&
          description !== null &&
          typeof description !== "string")
      ) {
        res.status(400).json({
          error: "A valid title and category are required",
        });
        return;
      }
  
      const result = await pool.query(
        `UPDATE videos
         SET title = $1, category = $2, description = $3
         WHERE id = $4
         RETURNING *`,
        [title.trim(), category.trim(), description ?? null, id]
      );
  
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Video not found" });
        return;
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error updating video:", error);
      res.status(500).json({
        error: "Failed to update video",
      });
    }
});

// DELETE endpoint
app.delete("/api/videos/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
  
      if (!Number.isSafeInteger(id) || id <= 0) {
        res.status(400).json({ error: "Invalid video ID" });
        return;
      }
  
      const result = await pool.query(
        "DELETE FROM videos WHERE id = $1 RETURNING *",
        [id]
      );
  
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Video not found" });
        return;
      }
  
      res.json({
        message: "Video deleted successfully",
        video: result.rows[0],
      });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({
        error: "Failed to delete video",
      });
    }
});
  
  
  
  

// start server
// express will run on port 3001
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});