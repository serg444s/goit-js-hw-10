import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElement = document.querySelector('.form');
formElement.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const promise = new Promise((resolve, reject) => {
    const delay = formElement.elements.delay.value;
    const state = formElement.elements.state.value;
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise.then(onMakeSuccess).catch(onMakeError);
}

function onMakeSuccess(result) {
  iziToast.success({
    message: result,
    position: 'topRight',
  });
}

function onMakeError(error) {
  iziToast.error({
    message: error,
    position: 'topRight',
  });
}
