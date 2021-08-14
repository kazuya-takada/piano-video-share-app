import { DeepReadonly } from '@nuxtjs/composition-api'

export interface FlashMessage {
  display: boolean
}

export interface UseFlashMessage {
  flashMessage: DeepReadonly<FlashMessage>
  displayFlashMessage: () => void
}
