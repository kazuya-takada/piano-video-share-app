import { DeepReadonly } from '@nuxtjs/composition-api'

export interface ErrorMessages {
  backendErrors: string[]
}

export interface UseErrorMessage {
  errorMessages: DeepReadonly<ErrorMessages>
  setErrorMessages: (errors: string[]) => void
  unsetErrorMessages: () => void
}
