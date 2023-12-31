import {coursesArray} from "./home.js";
import {studentsArray} from "./home.js";
    // This is needed for the take the resourses to local and the studentsArray
export class Student{
    constructor(id,name,surname,age,takenCourses,grades){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.takenCourses = takenCourses;
        this.grades = grades;
    }
    // Basic Calculations to get student gpa
    getStudentGpa(){
        var total = 0;
        for (var i = 0; i < this.takenCourses.length; i++){
            for (var j = 0; j < coursesArray.length; j++){
                if (this.takenCourses[i] === coursesArray[j].courseId){
                    if (coursesArray[j].tenbased === false){
                        console.log();
                        total += this.getPointOfLetterGrade(this.findLetterGradeFor7(this.findAverageGrades(this.grades[i][0],this.grades[i][1],coursesArray[j].midterm,coursesArray[j].final))) * coursesArray[j].acts;
                    }else{
                        total += this.getPointOfLetterGrade(this.findLetterGradeFor10(this.findAverageGrades(this.grades[i][0],this.grades[i][1], coursesArray[j].midterm, coursesArray[j].final))) * coursesArray[j].acts;
                    }
                }
            }
        }

        return (total / this.getTotalActs()).toFixed(2);
    }
        // Calculating the credit for that class
    getTotalActs(){
            let totalActs = 0;
            for (var i = 0; i < this.takenCourses.length; i++){
                for (var j = 0; j < coursesArray.length; j++){
                    if (this.takenCourses[i] === coursesArray[j].courseId){
                        totalActs += coursesArray[j].acts;
                    }
                }
            }
            return totalActs;
        }
                // Calculate average grade
        findAverageGrades(MidtermGrade, FinalGrade, MidtermPercent, FinalPercent){
            return (MidtermGrade * MidtermPercent/100) + (FinalGrade * FinalPercent/100);
        }
        // Point scale and the letter grades
    getPointOfLetterGrade(letter){
            switch (letter){
                case "AA":
                    return 4.0;
                case "BA":
                    return 3.5;
                case "BB":
                    return 3.0;
                case "CB":
                    return 2.5;
                case "CC":
                    return 2.0;
                case "DC":
                    return 1.5;
                case "DD":
                    return 1.0;
                case "FF":
                    return 0.0;
            }
        }
    getPointScale(courseId){
            for (var i = 0; i < coursesArray.length; i++){
                if (courseId === coursesArray[i].courseId){
                    return coursesArray[i].tenBased;
                }
            }
        }
    findLetterGradeFor7(grade){
            if (grade<=100 && grade >=93 ){
                return "AA";
            }else if (grade < 93 && grade >= 86){
                return "BA";
            }else if (grade < 86 && grade >= 79){
                return "BB";
            }else if (grade <79 && grade >= 72){
                return "CB";
            }else if (grade <72 && grade >=65){
                return "CC";
            }else if (grade <65 && grade >=58){
                return "DC";
            }else if (grade <58 && grade >=51){
                return "DD";
            }else{
                return "FF";
            }
        }
    findLetterGradeFor10(grade){
            if (grade<=100 && grade >=90 ){
                return "AA";
            }else if (grade < 90 && grade >= 80){
                return "BA";
            }else if (grade < 80 && grade >= 70){
                return "BB";
            }else if (grade <70 && grade >= 60){
                return "CB";
            }else if (grade <60 && grade >=50){
                return "CC";
            }else if (grade <50 && grade >=40){
                return "DC";
            }else if (grade <40 && grade >=30){
                return "DD";
            }else{
                return "FF";
            }
        }
}