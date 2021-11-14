import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import CourseOverveiwConstructor from './components/CourseOverviewConstructor';

ReactDOM.render(
  <CourseOverveiwConstructor />,
  document.getElementById('overview')
);

document.addEventListener('DOMContentLoaded', () => {
  const searchString = new URLSearchParams(window.location.search);

  const course_locator = searchString.get('course_locator');

  fetch(`/settings/details/${course_locator}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((data) => {
      console.log(data.json(), 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    })
    .catch((err) => {
      console.log(err);
    });

  const saveBtn = document.getElementById('save-btn');

  saveBtn.addEventListener('click', () => {
    const outputTextArea = document.getElementById('output-overview');

    console.log(CourseOverveiwConstructor.getCourseOverviewHTML());

    outputTextArea.value = renderToString(
      CourseOverveiwConstructor.getCourseOverviewHTML()
    );
  });
});
