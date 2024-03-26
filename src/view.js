import onChange from 'on-change';
import postsRender from './postsRender';
import feedsRender from './feedsRender';
import modalRender from './modalRender';

const clear = (elements) => {
  const { input, feedback, button } = elements;
  feedback.classList.remove('text-danger');
  feedback.classList.remove('text-warning');
  feedback.classList.remove('text-success');
  input.classList.remove('is-invalid');

  input.disabled = false;
  button.disabled = false;
};

const handleError = (errorMessage, elements, i18next) => {
  const { feedback } = elements;
  feedback.textContent = i18next.t(`errors.${errorMessage}`);
};

const handleLoading = (state, elements, i18next) => {
  const {
    input, feedback, form, button,
  } = elements;
  const { status } = state.loadingProcess;
  clear(elements);

  switch (status) {
    case 'loading': {
      feedback.classList.add('text-warning');
      feedback.textContent = i18next.t(`status.${status}`);
      input.disabled = true;
      button.disabled = true;
      break;
    }
    case 'success': {
      feedback.classList.add('text-success');
      feedback.textContent = i18next.t(`status.${status}`);
      form.reset();
      input.focus();
      break;
    }
    case 'failed': {
      feedback.classList.add('text-danger');
      input.classList.add('is-invalid');
      feedback.textContent = i18next.t(`errors.${[state.form.error]}`);
      break;
    }
    default:
      break;
  }
};

const renderVisitedPosts = (idVisitedPosts) => {
  idVisitedPosts.forEach((id) => {
    const link = document.querySelector(`a[data-id="${id}"]`);
    link.classList.remove('fw-bold');
    link.classList.add('fw-normal', 'link-secondary');
  });
};

const watch = (state, elements, i18nextInstance) => onChange(state, (path, value) => {
  switch (path) {
    case 'loadingProcess.status': {
      handleLoading(state, elements, i18nextInstance);
      break;
    }
    case 'form.error': {
      handleError(value, elements, i18nextInstance);
      break;
    }
    case 'posts': {
      postsRender(state, value, elements, i18nextInstance);
      break;
    }
    case 'feeds': {
      feedsRender(value, elements, i18nextInstance);
      break;
    }
    case 'idVisitedPosts': {
      renderVisitedPosts(value);
      break;
    }
    case 'idCurrentPost': {
      modalRender(state, value);
      break;
    }
    default:
      break;
  }
});

export default watch;
