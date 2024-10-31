function containsUppercase(str) {
    return /[A-Z]/.test(str);
}

function containsLowercase(str) {
    return /[a-z]/.test(str);
}

function containsDigit(str) {
    return /\d/.test(str);
}

function containsSpecialCharacter(str) {
    return /[^\w\d]/.test(str);
}
function extractMobileNumber(inputString) {
    const regex = /\b\d{10}\b/g;
    const matches = inputString.match(regex);
    if (matches && matches.length > 0) {
        return true;
    } else {
        return false;
    }
}

export { containsUppercase, containsLowercase, containsDigit, containsSpecialCharacter, extractMobileNumber };