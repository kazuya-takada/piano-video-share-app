import { DeepReadonly } from '@nuxtjs/composition-api'

export interface FlashMessage {
  display: boolean
  message: string
}

export interface UseFlashMessage {
  flashMessage: DeepReadonly<FlashMessage>
  displayFlashMessage: (message: string) => void
}
