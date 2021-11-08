import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import CourseOverveiwConstructor from './components/CourseOverviewConstructor';

ReactDOM.render(
  <CourseOverveiwConstructor />,
  document.getElementById('overview')
);

document.addEventListener('DOMContentLoaded', () => {
  const saveBtn = document.getElementById('save-btn');

  saveBtn.addEventListener('click', () => {
    const outputTextArea = document.getElementById('output-overview');

    console.log(CourseOverveiwConstructor.getCourseOverviewHTML());

    outputTextArea.value = renderToString(
      CourseOverveiwConstructor.getCourseOverviewHTML()
    );
  });
});
