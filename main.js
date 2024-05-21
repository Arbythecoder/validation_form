const userForm = document.getElementById("userForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const otherNames = document.getElementById("otherNames");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const gender = document.getElementById("gender");

userForm.addEventListener("submit", event => {
  event.preventDefault(); // Prevent default form submission

  const errorMessages = [];
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const otherNamesValue = otherNames.value.trim();
  const emailValue = email.value.trim();
  const phoneNumberValue = phoneNumber.value.trim();
  const genderValue = gender.value.trim();

  // Validation logic
  if (firstNameValue.length < 1 || /\d/.test(firstNameValue)) {
    errorMessages.push("First name is required and cannot contain numbers.");
  }
  if (lastNameValue.length < 1 || /\d/.test(lastNameValue)) {
    errorMessages.push("Last name is required and cannot contain numbers.");
  }
  if (otherNamesValue && /\d/.test(otherNamesValue)) {
    errorMessages.push("Other names cannot contain numbers.");
  }
  if (!emailValue.includes("@") || !emailValue.includes(".")) {
    errorMessages.push("Email must be valid with '@' and '.'.");
  }
  if (phoneNumberValue.length !== 10 || isNaN(phoneNumberValue)) {
    errorMessages.push("Phone number must be exactly 10 digits.");
  }
  if (!genderValue) {
    errorMessages.push("Gender is required.");
  }

  if (errorMessages.length > 0) {
    document.getElementById("errorMessages").innerText =
      errorMessages.join("\n");
  } else {
    const formData = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      otherNames: otherNamesValue,
      email: emailValue,
      phoneNumber: phoneNumberValue,
      gender: genderValue,
    };

    if (errorMessages.length > 0) {
    } else {
      alert("Form submitted successfully! ");
      localStorage.setItem("formData", JSON.stringify(formData));
      // Reset the form
      userForm.reset();
    }

    // Log the constructed formData object for verification
    console.log("Form data object:", formData);

    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Form submitted successfully!");
          // reset the form field
          userForm.reset();
          document.getElementById("errorMessages").innerText = "";
        } else {
          document.getElementById("errorMessages").innerText = data.error;
        }
      });
  }
});
