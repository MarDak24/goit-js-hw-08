import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';
// Отримайте посилання на DOM-елемент iframe плеєра
const playerIframe = document.getElementById('vimeo-player');

// Отримайте поточний час відтворення з локального сховища
const currentTimeFromStorage = localStorage.getItem('videoplayer-current-time');

// Створіть новий плеєр з використанням iframe
const player = new Vimeo.Player(playerIframe);

// Якщо є збережений час відтворення, встановіть його на плеєрі
if (currentTimeFromStorage) {
  player.setCurrentTime(parseFloat(currentTimeFromStorage));
}

// Оновлюйте час відтворення в локальному сховищі з інтервалом не частіше, ніж раз на секунду
player.on(
  'timeupdate',
  throttle(function (event) {
    const currentTime = event.seconds.toFixed(2);
    localStorage.setItem('videoplayer-current-time', currentTime);
  }, 1000)
);
