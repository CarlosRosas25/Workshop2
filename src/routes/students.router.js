import { Router } from "express";
import StudentService from "../services/db/students.service.js";

const studentRouter = Router();
const studentService = new StudentService();

studentRouter.get("/", async (req, res) => {
  try {
    let students = await studentService.getAll();
    res.send(students);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: error, message: "No se pudo obtener los estudiantes." });
  }
});

studentRouter.post("/", async (req, res) => {
  try {
    let result = await studentService.save(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: error, message: "No se pudo guardar el estudiante." });
  }
});

export default studentRouter;
