import React from "react";

export default function Assessments() {
  const assessmentItems = [
    {
      name: "TechWizard Challenge",
      description:
        "Test your technical expertise across various domains, from programming to system architecture.",
      duration: "2 hours",
      rewards: "₹10,000 cash prize",
    },
    {
      name: "CreativeGenius Test",
      description:
        "Unleash your creativity with challenges in graphic design, video editing, and content creation.",
      duration: "3 hours",
      rewards: "Exclusive internship opportunity",
    },
    {
      name: "Problem-Solving Quest",
      description:
        "Sharpen your problem-solving skills with real-world scenarios and algorithmic challenges.",
      duration: "90 minutes",
      rewards: "Certificate of Achievement",
    },
    {
      name: "Communication Mastery",
      description:
        "Demonstrate your communication skills through presentations, written assignments, and interviews.",
      duration: "1 hour",
      rewards: "Personalized feedback from industry experts",
    },
  ];
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-10">
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Assessment: Skills Mastery Challenge
        </h3>
        <p className="text-gray-600 mt-2">
          Embark on a journey of skill mastery with our diverse range of
          assessments. Choose your challenge and elevate your career readiness
          today!
        </p>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Assessment Name</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Duration</th>
              <th className="py-3 px-6">Rewards</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {assessmentItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.rewards}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
