// Selected elements here and stored in new variables
var studentId = document.getElementById("studentId");
var studentName = document.getElementById("studentName");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var submit = document.getElementById("submit");

var arrayStudents = []; //Empty array to store student object data

var flag = "create"; //to change register button
var tempId; //to use as temporary id to store table data

// to check local storage for adding array of student
if (localStorage.arrayStudents != null) {
  arrayStudents = JSON.parse(localStorage.getItem("arrayStudents"));
} else {
  arrayStudents = [];
}

// Event listener and functionality on submit button
submit.addEventListener("click", (e) => {
  if (flag === "create") {
    let studentObject = {
      studentId: studentId.value,
      studentName: studentName.value,
      email: email.value,
      phone: phone.value,
    };
    if (studentName.value == "") return;
    if (studentId.value == "") return;
    if (email.value == "") return;
    if (phone.value == "") return;
    arrayStudents.push(studentObject); //push student obj in student arr
    localStorage.setItem("arrayStudents", JSON.stringify(arrayStudents)); //store data in local storage

    displayInfos();
    clearText();
  } else {
    submit.innerHTML = "Update";
    updateStudent(tempId);
    displayInfos();
    submit.innerHTML = "Register";
    flag = "create";
  }

  e.preventDefault();
});


//Display info of array and store in table
function displayInfos() {
  let table = "";
  for (let index = 1; index < arrayStudents.length; index++) {
    table += `
        <tr>
              <th scope="row">${index}</th>
              <td>${arrayStudents[index].studentId}</td>
              <td>${arrayStudents[index].studentName}</td>
              <td>${arrayStudents[index].email}</td>
              <td>${arrayStudents[index].phone}</td>
              <td>
                <button class="btn btn-warning" onclick = "updateStudent(${index})">Edit</button>
                <button class="btn btn-danger" onclick = "deleteStudent(${index})">Delete</button>
              </td>
            </tr>
        `;
    document.getElementById("tbody").innerHTML = table;
  }
}

//to clear text after filling the form
function clearText() {
  studentId.value = "";
  studentName.value = "";
  email.value = "";
  phone.value = "";
}

function deleteStudent(id) {
  arrayStudents.splice(id, 1);
  localStorage.setItem("arrayStudents", JSON.stringify(arrayStudents));
  displayInfos();
}

function updateStudent(id) {
  tempId = id;
  flag = "update";
  submit.innerHTML = "Update";
  let studentObject = {
    studentId: studentId.value,
    studentName: studentName.value,
    email: email.value,
    phone: phone.value,
  };
  studentId.value = arrayStudents[id].studentId;
  studentName.value = arrayStudents[id].studentName;
  email.value = arrayStudents[id].email;
  phone.value = arrayStudents[id].phone;

  arrayStudents[tempId] = studentObject;
  localStorage.setItem("arrayStudents", JSON.stringify(arrayStudents));
}

displayInfos();
