import React from "react";
import blog from "../assets/svg/blog.svg";
export default function Blog() {
  const blogData = [
    {
      id: 1,
      category: "Technology",
      title: "Unlocking Your Professional Future",
      author: "MyFuse",
      date: "23rd, March 2021",
      readTime: "1hr 20min. read",
      imageUrl: "https://www.myfuse.in/admin/uploads/MyFuse.in.png",
      excerpt:
        "The world of technology is ever-evolving, and it is essential to stay updated with the latest trends and advancements. In this blog post, we will explore the depths of technology and how it is shaping the future of work and professional development.",
    },
    {
      id: 1,
      category: "E Commerce",
      title: "Zepto",
      author: "MyFuse",
      date: "23rd, March 2023",
      readTime: "1hr 20min. read",
      imageUrl:
        "https://www.myfuse.in/admin/uploads/Screenshot%202023-11-28%20at%2011.30.04%20AM.png",
      excerpt:
        "From the latest trends in e-commerce to the future of online shopping, this blog post will explore the depths of e-commerce and how it is shaping the future of retail and consumer behavior.",
    },
    {
      id: 1,
      category: "Finance",
      title: "Zerodha",
      author: "MyFuse",
      date: "23rd, March 2023",
      readTime: "1hr 20min. read",
      imageUrl:
        "https://www.myfuse.in/admin/uploads/Screenshot%202023-11-24%20at%2012.40.43%20PM.png",
      excerpt:
        "How is the world of finance changing? What are the latest trends in the financial industry? In this blog post, we will explore the depths of finance and how it is shaping the future of work and professional development.",
    },
    {
      id: 1,
      category: "Technology",
      title: "Google",
      author: "MyFuse",
      date: "23rd, March 2023",
      readTime: "1hr 20min. read",
      imageUrl: "https://www.myfuse.in/admin/uploads/google-logo.jpeg",
      excerpt:
        "Google is one of the most influential companies in the world, and its impact on technology and the internet is immeasurable. In this blog post, we will explore the depths of Google and how it is shaping the future of work and professional development.",
    },
    {
      id: 1,
      category: "Multinational Ridesharing Company",
      title: "Britannia Industries",
      author: "MyFuse",
      date: "23rd, March 2023",
      readTime: "1hr 20min. read",
      imageUrl:
        "https://www.myfuse.in/admin/uploads/Screenshot%202023-09-27%20at%2012.35.51%20PM.png",
      excerpt:
        "India is home to some of the most influential companies in the world, and Britannia Industries is one of them. In this blog post, we will explore the depths of Britannia Industries and how it is shaping the future of work and professional development.",
    },
    {
      id: 1,
      category: "Multinational Ridesharing Company",
      title: "OLA",
      author: "MyFuse",
      date: "23rd, March 2023",
      readTime: "1hr 20min. read",
      imageUrl:
        "https://www.myfuse.in/admin/uploads/Screenshot%202023-09-27%20at%2011.20.02%20AM.png",
      excerpt:
        "Olacabs, popularly known as Ola, is one of the most influential companies in the world, and its impact on technology and the internet is immeasurable. In this blog post, we will explore the depths of Ola and how it is shaping the future of work and professional development.",
    },
    {
      id: 1,
      category: "Food and Beverage",
      title: "Swiggy",
      author: "MyFuse",
      date: "23rd, March 2023",
      readTime: "1hr 20min. read",
      imageUrl: "https://www.myfuse.in/admin/uploads/S.png",
      excerpt:
        "Olacabs, popularly known as Ola, is one of the most influential companies in the world, and its impact on technology and the internet is immeasurable. In this blog post, we will explore the depths of Ola and how it is shaping the future of work and professional development.",
    },
  ];
  return (
    <>
      <div className="text-gray-900 pt-12 pr-0 pb-14 pl-0 bg-white mt-20">
        <div
          className="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16
max-w-7xl"
        >
          <div className="flex flex-col items-center sm:px-5 md:flex-row">
            <div className="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
              <div
                className="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
      md:space-y-5"
              >
                <div
                  className="bg-indigo-600 flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2
        uppercase inline-block"
                >
                  <p className="inline">
                    <svg
                      className="w-3.5 h-3.5 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
            00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
            1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1
            0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </p>
                  <p className="inline text-xs font-medium">Blog</p>
                </div>
                <a className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl">
                  Exploring the Depths
                </a>
                <div className="pt-2 pr-0 pb-0 pl-0">
                  <p className="text-xl font-medium inline">
                    Insights and Inspiration from Our Blog
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="block">
                <img
                  src={blog}
                  className="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="text-gray-900 pt-12 pr-0 pb-14 pl-0 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                {blogData.map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col items-start space-y-3 shadow-xl rounded-lg p-5"
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-64 rounded-lg object-contain"
                    />
                    <p className="bg-indigo-600 inline-block px-3 py-1.5 text-xs font-medium text-gray-50 rounded-full uppercase">
                      {post.category}
                    </p>
                    <a href="#" className="text-xl font-bold mt-2">
                      {post.title}
                    </a>
                    <p className="text-sm text-gray-900">{post.excerpt}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <div className="center relative inline-block select-none whitespace-nowrap rounded-full bg-gray-600 px-3.5 py-1.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                        <div className="absolute top-2/4 left-1 h-5 w-5 -translate-y-2/4">
                          <img
                            alt="tania andrew"
                            src="data:image/jpeg;base64,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"
                            className="relative inline-block h-5 w-5 translate-x-px translate-y-px rounded-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 mt-px">
                          <p className="block font-sans text-sm font-medium capitalize leading-none text-white antialiased">
                            {post.author}
                          </p>
                        </div>
                      </div>

                      <p className="mx-1">· {post.date} ·</p>
                      <p>{post.readTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
