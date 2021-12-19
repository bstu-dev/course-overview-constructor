import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import CourseOverveiwConstructor from './components/CourseOverviewConstructor';

let today = new Date();
let expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000);

function setCookie(name, value) {
  document.cookie =
    name + '=' + String(value) + '; path=/; expires=' + expiry.toGMTString();
}

document.addEventListener('DOMContentLoaded', () => {
  const searchString = new URLSearchParams(window.location.search);

  const course_locator = searchString.get('course_locator');
  const csrfToken = searchString.get('csrf_token');

  setCookie('sessionid', searchString.get('sessionid'));

  let courseData = {};

  fetch(
    `http://bolid.bstu.ru:18010/settings/details/${course_locator.replace(
      /\s/g,
      '+'
    )}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    }
  )
    .then((data) => {
      data.json().then((value) => {
        const textField = document.getElementById('example-overview');

        courseData = value;

        textField.value = value.overview;

        ReactDOM.render(
          <CourseOverveiwConstructor overview={value.overview} />,
          document.getElementById('overview')
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });

  const saveBtn = document.getElementById('save-btn');

  saveBtn.addEventListener('click', () => {
    const outputTextArea = document.getElementById('output-overview');

    courseData.overview = renderToString(
      CourseOverveiwConstructor.getCourseOverviewHTML()
    );

    fetch(
      `http://bolid.bstu.ru:18010/settings/details/${course_locator.replace(
        /\s/g,
        '+'
      )}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRFToken': csrfToken,
          'X-CSRF-TOKEN': csrfToken,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(courseData),
      }
    )
      .then((data) => {
        if (data.statusText.includes('Error')) {
          alert('Данные не сохранены. Ошибка сохранения!');
        } else {
          alert('Данные сохранены успешно!');
        }
      })
      .catch(() => {
        alert('Данные не сохранены. Ошибка сохранения!');
      });

    outputTextArea.value = renderToString(
      CourseOverveiwConstructor.getCourseOverviewHTML()
    );
  });
});
