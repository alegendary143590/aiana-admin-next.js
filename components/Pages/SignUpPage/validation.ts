export function validateForm(formState) {
  if (formState.first_name.trim() === "") {
    return "First name is required"
  }
  if (formState.last_name.trim() === "") {
    return "Last name is required"
  }
  if (formState.email.trim() === "") {
    return "Email is required"
  }
  if (formState.password !== formState.confirm_password) {
    return "Passwords do not match"
  }
  if (formState.password.length < 8) {
    return "Password must be at least 8 characters"
  }

  return "" // Return an empty string if all validations pass
}
