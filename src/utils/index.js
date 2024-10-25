import notificationSound from '/public/level-up-191997.mp3'

export const formatTime = (time) => {
  const format = (value) => (value < 10 ? `0${value}` : value)
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return `${format(minutes)}:${format(seconds)}`
}

export const playNotificationSound = () => {
  const audio = new Audio(notificationSound)
  audio.play().catch((error) => {
    console.error('Gagal memutar suara notifikasi:', error)
  })
}
