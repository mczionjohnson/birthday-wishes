// const sendBtn = document.getElementById("sendBtn");
const name = document.getElementById("name");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const form = document.querySelector("#userInfo");

async function sendData(data) {
  // Associate the FormData object with the form element
  // const formData = new FormData(form);

  try {
    const response = await fetch("http://localhost:8000/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    console.log(await response.json());
    alert("Thank you");
  } catch (e) {
    console.error(e);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (name.value == "") {
    alert("Please enter name");
  }
  if (email.value == "") {
    alert("Please enter email");
  }
  if (dob.value == "") {
    alert("Please enter date of birth");
  } else {
    let name_text = name.value;
    let email_text = email.value;
    let dob_text = dob.value;
    const data = { name_text, email_text, dob_text };

    sendData(data);
  }
});
