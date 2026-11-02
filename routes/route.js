import express from "express";

import {
    home,
    student_new_record,
    add_new_record,
    edit_student_record,
    update_record,
    delete_student,
    search_student
} from "../controllers/home.js";

const route = express.Router();

route.get("/", home);

route.get("/new_record", student_new_record);
route.post("/new_record", add_new_record);

route.get("/edit/:id", edit_student_record);
route.post("/edit/:id", update_record);

route.post("/delete/:id", delete_student);

route.post("/search", search_student);
route.post("/students/search", search_student);

export default route;