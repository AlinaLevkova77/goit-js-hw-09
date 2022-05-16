import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    dataDays: document.querySelector('span[data-days]'),
    dataHours: document.querySelector('span[data-hours]'),
    dataMinutes: document.querySelector('span[data-minutes]'),
    dataSeconds: document.querySelector('span[data-seconds]'),
}

let deadline;

refs.startBtn.addEventListener('click', () => {
   timer.start()
});



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (Date.now() > selectedDates[0].getTime()) {
       Notify.failure("Please choose a date in the future")
        refs.startBtn.disabled = true;
    } else {
            refs.startBtn.disabled = false;
            deadline = selectedDates[0];
    }
 
  },
};
 flatpickr("input#datetime-picker", options);


class Timer {
    constructor({onTick}) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
    }
    start() {
    if (this.isActive) {
        return;
    }
        const startTime = deadline.getTime();
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const countDown = startTime - currentTime;
            console.log(countDown)
            const time = this.convertMs(countDown);
            
        if (countDown <= 0) {
            clearInterval(this.intervalId);
            this.isActive = false;
            return;
        }
            this.onTick(time)
        }, 1000)
}
convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.pad(Math.floor(ms / day));
  // Remaining hours
  const hours = this.pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
    };
    
  pad(value) {
    return String(value).padStart(2, '0');
}
}

const timer = new Timer({
    onTick: countdownTimer,
});

 function countdownTimer({days, hours, minutes, seconds}) {
    refs.dataDays.textContent = `${days}`;
    refs.dataHours.textContent = `${hours}`;
    refs.dataMinutes.textContent = `${minutes}`;
    refs.dataSeconds.textContent = `${seconds}`;
 }


