import table from './table.js'
import images from './images.js'
import language from './language.js'

window.addEventListener('DOMContentLoaded', () => {
  // Показываем контент
  document.querySelector('body').style.opacity = 1

  language() // Настраиваем язык

  table() // Настраиваем таблицу внизу

  // Инициализируем "галерею" только на больших экранах
  window.innerWidth > 1023 ? images() : false

  const players = Array.from(document.querySelectorAll('.player')).map(
    (player) =>
      new Plyr(player, {
        hideControls: false,
      })
  )
})
