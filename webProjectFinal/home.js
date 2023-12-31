import coursesJSON from "./courses.json" assert { type: "json" };
import studentJSON from "./students.json" assert { type: "json" };
import {Course} from "./course.js";
import {Student} from "./student.js";
    // Home Page of the app and
    // Parsing data to local storage and taking it into the arrays
const studentsInLocal = localStorage.getItem('students');
    const students = JSON.parse(studentsInLocal);

    export let studentsArray = [];
    for (let i = 0; i < students.length; i++){
        studentsArray[i] = new Student(
            students[i].id,
            students[i].name,
            students[i].surname,
            students[i].age,
            students[i].takenCourses,
            students[i].grades
            );
    }

    console.log(studentsArray);
    console.log(studentsArray[2]);

    const coursesInLocal = localStorage.getItem('courses');
    const courses = JSON.parse(coursesInLocal);

    export let coursesArray = [];
    for (var i = 0; i < courses.length; i++){
        coursesArray[i] = new Course(
            courses[i].courseId,
            courses[i].courseName,
            courses[i].courseInstructor,
            courses[i].midterm,
            courses[i].final,
            courses[i].acts,
            courses[i].tenBased,
            );
    }

    localStorage.setItem('courses', JSON.stringify(coursesArray));
    console.log(coursesArray);

localStorage.setItem("courses", JSON.stringify(coursesJSON));
localStorage.setItem("students", JSON.stringify(studentJSON));

    document.addEventListener("DOMContentLoaded", function () {
    const buttonHome = document.getElementById("homeButton");
    const coursesTable = document.getElementById("coursesTable");
    const stTable = document.getElementById("studentTable");
    const mainPage = document.getElementById("mainPage");
    const addCourseForm = document.getElementById("addCourseForm");
    const searchInput = document.getElementById("searchInputStudent");
    const searchInputCourse = document.getElementById("searchInputCourse");

    buttonHome.addEventListener("click", function () {
        if (!failedCoursesTable.classList.contains("hidden")) {
            failedCoursesTable.classList.add("hidden");
            failedCoursesTable.classList.add("hidden");
        }
        if (!stTable.classList.contains(`hidden`)) {
        stTable.classList.add(`hidden`);
        }
        if (!searchInputCourse.classList.contains(`hidden`)) {
            searchInputCourse.classList.add(`hidden`);
            }
        if (mainPage.classList.contains(`hidden`)) {
        mainPage.classList.remove(`hidden`);
        }
        if (!coursesTable.classList.contains(`hidden`)) {
        coursesTable.classList.add(`hidden`);
        addCourseForm.classList.add(`hidden`);
        }
        if (!addStudentForm.classList.contains("hidden")) {
        addStudentForm.classList.add("hidden");
        }
        if (!searchInput.classList.contains("hidden")) {
            searchInput.classList.add("hidden");
        }
        if (!studentCoursesTableBody.classList.contains("hidden")) {
            studentCoursesTableBody.classList.add("hidden");
            studentCoursesTable.classList.add("hidden");
        }
        if (!passedCoursesTable.classList.contains("hidden")) {
            passedCoursesTable.classList.add("hidden");
            passedCoursesTableBody.classList.add("hidden");
        }
    });
    function showMainPage() {
        mainPage.style.display = "block";
    }
});
