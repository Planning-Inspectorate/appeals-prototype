window.GOVUKPrototypeKit.documentReady(() => {
  let autocomplete = document.querySelector('.js-autocomplete')

  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: autocomplete.getAttribute('data-default-value'),
    selectElement: autocomplete
  })
})
