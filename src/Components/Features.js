import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faHandsHelping, faUserGraduate, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt as farCalendarAlt } from "@fortawesome/free-regular-svg-icons"; // Renamed to avoid conflict

export default () => {
  const features = [
    {
      icon: faChartLine,
      title: "Insightful Analytics",
      desc: "StuTrack provides insightful analytics to track student performance and progress effectively.",
    },
    {
      icon: faHandsHelping,
      title: "Collaborative Environment",
      desc: "StuTrack fosters a collaborative environment where students can exchange insights, strategies, and support.",
    },
    {
      icon: faUserGraduate,
      title: "Personalized Learning Paths",
      desc: "StuTrack offers personalized learning paths tailored to each student's needs and preferences.",
    },
    {
      icon: faGlobe,
      title: "Global Ranking Insights",
      desc: "StuTrack provides global ranking insights to help students stay competitive on an international level.",
    },
  ];
  

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-xl space-y-3">
          <h3 className="text-indigo-600 font-semibold">Features</h3>
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
          Discover the Power of StuTrack Features
          </p>
          <p>
          Explore StuTrack's comprehensive suite of features tailored to streamline competitive programming education.

          </p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-x-12 divide-y [&>.feature-1]:pl-0 sm:grid-cols-2 sm:gap-y-8 sm:divide-y-0 lg:divide-x lg:grid-cols-4 lg:gap-x-0">
            {features.map((item, idx) => (
              <li
                key={idx}
                className={`feature-${idx + 1} space-y-3 py-8 lg:px-12 sm:py-0`}
              >
                <div className="w-12 h-12 border text-indigo-600 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h4 className="text-lg text-gray-800 font-semibold">
                  {item.title}
                </h4>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
