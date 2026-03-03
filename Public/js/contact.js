document.getElementById("contact-form").onsubmit = () => {
    clearErrors();

    let isValid = true;

    // First name
    let fname = document.getElementById("first-name").value.trim();
    if(!fname){
        document.getElementById("errFname").style.display = "block";
        isValid = false;
    }

    // Last name
    let lname = document.getElementById("last-name").value.trim();
    if(!lname){
        document.getElementById("errLname").style.display = "block";
        isValid = false;
    }
    let email = document.getElementById("email").value.trim();
    let mailingListChecked = document.querySelector('input[name="mailing-list"]').checked;

    if (email) {
        // Must contain @ and .
        let emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(email)) {
            document.getElementById("errEmail").style.display = "block";
            isValid = false;
        }
    } else if (mailingListChecked) {
        document.getElementById("errEmail").style.display = "block";
        isValid = false;
    }

    // LinkedIn
    let linkedin = document.getElementById("linkedin").value.trim();
    if (linkedin && !linkedin.startsWith("https://linkedin.com/in/")) {
        document.getElementById("errLinkedin").style.display = "block";
        isValid = false;
    }

    // How we met
    let meeting = document.getElementById("meeting").value;
    if (meeting === "Please select") {
        document.getElementById("errMeeting").style.display = "block";
        isValid = false;
    }

    return isValid;
}
/*Clear error message */
function clearErrors(){
    let errors = document.getElementsByClassName("err");
    for( let i=0; i<errors.length; i++){
        errors[i].style.display ="none";
    }
}