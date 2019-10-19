const loadMoreContainers = document.querySelectorAll('.js--load-more');

function createHTML(htmlStr) {
  let frag = document.createDocumentFragment();
  let temp = document.createElement('div');

  temp.innerHTML = htmlStr;

  while (temp.firstChild) {
    frag.appendChild(temp.firstChild);
  }

  return frag;
}

if (loadMoreContainers !== null) {
  loadMoreContainers.forEach(container => {
    const ajaxReq = new XMLHttpRequest();
    const loadMoreButton = container.querySelector('.js--load-more-button');
    const loadMoreButtonDefaultText = loadMoreButton.innerHTML;

    let PAGE = parseInt(loadMoreButton.dataset.page);
    const MAX_NUM_PAGES = parseInt(loadMoreButton.dataset.maxPages);
    const LOADING_TEXT = loadMoreButton.dataset.loadingText || 'Loading...';
    const AJAX_URL = loadMoreButton.dataset.ajaxUrl;
    const AJAX_ACTION = loadMoreButton.dataset.ajaxAction;
    const CAT_ID = parseInt(loadMoreButton.dataset.category);

    ajaxReq.onload = data => {
      let posts = data.target.response;

      loadMoreButton.disabled = false;
      loadMoreButton.innerHTML = loadMoreButtonDefaultText;

      if (ajaxReq.status === 200 && posts) {
        loadMoreButton.setAttribute('data-page', PAGE + 1);

        if (PAGE + 1 >= MAX_NUM_PAGES) {
          loadMoreButton.style.display = 'none';
        }

        let lastArticle = container.querySelectorAll('.card__wrapper');
        lastArticle = lastArticle[lastArticle.length - 1];
        lastArticle.parentNode.insertBefore(createHTML(posts), lastArticle.nextSibling);
      }
    };

    loadMoreButton.addEventListener('click', e => {
      e.preventDefault();

      PAGE = parseInt(loadMoreButton.dataset.page);

      loadMoreButton.disabled = true;
      loadMoreButton.innerHTML = LOADING_TEXT;

      ajaxReq.open('POST', AJAX_URL, true);
      ajaxReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
      ajaxReq.send(`action=${AJAX_ACTION}&page=${PAGE}&cat=${CAT_ID}`);
    });
  });
}