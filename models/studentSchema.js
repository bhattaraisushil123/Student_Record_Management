
import mongoose from "mongoose";
  const studentSchema = new mongoose.Schema({
    name:{
        type:"String",
        required:true
    },
       email:{
        type:"String",
        required:true ,
        unique: true
    },
      city:{
        type:"String",
        required:true
    },
       contact:{
        type:"String",
        required:true
    },
  });
     

    const Student = mongoose.model('student',studentSchema);
     
      export default Student;