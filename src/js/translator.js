import i18next from 'i18next';
import Backend from 'i18next-http-backend';
let language

if (localStorage.getItem('favoriteLanguage')) {
    language = localStorage.getItem('favoriteLanguage')
} else{
    language = 'es'
}
    

//va al json por la traducción
i18next.use(Backend).init({
    lng: language, // if you're using a language detector, do not define the lng option
    debug: false,
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    ns: ['translation'],
    defaultNS: 'translation'

}).then(() => updateContent())

//acá recorre las traducciones
function updateContent() {
    const htmlElement = document.querySelectorAll('[data-i18n]')

    htmlElement.forEach(element => {
        const value = element.getAttribute('data-i18n')
        element.innerHTML = i18next.t(value)
    })
}

//llamamos a la función que cambia las traducciones
window.changeLanguage = function (lng) {
    i18next.changeLanguage(lng).then(() => updateContent())
    localStorage.setItem('favoriteLanguage', lng)
}