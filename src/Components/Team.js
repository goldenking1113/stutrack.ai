export default function Team() {
  const team = [
    {
      avatar:
        "https://media.licdn.com/dms/image/C5103AQH1rwe-HuR3rQ/profile-displayphoto-shrink_800_800/0/1516968100107?e=1716422400&v=beta&t=O1gMrOP6N-H-udyMf1GpZBIOcpRoTCQS5Cmgnv9igTQ",
      name: "Rohit Ghorpade",
      title: "Founder and CEO",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry. Lorem Ipsum has been the industry's standard dummy",
      linkedin: "https://www.linkedin.com/in/rohit-ghorpade-b3b34557/",
      twitter: "javascript:void(0)",
      github: "javascript:void(0)",
    },
    {
      avatar:
        "https://media.licdn.com/dms/image/D5603AQGwYKPD45LXyg/profile-displayphoto-shrink_800_800/0/1695882077859?e=1716422400&v=beta&t=7UvSCpivw6meFbwBKBoWmvj9kKTjPkBOtRfZc-WSct0",
      name: "Gagandeep Devaraju",
      title: "Chief Operating Office",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesettin industry. Lorem Ipsum has been the industry's standard dummy",
      linkedin: "https://www.linkedin.com/in/gagandeepdevaraju/",
      twitter: "javascript:void(0)",
      github: "javascript:void(0)",
    },
  ];

  return (
    <section className="py-14 mt-20">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-xl">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Meet our talent team
          </h3>
          <p className="text-gray-600 mt-3">
            We are a team of passionate individuals who are committed to making
            a difference in students' careers. We believe that everyone has the
            potential to learn and grow, and we are dedicated to providing the
            resources and support that people need to reach their full
            potential. We believe that everyone deserves a chance to succeed,
            regardless of where they went to school or who they know.
          </p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-8 lg:grid-cols-2">
            {team.map((item, idx) => (
              <li key={idx} className="gap-8 sm:flex">
                <div className="w-full h-60">
                  <img
                    src={item.avatar}
                    className="w-full h-full object-cover object-center shadow-md rounded-xl"
                    alt=""
                  />
                </div>
                <div className="mt-4 sm:mt-0">
                  <h4 className="text-lg text-gray-700 font-semibold">
                    {item.name}
                  </h4>
                  <p className="text-indigo-600">{item.title}</p>
                  <p className="text-gray-600 mt-2">{item.desc}</p>
                  <div className="mt-3 flex gap-4 text-gray-400">
                    <a href={item.linkedin}>
                      <svg
                        className="w-5 h-5 duration-150 hover:text-gray-500"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <g clip-path="url(#clip0_17_68)">
                          <path
                            fill="currentColor"
                            d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_17_68">
                            <path fill="currentColor" d="M0 0h48v48H0z" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
