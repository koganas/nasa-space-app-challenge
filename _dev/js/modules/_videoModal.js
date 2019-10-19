import _modal from '../modules/_modal';

const _videoModal = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    window.done = false;
    this.player;
    this.modalVideo = document.querySelector('.modal__video');
    this.btnModalVideo = document.querySelectorAll('[data-video]');
    this.nextVideo = document.querySelector('#nextVideo');
    this.prevVideo = document.querySelector('#prevVideo');
    this.btnModalClose = document.querySelector('#closeVidModal');
    this.embedScript();
    this.bindEvents();
  },

  bindEvents() {
    let prevBtn;
    let nextBtn;

    if (this.btnModalVideo) {
      this.btnModalVideo.forEach(e=>{
        let videoId = e.getAttribute('data-video');
        e.addEventListener(
        'click',
        e => {
          e.preventDefault();
          this.cardLink = document.querySelector('[data-video="'+videoId+'"]');
          prevBtn = this.cardLink.parentNode.previousElementSibling;
          nextBtn = this.cardLink.parentNode.nextElementSibling;
          this.setNavigation(prevBtn, nextBtn);
          
          if (this.modalVideo.classList.contains('modal--hide')) {
            _modal.showModal(this.modalVideo);
            if(!window.done)
              this.onYouTubeIframeAPIReady(videoId)
            else 
              this.loadVideo(videoId);
          } else {
            _modal.hideModal(this.modalVideo);
            this.stopVideo(); 
          }
        },
          false
        );
      });
    }

    if ( this.btnModalClose ) {
      this.btnModalClose.addEventListener(
        'click',
        () => {
          this.stopVideo();
          var thisModal = this.btnModalClose.parentNode.parentNode.parentNode;
          _modal.hideModal(thisModal);
        },
        false
      );
    }

    if (this.nextVideo) {
      this.nextVideo.addEventListener(
        'click',
        e => {
          if (nextBtn) {
            const idVid = nextBtn.querySelector('[data-video]').dataset.video;
            this.loadVideo(idVid);
            this.cardLink = document.querySelector('[data-video="'+idVid+'"]');
            prevBtn = this.cardLink.parentNode.previousElementSibling;
            nextBtn = this.cardLink.parentNode.nextElementSibling;
            this.setNavigation(prevBtn, nextBtn);
          }
        },
          false
      );
    }

    if (this.prevVideo) {
      this.prevVideo.addEventListener(
        'click',
        e => {
          if (prevBtn) {
            const idVid = prevBtn.querySelector('[data-video]').dataset.video;
            this.loadVideo(idVid);
            this.cardLink = document.querySelector('[data-video="'+idVid+'"]');
            prevBtn = this.cardLink.parentNode.previousElementSibling;
            nextBtn = this.cardLink.parentNode.nextElementSibling;
            this.setNavigation(prevBtn, nextBtn);
          }
        },
          false
      );
    }

    // Modal outside click
    if (this.modalVideo) {
      document.addEventListener(
        'click',
        e => {
          if (!this.modalVideo.classList.contains('modal--hide') && !e.target.closest('.modal__content')) {
            _modal.hideModal(this.modalVideo);
            this.stopVideo();
          }
        },
        false
      );
    }

  },

  setNavigation(prevBtn, nextBtn) {
    if (!prevBtn || prevBtn.classList.contains('grid'))
      this.prevVideo.style.display = 'none';
    else
      this.prevVideo.style.display = 'block';

    if (!nextBtn)
      this.nextVideo.style.display = 'none';
    else
      this.nextVideo.style.display = 'block';
  },

  embedScript() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },

  onYouTubeIframeAPIReady(id) {
    this.player = new YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: id,
      events: {
        'onReady': this.onPlayerReady,
        'onStateChange': this.onPlayerStateChange
      }
    });
  },

  onPlayerReady(event) {
    event.target.playVideo();
  },

  onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !window.done) {
      setTimeout(event.target.stopVideo, 6000);
      window.done = true;
    }
  },

  stopVideo() {
    this.player.stopVideo();
  },

  loadVideo(vid) {
    this.player.loadVideoById(vid);
  }

};

export default _videoModal;