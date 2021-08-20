import { reactive, readonly } from '@nuxtjs/composition-api'
import { ErrorMessages, UseErrorMessage } from '@/store/error/errorTypes'

const mockBackendErrors: string[] = []

const errorMessages = reactive<ErrorMessages>({
  backendErrors: mockBackendErrors,
})

const setErrorMessages = (errors: string[]) => {
  errorMessages.backendErrors = errors
}

const unsetErrorMessages = () => {
  errorMessages.backendErrors = []
}

const useError: UseErrorMessage = {
  errorMessages: readonly(errorMessages),
  setErrorMessages,
  unsetErrorMessages,
}

export default useError