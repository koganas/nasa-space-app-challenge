var btnVideo = document.querySelectorAll('.btn__video'),
  videoContainer = document.querySelector('.whats__stories_video'),
  playBtn = document.querySelector('.whats__stories_video--play'),
  timeline = document.querySelectorAll('.whats__stories_timeline li'),
  prevBtn = document.getElementById('prevVid'),
  nextBtn = document.getElementById('nextVid'),
  video = document.getElementById('video');

video.preload = 'none';

videoContainer.addEventListener('click', function() {
  if (!video.paused) {
    video.pause();
    playBtn.className = 'whats__stories_video--play';
  } else {
    video.play();
    playBtn.classList.add('ps');
  }
});

timeline.forEach(function(li) {
  li.addEventListener('click', function(e) {
    let videoid = e.target.getAttribute('data-video');
    video.setAttribute('src', videoid);
    video.play();
    timeline.forEach(function(li) {
      li.classList.remove('active');
    });
    e.target.classList.add('active');
    playBtn.classList.add('ps');
  });
});

function playNext() {
  let active = document.querySelector('.active');
  if (active.nextElementSibling == null) {
    return false;
  }
  active.classList.remove('active');
  active.nextElementSibling.classList.add('active');
  let videoid = active.nextElementSibling.getAttribute('data-video');
  video.setAttribute('src', videoid);
  video.play();
  playBtn.classList.add('ps');
}
video.addEventListener('ended', playNext, false);
nextBtn.addEventListener('click', playNext, false);

prevBtn.addEventListener('click', function() {
  let active = document.querySelector('.active');
  if (active.previousElementSibling == null) {
    return false;
  }
  active.classList.remove('active');
  active.previousElementSibling.classList.add('active');
  let videoid = active.previousElementSibling.getAttribute('data-video');
  video.setAttribute('src', videoid);
  video.play();
  playBtn.classList.add('ps');
});