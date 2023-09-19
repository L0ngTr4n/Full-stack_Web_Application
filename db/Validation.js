document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const errorMessages = document.getElementById('errorMessages');

    registrationForm.addEventListener('submit', function (event) {
        const username = registrationForm.username.value;
        const password = registrationForm.password.value;
        const role = registrationForm.role.value;
        const profilePicture = registrationForm.profilePicture.files[0];

        // Implement your custom validation logic here
        const errors = [];

        if (username.length < 8 || username.length > 15 || !/^[A-Za-z0-9]+$/.test(username)) {
            errors.push('Username must be between 8 and 15 characters and contain only letters and numbers (no spaces).');
        }

        if (password.length < 8 || password.length > 20 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) {
            errors.push('Password must be between 8 and 20 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).');
        }

        // You can add more custom validation here

        if (errors.length > 0) {
            event.preventDefault(); // Prevent form submission
            displayErrors(errors);
        }
    });

    function displayErrors(errors) {
        errorMessages.innerHTML = '';
        const ul = document.createElement('ul');
        errors.forEach(function (error) {
            const li = document.createElement('li');
            li.textContent = error;
            ul.appendChild(li);
        });
        errorMessages.appendChild(ul);
    }
});
