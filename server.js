const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON requests

// Route to get spools data
app.get("/public/db/spools", (req, res) => {
  const filePath = path.join(__dirname, "public", "db", "spools.json");
  console.log("Attempting to read file:", filePath);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read spools.json:", err);
      return res
        .status(500)
        .json({ error: "Internal Server Error - Failed to read spools.json" });
    }

    try {
      const spools = JSON.parse(data);
      console.log("Sending spools data:", spools);
      res.json(spools);
    } catch (parseError) {
      console.error("Failed to parse spools.json:", parseError);
      res
        .status(500)
        .json({ error: "Internal Server Error - Invalid JSON format" });
    }
  });
});

// Route to update spool quantity
app.post("/update-spool", (req, res) => {
  const { index, quantity } = req.body;
  const filePath = path.join(__dirname, "public", "db", "spools.json");

  // Validate request body
  if (index === undefined || quantity === undefined) {
    return res
      .status(400)
      .json({ error: "Invalid request: 'index' and 'quantity' are required" });
  }

  // Read spools data
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read spools.json:", err);
      return res
        .status(500)
        .json({ error: "Internal Server Error - Failed to read spools.json" });
    }

    try {
      const spools = JSON.parse(data);

      // Check if the index is valid
      if (index < 0 || index >= spools.length) {
        return res.status(404).json({ error: "Spool not found" });
      }

      // Update the quantity of the spool
      spools[index].quantity = quantity;

      // Write the updated spools data back to the file
      fs.writeFile(filePath, JSON.stringify(spools, null, 2), "utf8", (err) => {
        if (err) {
          console.error("Failed to update spools.json:", err);
          return res
            .status(500)
            .json({ error: "Failed to update spool quantity" });
        }

        console.log("Spool quantity updated successfully");
        res.json(spools); // Send the updated spools data as a response
      });
    } catch (parseError) {
      console.error("Failed to parse spools.json:", parseError);
      res
        .status(500)
        .json({ error: "Internal Server Error - Invalid JSON format" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
