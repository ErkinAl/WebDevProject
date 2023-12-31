import {Student} from "./student.js";
import {studentsArray} from "./home.js";
import {coursesArray} from "./home.js";
    
// Main Show Students Table
document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("studentTable");
    const tableBody = document.getElementById("studentTableBody");
    const stButton = document.getElementById("buttonGetStudents");
    const coursesTable = document.getElementById("coursesTable");
    const mainPage = document.getElementById("mainPage");
    const addCourseForm = document.getElementById("addCourseForm");
    const addStudentForm = document.getElementById("addStudentForm");
    const searchInput = document.getElementById("searchInputStudent");
    const searchInputCourse = document.getElementById("searchInputCourse");

        stButton.addEventListener("click", function () {
            if (!passedCoursesTable.classList.contains("hidden")) {
                passedCoursesTable.classList.add("hidden");
                passedCoursesTableBody.classList.add("hidden");
            }
            if (!failedCoursesTable.classList.contains("hidden")) {
                failedCoursesTable.classList.add("hidden");
                failedCoursesTable.classList.add("hidden");
            }
            if (!coursesTable.classList.contains("hidden")) {
                coursesTable.classList.add("hidden");
                addCourseForm.classList.add("hidden");
                searchInputCourse.classList.add("hidden");
            }
            if (!studentCoursesTableBody.classList.contains("hidden")) {
                studentCoursesTableBody.classList.add("hidden");
                studentCoursesTable.classList.add("hidden");
            }
            if (!mainPage.classList.contains("hidden")) {
                mainPage.classList.add("hidden");
            }
            if (table.classList.contains("hidden")) {
                table.classList.remove("hidden");
            }
            if (addStudentForm.classList.contains("hidden")) {
                addStudentForm.classList.remove("hidden");
            }
            if (searchInput.classList.contains("hidden")) {
                searchInput.classList.remove("hidden");
            }
            // Load and display students from local storage
            loadStudents();
        });

        searchInput.addEventListener("input", function () {
            // Search students when the user types in the search input
            const searchValue = searchInput.value.toLowerCase();
            const students = studentsArray;
            const filteredStudents = students.filter(student => {
            return student.name.toLowerCase().includes(searchValue) || student.surname.toLowerCase().includes(searchValue);
            });

        // Display the filtered students
        showStudents(filteredStudents);
        });
    
        addStudentForm.addEventListener("submit", function (event) {
            event.preventDefault();
        
            // Get form data
            const formData = new FormData(addStudentForm);
            const newStudent = {};
        
            // Convert grades to an array of arrays
            const gradesInput = formData.get("grades");
            const gradesArray = [];
            const gradePairs = gradesInput.split(",");
            for (let i = 0; i < gradePairs.length; i += 2) {
                const firstGrade = parseInt(gradePairs[i].trim());
                const secondGrade = i + 1 < gradePairs.length ? parseInt(gradePairs[i + 1].trim()) : 0;
            
                if (!isNaN(firstGrade)) {
                    gradesArray.push([firstGrade, secondGrade]);
                }
            }
            // Set other form data to the newStudent object
            formData.forEach((value, key) => {
                if (key !== "grades") {
                    newStudent[key] = value;
                }
            });

            newStudent.id = parseInt(newStudent.id);
            newStudent.id = parseInt(newStudent.id);

            // Check student id is valid
            if (isStudentIdExists(newStudent.id)) {
                alert("Error: Student with the same ID already exists.");
                return;
            }
            if (newStudent.id < 0) {
                alert("Error: Student ID cannot be negative.");
                return;
            }
            // Check if age is valid
            if (newStudent.age < 0){
                alert("Error: Student Age cannot be negative.");
                return;
            }
            // Check if taken courses, grades is valid
            if(gradePairs.length > 2 || gradePairs.length < 2){
                alert("Error: You must enter two grades seperated by comma.");
                return;
            }
            if(gradePairs[0] < 0 || gradePairs[0] > 100 ){
                alert("Error: Grades must be between 0 and 100.");
                return;
            }
            if(gradePairs[1] < 0 || gradePairs[1] > 100 ){
                alert("Error: Grades must be between 0 and 100.");
                return;
            }

            

            // Add grades to the newStudent
            newStudent.grades = gradesArray;
            const takenCoursesArr = [];
            takenCoursesArr.push(parseInt(newStudent.takenCourses));
            // Add the new student to the students array
            const student = new Student(newStudent.id, newStudent.name, newStudent.surname, newStudent.age, takenCoursesArr, newStudent.grades);
            studentsArray.push(student);
            localStorage.setItem("students", JSON.stringify(studentsArray));
        
            // Insert the row with student information
            const addedStudentRow = tableBody.insertRow();
            addedStudentRow.insertCell(0).innerText = student.id;
            addedStudentRow.insertCell(1).innerText = student.name;
            addedStudentRow.insertCell(2).innerText = student.surname;
            addedStudentRow.insertCell(3).innerText = student.age;
            
            // Calculate GPA and insert it into the row
            const gpaCell = addedStudentRow.insertCell(4);
            gpaCell.innerText = student.getStudentGpa();

            // Refresh the table with the updated students
            loadStudents();

            // Clear the form
            addStudentForm.reset();
        });

        // Function for checking student ids already exists.
        function isStudentIdExists(studentId) {
            return studentsArray.some(student => student.id === parseInt(studentId));
        }
        
        function loadStudents() {
            const students = studentsArray;
            showStudents(students);
        }

        function updateStudentInfo(studentId) {
            // Find the student with the specified ID
            const studentToUpdate = studentsArray.find((student) => student.id === studentId);
        
            // Check if the student exists
            if (studentToUpdate) {
                // Display the current information
                alert(`
                    Current Information:
                    ID: ${studentToUpdate.id}
                    Name: ${studentToUpdate.name}
                    Surname: ${studentToUpdate.surname}
                    Age: ${studentToUpdate.age}
                    Courses and Grades: ${getCoursesWithGrades(studentToUpdate)}
                `);
        
                // Prompt to update student information
                const newName = prompt(`Enter new name for student ${studentToUpdate.name}:`, studentToUpdate.name);
                const newSurname = prompt(`Enter new surname for student ${studentToUpdate.surname}:`, studentToUpdate.surname);
        

                if (newName !== null) {
                    studentToUpdate.name = newName;
                }
        
                if (newSurname !== null) {
                    studentToUpdate.surname = newSurname;
                }

        
                // Prompt to update grades
                studentToUpdate.takenCourses.forEach((courseId, index) => {
                    const course = coursesArray.find((c) => c.courseId === courseId);
        
                    const newGradesInput = prompt(`Enter new grades for ${getCoursesWithGrades(studentToUpdate)} (comma-separated):`);
                    const parsedGrades = parseGradesInput(newGradesInput);
        
                    // Update grades if new values are provided
                    if (parsedGrades !== null) {
                        studentToUpdate.grades[index] = parsedGrades;
                    }
                });
        
                // Update local storage with the modified studentsArray
                localStorage.setItem("students", JSON.stringify(studentsArray));
                // Refresh the table with the updated students
                loadStudents();
            } else {
                console.error("Student not found with ID: " + studentId);
            }
        }
        
        function parseGradesInput(gradesInput) {
            const gradesArray = [];
            const gradePairs = gradesInput.split(",");
        
            for (let i = 0; i < gradePairs.length; i += 2) {
                const firstGrade = parseInt(gradePairs[i].trim());
                const secondGrade = i + 1 < gradePairs.length ? parseInt(gradePairs[i + 1].trim()) : 0;
        
                if (!isNaN(firstGrade)) {
                    gradesArray.push(firstGrade);
                }
        
                if (!isNaN(secondGrade)) {
                    gradesArray.push(secondGrade);
                }
            }
        
            return gradesArray.length > 0 ? gradesArray : null;
        }
        
        function getCoursesWithGrades(student) {
            // Combine course names and grades into a string
            const coursesWithGrades = student.takenCourses.map((courseId, index) => {
                const course = coursesArray.find((c) => c.courseId === courseId);
                const grades = student.grades[index] || [];
                const gradeString = grades.join("/");
                return course ? `${course.courseName}: ${gradeString}` : "Unknown Course";
            });
            return coursesWithGrades.join(", ");
        }

        function showStudents(studentsArray) {
            console.log(studentsArray);
            // Clear previous table content
            tableBody.innerHTML = "";
            // Add students to html
            studentsArray.forEach((student) => {
                const row = tableBody.insertRow();
                console.log(student);
                row.insertCell(0).innerText = student.id;
                row.insertCell(1).innerText = student.name;
                row.insertCell(2).innerText = student.surname;
                row.insertCell(3).innerText = student.age;
                row.insertCell(4).innerText = student.getStudentGpa();

                const deleteButton = document.createElement("button");
                deleteButton.innerText = "Delete";
                deleteButton.addEventListener("click", function () {
                    deleteStudent(student.id);
                    });
                row.insertCell(5).appendChild(deleteButton);

                const updateCell = row.insertCell(6);
                const updateButton = document.createElement("button");
                updateButton.innerText = "Update";
                updateButton.classList.add("update-button");
                updateButton.dataset.studentId = student.id;
                updateButton.addEventListener("click", function () {
                    // "Update" düğmesine tıklandığında updateStudent.js'deki fonksiyonu çağırın
                    updateStudentInfo(student.id);
                });

                updateCell.appendChild(updateButton);
            });
                // Make table visible
                table.style.display = "block"; 
        }

        function deleteStudent(studentId) {
            // Find the index of the student with the specified ID
            const studentIndex = studentsArray.findIndex((student) => student.id === studentId);
            // Check if the student with the specified ID exists
            if (studentIndex !== -1) {
              // Remove the student from the studentsArray
            studentsArray.splice(studentIndex, 1);

              // Update the local storage with the modified studentsArray
            localStorage.setItem("students", JSON.stringify(studentsArray));
            console.log(studentsArray);
                // Refresh the table with the updated students
                loadStudents();
            } else {
                console.error("Student not found with ID: " + studentId);
            }
        }
            // Grades Table
        const studentCoursesTableBody = document.getElementById("studentCoursesTableBody");
        const buttonShowGrades = document.getElementById("buttonShowGrades");
        const studentCoursesTable = document.getElementById("studentCoursesTable");

        buttonShowGrades.addEventListener("click", function () {
            if (!passedCoursesTable.classList.contains("hidden")) {
                passedCoursesTable.classList.add("hidden");
                passedCoursesTableBody.classList.add("hidden");
            }
            if (studentCoursesTableBody.classList.contains("hidden")) {
                studentCoursesTableBody.classList.remove("hidden");
                studentCoursesTable.classList.remove("hidden");
            }
            if (!failedCoursesTable.classList.contains("hidden")) {
                failedCoursesTable.classList.add("hidden");
                failedCoursesTable.classList.add("hidden");
            }
            if (!coursesTable.classList.contains("hidden")) {
                coursesTable.classList.add("hidden");
                addCourseForm.classList.add("hidden");
                searchInputCourse.classList.add("hidden");
            }
            if (!mainPage.classList.contains("hidden")) {
                mainPage.classList.add("hidden");
            }
            if (!table.classList.contains("hidden")) {
                table.classList.add("hidden");
            }
            if (!addStudentForm.classList.contains("hidden")) {
                addStudentForm.classList.add("hidden");
            }
            if (!searchInput.classList.contains("hidden")) {
                searchInput.classList.add("hidden");
            }
            if (!searchInput.classList.contains("hidden")) {
                searchInput.classList.add("hidden");
            }
            showGrades(studentsArray);
        });

        function showGrades(studentsArray) {
            console.log(studentsArray);
            // Clear previous table content
            studentCoursesTableBody.innerHTML = "";
            // Add students to html
            studentsArray.forEach((student) => {
                const row = studentCoursesTableBody.insertRow();
                console.log(student);
                row.insertCell(0).innerText = student.id;
                row.insertCell(1).innerText = student.name;
                row.insertCell(2).innerText = student.surname;
        
                // Create a cell to display courses and grades
                const coursesAndGradesCell = row.insertCell(3);
        
                // Iterate over taken courses and grades
                student.takenCourses.forEach((courseId, index) => {
                    const course = coursesArray.find((c) => c.courseId === courseId);
                    const grades = student.grades[index] || [];
                    const courseAndGradeText = `${course ? course.courseName : "Unknown Course"}: ${grades.join("/")}`;
                    
                    // Create a paragraph element for each course and grade text
                    const paragraph = document.createElement("p");
                    paragraph.innerText = courseAndGradeText;
        
                    // Append the paragraph to the cell
                    coursesAndGradesCell.appendChild(paragraph);
                });
            });
        
            // Make table visible
            studentCoursesTable.style.display = "block"; 
        }
            // Failed Courses Table
        const failedCoursesTableBody = document.getElementById("failedCoursesTableBody");
        const failedCoursesTable = document.getElementById("failedCoursesTable");
        const buttonGetFailedStudents = document.getElementById("buttonGetFailedStudents");
        buttonGetFailedStudents.addEventListener("click", function () {
            if (!passedCoursesTable.classList.contains("hidden")) {
                passedCoursesTable.classList.add("hidden");
                passedCoursesTableBody.classList.add("hidden");
            }
            if (failedCoursesTable.classList.contains("hidden")) {
                failedCoursesTable.classList.remove("hidden");
                failedCoursesTable.classList.remove("hidden");
            }
            if (!studentCoursesTableBody.classList.contains("hidden")) {
                studentCoursesTableBody.classList.add("hidden");
                studentCoursesTable.classList.add("hidden");
            }
            if (!coursesTable.classList.contains("hidden")) {
                coursesTable.classList.add("hidden");
                addCourseForm.classList.add("hidden");
                searchInputCourse.classList.add("hidden");
            }
            if (!mainPage.classList.contains("hidden")) {
                mainPage.classList.add("hidden");
            }
            if (!table.classList.contains("hidden")) {
                table.classList.add("hidden");
            }
            if (!addStudentForm.classList.contains("hidden")) {
                addStudentForm.classList.add("hidden");
            }
            if (!searchInput.classList.contains("hidden")) {
                searchInput.classList.add("hidden");
            }
            if (!searchInput.classList.contains("hidden")) {
                searchInput.classList.add("hidden");
            }
            
            showFailedCourses(studentsArray);
        });
        
        function showFailedCourses() {
            // Clear previous table content
            failedCoursesTableBody.innerHTML = "";
        
            // Iterate over students to find failed courses
            studentsArray.forEach((student) => {
                // Check if the student has any failed courses
                if (hasFailedCourses(student)) {
                    const row = failedCoursesTableBody.insertRow();
                    row.insertCell(0).innerText = student.id;
                    row.insertCell(1).innerText = student.name;
                    row.insertCell(2).innerText = student.surname;
        
                    // Create a cell to display failed courses
                    const failedCoursesCell = row.insertCell(3);
        
                    // Find failed courses for the student
                    const failedCourses = getFailedCourses(student);
        
                    // Create a paragraph element for each failed course
                    failedCourses.forEach((courseName) => {
                        const paragraph = document.createElement("p");
                        paragraph.innerText = courseName;
                        failedCoursesCell.appendChild(paragraph);
                    });
                }
            });
        
            // Make table visible only if there are failed courses
            failedCoursesTable.style.display = failedCoursesTableBody.innerHTML.trim() !== "" ? "block" : "none";
        }
        
        function hasFailedCourses(student) {
            // Iterate over taken courses and grades
            for (let index = 0; index < student.takenCourses.length; index++) {
                const courseId = student.takenCourses[index];
                const course = coursesArray.find((c) => c.courseId === courseId);
                const grades = student.grades[index] || [];
        
                // Check if the student failed the course
                if (isCourseFailed(course, grades)) {
                    return true;
                }
            }
        
            return false;
        }
        
        
        function getFailedCourses(student) {
            const failedCourses = [];
        
            // Iterate over taken courses and grades
            student.takenCourses.forEach((courseId, index) => {
                const course = coursesArray.find((c) => c.courseId === courseId);
                const grades = student.grades[index] || [];
        
                // Check if the student failed the course
                if (isCourseFailed(course, grades)) {
                    failedCourses.push(course ? course.courseName : "Unknown Course");
                }
            });
        
            return failedCourses;
        }
        
        function isCourseFailed(course, grades) {
            // Check if the student failed the course based on your criteria
            const midtermPercent = course.midterm;
            const finalPercent = course.final;
        
            // Calculate average grade for the course
            const student = new Student();
            const averageGrade = student.findAverageGrades(grades[0], grades[1], midtermPercent, finalPercent);
        
            // Check if the average grade corresponds to failing criteria
            return (course.tenBased && averageGrade < 50) || (!course.tenBased && averageGrade < 35);
        }
            // Passed Students Table
        const buttonGetPassedStudents = document.getElementById("buttonGetPassedStudents");
        const passedCoursesTable = document.getElementById("passedCoursesTable");
        const passedCoursesTableBody = document.getElementById("passedCoursesTableBody");
        buttonGetPassedStudents.addEventListener("click", function () {
            if (passedCoursesTable.classList.contains("hidden")) {
                passedCoursesTable.classList.remove("hidden");
                passedCoursesTableBody.classList.remove("hidden");
            }
            if (!failedCoursesTable.classList.contains("hidden")) {
                failedCoursesTable.classList.add("hidden");
                failedCoursesTable.classList.add("hidden");
            }
            if (!studentCoursesTableBody.classList.contains("hidden")) {
                studentCoursesTableBody.classList.add("hidden");
                studentCoursesTable.classList.add("hidden");
            }
            if (!coursesTable.classList.contains("hidden")) {
                coursesTable.classList.add("hidden");
                addCourseForm.classList.add("hidden");
                searchInputCourse.classList.add("hidden");
            }
            if (!mainPage.classList.contains("hidden")) {
                mainPage.classList.add("hidden");
            }
            if (!table.classList.contains("hidden")) {
                table.classList.add("hidden");
            }
            if (!addStudentForm.classList.contains("hidden")) {
                addStudentForm.classList.add("hidden");
            }
            if (!searchInput.classList.contains("hidden")) {
                searchInput.classList.add("hidden");
            }
            if (!searchInput.classList.contains("hidden")) {
                searchInput.classList.add("hidden");
            }
            showPassedCourses(studentsArray);
        });

        // Check if a student has passed a specific course
        function isCoursePassed(course, grades) {
            const midtermPercent = course.midterm;
            const finalPercent = course.final;

            // Calculate average grade
            const student = new Student();
            const averageGrade = student.findAverageGrades(grades[0], grades[1], midtermPercent, finalPercent);
            // Check if the student passed the course based on the passing criteria
            return (course.tenBased && averageGrade >= 50) || (!course.tenBased && averageGrade >= 35);
        }

        // Function: Display passed courses and add students to the table
        function showPassedCourses(studentsArray) {
            // Clear previous table content
            passedCoursesTableBody.innerHTML = "";

            // Create header row and add course names
            const headerRow = passedCoursesTableBody.insertRow();
            headerRow.insertCell(0).innerText = "Student ID";
            headerRow.insertCell(1).innerText = "Name";
            headerRow.insertCell(2).innerText = "Surname";

            coursesArray.forEach((course, index) => {
                headerRow.insertCell(index + 3).innerText = course.courseName;
            });

            // Add passed courses for each student
            studentsArray.forEach((student) => {
                const row = passedCoursesTableBody.insertRow();
                row.insertCell(0).innerText = student.id;
                row.insertCell(1).innerText = student.name;
                row.insertCell(2).innerText = student.surname;

                // Add ticks, crosses, or not taking based on course status
                coursesArray.forEach((course, index) => {
                    const cell = row.insertCell(index + 3);
                    const passedCourses = getPassedCourses(student);
                    const courseIndex = student.takenCourses.indexOf(course.courseId);

                    if (courseIndex !== -1) {
                        // Student took the course
                        const passed = passedCourses.includes(course.courseName);
                        cell.innerText = passed ? "✓" : "✗";
                    } else {
                        // Student didn't take the course
                        cell.innerText = "Not taking";
                    }
                });
            });

            // Make the table visible
            passedCoursesTable.style.display = "block";
        }

        // Function: Get passed courses for a student
        function getPassedCourses(student) {
            const passedCourses = [];

            // Iterate over taken courses and grades
            student.takenCourses.forEach((courseId, index) => {
                const course = coursesArray.find((c) => c.courseId === courseId);
                const grades = student.grades[index] || [];

                // Check if the student passed the course
                if (isCoursePassed(course, grades)) {
                    passedCourses.push(course ? course.courseName : "Unknown Course");
                }
            });

            return passedCourses;
        }
});
