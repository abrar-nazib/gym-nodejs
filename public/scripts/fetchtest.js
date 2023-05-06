const url = "http://localhost:3000/api/exercises";

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
    .catch((err) => {});
});

deleteExercise = (id) => {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
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
      document.querySelector("#update_name").value = data.exercise.name;
      document.querySelector("#update_target").value = data.exercise.target;
      document.querySelector("#update_bodyPart").value = data.exercise.bodyPart;
      document.querySelector("#update_equipment").value =
        data.exercise.equipment;
      document.querySelector("#update_id").value = data.exercise._id;
      $("#update_modal").modal("show");
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
  console.log(document.querySelector("#update_id").value);
  fetch(url, {
    method: "PUT",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      $("#update_modal").modal("hide");
      document.querySelector("#modal_message").innerHTML = data.message;
      $("#message_modal").modal("show");
    })
    .catch((err) => {});
};
