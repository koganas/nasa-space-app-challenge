const _videoPlayer = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.btnVideo = document.querySelectorAll('.btn__video');
    this.videoContainer = document.querySelector('.yt-player');
    this.videoComponent = document.querySelector('.videos__section');
    document.addEventListener('DOMContentLoaded', () => this.setVideo());
    this.createInstance();
  },

  videoThumb(id) {
    return `<img src="https://i.ytimg.com/vi/${id}/maxresdefault.jpg"><div class="play"></div>`;
  },

  videoIframe(e, id) {
    var iframe = document.createElement('iframe');
    var embed = 'https://www.youtube.com/embed/ID?autoplay=1&color=white&rel=0&modestbranding=1&iv_load_policy=3';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '1');
    iframe.setAttribute('allow', 'autoplay');
    if (id) {
      iframe.setAttribute('src', embed.replace('ID', id));
      e.parentNode.replaceChild(iframe, e);
    } else {
      iframe.setAttribute('src', embed.replace('ID', this.dataset.id));
      this.parentNode.replaceChild(iframe, this);
    }
  },

  setVideo() {
    var div,
        n,
        v = document.getElementsByClassName('yt-player');
    for (n = 0; n < v.length; n++) {
      div = document.createElement('div');
      div.setAttribute('data-id', v[n].dataset.id);
      div.innerHTML = this.videoThumb(v[n].dataset.id);
      div.onclick = this.videoIframe;
      v[n].appendChild(div);
    }
  },

  playVideo(id) {
    var div,
      n,
      v = document.getElementsByClassName('yt-player'),
      oldIframe = this.videoContainer.getElementsByTagName('iframe')[0];
    for (n = 0; n < v.length; n++) {
      var embed = 'https://www.youtube.com/embed/ID?autoplay=1&color=white&rel=0&modestbranding=1&iv_load_policy=3',
        oldDiv = v[n].getElementsByTagName('div')[0];
      if (oldIframe) oldIframe.setAttribute('src', embed.replace('ID', id));
      else this.videoIframe(oldDiv, id);
    }
  },

  nowPlaying(e) {
    var status = e.querySelector('.status'),
        nowPlaying = document.createElement('div');
    this.videoComponent.querySelectorAll('.status__now').forEach(e => e.parentNode.removeChild(e));
    nowPlaying.className = 'status__now';
    nowPlaying.innerHTML = 'Now playing';
    status.appendChild(nowPlaying);
  },

  createInstance() {
    this.btnVideo.forEach(item => {
      item.addEventListener(
        'click',
        e => {
          var idVideo = e.target.getAttribute('data-id');
          this.videoComponent.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
          e.target.parentNode.classList.add('active');
          this.videoContainer.setAttribute('data-id', idVideo);
          this.nowPlaying(item);
          this.playVideo(idVideo);
        },
        false
      );
    });
  }
};

export default _videoPlayer;