import React, { useState } from 'react';

export default function UploadFile() {
  const [mode, setMode] = useState('file'); // Default mode is 'file'

  const toggleMode = () => {
    setMode(mode === 'file' ? 'url' : 'file'); // Toggle between 'file' and 'url'
  };

  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <div className="flex justify-between mb-6">
            <button
              className={`${
                mode === 'file' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              } px-4 py-2 rounded-md`}
              onClick={toggleMode}
            >
              Upload File
            </button>
            <button
              className={`${
                mode === 'url' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              } px-4 py-2 rounded-md`}
              onClick={toggleMode}
            >
              Attach URL
            </button>
          </div>
          <form className="py-6 px-9">
            {mode === 'file' && (
              <>
                <div className="mb-5">
                  <label htmlFor="title" className="mb-3 block text-base font-medium text-[#07074D]">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter title"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="description"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Enter description"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  ></textarea>
                </div>
                <div className="mb-6 pt-4">
                  <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                    Upload File
                  </label>
                  <div className="mb-8">
                    <input type="file" name="file" id="file" className="sr-only" />
                    <label
                      htmlFor="file"
                      className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                    >
                      <div>
                        <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                          Drop files here
                        </span>
                        <span className="mb-2 block text-base font-medium text-[#6B7280]">
                          Or
                        </span>
                        <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                          Browse
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </>
            )}
            {mode === 'url' && (
              <>
                <div className="mb-5">
                  <label htmlFor="title" className="mb-3 block text-base font-medium text-[#07074D]">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter title"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="description"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Enter description"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  ></textarea>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="url"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    URL
                  </label>
                  <input
                    type="url"
                    name="url"
                    id="url"
                    placeholder="Enter URL"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </>
            )}
            <div>
              <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Upload File
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
