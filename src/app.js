#!/usr/bin/env node
import 'bootstrap';
import * as yup from 'yup';
import onChange from 'on-change';
import css from './styles.scss';
import render from './render.js';

const App = () => {
  const state = {
    addingFeedsForm: {
      paths: [],
      valid: '',
      errors: [],
    },
  };
  const watchedState = onChange(state, render);

  console.log('akdbvakdjvbd');

  const schema = yup
    .string().required().url().notOneOf(state.addingFeedsForm.paths);

  const formElement = document.querySelector('.rss-form');
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = formData.get('url');
    schema.validate(data, { abortEarly: false })
      .then((path) => {
        watchedState.addingFeedsForm = {
          paths: state.paths.push(path),
          valid: 'valid',
          errorMessage: null,
        };
        // здесь будет выполняться асинхронный запрос на сервер,
      })
      .catch(({ errors }) => {
        watchedState.addingFeedsForm = {
          valid: 'invalid',
          errors,
        };
      });
  });
};

export default App;
