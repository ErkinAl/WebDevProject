import {coursesArray} from "./home.js";
import {Student} from "./student.js";
import {studentsArray} from "./home.js";
  // Main code where you can see the details of the all courses
document.addEventListener("DOMContentLoaded", function () {
  const coursesButton = document.getElementById("buttonGetCourses");
  const coursesTable = document.getElementById("coursesTable");
  const tableBody = document.getElementById("coursesTableBody");
  const stTable = document.getElementById("studentTable");
  const mainPage = document.getElementById("mainPage");
  const addCourseForm = document.getElementById("addCourseForm");
  const searchInput = document.getElementById("searchInputStudent");
  const addStudentForm = document.getElementById("addStudentForm");
  const searchInputCourse = document.getElementById("searchInputCourse");

  coursesButton.addEventListener("click", function () {
    if (!studentCoursesTableBody.classList.contains("hidden")) {
      studentCoursesTableBody.classList.add("hidden");
      studentCoursesTable.classList.add("hidden");
  }
    if (!passedCoursesTable.classList.contains("hidden")) {
      passedCoursesTable.classList.add("hidden");
      passedCoursesTableBody.classList.add("hidden");
  }
    if (!failedCoursesTable.classList.contains("hidden")) {
      failedCoursesTable.classList.add("hidden");
      failedCoursesTable.classList.add("hidden");
  }
    if (!stTable.classList.contains(`hidden`)) {
      stTable.classList.add(`hidden`);
    }
    if (!searchInput.classList.contains(`hidden`)) {
      searchInput.classList.add(`hidden`);
    }
    if (!mainPage.classList.contains(`hidden`)) {
      mainPage.classList.add(`hidden`);
    }
    if (coursesTable.classList.contains(`hidden`)) {
      coursesTable.classList.remove(`hidden`);
    }
    if (addCourseForm.classList.contains(`hidden`)) {
      addCourseForm.classList.remove(`hidden`);
    }
    if (!addStudentForm.classList.contains("hidden")) {
      addStudentForm.classList.add("hidden");
    }
    if (searchInputCourse.classList.contains("hidden")) {
      searchInputCourse.classList.remove("hidden");
    }
    // Load and display courses from local storage
    loadCourses();
  });

    addCourseForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form data
      const formData = new FormData(addCourseForm);
      const newCourse = {};

      // Set other form data to the newCourse object
      formData.forEach((value, key) => {
          newCourse[key] = value;
      });

      // Convert midterm, final, and acts to integers
      newCourse.courseId = parseInt(newCourse.courseId);
      newCourse.midterm = parseInt(newCourse.midterm);
      newCourse.final = parseInt(newCourse.final);
      newCourse.acts = parseInt(newCourse.acts);
      if (newCourse.tenBased === undefined){
        newCourse.tenBased = false;
      }else{
        newCourse.tenBased = true;
      }
        
      // Check if the course ID already exists
      if (isCourseIdExists(newCourse.courseId)) {
          alert("Error:The course ID already exist. Please choose a different ID.");
        return;  
      }
      if(newCourse.courseId < 0){
        alert("Error:The course ID not valid. Please choose a different ID.");
      return;
      }
      // Check if the sum of midterm and final percentages cannot be negative
      if(newCourse.midterm < 0){
        alert("Error: Midterm percentage cannot be negative.");
        return;
      }
      if(newCourse.final < 0){
        alert("Error: Final percentage cannot be negative.");
        return;
      }
      // Check if the sum of midterm and final percentages is 100
      if (newCourse.midterm + newCourse.final !== 100) {
        alert("Error: The sum of Midterm and Final percentages must be 100.");
        return;
      }
      if(newCourse.acts < 0){
        alert("Error: ACTS cannot be negative.");
        return;
      }

      console.log(newCourse.tenBased);
      // Update the existing coursesArray
      coursesArray.push(newCourse);

      // Update local storage with the modified coursesArray
      localStorage.setItem("courses", JSON.stringify(coursesArray));

      // Refresh the table with the updated courses
      loadCourses();

      // Clear the form
      addCourseForm.reset();
  });


  searchInputCourse.addEventListener("input", function () {
    // Search courses when the user types in the search input
    const searchValue = searchInputCourse.value.toLowerCase();
    const filteredCourses = coursesArray.filter((course) => {
      return course.courseName.toLowerCase().includes(searchValue);
    });

    // Display the filtered courses
    showCourses(filteredCourses);
  });

  function loadCourses() {
    const courses = coursesArray;
    showCourses(courses);
  }

  function isCourseIdExists(courseId) {
    // Check if a course with the given ID already exists
    return coursesArray.some((course) => course.courseId === parseInt(courseId));
  }
  

  function showCourses(courses) {
    // Clear previous table content
    tableBody.innerHTML = "";
    // Add courses to html
    courses.forEach((course) => {
      const row = tableBody.insertRow();
      row.insertCell(0).innerText = course.courseId;
      row.insertCell(1).innerText = course.courseName;
      row.insertCell(2).innerText = course.courseInstructor;
      row.insertCell(3).innerText = course.midterm;
      row.insertCell(4).innerText = course.final;
      row.insertCell(5).innerText = course.acts;
      row.insertCell(6).innerText = course.tenBased ? "Yes" : "No";
      
    
      // Delete button for each course
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", function () {
        deleteCourse(course.courseId);
      });
      row.insertCell(7).appendChild(deleteButton);
    });
    
    // Make table visible
    coursesTable.style.display = "block";
  }
  
  // Function to delete a course
  function deleteCourse(courseId) {
    // Find the index of the course with the specified ID
    const courseIndex = coursesArray.findIndex((course) => course.courseId === courseId);

    // Check if the course with the specified ID exists
    if (courseIndex !== -1) {
      // Remove the course from the coursesArray
      const deletedCourse = coursesArray.splice(courseIndex, 1)[0];

      // Update local storage with the modified coursesArray
      localStorage.setItem("courses", JSON.stringify(coursesArray));

      // Remove the grades of the deleted course from the studentsArray
      studentsArray.forEach((student) => {
        
        // Remove the courseId from the student's takenCourses array
        const takenCoursesIndex = student.takenCourses.indexOf(deletedCourse.courseId);
        if (takenCoursesIndex !== -1) {
          student.takenCourses.splice(takenCoursesIndex, 1);
          student.grades.splice(takenCoursesIndex, 1);
        }
      });

      // Update local storage with the modified studentsArray
      localStorage.setItem("students", JSON.stringify(studentsArray));

      // Refresh the table with the updated courses
      loadCourses();
    } else {
      console.error("Course not found with ID: " + courseId);
    }
  }
});
