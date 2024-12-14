import { toast } from "react-toastify";

/**
 * Checks if a string is empty.
 */
const validLength = (str) => {
	return str?.length === 0;
};

/**
 * Validates full name.
 * Full name must have two parts, each part between 2 and 50 alphabetic characters.
 */
const validateFullName = (fullName) => {
	if (validLength(fullName)) {
		toast.error("Full name cannot be empty.");
		return false;
	}
	if (fullName.length > 50) {
		toast.error("Full name must be less than 50 characters.");
		return false;
	}
	const fullNameRegex = /^[A-Za-z]{2,}(?: [A-Za-z'’-]{2,})+$/;
	const isValid = fullNameRegex.test(fullName.trim());
	if (!isValid) {
		toast.error("Full name must contain at least two parts with only alphabetic characters.");
	}
	return isValid;
};

/**
 * Validates email address.
 * Email must be a valid format and between 5 and 100 characters.
 */
const validateEmail = (email) => {
	if (validLength(email)) {
		toast.error("Email cannot be empty.");
		return false;
	}
	if (email.length < 5 || email.length > 100) {
		toast.error("Email must be between 5 and 100 characters.");
		return false;
	}
	const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	const isValid = emailRegex.test(email.trim());
	if (!isValid) {
		toast.error("Invalid email format.");
	}
	return isValid;
};

/**
 * Validates password.
 * Password must be between 8 and 20 characters and must contain at least:
 * - One uppercase letter
 * - One lowercase letter
 * - One digit
 * - One special character (@$!%*?&#)
 */
const validatePassword = (password) => {
	if (validLength(password)) {
		toast.error("Password cannot be empty.");
		return false;
	}
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/;
	const isValid = passwordRegex.test(password);
	if (!isValid) {
		toast.error(
			"Password must be 8-20 characters and include uppercase, lowercase, a digit, and a special character."
		);
	}
	return isValid;
};

/**
 * Validates a full address.
 * The address format includes:
 * - Street number and name (e.g., "123 Main St")
 * - Optional apartment/unit/suite (e.g., "Apt 4" or "#12")
 * - City (letters and spaces)
 * - State (2-letter code, e.g., "CA", "NY")
 * - ZIP Code (5 digits, optional 4-digit extension)
 * Example: "123 Main St, Apt 4, Los Angeles, CA 90012-1234"
 */
const validateFullAddress = (address) => {
	if (validLength(address)) {
		toast.error("Address cannot be empty.");
		return false;
	}
	if (address.length < 10 || address.length > 200) {
		toast.error("Address must be between 10 and 200 characters.");
		return false;
	}
	return true;
};

const checkotp = (data) => {
	if (data?.length === 6) {
		return true;
	}
	toast.error("Otp must be 6 digit");
	return false;
};

export { validateFullName, validateEmail, validatePassword, validateFullAddress, checkotp };
