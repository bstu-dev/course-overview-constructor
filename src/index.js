import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import CourseOverveiwConstructor from './components/CourseOverviewConstructor';

ReactDOM.render(
  <CourseOverveiwConstructor />,
  document.getElementById('overview')
);

document.addEventListener('DOMContentLoaded', async () => {
  const searchString = new URLSearchParams(window.location.search);

  const course_locator = searchString.get('course_locator');
  const sessionid = searchString.get('sessionid');

  document.cookie = `sessionid=${sessionid}`;

  console.log(course_locator);

  const response = await fetch(
    `http://bolid.bstu.ru:18010/settings/details/${course_locator}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    }
  );

  console.log(response.text());

  const saveBtn = document.getElementById('save-btn');

  saveBtn.addEventListener('click', () => {
    const outputTextArea = document.getElementById('output-overview');

    console.log(CourseOverveiwConstructor.getCourseOverviewHTML());

    outputTextArea.value = renderToString(
      CourseOverveiwConstructor.getCourseOverviewHTML()
    );
  });
});
