// Модуль определяет margin-left для второй колонки
// из раздела "активности" по самому длинному пункту из списка

export default function table() {
  // Настраиваем для каждого языка
  const langs = ['.ru', '.en']

  langs.forEach((lang) => {
    tableForLang(lang)
  })

  function tableForLang(lang) {
    // Забираем элементы
    let activitiesElement = document.querySelector(`${lang} .activities`)
    let yearElement = document.querySelector(`${lang} .year`)
    let activityElements = document.querySelectorAll(`${lang} .name`)

    // Находим самый широкий
    let widestElement = [...activityElements].reduce((previousElement, currentElement) => {
      return previousElement.offsetWidth > currentElement.offsetWidth ? previousElement : currentElement
    })

    function spaceBetween() {
      // Обнуляем старое значение
      widestElement.style.marginLeft = 0

      // Считаем свободное место на экране у самого широкого элемента
      let difference = Math.abs(activitiesElement.offsetWidth - widestElement.offsetWidth - yearElement.offsetWidth - 5)
      difference < 40 ? (difference = 40) : difference

      // Сдвигаем все пункты таблицы
      activityElements.forEach((element) => {
        element.style.marginLeft = `${difference}px`
      })
    }

    spaceBetween()

    // При ресайзе пересчитываем
    window.addEventListener('resize', spaceBetween)
  }
}
