export class Course{
      // This is needed for the take the resourses to local and the coursesArray
    constructor(courseId,courseName,courseInstructor,midterm,final,acts,tenBased){
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseInstructor = courseInstructor;
        this.acts = acts;
        this.midterm = midterm;
        this.final = final;
        this.tenBased = tenBased;
    }
}