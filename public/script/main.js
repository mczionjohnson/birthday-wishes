// const sendBtn = document.getElementById("sendBtn");
const fav_name = document.getElementById("name");
const email = document.getElementById("email");
const day = document.getElementById("day");
const month = document.getElementById("month");
const form = document.querySelector("#userInfo");

async function sendData(data) {
  // Associate the FormData object with the form element
  // const formData = new FormData(form);

  try {
    const response = await fetch("http://localhost:8000/v1/join", {
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
    alert("Success");
  } catch (e) {
    console.error(e);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (name.value == "") {
    alert("Please enter your favorite name");
  }
  if (email.value == "") {
    alert("Please enter email");
  }
  if (day.value == "") {
    alert("Please enter day of birth");
  }
  if (month.value == "") {
    alert("Please enter month of birth");
  } else {
    let name_text = fav_name.value;
    let email_text = email.value;
    let day_text = day.value;
    let month_text = month.value;
    const data = { name_text, email_text, day_text, month_text };

    sendData(data);
  }
});
