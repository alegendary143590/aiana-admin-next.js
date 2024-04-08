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
  if (formState.language.trim() === "") {
    return "Language is required"
  }
  if (formState.com_name.trim() === "") {
    return "Company name is required"
  }
  if (formState.com_vat.trim() === "") {
    return "VAT is required"
  }
  if (formState.com_street.trim() === "") {
    return "Street is required"
  }
  if (formState.com_city.trim() === "") {
    return "City is required"
  }
  if (formState.com_country.trim() === "") {
    return "Country is required"
  }
  if (formState.password !== formState.confirm_password) {
    return "Passwords do not match"
  }
  if (formState.password.length < 8) {
    return "Password must be at least 8 characters"
  }

  return "" // Return an empty string if all validations pass
}
