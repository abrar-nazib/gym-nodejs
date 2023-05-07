const url = "/api/exercises";

const button = document.querySelector("#createExercise"); // Select the button element

button.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default form submit behavior

  const data = new URLSearchParams();
  data.append("name", document.querySelector("#create_name").value);
  data.append("target", document.querySelector("#create_target").value);

  data.append("bodyPart", document.querySelector("#create_bodyPart").value);
  data.append("equipment", document.querySelector("#create_equipment").value);

  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      $("#create_modal").modal("hide");
      document.querySelector("#modal_message").innerHTML = data.message;
      $("#message_modal").modal("show");
    })
    .catch((err) => {
      console.log(err);
    });
});

deleteExercise = (id) => {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      document.querySelector("#modal_message").innerHTML = data.message;
      if (data.success) {
        const elem = document.getElementById(id);
        elem.remove();
      }
      $("#message_modal").modal("show");
    })
    .catch((err) => {
      console.log(err);
    });
};

// update exercise
fetchExerciseData = (id) => {
  // get exercise by id
  fetch(`${url}/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // console.log(data);
      if (data.success) {
        document.querySelector("#update_name").value = data.exercise.name;
        document.querySelector("#update_target").value = data.exercise.target;
        document.querySelector("#update_bodyPart").value =
          data.exercise.bodyPart;
        document.querySelector("#update_equipment").value =
          data.exercise.equipment;
        document.querySelector("#update_id").value = data.exercise._id;
        $("#update_modal").modal("show");
      } else {
        document.querySelector("#modal_message").innerHTML = data.message;
        $("#message_modal").modal("show");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

document.querySelector("#updateExercise").onclick = () => {
  const data = new URLSearchParams();
  data.append("name", document.querySelector("#update_name").value);
  data.append("target", document.querySelector("#update_target").value);
  data.append("bodyPart", document.querySelector("#update_bodyPart").value);
  data.append("equipment", document.querySelector("#update_equipment").value);
  data.append("_id", document.querySelector("#update_id").value);
  // console.log(document.querySelector("#update_id").value);
  fetch(url, {
    method: "PUT",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      loadBodyContent();
      $("#update_modal").modal("hide");
      document.querySelector("#modal_message").innerHTML = data.message;
      $("#message_modal").modal("show");
    })

    .catch((err) => {
      console.log(err);
    });
};

const fetchOptions = () => {
  fetch(`${url}/unique`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let { targets, bodyParts, equipments } = data.uniqueFields;
      let targetSelect = document.querySelector("#target_select");
      let bodyPartSelect = document.querySelector("#bodyPart_select");
      let equipmentSelect = document.querySelector("#equipment_select");
      targets.forEach((target) => {
        let option = document.createElement("option");
        option.value = target;
        option.innerHTML = target;
        targetSelect.appendChild(option);
      });
      bodyParts.forEach((bodyPart) => {
        let option = document.createElement("option");
        option.value = bodyPart;
        option.innerHTML = bodyPart;
        bodyPartSelect.appendChild(option);
      });
      equipments.forEach((equipment) => {
        let option = document.createElement("option");
        option.value = equipment;
        option.innerHTML = equipment;
        equipmentSelect.appendChild(option);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const filterByOptions = () => {
  const target = document.querySelector("#target_select").value;
  const bodyPart = document.querySelector("#bodyPart_select").value;
  const equipment = document.querySelector("#equipment_select").value;
  const params = { target, bodyPart, equipment };
  loadBodyContent(params);
  // console.log(params);
};

const loadBodyContent = (params) => {
  const parent = document.querySelector("#exerciseContainer");
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }

  const queryString = new URLSearchParams(params).toString();

  fetch(`${url}?${queryString}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      if (data.success) {
        let exercises = data.exercises;
        exercises.forEach((exercise) => {
          let { _id, name, target, bodyPart, equipment, gifUrl } = exercise;
          cardCreator(_id, name, target, bodyPart, equipment, gifUrl);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const prepareFilterQuery = () => {
  const target = document.querySelector("#target_select").value;
  const bodyPart = document.querySelector("#bodyPart_select").value;
  const equipment = document.querySelector("#equipment_select").value;
  const params = { target, bodyPart, equipment, itemlimit: 10000 };
  const queryString = new URLSearchParams(params).toString();
  return queryString;
};

// create pdf from filtered data
const exportPDF = () => {
  const queryString = prepareFilterQuery();
  fetch(`${url}?${queryString}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        window.jsPDF = window.jspdf.jsPDF;
        let exercises = data.exercises;
        let doc = new jsPDF({
          unit: "mm",
          format: "a4",
        });

        doc.setFontSize(20);
        let y = 10;
        exercises.forEach((exercise) => {
          let { _id, name, target, bodyPart, equipment } = exercise;

          if (y + 50 > doc.internal.pageSize.height) {
            doc.addPage();
            y = 10;
          }
          doc.text(`Name: ${name}`, 10, (y += 10));
          doc.text(`Target: ${target}`, 10, (y += 10));
          doc.text(`Body Part: ${bodyPart}`, 10, (y += 10));
          doc.text(`Equipment: ${equipment}`, 10, (y += 10));
          y += 20;
        });
        doc.save("exercises.pdf");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// export a csv file from filtered data
const exportCSV = () => {
  const queryString = prepareFilterQuery();
  fetch(`${url}?${queryString}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        let exercises = data.exercises;
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Name,Target,Body Part,Equipment\n";
        exercises.forEach((exercise) => {
          let { _id, name, target, bodyPart, equipment } = exercise;
          csvContent += `${name},${target},${bodyPart},${equipment}\n`;
        });
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "exercises.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// export an excel file from filtered data using xlsx library
const exportExcel = () => {
  const queryString = prepareFilterQuery();
  fetch(`${url}?${queryString}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        let { exercises } = data;
        let wb = XLSX.utils.book_new();

        // Convert JSON to worksheet
        let ws = XLSX.utils.json_to_sheet(exercises);

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Download XLS file
        XLSX.writeFile(wb, "exercises.xls");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Create Exercise element
window.onload = () => {
  loadBodyContent();
  fetchOptions();
};
