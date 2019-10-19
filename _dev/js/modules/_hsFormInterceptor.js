import axios from 'axios';

const _hsFormInterceptor = {
    init() {
      this.cacheDOM();
    },

    cacheDOM() {
      this.forms = [];
      this.foundForm = false;

      this.bindEvents();
    },

    bindEvents() {
      // get forms data from API only if user hasn't requested it yet
      if (!sessionStorage.getItem('hs_forms_data')) this.getFormsData();

      // search for forms created through API
      this.searchForm();

      // search form forms until find, at least, one
      const interval = setInterval(() => {
        if (!this.foundForm) this.searchForm();
        else clearInterval(interval);
      }, 1000);
    },

    getFormsData() {
      axios
        .get('https://grader-mw.herokuapp.com/api/forms')
        .then(res => {
          const { data } = res;

          sessionStorage.setItem('hs_forms_data', JSON.stringify(data));
        })
        .catch(err => {
          // eslint-disable-next-line
          console.error(err);
        });
    },

    appendDataLayer(formElm) {
      const forms = JSON.parse(sessionStorage.getItem('hs_forms_data')),
        formStorage = forms[formElm.dataset.formId],
        formName = formStorage && formStorage.name ? formStorage.name : '',
        formStage = formStorage && formStorage.stage ? formStorage.stage.toUpperCase() : '';

      // append to dataLayer a submission tag
      /* eslint-disable */
      dataLayer.push({
        hs_form_id: formElm.dataset.formId !== '' ? formElm.dataset.formId : form.dataset.id.replace('hsForm_', ''),
        hs_form_name: formName,
        hs_funnel_stage: formStage,
        event: 'hs_form_submit'
      });
      /* eslint-enable */
    },

    searchForm() {
      if (document.querySelectorAll('form').length > 0) {
        for (const form of document.querySelectorAll('form')) {
          this.forms.push(form);
        }

        this.foundForm = true;

        this.submitListener();
      }
    },

    submitListener() {
      for (const form of this.forms) {
        form.querySelector('[type="submit"]').addEventListener('click', event => {
          this.appendDataLayer(form);
        });
      }
    }};

export default _hsFormInterceptor;
