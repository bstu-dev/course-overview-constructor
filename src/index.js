import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import CourseOverveiwConstructor from './components/CourseOverviewConstructor';



document.addEventListener('DOMContentLoaded', () => {
  const searchString = new URLSearchParams(window.location.search);

  const course_locator = searchString.get('course_locator');
  const sessionid = searchString.get('sessionid');

  document.cookie = `sessionid=${sessionid}`;

  console.log(course_locator.replace(/\s/g, '+'));

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

    console.log(CourseOverveiwConstructor.getCourseOverviewHTML());

    outputTextArea.value = renderToString(
      CourseOverveiwConstructor.getCourseOverviewHTML()
    );
  });
});
