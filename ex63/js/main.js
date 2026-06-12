function init() {
    loadBirthday();
    showData();
    document.getElementById("txtName").focus();
}

function loadBirthday() {

    var day = document.getElementById("day");
    for (var i = 1; i <= 31; i++) {
        day.options[day.length] = new Option(i, i);
    }
    
    var month = document.getElementById("month");
    for (var i = 1; i <= 12; i++) {
        month.options[month.length] = new Option(i, i);
    }

    var year = document.getElementById("year");
    for (var i = 1970; i <= 2025; i++) {
        year.options[year.length] = new Option(i, i);
    }
    year.value = 1970;
}

function showData() {
    var tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";
    for (var i = 0; i < members.length; i++) {
        tbody.innerHTML +=
            "<tr onmouseover='mouseOver(this)' onmouseout='mouseOut(this)'>" +
                "<td>" + members[i].name + "</td>" +
                "<td>" + members[i].email + "</td>" +
                "<td>" + members[i].gender + "</td>" +
                "<td>" + members[i].birthday + "</td>" +
                "<td>" + members[i].hobbies + "</td>" +
                "<td>" + members[i].color + "</td>" +
            "</tr>";
    }
}

function registerMember() {
    var name = document.getElementById("txtName").value.trim();
    var email = document.getElementById("txtEmail").value.trim();

    if (name == "") {
        alert("Name cannot be left blank!");
        document.getElementById("txtName").focus();
        return;
    }

    var emailPattern = /^\S+@\S+\.\S+$/;
    if (emailPattern.test(email) == false) {
        alert("Email is invalid!");
        document.getElementById("txtEmail").focus();
        return;
    }

    var genderList = document.getElementsByName("gender");
    var gender = "";
    for (var i = 0; i < genderList.length; i++) {
        if (genderList[i].checked) {
            gender = genderList[i].value;
        }
    }

    var hobbyList = document.getElementsByName("hobby");
    var hobbies = "";
    for (var i = 0; i < hobbyList.length; i++) {
        if (hobbyList[i].checked) {

            if (hobbies != "") {
                hobbies += ", ";
            }

            hobbies += hobbyList[i].value;
        }
    }

    var colorList = document.getElementsByName("color");
    var color = "";
    for (var i = 0; i < colorList.length; i++) {
        if (colorList[i].checked) {
            color = colorList[i].value;
        }
    }

    var birthday =
        document.getElementById("day").value + "/" +
        document.getElementById("month").value + "/" +
        document.getElementById("year").value;

    var member = {
        name: name,
        email: email,
        gender: gender,
        birthday: birthday,
        hobbies: hobbies,
        color: color
    };

    members.push(member);
    showData();
    nextMember();
}
function nextMember() {
    document.getElementById("frmMember").reset();
    document.getElementById("txtName").focus();
}
function mouseOver(row) {
    row.style.backgroundColor = "yellow";
}
function mouseOut(row) {
    row.style.backgroundColor = "white";
}