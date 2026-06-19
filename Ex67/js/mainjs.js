var studentsData = [];
var sortAsc = { id: true, name: true, birthday: true, gender: true };

function load_students() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "customers.xml", true);
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 0) {
            load_students_from_xml(xhr.responseText);
        }
    };
    xhr.send();
}

function load_students_from_xml(dataset) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(dataset, "text/xml");
    var studentTags = xmlDoc.getElementsByTagName("student");

    studentsData = [];
    for (var i = 0; i < studentTags.length; i++) {
        var studentTag = studentTags[i];
        studentsData.push({
            id: get_text(studentTag, "id"),
            name: get_text(studentTag, "name"),
            birthday: get_text(studentTag, "birthday"),
            gender: get_text(studentTag, "gender")
        });
    }
    render_students_to_table(studentsData);
}

function get_text(parent, tagName) {
    return parent.getElementsByTagName(tagName)[0].textContent.trim();
}

function render_students_to_table(students) {
    var bodyCustomer = document.getElementById("tbodyStudents");
    bodyCustomer.innerHTML = "";

    students.forEach(function (student) {
        var tr = document.createElement("tr");

        tr.appendChild(createCell(student.id));
        tr.appendChild(createCell(student.name));
        tr.appendChild(createCell(student.birthday));
        tr.appendChild(createCell(student.gender));

        tr.onmouseover = function () { this.style.backgroundColor = "yellow"; };
        tr.onmouseout = function () { this.style.backgroundColor = "white"; };
        tr.onclick = function () { show_detail(student); };

        bodyCustomer.appendChild(tr);
    });
}

function createCell(text) {
    var td = document.createElement("td");
    td.textContent = text;
    return td;
}

function show_detail(student) {
    var detailTable = document.getElementById("detailTable");
    var detailBody = document.getElementById("detailStudent");
    detailTable.style.display = "table";
    detailBody.innerHTML = ""
        + create_detail_row("Student ID:", student.id)
        + create_detail_row("Student Name:", student.name)
        + create_detail_row("Birthday:", student.birthday)
        + create_detail_row("Gender:", student.gender);
}

function create_detail_row(label, value) {
    return "<tr><td>" + label + "</td><td>" + value + "</td></tr>";
}

function sort_table(field) {
    var asc = sortAsc[field];
    studentsData.sort(function (a, b) {
        var valueA = field === "birthday" ? parse_date(a[field]) : a[field].toLowerCase();
        var valueB = field === "birthday" ? parse_date(b[field]) : b[field].toLowerCase();
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    });

    if (!asc) studentsData.reverse();

    sortAsc[field] = !asc;
    render_students_to_table(studentsData);
    update_header_arrows(field, asc);
}

function parse_date(text) {
    var parts = text.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

function update_header_arrows(field, asc) {
    var headers = document.querySelectorAll("#studentTable th");
    for (var i = 0; i < headers.length; i++) {
        var header = headers[i];
        var fieldName = header.getAttribute("data-field");
        var arrow = fieldName === field ? (asc ? " ▲" : " ▼") : "";
        header.textContent = header.textContent.replace(/[▲▼]\s*$/, "") + arrow;
    }
}
