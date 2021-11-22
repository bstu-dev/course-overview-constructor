import React, { useState, useEffect } from 'react';

function deepMerge(...args) {
  let target = {};

  const merger = (obj) => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          target[prop] = deepMerge(target[prop], obj[prop]);
        } else {
          target[prop] = obj[prop];
        }
      }
    }
  };

  for (let i = 0; i < args.length; i++) {
    merger(args[i]);
  }

  return target;
}

function getOverviewObjectFromString(overviewHTML) {
  const wrapper = document.createElement('div');

  wrapper.insertAdjacentHTML('afterbegin', overviewHTML);

  const overviewContent = {};

  const language = wrapper.getElementsByClassName('course-language');

  overviewContent.language = language[0].innerHTML;

  const modules = wrapper.getElementsByClassName('modules');

  overviewContent.modules = Number(modules[0]?.innerHTML || 0);

  const lections = wrapper.getElementsByClassName('lections');

  overviewContent.lections = Number(lections[0]?.innerHTML || 0);

  const practicals = wrapper.getElementsByClassName('practicals');

  overviewContent.practicals = Number(practicals[0]?.innerHTML || 0);

  const labs = wrapper.getElementsByClassName('labs');

  overviewContent.labs = Number(labs[0]?.innerHTML || 0);

  const tests = wrapper.getElementsByClassName('tests');

  overviewContent.tests = Number(tests[0]?.innerHTML || 0);

  const aboutSection = Array.prototype.slice
    .call(
      wrapper.getElementsByClassName('about') &&
        wrapper.getElementsByClassName('about').length
        ? wrapper.getElementsByClassName('about')[0].getElementsByTagName('p')
        : []
    )
    .filter(
      (element) =>
        String(element.innerHTML).trim() !== '' &&
        String(element.innerHTML).trim() !== '\n'
    )
    .map((element, index) => {
      return {
        id: index,
        text: element.innerHTML,
      };
    });

  overviewContent.aboutSection = aboutSection;

  const competenciesSection = Array.prototype.slice
    .call(
      wrapper.getElementsByClassName('competencies') &&
        wrapper.getElementsByClassName('competencies').length
        ? wrapper
            .getElementsByClassName('competencies')[0]
            .getElementsByTagName('p')
        : []
    )
    .filter(
      (element) =>
        String(element.innerHTML).trim() !== '' &&
        String(element.innerHTML).trim() !== '\n'
    )
    .map((element, index) => {
      return {
        id: index,
        text: element.innerHTML,
      };
    });

  overviewContent.competenciesSection = competenciesSection;

  const resultsSection = Array.prototype.slice
    .call(
      wrapper.getElementsByClassName('results') &&
        wrapper.getElementsByClassName('results').length
        ? wrapper.getElementsByClassName('results')[0].getElementsByTagName('p')
        : []
    )
    .filter(
      (element) =>
        String(element.innerHTML).trim() !== '' &&
        String(element.innerHTML).trim() !== '\n'
    )
    .map((element, index) => {
      return {
        id: index,
        text: element.innerHTML,
      };
    });

  overviewContent.resultsSection = resultsSection;

  const durationSection = Array.prototype.slice
    .call(
      wrapper.getElementsByClassName('duration') &&
        wrapper.getElementsByClassName('duration').length
        ? wrapper
            .getElementsByClassName('duration')[0]
            .getElementsByTagName('p')
        : []
    )
    .filter(
      (element) =>
        String(element.innerHTML).trim() !== '' &&
        String(element.innerHTML).trim() !== '\n'
    )
    .map((element, index) => {
      return {
        id: index,
        text: element.innerHTML,
      };
    });

  overviewContent.durationSection = durationSection;

  const complexitySection = Array.prototype.slice
    .call(
      wrapper.getElementsByClassName('complexity') &&
        wrapper.getElementsByClassName('complexity').length
        ? wrapper
            .getElementsByClassName('complexity')[0]
            .getElementsByTagName('p')
        : []
    )
    .filter(
      (element) =>
        String(element.innerHTML).trim() !== '' &&
        String(element.innerHTML).trim() !== '\n'
    )
    .map((element, index) => {
      return {
        id: index,
        text: element.innerHTML,
      };
    });

  overviewContent.complexitySection = complexitySection;

  const specialtiesSection = Array.prototype.slice
    .call(
      wrapper.getElementsByClassName('specialties') &&
        wrapper.getElementsByClassName('specialties').length
        ? wrapper
            .getElementsByClassName('specialties')[0]
            .getElementsByTagName('p')
        : []
    )
    .filter(
      (element) =>
        String(element.innerHTML).trim() !== '' &&
        String(element.innerHTML).trim() !== '\n'
    )
    .map((element, index) => {
      return {
        id: index,
        text: element.innerHTML,
      };
    });

  overviewContent.specialtiesSection = specialtiesSection;

  const requirementsSection = Array.prototype.slice
    .call(
      wrapper.getElementsByClassName('requirements') &&
        wrapper.getElementsByClassName('requirements').length
        ? wrapper
            .getElementsByClassName('requirements')[0]
            .getElementsByTagName('p')
        : []
    )
    .filter(
      (element) =>
        String(element.innerHTML).trim() !== '' &&
        String(element.innerHTML).trim() !== '\n'
    )
    .map((element, index) => {
      return {
        id: index,
        text: element.innerHTML,
      };
    });

  overviewContent.requirementsSection = requirementsSection;

  const staffSection = Array.prototype.slice
    .call(
      wrapper.getElementsByClassName('course-staff') &&
        wrapper.getElementsByClassName('course-staff').length
        ? wrapper
            .getElementsByClassName('course-staff')[0]
            .getElementsByClassName('teacher')
        : []
    )
    .map((element, index) => {
      return {
        id: index,
        link: element.getElementsByClassName('teacher-link')[0]
          ? element
              .getElementsByClassName('teacher-link')[0]
              .getAttribute('src')
          : '',
        fio: element.getElementsByClassName('teacher-fio')[0]
          ? element.getElementsByClassName('teacher-fio')[0].innerHTML
          : '',
        description: element.getElementsByClassName('teacher-description')[0]
          ? element.getElementsByClassName('teacher-description')[0].innerHTML
          : '',
      };
    });

  overviewContent.staffSection = staffSection;

  const programSection = Array.prototype.slice
    .call(
      wrapper.getElementsByClassName('program') &&
        wrapper.getElementsByClassName('program').length
        ? wrapper
            .getElementsByClassName('program')[0]
            .getElementsByClassName('module-wrapper')
        : []
    )
    .map((element, index) => {
      const lections = Array.prototype.slice
        .call(
          element.getElementsByClassName('lections-list')[0]
            ? element
                .getElementsByClassName('lections-list')[0]
                .getElementsByTagName('li')
            : []
        )
        .map((element, index) => {
          return {
            id: index,
            text: element.innerHTML,
          };
        });

      const practicals = Array.prototype.slice
        .call(
          element.getElementsByClassName('practicals-list')[0]
            ? element
                .getElementsByClassName('practicals-list')[0]
                .getElementsByTagName('li')
            : []
        )
        .map((element, index) => {
          return {
            id: index,
            text: element.innerHTML,
          };
        });

      const labs = Array.prototype.slice
        .call(
          element.getElementsByClassName('labs-list')[0]
            ? element
                .getElementsByClassName('labs-list')[0]
                .getElementsByTagName('li')
            : []
        )
        .map((element, index) => {
          return {
            id: index,
            text: element.innerHTML,
          };
        });

      const tests = Array.prototype.slice
        .call(
          element.getElementsByClassName('tests-list')[0]
            ? element
                .getElementsByClassName('tests-list')[0]
                .getElementsByTagName('li')
            : []
        )
        .map((element, index) => {
          return {
            id: index,
            text: element.innerHTML,
          };
        });

      return {
        [`module${index + 1}`]: {
          name: element.getElementsByClassName('module-name')[0].innerHTML,
          lections,
          lectionsCount: lections.length,
          practicals,
          practicalsCount: practicals.length,
          labs,
          labsCount: labs.length,
          tests,
          testsCount: tests.length,
        },
      };
    })
    .reduce((object, element) => ({ ...object, ...element }), {});

  overviewContent.programSection = programSection;

  return overviewContent;
}

export default function CourseOverviewConstructor(props) {
  const overviewContent = getOverviewObjectFromString(props.overview || '');

  const [courseAboutParagraphsCount, setCourseAboutParagraphsCount] = useState(
    overviewContent.aboutSection.length
  );
  const [courseAboutParagraphs, setCourseAboutParagraphs] = useState(
    overviewContent.aboutSection
  );
  const [
    courseСompetenciesParagraphsCount,
    setCourseСompetenciesParagraphsCount,
  ] = useState(overviewContent.competenciesSection.length);
  const [courseСompetenciesParagraphs, setCourseСompetenciesParagraphs] =
    useState(overviewContent.competenciesSection);
  const [courseResultsParagraphsCount, setCourseResultsParagraphsCount] =
    useState(overviewContent.resultsSection.length);
  const [courseResultsParagraphs, setCourseResultsParagraphs] = useState(
    overviewContent.resultsSection
  );
  const [courseDurationParagraphsCount, setCourseDurationParagraphsCount] =
    useState(overviewContent.durationSection.length);
  const [courseDurationParagraphs, setCourseDurationParagraphs] = useState(
    overviewContent.durationSection
  );
  const [courseComplexityParagraphsCount, setCourseComplexityParagraphsCount] =
    useState(overviewContent.complexitySection.length);
  const [courseComplexityParagraphs, setCourseComplexityParagraphs] = useState(
    overviewContent.complexitySection
  );
  const [
    courseSpecialtiesParagraphsCount,
    setCourseSpecialtiesParagraphsCount,
  ] = useState(overviewContent.specialtiesSection.length);
  const [courseSpecialtiesParagraphs, setCourseSpecialtiesParagraphs] =
    useState(overviewContent.specialtiesSection);
  const [
    courseRequirementsParagraphsCount,
    setCourseRequirementsParagraphsCount,
  ] = useState(overviewContent.requirementsSection.length);
  const [courseRequirementsParagraphs, setCourseRequirementsParagraphs] =
    useState(overviewContent.requirementsSection);

  const [courseStaffCount, setCourseStaffCount] = useState(
    overviewContent.staffSection.length
  );
  const [courseStaff, setCourseStaff] = useState(overviewContent.staffSection);

  const [courseModulesCount, setCourseModulesCount] = useState(
    overviewContent.modules || 0
  );
  const [courseLanguage, setCourseLanguage] = useState(
    overviewContent.language || 'RU'
  );
  const [courseLectionsCount, setCourseLectionsCount] = useState(
    overviewContent.lections || 0
  );
  const [coursePracticalsCount, setCoursePracticalsCount] = useState(
    overviewContent.practicals || 0
  );
  const [courseLabsCount, setCourseLabsCount] = useState(
    overviewContent.labs || 0
  );
  const [courseTestsCount, setCourseTestsCount] = useState(
    overviewContent.tests || 0
  );

  const [courseModules, setCourseModules] = useState(
    overviewContent.programSection
  );

  useEffect(() => {
    setCourseModules(
      Array.from({ length: courseModulesCount }, (_, index) => {
        return {
          [`module${index + 1}`]: {
            name: courseModules[`module${index + 1}`]
              ? courseModules[`module${index + 1}`].name
              : '',
            lections: courseModules[`module${index + 1}`]
              ? courseModules[`module${index + 1}`].lections
              : [],
            lectionsCount: courseModules[`module${index + 1}`]
              ? courseModules[`module${index + 1}`].lectionsCount
              : 0,
            practicals: courseModules[`module${index + 1}`]
              ? courseModules[`module${index + 1}`].practicals
              : [],
            practicalsCount: courseModules[`module${index + 1}`]
              ? courseModules[`module${index + 1}`].practicalsCount
              : 0,
            labs: courseModules[`module${index + 1}`]
              ? courseModules[`module${index + 1}`].labs
              : [],
            labsCount: courseModules[`module${index + 1}`]
              ? courseModules[`module${index + 1}`].labsCount
              : [],
            tests: courseModules[`module${index + 1}`]
              ? courseModules[`module${index + 1}`].tests
              : [],
            testsCount: courseModules[`module${index + 1}`]
              ? courseModules[`module${index + 1}`].testsCount
              : [],
          },
        };
      }).reduce((object, element) => ({ ...object, ...element }), {})
    );
  }, [courseModulesCount]);

  useEffect(() => {
    setCourseAboutParagraphs(
      Array.from({ length: courseAboutParagraphsCount }, (_, index) => {
        return {
          id: index,
          text: courseAboutParagraphs[index]?.text || '',
        };
      })
    );
  }, [courseAboutParagraphsCount]);

  useEffect(() => {
    setCourseResultsParagraphs(
      Array.from({ length: courseResultsParagraphsCount }, (_, index) => {
        return {
          id: index,
          text: courseResultsParagraphs[index]?.text || '',
        };
      })
    );
  }, [courseResultsParagraphsCount]);

  useEffect(() => {
    setCourseСompetenciesParagraphs(
      Array.from({ length: courseСompetenciesParagraphsCount }, (_, index) => {
        return {
          id: index,
          text: courseСompetenciesParagraphs[index]?.text || '',
        };
      })
    );
  }, [courseСompetenciesParagraphsCount]);

  useEffect(() => {
    setCourseDurationParagraphs(
      Array.from({ length: courseDurationParagraphsCount }, (_, index) => {
        return {
          id: index,
          text: courseDurationParagraphs[index]?.text || '',
        };
      })
    );
  }, [courseDurationParagraphsCount]);

  useEffect(() => {
    setCourseComplexityParagraphs(
      Array.from({ length: courseComplexityParagraphsCount }, (_, index) => {
        return {
          id: index,
          text: courseComplexityParagraphs[index]?.text || '',
        };
      })
    );
  }, [courseComplexityParagraphsCount]);

  useEffect(() => {
    setCourseSpecialtiesParagraphs(
      Array.from({ length: courseSpecialtiesParagraphsCount }, (_, index) => {
        return {
          id: index,
          text: courseSpecialtiesParagraphs[index]?.text || '',
        };
      })
    );
  }, [courseSpecialtiesParagraphsCount]);

  useEffect(() => {
    setCourseRequirementsParagraphs(
      Array.from({ length: courseRequirementsParagraphsCount }, (_, index) => {
        return {
          id: index,
          text: courseRequirementsParagraphs[index]?.text || '',
        };
      })
    );
  }, [courseRequirementsParagraphsCount]);

  useEffect(() => {
    setCourseStaff(
      Array.from({ length: courseStaffCount }, (_, index) => {
        return {
          id: index,
          link: courseStaff[index]?.link || '',
          fio: courseStaff[index]?.fio || '',
          description: courseStaff[index]?.description || '',
        };
      })
    );
  }, [courseStaffCount]);

  function OverviewTemplate() {
    return (
      <React.Fragment>
        <section className="information">
          <div className="item-wrapper">
            <div className="course-language-container">
              <p className="course-language">${courseLanguage || 'RU'}</p>
            </div>
          </div>
          <div className="item-wrapper">
            <div className="course-content-container">
              {courseModulesCount !== 0 ? (
                <div className="course-content">
                  <p class="modules">{courseModulesCount}</p> модуля
                </div>
              ) : null}
              {courseLectionsCount !== 0 ? (
                <div className="course-content">
                  <p class="lections">{courseLectionsCount}</p> лекций
                </div>
              ) : null}
              {coursePracticalsCount !== 0 ? (
                <div className="course-content">
                  <p class="practicals">{coursePracticalsCount}</p> практических
                </div>
              ) : null}
              {coursePracticalsCount !== 0 ? (
                <div className="course-content">
                  <p class="labs">{courseLabsCount}</p> лабораторных
                </div>
              ) : null}
              {courseTestsCount !== 0 ? (
                <div className="course-content">
                  <p class="tests">{courseTestsCount}</p> тестовых
                </div>
              ) : null}
            </div>
          </div>
        </section>
        <section className="about">
          {courseAboutParagraphsCount !== 0
            ? Array.from({ length: courseAboutParagraphsCount }, (_, index) => {
                return <p>{courseAboutParagraphs[index]?.text || ''}</p>;
              })
            : null}
        </section>
        <section className="program">
          {Object.entries(courseModules).map(([key, value], index) => {
            return (
              <div className="module-wrapper">
                <div className="module-header">
                  <h3>Модуль №{index + 1}</h3>
                  <h3 className="module-name">${value?.name || ''}</h3>
                </div>
                {value?.lectionsCount !== 0 ? (
                  <div className="module-body">
                    <div className="module-body__content">
                      <div className="module-body__content-header">
                        <p className="name">Лекций</p>
                        <p className="lections-count count">
                          {value?.lectionsCount}
                        </p>
                      </div>
                      <div className="module-body__content-body">
                        <ol className="lections-list">
                          {value?.lections.map((lection) => {
                            return <li align="justify">${lection.text}</li>;
                          })}
                        </ol>
                      </div>
                    </div>
                  </div>
                ) : null}
                {value?.practicalsCount !== 0 ? (
                  <div className="module-body">
                    <div className="module-body__content">
                      <div className="module-body__content-header">
                        <p className="name">Практических</p>
                        <p className="practicals-count count">
                          {value?.practicalsCount}
                        </p>
                      </div>
                      <div className="module-body__content-body">
                        <ol className="practicals-list">
                          {value?.practicals.map((practical) => {
                            return <li align="justify">${practical.text}</li>;
                          })}
                        </ol>
                      </div>
                    </div>
                  </div>
                ) : null}
                {value?.labsCount !== 0 ? (
                  <div className="module-body">
                    <div className="module-body__content">
                      <div className="module-body__content-header">
                        <p className="name">Лабораторных</p>
                        <p className="labs-count count">{value?.labsCount}</p>
                      </div>
                      <div className="module-body__content-body">
                        <ol className="labs-list">
                          {value?.labs.map((lab) => {
                            return <li align="justify">${lab.text}</li>;
                          })}
                        </ol>
                      </div>
                    </div>
                  </div>
                ) : null}
                {value?.testsCount !== 0 ? (
                  <div className="module-body">
                    <div className="module-body__content">
                      <div className="module-body__content-header">
                        <p className="name">Тестов</p>
                        <p className="tests-count count">{value?.testsCount}</p>
                      </div>
                      <div className="module-body__content-body">
                        <ol className="tests-list">
                          {value?.tests.map((test) => {
                            return <li align="justify">${test.text}</li>;
                          })}
                        </ol>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </section>
        <section className="competencies">
          {courseСompetenciesParagraphsCount !== 0
            ? Array.from(
                { length: courseСompetenciesParagraphsCount },
                (_, index) => {
                  return (
                    <p>{courseСompetenciesParagraphs[index]?.text || ''}</p>
                  );
                }
              )
            : null}
        </section>
        <section className="results">
          {courseResultsParagraphsCount !== 0
            ? Array.from(
                { length: courseResultsParagraphsCount },
                (_, index) => {
                  return <p>{courseResultsParagraphs[index]?.text || ''}</p>;
                }
              )
            : null}
        </section>
        <section className="duration">
          {courseDurationParagraphsCount !== 0
            ? Array.from(
                { length: courseDurationParagraphsCount },
                (_, index) => {
                  return <p>{courseDurationParagraphs[index]?.text || ''}</p>;
                }
              )
            : null}
        </section>
        <section className="complexity">
          {courseComplexityParagraphsCount !== 0
            ? Array.from(
                { length: courseComplexityParagraphsCount },
                (_, index) => {
                  return <p>{courseComplexityParagraphs[index]?.text || ''}</p>;
                }
              )
            : null}
        </section>
        <section className="specialties">
          {courseSpecialtiesParagraphsCount !== 0
            ? Array.from(
                { length: courseSpecialtiesParagraphsCount },
                (_, index) => {
                  return (
                    <p>{courseSpecialtiesParagraphs[index]?.text || ''}</p>
                  );
                }
              )
            : null}
        </section>
        <section className="requirements">
          {courseRequirementsParagraphsCount !== 0
            ? Array.from(
                { length: courseRequirementsParagraphsCount },
                (_, index) => {
                  return (
                    <p>{courseRequirementsParagraphs[index]?.text || ''}</p>
                  );
                }
              )
            : null}
        </section>
        <section className="course-staff">
          {courseStaffCount !== 0
            ? Array.from({ length: courseStaffCount }, (_, index) => {
                return (
                  <article className="teacher">
                    <div className="teacher-image">
                      <img
                        class="teacher-link"
                        src={courseStaff[index]?.link || '#'}
                        alt={courseStaff[index]?.fio || ''}
                      />
                    </div>
                    <h3 class="teacher-fio">{courseStaff[index]?.fio || ''}</h3>
                    <p class="teacher-description">
                      {courseStaff[index]?.description || ''}
                    </p>
                  </article>
                );
              })
            : null}
        </section>
      </React.Fragment>
    );
  }

  CourseOverviewConstructor.getCourseOverviewHTML = () => {
    return OverviewTemplate();
  };

  function GetParagraph(paragraphNumber, paragraphType) {
    const paragraphTextMap = {
      about: courseAboutParagraphs,
      competencies: courseСompetenciesParagraphs,
      results: courseResultsParagraphs,
      duration: courseDurationParagraphs,
      complexity: courseComplexityParagraphs,
      specialties: courseSpecialtiesParagraphs,
      requirements: courseRequirementsParagraphs,
    };

    const paragraphMethodsMap = {
      about: setCourseAboutParagraphs,
      competencies: setCourseСompetenciesParagraphs,
      results: setCourseResultsParagraphs,
      duration: setCourseDurationParagraphs,
      complexity: setCourseComplexityParagraphs,
      specialties: setCourseSpecialtiesParagraphs,
      requirements: setCourseRequirementsParagraphs,
    };

    return (
      <div className="form-group">
        {paragraphType === 'specialties' ? (
          <input
            className="form-control"
            placeholder="Введите специальность"
            value={paragraphTextMap[paragraphType][paragraphNumber]?.text || ''}
            onChange={(event) => {
              paragraphMethodsMap[paragraphType](
                paragraphTextMap[paragraphType].map((paragraph, index) => {
                  return index === paragraphNumber
                    ? {
                        id: index,
                        text: event.target.value,
                      }
                    : paragraph;
                })
              );
            }}
          />
        ) : (
          <textarea
            className="form-control"
            placeholder="Введите абзац текста"
            value={paragraphTextMap[paragraphType][paragraphNumber]?.text || ''}
            onChange={(event) => {
              paragraphMethodsMap[paragraphType](
                paragraphTextMap[paragraphType].map((paragraph, index) => {
                  return index === paragraphNumber
                    ? {
                        id: index,
                        text: event.target.value,
                      }
                    : paragraph;
                })
              );
            }}
            rows="4"
          ></textarea>
        )}
      </div>
    );
  }

  function GetCourseProgramTemplate() {
    return (
      <div
        className="overview__element-information"
        data-element="courseProgram"
      >
        <div className="element-information__label">Программа курса</div>
        {courseModulesCount === 0 ? (
          <div className="element-information__hint">
            Введите количество модулей курса
          </div>
        ) : (
          Array.from({ length: courseModulesCount }, (_, index) => {
            return (
              <div className="module-content">
                <div className="module__label">Модуль №{index + 1}</div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Название модуля</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Название модуля"
                    value={courseModules[`module${index + 1}`]?.name || ''}
                    onChange={(event) => {
                      setCourseModules(
                        deepMerge(courseModules, {
                          [`module${index + 1}`]: {
                            name: event.target.value,
                          },
                        })
                      );
                    }}
                  />
                </div>
                <div className="input-group mb-4 col-md-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Количество лекций</span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    value={
                      courseModules[`module${index + 1}`]?.lectionsCount || 0
                    }
                    onChange={(event) => {
                      setCourseModules(
                        deepMerge(courseModules, {
                          [`module${index + 1}`]: {
                            lectionsCount: event.target.value,
                          },
                        })
                      );
                    }}
                  />
                </div>
                <div className="program__container">
                  {Array.from(
                    {
                      length:
                        courseModules[`module${index + 1}`]?.lectionsCount,
                    },
                    (_, i) => {
                      return (
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              Лекция №{i + 1}
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              courseModules[`module${index + 1}`]?.lections[i]
                                .text
                            }
                            onChange={(event) => {
                              setCourseModules(
                                deepMerge(courseModules, {
                                  [`module${index + 1}`]: {
                                    lections: courseModules[
                                      `module${index + 1}`
                                    ]?.lections.map(
                                      (lection, lectionNumber) => {
                                        return lectionNumber === i
                                          ? {
                                              id: i,
                                              text: event.target.value,
                                            }
                                          : lection;
                                      }
                                    ),
                                  },
                                })
                              );
                            }}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="input-group mb-4 col-md-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      Количество практических
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    value={
                      courseModules[`module${index + 1}`]?.practicalsCount || 0
                    }
                    onChange={(event) => {
                      setCourseModules(
                        deepMerge(courseModules, {
                          [`module${index + 1}`]: {
                            practicalsCount: event.target.value,
                          },
                        })
                      );
                    }}
                  />
                </div>
                <div className="program__container">
                  {Array.from(
                    {
                      length:
                        courseModules[`module${index + 1}`]?.practicalsCount,
                    },
                    (_, i) => {
                      return (
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              Практическая №{i + 1}
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              courseModules[`module${index + 1}`]?.practicals[i]
                                .text
                            }
                            onChange={(event) => {
                              setCourseModules(
                                deepMerge(courseModules, {
                                  [`module${index + 1}`]: {
                                    practicals: courseModules[
                                      `module${index + 1}`
                                    ]?.practicals.map(
                                      (practice, practiceNumber) => {
                                        return practiceNumber === i
                                          ? {
                                              id: i,
                                              text: event.target.value,
                                            }
                                          : practice;
                                      }
                                    ),
                                  },
                                })
                              );
                            }}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="input-group mb-4 col-md-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      Количество лабораторных
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    value={courseModules[`module${index + 1}`]?.labsCount || 0}
                    onChange={(event) => {
                      setCourseModules(
                        deepMerge(courseModules, {
                          [`module${index + 1}`]: {
                            labsCount: event.target.value,
                          },
                        })
                      );
                    }}
                  />
                </div>
                <div className="program__container">
                  {Array.from(
                    {
                      length: courseModules[`module${index + 1}`]?.labsCount,
                    },
                    (_, i) => {
                      return (
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              Лабораторная №{i + 1}
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              courseModules[`module${index + 1}`]?.labs[i].text
                            }
                            onChange={(event) => {
                              setCourseModules(
                                deepMerge(courseModules, {
                                  [`module${index + 1}`]: {
                                    labs: courseModules[
                                      `module${index + 1}`
                                    ]?.labs.map((lab, labNumber) => {
                                      return labNumber === i
                                        ? {
                                            id: i,
                                            text: event.target.value,
                                          }
                                        : lab;
                                    }),
                                  },
                                })
                              );
                            }}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="input-group mb-4 col-md-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Количество тестов</span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    value={courseModules[`module${index + 1}`]?.testsCount || 0}
                    onChange={(event) => {
                      setCourseModules(
                        deepMerge(courseModules, {
                          [`module${index + 1}`]: {
                            testsCount: event.target.value,
                          },
                        })
                      );
                    }}
                  />
                </div>
                <div className="program__container">
                  {Array.from(
                    {
                      length: courseModules[`module${index + 1}`]?.testsCount,
                    },
                    (_, i) => {
                      return (
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              Тест №{i + 1}
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(event) => {
                              setCourseModules(
                                deepMerge(courseModules, {
                                  [`module${index + 1}`]: {
                                    tests: courseModules[
                                      `module${index + 1}`
                                    ]?.tests.map((test, testNumber) => {
                                      return testNumber === i
                                        ? {
                                            id: i,
                                            text: event.target.value,
                                          }
                                        : test;
                                    }),
                                  },
                                })
                              );
                            }}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }

  function GetCourseDescriptionTemplate() {
    return (
      <div className="overview__element-information">
        <div className="element-information__label">Описание к курсу</div>
        <div className="description-btns form-group">
          <button
            id="paragraph-btn-add"
            className="btn btn-primary"
            type="button"
            onClick={() =>
              setCourseAboutParagraphsCount(courseAboutParagraphsCount + 1)
            }
          >
            Добавить абзац текста
          </button>
          <button
            id="paragraph-btn-delete"
            className="btn btn-danger"
            type="button"
            onClick={() =>
              setCourseAboutParagraphsCount(
                courseAboutParagraphsCount > 0
                  ? courseAboutParagraphsCount - 1
                  : 0
              )
            }
          >
            Удалить абзац текста
          </button>
        </div>
        <div className="description-paragraphs form-group">
          {Array.from(
            {
              length: courseAboutParagraphsCount,
            },
            (_, i) => {
              return GetParagraph(i, 'about');
            }
          )}
        </div>
      </div>
    );
  }

  function GetCourseСompetenciesTemplate() {
    return (
      <div className="overview__element-information">
        <div className="element-information__label">
          Формируемые компетенции курса
        </div>
        <div className="description-btns form-group">
          <button
            id="paragraph-btn-add"
            className="btn btn-primary"
            type="button"
            onClick={() =>
              setCourseСompetenciesParagraphsCount(
                courseСompetenciesParagraphsCount + 1
              )
            }
          >
            Добавить абзац текста
          </button>
          <button
            id="paragraph-btn-delete"
            className="btn btn-danger"
            type="button"
            onClick={() =>
              setCourseСompetenciesParagraphsCount(
                courseСompetenciesParagraphsCount > 0
                  ? courseСompetenciesParagraphsCount - 1
                  : 0
              )
            }
          >
            Удалить абзац текста
          </button>
        </div>
        <div className="description-paragraphs form-group">
          {Array.from(
            {
              length: courseСompetenciesParagraphsCount,
            },
            (_, i) => {
              return GetParagraph(i, 'competencies');
            }
          )}
        </div>
      </div>
    );
  }

  function GetCourseResultsTemplate() {
    return (
      <div className="overview__element-information">
        <div className="element-information__label">Результаты курса</div>
        <div className="description-btns form-group">
          <button
            id="paragraph-btn-add"
            className="btn btn-primary"
            type="button"
            onClick={() =>
              setCourseResultsParagraphsCount(courseResultsParagraphsCount + 1)
            }
          >
            Добавить абзац текста
          </button>
          <button
            id="paragraph-btn-delete"
            className="btn btn-danger"
            type="button"
            onClick={() =>
              setCourseResultsParagraphsCount(
                courseResultsParagraphsCount > 0
                  ? courseResultsParagraphsCount - 1
                  : 0
              )
            }
          >
            Удалить абзац текста
          </button>
        </div>
        <div className="description-paragraphs form-group">
          {Array.from(
            {
              length: courseResultsParagraphsCount,
            },
            (_, i) => {
              return GetParagraph(i, 'results');
            }
          )}
        </div>
      </div>
    );
  }

  function GetCourseDurationTemplate() {
    return (
      <div className="overview__element-information">
        <div className="element-information__label">Длительность курса</div>
        <div className="description-btns form-group">
          <button
            id="paragraph-btn-add"
            className="btn btn-primary"
            type="button"
            onClick={() =>
              setCourseDurationParagraphsCount(
                courseDurationParagraphsCount + 1
              )
            }
          >
            Добавить абзац текста
          </button>
          <button
            id="paragraph-btn-delete"
            className="btn btn-danger"
            type="button"
            onClick={() =>
              setCourseDurationParagraphsCount(
                courseDurationParagraphsCount > 0
                  ? courseDurationParagraphsCount - 1
                  : 0
              )
            }
          >
            Удалить абзац текста
          </button>
        </div>
        <div className="description-paragraphs form-group">
          {Array.from(
            {
              length: courseDurationParagraphsCount,
            },
            (_, i) => {
              return GetParagraph(i, 'duration');
            }
          )}
        </div>
      </div>
    );
  }

  function GetCourseComplexityTemplate() {
    return (
      <div className="overview__element-information">
        <div className="element-information__label">Трудоёмкость курса</div>
        <div className="description-btns form-group">
          <button
            id="paragraph-btn-add"
            className="btn btn-primary"
            type="button"
            onClick={() =>
              setCourseComplexityParagraphsCount(
                courseComplexityParagraphsCount + 1
              )
            }
          >
            Добавить абзац текста
          </button>
          <button
            id="paragraph-btn-delete"
            className="btn btn-danger"
            type="button"
            onClick={() =>
              setCourseComplexityParagraphsCount(
                courseComplexityParagraphsCount > 0
                  ? courseComplexityParagraphsCount - 1
                  : 0
              )
            }
          >
            Удалить абзац текста
          </button>
        </div>
        <div className="description-paragraphs form-group">
          {Array.from(
            {
              length: courseComplexityParagraphsCount,
            },
            (_, i) => {
              return GetParagraph(i, 'complexity');
            }
          )}
        </div>
      </div>
    );
  }

  function GetCourseSpecialtiesTemplate() {
    return (
      <div className="overview__element-information">
        <div className="element-information__label">Специальности курса</div>
        <div className="description-btns form-group">
          <button
            id="paragraph-btn-add"
            className="btn btn-primary"
            type="button"
            onClick={() =>
              setCourseSpecialtiesParagraphsCount(
                courseSpecialtiesParagraphsCount + 1
              )
            }
          >
            Добавить абзац текста
          </button>
          <button
            id="paragraph-btn-delete"
            className="btn btn-danger"
            type="button"
            onClick={() =>
              setCourseSpecialtiesParagraphsCount(
                courseSpecialtiesParagraphsCount > 0
                  ? courseSpecialtiesParagraphsCount - 1
                  : 0
              )
            }
          >
            Удалить абзац текста
          </button>
        </div>
        <div className="description-paragraphs form-group">
          {Array.from(
            {
              length: courseSpecialtiesParagraphsCount,
            },
            (_, i) => {
              return GetParagraph(i, 'specialties');
            }
          )}
        </div>
      </div>
    );
  }

  function GetCourseRequirementsTemplate() {
    return (
      <div className="overview__element-information">
        <div className="element-information__label">Требования курса</div>
        <div className="description-btns form-group">
          <button
            id="paragraph-btn-add"
            className="btn btn-primary"
            type="button"
            onClick={() =>
              setCourseRequirementsParagraphsCount(
                courseRequirementsParagraphsCount + 1
              )
            }
          >
            Добавить абзац текста
          </button>
          <button
            id="paragraph-btn-delete"
            className="btn btn-danger"
            type="button"
            onClick={() =>
              setCourseRequirementsParagraphsCount(
                courseRequirementsParagraphsCount > 0
                  ? courseRequirementsParagraphsCount - 1
                  : 0
              )
            }
          >
            Удалить абзац текста
          </button>
        </div>
        <div className="description-paragraphs form-group">
          {Array.from(
            {
              length: courseRequirementsParagraphsCount,
            },
            (_, i) => {
              return GetParagraph(i, 'requirements');
            }
          )}
        </div>
      </div>
    );
  }

  function GetCourseInformationTemplate() {
    return (
      <div
        className="overview__element-information"
        data-element="courseInformation"
      >
        <div className="element-information__label">Информация о курсе</div>
        <div className="element-information__language">
          <div className="form-group">
            <label htmlFor="course-language">Выберите язык курса</label>
            <select
              className="form-control"
              onChange={(event) => {
                setCourseLanguage(event.target.value);
              }}
              value={courseLanguage}
            >
              <option value="RU">RU</option>
              <option value="EN">EN</option>
            </select>
          </div>
        </div>
        <div className="element-information__course-content form-row">
          <div className="course-content form-group col-md-2">
            <label htmlFor="inputModulesCount">Количество модулей</label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={courseModulesCount}
              onChange={(e) => setCourseModulesCount(e.target.value)}
            />
          </div>
          <div className="course-content form-group col-md-2">
            <label htmlFor="inputLectionsCount">
              Количество лекционных материалов
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={courseLectionsCount}
              onChange={(e) => setCourseLectionsCount(e.target.value)}
            />
          </div>
          <div className="course-content form-group col-md-2">
            <label htmlFor="inputPracticalCount">
              Количество практических заданий
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={coursePracticalsCount}
              onChange={(e) => setCoursePracticalsCount(e.target.value)}
            />
          </div>
          <div className="course-content form-group col-md-2">
            <label htmlFor="inputLabsCount">
              Количество лабораторных заданий
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={courseLabsCount}
              onChange={(e) => setCourseLabsCount(e.target.value)}
            />
          </div>
          <div className="course-content form-group col-md-2">
            <label htmlFor="inputTestsCount">Количество тестовых заданий</label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={courseTestsCount}
              onChange={(e) => setCourseTestsCount(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }

  function GetCourseStaffTemplate() {
    return (
      <div className="overview__element-information">
        <div className="element-information__label">Преподаватели курса</div>
        <div className="description-btns form-group">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setCourseStaffCount(courseStaffCount + 1)}
          >
            Добавить преподавателя к курсу
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() =>
              setCourseStaffCount(
                courseStaffCount > 0 ? courseStaffCount - 1 : 0
              )
            }
          >
            Удалить преподавателя из курса
          </button>
        </div>
        <div className="description-staff form-group">
          {Array.from(
            {
              length: courseStaffCount,
            },
            (_, i) => {
              return (
                <div key={i.toString()} className="course-staff__card">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        Ссылка на фото преподавателя
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ссылка на загруженный в платформу файл"
                      value={courseStaff[i]?.link || ''}
                      onChange={(event) => {
                        setCourseStaff(
                          courseStaff.map((staff, index) => {
                            return index === i
                              ? {
                                  id: index,
                                  link: event.target.value,
                                  fio: staff.fio,
                                  description: staff.description,
                                }
                              : staff;
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        Полное ФИО преподавателя
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ФИО преподавателя"
                      value={courseStaff[i]?.fio || ''}
                      onChange={(event) => {
                        setCourseStaff(
                          courseStaff.map((staff, index) => {
                            return index === i
                              ? {
                                  id: index,
                                  link: staff.link,
                                  fio: event.target.value,
                                  description: staff.description,
                                }
                              : staff;
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        Описание преподавателя
                      </span>
                    </div>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Введите должность, учёную степень и, возможно, некоторое краткое описание"
                      value={courseStaff[i]?.description || ''}
                      onChange={(event) => {
                        setCourseStaff(
                          courseStaff.map((staff, index) => {
                            return index === i
                              ? {
                                  id: index,
                                  link: staff.link,
                                  fio: staff.fio,
                                  description: event.target.value,
                                }
                              : staff;
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {GetCourseInformationTemplate()}
      {GetCourseDescriptionTemplate()}
      {GetCourseProgramTemplate()}
      {GetCourseСompetenciesTemplate()}
      {GetCourseResultsTemplate()}
      {GetCourseDurationTemplate()}
      {GetCourseComplexityTemplate()}
      {GetCourseSpecialtiesTemplate()}
      {GetCourseRequirementsTemplate()}
      {GetCourseStaffTemplate()}
    </div>
  );
}
