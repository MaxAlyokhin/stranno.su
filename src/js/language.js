// Модуль определяет язык из URL (?ru / ?en)
// Если в URL ничего не нашли, то определяем из navigator.language

export default function language() {
  let isRussian = undefined

  const langMarkerFromURL = document.location.search.slice(1)

  if (localStorage.language !== undefined) {
    isRussian = localStorage.language === 'true' ? true : false
  } else if (langMarkerFromURL === 'ru') {
    isRussian = true
    localStorage.language = isRussian
  } else if (langMarkerFromURL === 'en') {
    isRussian = false
    localStorage.language = isRussian
  } else {
    isRussian = 'ru' == navigator.language.slice(0, 2) ? true : false
    localStorage.language = isRussian

    // Первичный показ попапа
    setTimeout(() => {
      ruPopupElement.style.transform = 'translateY(115px)'
    }, 2000)
    setTimeout(() => {
      ruPopupElement.style.transform = 'translateY(-115px)'
    }, 7000)
    setTimeout(() => {
      enPopupElement.style.transform = 'translateY(115px)'
    }, 2000)
    setTimeout(() => {
      enPopupElement.style.transform = 'translateY(-115px)'
    }, 7000)
  }

  const ruElement = document.querySelector('.ru')
  const enElement = document.querySelector('.en')
  const ruPopupElement = document.querySelector('.ru .lang-popup')
  const enPopupElement = document.querySelector('.en .lang-popup')
  const enPopupSwitchElement = document.querySelector('.en .lang-popup__switch')
  const ruPopupSwitchElement = document.querySelector('.ru .lang-popup__switch')

  function langInit(langMarker) {
    if (langMarker) {
      enElement.style.opacity = 0

      setTimeout(() => {
        enElement.style.display = 'none'
        window.scrollTo(0, 0)
      }, 500)

      ruElement.style.display = 'block'
      setTimeout(() => {
        ruElement.style.opacity = 1
      }, 0)
    } else {
      ruElement.style.opacity = 0

      setTimeout(() => {
        ruElement.style.display = 'none'
        window.scrollTo(0, 0)
      }, 500)

      enElement.style.display = 'block'
      setTimeout(() => {
        enElement.style.opacity = 1
      }, 0)
    }
  }

  langInit(isRussian)

  // Активируем кнопки
  ruPopupSwitchElement.addEventListener('click', () => {
    langInit(false)
    localStorage.language = false

    enPopupElement.style.transform = 'translateY(-115px)'
    ruPopupElement.style.transform = 'translateY(-115px)'

    enPopupSwitchElement.innerText = `Переключиться обратно на русский.`
    setTimeout(() => {
      ruPopupSwitchElement.innerText = `Switch back to English.`
    }, 2000)
  })
  enPopupSwitchElement.addEventListener('click', () => {
    langInit(true)
    localStorage.language = true

    enPopupElement.style.transform = 'translateY(-115px)'
    ruPopupElement.style.transform = 'translateY(-115px)'

    ruPopupSwitchElement.innerText = `Switch back to English.`
    setTimeout(() => {
      enPopupSwitchElement.innerText = `Переключиться обратно на русский.`
    }, 2000)
  })

  // После первичного показа попапа (через 7 секунд) включаем прослушку мыши
  setTimeout(() => {
    window.addEventListener('mousemove', (event) => {
      if (
        event.clientY <= 80 &&
        event.clientX >= window.outerWidth * 0.5 - 300 &&
        event.clientX <= window.outerWidth * 0.5 + 300
      ) {
        enPopupElement.style.transform = 'translateY(115px)'
        ruPopupElement.style.transform = 'translateY(115px)'
      } else {
        enPopupElement.style.transform = 'translateY(-115px)'
        ruPopupElement.style.transform = 'translateY(-115px)'
      }
    })
  }, 7000)

  // При уходе со страницы прячем попап
  document.addEventListener('mouseout', (event) => {
    enPopupElement.style.transform = 'translateY(-115px)'
    ruPopupElement.style.transform = 'translateY(-115px)'
  })
}
