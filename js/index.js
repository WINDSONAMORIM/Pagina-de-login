var formLogar = document.querySelector('#formLogin')
var formCadastrar = document.querySelector('#formCadastro')
var navScroll = document.querySelector('#navScroll')

document.querySelector('#buttonLogin')
  .addEventListener('click', () => {
    formLogar.style.left = "25px"
    formCadastrar.style.left = "450px"
    navScroll.style.left = "0px"
})

document.querySelector('#buttonInscreverse')
  .addEventListener('click', () => {
    formLogar.style.left = "-450px"
    formCadastrar.style.left = "25px"
    navScroll.style.left = "100px"
})