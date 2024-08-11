import notificationSound from '/public/level-up-191997.mp3'

// Fungsi untuk memformat waktu dalam format MM:SS
export const formatTime = (time) => {
  const format = (value) => (value < 10 ? `0${value}` : value)
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return `${format(minutes)}:${format(seconds)}`
}

// Fungsi untuk memutar suara notifikasi
export const playNotificationSound = () => {
  const audio = new Audio(notificationSound)
  audio.play().catch((error) => {
    console.error('Gagal memutar suara notifikasi:', error)
  })
}
