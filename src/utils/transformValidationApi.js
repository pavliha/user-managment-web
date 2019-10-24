const transformValidationApi = errors => {
  console.error(errors)

  if (errors?.error?.status === 500) {
    return { non_field_error: 'Внутренння ошибка сервера!' }
  }

  if (errors?.error?.message) {
    return { non_field_error: 'Неизвестная ошибка!' }
  }

  if (errors?.message) {
    return { non_field_error: errors.message }
  }

  const isNetworkError = errors?.message === 'Network Error'
  const isNotFoundError = errors?.response?.status === 404

  if (isNetworkError || isNotFoundError) {
    return { non_field_error: 'Something wrong with server response' }
  }
  const objectsArray = errors.map(error => ({ [error.field]: error.message }))

  return objectsArray.reduce((result, current) => ({ ...result, ...current }))
}
export default transformValidationApi
