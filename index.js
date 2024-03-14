import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import facilitatorModel from "./models/facilitators.model.js";

const app = express();
const port = process.env.PORT || 3000;
const db_connect = process.env.MONGODB_URI;

app.use(express.json());

app.post(" /", async (req, res) => {
  try {
    const addfacilitator = await facilitatorModel.create(req.body);
    res.status(201).json({
      message: "Facilitator added",
      facilitator: addfacilitator,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/", async (req, res) => {
  try {
    const listfacilitator = await facilitatorModel.find();
    res.status(201).json({
      message: "List of Facilitators",
      facilitator: listfacilitator,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const facilitatorById = await facilitatorModel.findById(req.params.id);
    res.status(201).json({
      message: "Get facilitator",
      facilitator: facilitatorById,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/findByEmail/:email", async (req, res) => {
  try {
    console.log(req.params.email);
    const facilitatorByEmail = await facilitatorModel.findOne({
      email: req.params.email,
    });
    res.status(201).json({
      message: "Get facilitator",
      facilitator: facilitatorByEmail,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const updateFacilitator = await facilitatorModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        fullNames: req.body.fullNames,
        email: req.body.email,
        phone: req.body.phone,
        nationalId: req.body.nationalId,
        courses: req.body.courses,
        role: req.body.role,
      },
      { new: true }
    );

    res.status(201).json({
      message: "facilitator updated",
      facilitator: updateFacilitator,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const deleteFacilitator = await facilitatorModel.deleteOne({
      _id: req.params.id,
    });

    res.status(201).json({
      message: "facilitator deleted",
      facilitator: deleteFacilitator,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
mongoose
  .connect(db_connect)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });
