import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const myInput = document.querySelector('#datetime-picker');

const refs = {
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
// const btnStart = document.querySelector('[data-start]');
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startTime = Date.now();
    console.log(startTime);
    if (selectedDates[0] > startTime) {
      userSelectedDate = selectedDates[0];
      refs.btnStart.removeAttribute('disabled');
      console.log(userSelectedDate.getTime());

      const deltaTime = userSelectedDate.getTime() - startTime;
      console.log(deltaTime);

      const result = convertMs(deltaTime);
      console.log(result);

      refs.days = result.days;
      refs.hours = result.hours;
      refs.minutes = result.minutes;
      refs.seconds = result.seconds;
    } else {
      refs.btnStart.setAttribute('disabled', 'true');
      window.alert('Please choose a date in the future');
    }
  },
};

const fp = flatpickr(myInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
