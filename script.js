var Name = document.getElementById("name");
var mail = document.getElementById("email");
var address = document.getElementById("address");
var contactno = document.getElementById("contactno");
var dob = document.getElementById("dob");
var pan = document.getElementById("pan");
var username = document.getElementById("username");
var password = document.getElementById("password");
var confirmpassword = document.getElementById("confirmpass");
var profilepicture = document.getElementById("profilepic");
var gen_value = "";
var edu;
var profile;
var age;

function validateName() {
  const nameValue = Name.value.trim(); 
  if (nameValue === "" || nameValue.length > 75) {
    alert("Name can't be blank or be more than 75 characters");
    return false;
  }
  return true;
}

function validE() {
  const emailValue = mail.value.trim(); 
  const patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!patt.test(emailValue)) {
    alert("Please enter a valid email address.");
    return false;
  }
  return true;
}

function validatePhoneNumber() {
  const phoneValue = contactno.value.trim(); 
  const patt = /^[6-9]\d{9}$/;
  if (!patt.test(phoneValue)) {
    alert("Phone number must start with {6,7,8,9} and exactly 10 digits.");
    return false;
  }
  return true;
}

function validateAddress() {
  const addressValue = address.value; 
  if (addressValue.length > 50) {
    alert("Address must not exceed 50 characters.");
    return false;
  }
  return true;
}

function validateDob() {
  const dobValue = dob.value;
  if (!dobValue) {
    alert("Date of Birth cannot be empty.");
    return false;
  }

  const dobDate = new Date(dobValue); 
  const year = dobDate.getFullYear(); 

  if (year < 1950 || year > 2010) {
    alert("Date of Birth must be between 1950 and 2010.");
    return false;
  }

  // Calculate age
  const today = new Date();
  const ageDiff = today - dobDate.getTime();
  const ageDate = new Date(ageDiff); 
  age = Math.abs(ageDate.getUTCFullYear() - 1970);

  alert(`You are ${age} years old.`);
  return true;
}

function validateGender() {
  const gender = document.querySelector('input[name="gender"]:checked'); // Get checked input
  if (gender) {
    gen_value = gender.value; // Set the value from the checked input
    return true;
  } else {
    alert("Please choose a gender.");
    return false;
  }
}

function validateEducation(){
  var e = document.getElementById("education");
  edu = e.options[e.selectedIndex].text;
  if ( document.getElementById('education').selectedIndex == 0 ) {
    alert ( "Please Select your Qualification" );
    return false;
  }
  return true;
}
function valideUsername() {
  const usernameValue = username.value; 
  const patt = /^[0-9A-Za-z]{6,25}$/;
  if (!patt.test(usernameValue)) {
    alert("Invalid username");
    return false;
  }
  return true;
}

function validatePassword() {
  const passwordValue = password.value; 
  const weakPattern = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).{8,15}$/; 
  const strongPattern = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,15}$/;

  if (!weakPattern.test(passwordValue)) {
    alert("Password must be between 8-32 characters and include at least one letter and one number.");
    return false;
  }

  if (!strongPattern.test(passwordValue)) {
    alert("Valid password, but not strong. Consider using an uppercase letter, a lowercase letter, a number, and a special character.");
    return true; 
  }

  return true; 
}
function validateConfirmPass() {
  const confirmPasswordValue = confirmpassword.value.trim(); 
  const passwordValue = password.value.trim(); 
  if (confirmPasswordValue === passwordValue) {
    return true;
  }

  if (confirmPasswordValue !== passwordValue) {
    alert("Confirm Password should match the Password field.");
    return false;
  }

  return true;
}


function validatePan() {
  const panValue = pan.value; 
  const patt = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
  if (panValue === "") {
    alert("PAN field cannot be empty.");
    return false; 
  }
  if (panValue !== panValue.toUpperCase()) {
    alert("Invalid PAN number.");
    return false;
  }
  if (!patt.test(panValue)) {
    alert("Invalid PAN number.");
    return false;
  }
  return true;
}

function validateFileSize() {
  const fileInput = document.getElementById("profilepic");
  profile = fileInput.files[0]; 
  const maxSizeInBytes = 2 * 1024 * 1024; 
  const supportedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

  if (!profile) {
    alert("Please select a file.");
    return false;
  }

  if (!supportedTypes.includes(profile.type)) {
    alert("Invalid file type. Please select a valid file.");
    return false;
  }

  if (profile.size > maxSizeInBytes) {
    alert("File size must not exceed 2 MB.");
    fileInput.value = ""; 
    return false;
  }

  return true;
}
function byteSize(sizeInBytes) {
  if (sizeInBytes < 1024) return `${sizeInBytes} Bytes`;
  if (sizeInBytes < 1048576) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  return `${(sizeInBytes / 1048576).toFixed(2)} MB`;
}

function saveProfilePictureToLocalStorage(file, callback) {
  const reader = new FileReader();

  reader.onload = function (event) {
    const base64String = event.target.result;

    if (callback) callback(base64String); 
  };

  reader.readAsDataURL(file);
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("myform").addEventListener("submit", function (event) {
    let isFormValid = true;

    // Validate all fields
    if (!validateName()) isFormValid = false;
    if (!validE()) isFormValid = false;
    if (!validatePhoneNumber()) isFormValid = false;
    if (!validateAddress()) isFormValid = false;
    if (!validateDob()) isFormValid = false;
    if (!validateGender()) isFormValid = false;
    if (!validateEducation()) isFormValid = false;
    if (!validatePan()) isFormValid = false;
    if (!valideUsername()) isFormValid = false;
    if (!validatePassword()) isFormValid = false;
    if (!validateConfirmPass()) isFormValid = false;
    if (!validateFileSize()) isFormValid = false;

    // If form is not valid, prevent submission
    if (!isFormValid) {
      event.preventDefault();
      alert("Please correct the highlighted errors before submitting the form.");
    } else {
      if (profile) {
        saveProfilePictureToLocalStorage(profile, function (base64String) {
          saveFormData(base64String); 
        });
      } else {
        saveFormData(); 
      }
    }
  });
});

function saveFormData(base64String = null) {
  const formData = {
    fullName: Name.value.trim(),
    email: mail.value.trim(),
    address: address.value.trim(),
    contactno: contactno.value.trim(),
    dateOfBirth: dob.value.trim(),
    age:age,
    gender: gen_value,
    qualification: edu,
    pan: pan.value.trim(),
    userName: username.value.trim(),
    password: password.value.trim(),
    picdetails: profile ? {
      picName: profile.name.split(".")[0],
      picSize: byteSize(profile.size),
      picType: profile.type.split("/")[1]
    } : null,
    profilePicture: base64String,
  };

  const storedFormData = JSON.parse(localStorage.getItem("formData")) || [];
  storedFormData.push(formData);
  localStorage.setItem("formData", JSON.stringify(storedFormData));
}



