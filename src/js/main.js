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
    })
    .then(() => language()) // Настраиваем язык
    .then(() => table()) // Настраиваем таблицу внизу
    .then(() => document.querySelector('body').style.opacity = 1) // Показываем контент

  // Инициализируем "галерею" только на больших экранах
  window.innerWidth > 1023 ? images() : false

  const players = Array.from(document.querySelectorAll('.player')).map(
    (player) =>
      new Plyr(player, {
        hideControls: false,
      })
  )
})
