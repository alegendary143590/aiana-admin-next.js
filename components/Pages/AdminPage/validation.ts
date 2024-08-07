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

  return "" // Return an empty string if all validations pass
}