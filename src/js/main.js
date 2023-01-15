import table from './table.js'
import images from './images.js'
import language from './language.js'

window.addEventListener('DOMContentLoaded', () => {
  fetch('./data/cv.json')
    .then(data => data.json())
    .then((activities) => {
      let cvEnglish = ``
      let cvRussian = ``

      activities.forEach(activity => {
        cvEnglish += `
          <div class="activity">
            <span class="year">${activity.year}</span>
            <span class="name">
              <a
                href="${activity.url}"
                target="_blank"
                rel="noopener noreferrer"
                >${activity.description.en}
              </a>
            </span>
          </div>
        `
      })

      activities.forEach(activity => {
        cvRussian += `
          <div class="activity">
            <span class="year">${activity.year}</span>
            <span class="name">
              <a
                href="${activity.url}"
                target="_blank"
                rel="noopener noreferrer"
                >${activity.description.ru}
              </a>
            </span>
          </div>
        `
      })

      document.querySelector('.en .container .activities').innerHTML = `
        <p>Activities:</p>
        ${cvEnglish}
      `

      document.querySelector('.ru .container .activities').innerHTML = `
        <p>Активности:</p>
        ${cvRussian}
      `

      language() // Настраиваем язык
      table() // Настраиваем таблицу внизу
    })

  // Инициализируем "галерею" только на больших экранах
  window.innerWidth > 1023 ? images() : false

  const players = Array.from(document.querySelectorAll('.player')).map(
    (player) =>
      new Plyr(player, {
        hideControls: false,
      })
  )
})

window.addEventListener('load', () => {
  // Грузим медиа
  document.querySelectorAll('.image').forEach((element) => {
    element.style.backgroundImage = element.dataset.style
  })

  document.querySelectorAll('video').forEach((element) => {
    element.src = element.dataset.src
  })

  // Показываем текст
  document.querySelector('.en').style.opacity = 1
  document.querySelector('.ru').style.opacity = 1
  document.querySelector('.loader').style.opacity = 0
  setTimeout(() => {
    document.querySelector('.loader').style.display = 'none'
  }, 500)
})
