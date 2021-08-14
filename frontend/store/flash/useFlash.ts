import { reactive, readonly } from '@nuxtjs/composition-api'
import { FlashMessage, UseFlashMessage } from '@/store/flash/flashTypes'

const flashMessage = reactive<FlashMessage>({
  display: false,
})

const displayFlashMessage = () => {
  flashMessage.display = true
  setTimeout(() => {
    flashMessage.display = false
  }, 3000)
}

const useFlash: UseFlashMessage = {
  flashMessage: readonly(flashMessage),
  displayFlashMessage,
}

export default useFlash
