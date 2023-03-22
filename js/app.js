const form = document.querySelector('#formulario');
const result = document.querySelector('#resultado');

window.onload = () => {
  form.addEventListener('submit', validateForm);
}

function validateForm(e) {
  e.preventDefault();

  const searchText = document.querySelector('#termino').value;

  if(searchText === '') {
    showAlert("You should type a text to search some image");
    return
  }

}

function showAlert(message) {
  const alertExist = document.querySelector('.bg-red-100');
  if(!alertExist) {

    const alert = document.createElement('P');
    alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
    alert.textContent = message;
    form.appendChild(alert);
    setTimeout(() => {
      alert.remove();
    },1500)
  }
}