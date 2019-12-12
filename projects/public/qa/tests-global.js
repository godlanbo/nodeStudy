suite('Global Tests', () => {
  test('page has vaild title', () => {
    assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'TODO')
  })
})