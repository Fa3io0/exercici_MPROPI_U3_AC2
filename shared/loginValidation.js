export const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
export const STRONG_PASSWORD_MESSAGE = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
export const MISSING_FIELDS_MESSAGE = "Email and password are required.";

export function isStrongPassword(password) {
  return STRONG_PASSWORD_REGEX.test(password);
}

export function validateLoginInput(email, password) {
  if (!email || !password) {
    return MISSING_FIELDS_MESSAGE;
  }

  if (!isStrongPassword(password)) {
    return STRONG_PASSWORD_MESSAGE;
  }

  return null;
}