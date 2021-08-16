const Errors = new Object();

Errors.errors = [];

Errors.setErrors = (error) => {
    Errors.errors.push(error);
}

Errors.resetErrors = () => {
    Errors.errors = [];
}

module.exports = Errors;