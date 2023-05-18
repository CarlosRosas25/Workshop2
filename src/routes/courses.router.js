import { Router } from "express";
//import del service para Courses.
//import CourseService from '../services/filesystem/courses.service.js';
import CourseService from "../services/db/courses.service.js";

const coursesRouter = Router();
const coursesService = new CourseService();

coursesRouter.get("/", async (req, res) => {
  try {
    let courses = await coursesService.getAll();
    res.send(courses);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: error, message: "No se pudo obtener los cursos." });
  }
});

coursesRouter.post("/", async (req, res) => {
  try {
    let result = await coursesService.save(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: error, message: "No se pudo guardar el curso." });
  }
});

export default coursesRouter;
