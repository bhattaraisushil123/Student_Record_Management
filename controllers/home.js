import Student from "../models/studentSchema.js";

const home = async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 5;

    try {
        const totalstudents = await Student.countDocuments();
        const totalPages = Math.ceil(totalstudents / limit);

        const records = await Student.find({})
            .skip((page - 1) * limit)
            .limit(limit);

        res.render("index", {
            records,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error fetching student records");
    }
};

const student_new_record = (req, res) => {
    res.render("student_new_record");
};

const add_new_record = async (req, res) => {
    try {
        await Student.create(req.body);
        res.redirect("/");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error adding student");
    }
};

const edit_student_record = async (req, res) => {
    try {
        const record = await Student.findById(req.params.id);
        res.render("update_record", { record });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error fetching student");
    }
};

const update_record = async (req, res) => {
    try {
        await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.redirect("/");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error updating student");
    }
};

const delete_student = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error deleting student");
    }
};
const search_student = async (req, res) => {
    try {
        const searchQuery = String(req.body.searchQuery || "").trim();

        const students = await Student.find({
            name: { $regex: searchQuery, $options: "i" }
        });

        res.render("result", { students, searchQuery });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error searching students");
    }
};
export {
    home,
    student_new_record,
    add_new_record,
    edit_student_record,
    update_record,
    delete_student,
    search_student
};