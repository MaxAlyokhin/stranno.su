// Метод организует показ изображений при наведении на названия проектов
// У каждой ссылки есть свой id, по которому мы сразу обращаемся к элементу

export default function images() {
  // Настраиваем для каждого языка
  const langs = ['.ru', '.en']
  let timeouts = []

  langs.forEach((lang) => {
    imagesForLang(lang)
  })

  function imagesForLang(lang) {
    // Текст, в котором все наши ссылки на проекты, по наведению на которые
    // будет срабатывать анимация
    let projectsElement = document.querySelector(`${lang} .projects`)
    let textElement = document.querySelector(`${lang} .text`)
    let containerElement = document.querySelector(`${lang} .container`)
    let soundPopupElement = document.querySelector(`${lang} .sound-popup`)

    // Маркер работы анимации
    let isAnimate = false
    // Маркер включённости звука
    let isSoundOn = false
    // Меркер первого показа попапа включения звука
    let popupIsShowed = false

    // По наведению на текст находим целевой элемент
    // Если у него есть id, значит навелись на проект
    // Если !isAnimate, значит другие анимации сейчас не идут

    // Отдельные фото в разделе с текстом
    // Наведение на элемент
    textElement.addEventListener('mouseover', function (event) {
      timeouts.push(
        setTimeout(() => {
          if (event.target.id) {
            // Находим соответствующий контейнер с фоторафиями
            let image = document.querySelector(`${lang} .images__${event.target.id} .image`)

            // Скрываем текст
            containerElement.style.opacity = 0
            // Показываем фото
            image.style.opacity = 1

            // Если это видео
            if (image.play) {
              // Если не показывали ранее попап
              if (!popupIsShowed && event.target.id != 'derive') {
                soundPopupElement.style.display = 'flex'
                soundPopupElement.style.left = `${event.pageX - 100}px`
                soundPopupElement.style.top = `${event.pageY - 100}px`

                setTimeout(() => {
                  soundPopupElement.style.opacity = 1
                }, 0)
              } else {
                image.play()
                event.target.style.cursor = 'none'
              }
            }

            if (
              isSoundOn === true &&
              (event.target.id == 'transport' || event.target.id == 'high')
            ) {
              image.muted = false
            }
          }
        }, 500)
      )
    })

    // Уход с элемента
    textElement.addEventListener('mouseout', function (event) {
      timeouts.forEach((timeout) => {
        clearTimeout(timeout)
      })
      if (event.target.id) {
        // Находим соответствующий контейнер с фоторафиями
        let image = document.querySelector(`${lang} .images__${event.target.id} .image`)

        containerElement.style.opacity = 1
        image.style.opacity = 0

        if (image.play) {
          image.pause()
          event.target.style.cursor = 'default'
        }

        if (isSoundOn === true && (event.target.id == 'transport' || event.target.id == 'high')) {
          image.muted = true
        }
      }
    })

    // Серии фото в разделе с проектами

    projectsElement.addEventListener('mouseover', function (event) {
      timeouts.push(
        setTimeout(() => {
          if (event.target.id && !isAnimate) {
            // Находим соответствующий контейнер с фоторафиями
            let galleryElement = document.querySelectorAll(
              `${lang} .images__${event.target.id} div`
            )

            // Длина анимации
            let intervalTime = 1000 * galleryElement.length

            isAnimate = true // Анимация пошла

            containerElement.style.opacity = 0

            // Блочим троттлинг на время анимации
            timeouts.push(
              setTimeout(() => {
                containerElement.style.opacity = 1

                isAnimate = false
              }, intervalTime)
            )

            // Перебираем изображения в контейнере,
            // поочерёдно показывая и скрывая
            let ms = 0

            galleryElement.forEach((image) => {
              // Показываем
              timeouts.push(
                setTimeout(() => {
                  image.style.opacity = 1
                }, ms)
              )

              // Планируем следующую итерацию
              ms += 1000

              // Скрываем
              timeouts.push(
                setTimeout(() => {
                  image.style.opacity = 0
                }, ms + 200)
              )
            })
          }
        }, 500)
      )
    })

    projectsElement.addEventListener('mouseout', function (event) {
      timeouts.forEach((timeout) => {
        clearTimeout(timeout)

        let galleryElement = document.querySelectorAll(`${lang} .images__${event.target.id} div`)
        galleryElement.forEach((image) => {
          image.style.opacity = 0
        })
        containerElement.style.opacity = 1
        isAnimate = false
      })
    })

    soundPopupElement.addEventListener('click', function (event) {
      popupIsShowed = true

      if (event.target.id == 'on') {
        isSoundOn = true
      }
      if (event.target.id == 'off') {
        isSoundOn = false
      }

      if (event.target.id) {
        this.style.opacity = 0
        setTimeout(() => {
          this.style.display = 'none'
        }, 500)
      }
    })
  }
}
