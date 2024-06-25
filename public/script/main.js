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
    //for dev
    const response = await fetch("http://localhost:8000/v1/join", {
      //for production
      // const response = await fetch("https://birthday-wishes-q8gj.onrender.com/v1/join", {
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

    if (response.status == 200) {
      return alert("Success");
    } else if (response.status == 400) {
      return alert("unsuccessful, user already exist");
    } else if (response.status == 422) {
      return alert("error, check the console for info");
    } else {
      // return alert("Server error");
      return alert(response);
    }
  } catch (error) {
    console.error(error);
    return alert(e);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (fav_name.value == "") {
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
    fav_name.value = "";
    email.value = "";
    day.value = "";
    month.value = "";
  }
});
