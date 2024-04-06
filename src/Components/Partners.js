import React from "react";

export default function Partners() {
  const images = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/LeetCode_Logo_black_with_text.svg/1280px-LeetCode_Logo_black_with_text.svg.png",
    "https://user-images.githubusercontent.com/1194257/65596422-1cef2080-df97-11e9-9abb-a225204d1805.png",
    "https://media.hackerearth.com/blog/wp-content/uploads/2015/09/logo_new.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Codeforces_logo.svg/2560px-Codeforces_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Codechef%28new%29_logo.svg/1200px-Codechef%28new%29_logo.svg.png",
    "https://pngimg.com/d/github_PNG65.png",
  ];

  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8  mx-auto">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-indigo-600">Track Student Performance</p>
        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
          StuTrack fetch data from various platforms
        </h3>
        <p className="mt-3">
          Here are some of the platforms from which StuTrack fetches data to
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-x-6 sm:gap-x-12 lg:gap-x-24 animate-marquee">
          {images.map((imageUrl, index) => (
            <img
              key={index}
              className="py-3 lg:py-5 w-40 sm:w-44 h-auto md:w-28 lg:w-32 mx-auto sm:mx-0"
              src={imageUrl}
              alt={`Logo ${index + 1}`}
            />
          ))}
          {images.map((imageUrl, index) => (
            <img
              key={index + images.length}
              className="py-3 lg:py-5 w-40 sm:w-44 h-auto md:w-28 lg:w-32 mx-auto sm:mx-0 object-contain"
              src={imageUrl}
              alt={`Logo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
