const cardCreator = (id, name, target, bodyPart, equipment, gifUrl) => {
  // select parent element to append the new element
  const parent = document.querySelector("#exerciseContainer");

  // create elements
  const div1 = document.createElement("div");
  div1.classList.add("col-md-4", "my-5");
  div1.id = id;

  const div2 = document.createElement("div");
  div2.classList.add("card");
  div2.style.width = "18rem";

  // card Image
  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = gifUrl;
  img.alt = "Card image cap";

  const div3 = document.createElement("div");
  div3.classList.add("card-body");

  // Exercise Name
  const h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.textContent = name.toUpperCase();

  const ul = document.createElement("ul");
  ul.classList.add("list-group", "list-group-flush");

  // Target Muscles
  const li1 = document.createElement("li");
  li1.classList.add("list-group-item");
  li1.innerHTML = `<b>Target:</b> ${target}`;

  // Required Equipment
  const li2 = document.createElement("li");
  li2.classList.add("list-group-item");
  li2.innerHTML = `<b>Equipment:</b> ${equipment}`;

  // Body Parts
  const li3 = document.createElement("li");
  li3.classList.add("list-group-item");
  li3.innerHTML = `<b>Body Part:</b> ${bodyPart}`;

  const div4 = document.createElement("div");
  div4.classList.add("card-body", "text-center");

  const button1 = document.createElement("button");
  button1.classList.add("btn", "btn-primary", "mx-2");
  button1.innerHTML = '<i class="fa fa-pen-nib mx-2"></i>Update';
  button1.id = id;
  button1.onclick = function () {
    const _id = this.id;
    fetchExerciseData(_id);
  };

  const button2 = document.createElement("button");
  button2.id = id;
  button2.classList.add("btn", "btn-danger", "mx-2");
  button2.innerHTML =
    '<i class="fa fa-trash mx-2" aria-hidden="true"></i>Delete';
  button2.onclick = function () {
    const _id = this.id;
    deleteExercise(_id);
  };

  // append elements
  parent.appendChild(div1);
  div1.appendChild(div2);
  div2.appendChild(img);
  div2.appendChild(div3);
  div3.appendChild(h5);
  div2.appendChild(ul);
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  div2.appendChild(div4);
  div4.appendChild(button1);
  div4.appendChild(button2);
};
