'use strict';

import './_jquery';

const _audio = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.media = document.getElementById('audio');

    this.ui = {
      play: 'playAudio',
      stop: 'stopAudio',
      audio: 'audio',
      percentage: '.audio__timeline_bar_percentage',
      audioTimeline: '.audio__timeline',
      currentTime: '.audio__timeline_current',
      totalTime: '.audio__timeline_total'
    };

    if (this.media) {
      this.media.preload = 'none';
      sessionStorage.setItem('valid', false);
    }
    if (this.getId(this.ui.stop)) this.getId(this.ui.stop).addEventListener('click', () => this.stopAudio());

    if (this.getId(this.ui.play))
      this.getId(this.ui.play).addEventListener('click', () => {
        this.togglePlay(sessionStorage.getItem('valid'));
      });

    if (this.getId(this.ui.audio)) this.getId(this.ui.audio).addEventListener('timeupdate', () => this.initProgressBar());
  },

  getId(id) {
    return document.getElementById(id);
  },
  getClass(className) {
    return document.querySelector(className);
  },

  togglePlay(valid) {
    if (valid === 'true') {
      if (!this.media.paused) {
        this.media.pause();
        this.getId(this.ui.play).className = 'audio__controls_btn audio__controls_btn--play';
      } else {
        this.media.play();
        this.getId(this.ui.play).className = 'audio__controls_btn audio__controls_btn--pause';
      }
    }
  },

  stopAudio() {
    this.media.pause();
    this.media.currentTime = 0;
    this.getClass(this.ui.currentTime).innerHTML = '00:00';
    this.getId(this.ui.play).className = 'audio__controls_btn audio__controls_btn--play';
  },

  calculatePercentPlayed() {
    let percentage = (this.media.currentTime / this.media.duration).toFixed(2) * 100;
    this.getClass(this.ui.percentage).style.width = `${percentage}%`;
  },

  calculateCurrentValue(currentTime) {
    const currentMinute = parseInt(currentTime / 60) % 60;
    const currentSecondsLong = currentTime % 60;
    const currentSeconds = currentSecondsLong.toFixed();
    const currentTimeFormatted = `${currentMinute < 10 ? `0${currentMinute}` : currentMinute}:${
      currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
    }`;
    return currentTimeFormatted;
  },

  initProgressBar() {
    const currentTime = this.calculateCurrentValue(this.media.currentTime),
      totalTime = this.calculateCurrentValue(this.media.duration);
    this.getClass(this.ui.currentTime).innerHTML = currentTime;
    this.getClass(this.ui.audioTimeline).addEventListener('click', e => this.seek(e));
    this.getClass(this.ui.totalTime).innerHTML = totalTime;
    this.media.onended = () => {
      this.getId(this.ui.play).className = 'audio__controls_btn audio__controls_btn--play';
      this.getClass(this.ui.percentage).style.width = 0;
      this.getClass(this.ui.currentTime).innerHTML = '00:00';
    };
    this.calculatePercentPlayed();
  },

  seek(e) {
    const percent = e.offsetX / e.target.offsetWidth;
    this.media.currentTime = percent * this.media.duration;
  }
};

export default _audio;