import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ExamCreate() {
    const [questions, setQuestions] = useState(Array(4).fill(3)); // Initialize with default value
    const [quizData, setQuizData] = useState(null);

    // Your features array...
    const features = [
        {
            title: "YouTube Integration",
            desc: "Seamlessly create quizzes by embedding YouTube videos. Simply input the video URL, and StuTrack AI extracts the relevant content for your quiz.",
            id: "youtubeLinkInput",
            fetchContent: fetchYouTubeCaptions
        },
        {
            title: "Website Content Conversion",
            desc: "Transform any webpage into an interactive quiz. Just provide the website link, and StuTrack AI intelligently analyzes the content, allowing you to generate quizzes directly from the web.",
            id: "websiteUrlInput",
            fetchContent: fetchWebsiteText
        },
        {
            title: "PDF Upload",
            desc: "Easily convert your PDF documents into engaging quizzes. Upload your PDF files, and StuTrack AI will extract the essential information, enabling you to create dynamic quizzes in no time.",
            id: "pdfFileInput",
            fetchContent: uploadPDF
        },
        {
            title: "Manual Text Entry",
            desc: "For complete flexibility, input text manually to craft customized quizzes. Whether it's lecture notes, study materials, or any other text, StuTrack AI lets you create quizzes based on your own content.",
            id: "manualTextEntryInput",
            fetchContent: () => {} // No fetch needed for manual entry
        }
    ];

    async function uploadPDF(numberOfQuestions) {
        const pdfFileInput = document.getElementById('pdfFileInput');
        const pdfFile = pdfFileInput.files[0];
        
        const formData = new FormData();
        formData.append('pdfData', pdfFile);
        
        try {
            const response = await fetch('https://textextractforstutrack.vercel.app/extractText', {
                method: 'POST',
                body: formData,
                mode: 'cors'
            });
            
            if (response.ok) {
                const text = await response.text();
                toast.success('PDF uploaded successfully!');
                toast.success('Our StuTrack AI processing the PDF file and generating the quiz. Please wait...');
                postGeneratedText(text, numberOfQuestions);
            } else {
                toast.error('Failed to upload PDF');
            }
        } catch (error) {
            toast.error('Failed to upload PDF');
        }
    }

    async function fetchYouTubeCaptions(numberOfQuestions) {
        const youtubeLinkInput = document.getElementById('youtubeLinkInput');
        const youtubeLink = youtubeLinkInput.value;

        // Extract video ID from the YouTube link
        const videoID = extractVideoID(youtubeLink);

        try {
            const response = await fetch(`https://textextractforstutrack.vercel.app/youtubeCaptions?videoID=${videoID}`, {
                method: 'GET',
                mode: 'cors'
            });

            if (response.ok) {
                const captions = await response.text();
                postGeneratedText(captions, numberOfQuestions);
                toast.success('YouTube captions fetched successfully!');
                toast.success('Our StuTrack AI processing the YouTube video and generating the quiz. Please wait...');
            } else {
                toast.error('Failed to fetch YouTube captions');
            }
        } catch (error) {
            toast.error('Failed to fetch YouTube captions');
        }
    }

    async function fetchWebsiteText(numberOfQuestions) {
        const websiteUrlInput = document.getElementById('websiteUrlInput');
        const websiteUrl = websiteUrlInput.value;

        try {
            const response = await fetch(`https://textextractforstutrack.vercel.app/website?url=${encodeURIComponent(websiteUrl)}`, {
                method: 'GET',
                mode: 'cors'
            });

            if (response.ok) {
                const text = await response.text();
                postGeneratedText(text, numberOfQuestions);
                toast.success('Website text fetched successfully!');
                toast.success('Our StuTrack AI processing the website content and generating the quiz. Please wait...');
            } else {
                toast.error('Failed to fetch website text');    
            }
        } catch (error) {
            toast.error('Failed to fetch website text');
        }
    }

    async function fetchmanualTextEntryInput(numberOfQuestions) {
        const manualTextEntryInput = document.getElementById('manualTextEntryInput');
        const text = manualTextEntryInput.value;
        toast.success('Our StuTrack AI processing the text and generating the quiz. Please wait...');
        postGeneratedText(text, numberOfQuestions);
    }   

    function extractVideoID(url) {
        // Regular expression to extract video ID from YouTube link
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regExp);
        if (match && match[1]) {
            return match[1];
        } else {
            toast.error('Invalid YouTube link');
            return null;
        }
    }

    function postGeneratedText(generatedText, numberOfQuestions) {
        const requestData = {
            paragraph: generatedText,
            numberOfQuestions: numberOfQuestions
        };

        fetch('https://texttoquizz.onrender.com/generateQuiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Failed to generate quiz:', response.statusText);
                throw new Error('Failed to generate quiz');
            }
        })
        .then(quizData => {
            setQuizData(quizData); // Update quizData state
            toast.success('Quiz generated successfully!');
        })
        .catch(error => {
            toast.error('Failed to generate quiz');
        });
    }

    const incrementQuestions = (index) => {
        setQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index] = Math.min(updatedQuestions[index] + 1, 10);
            return updatedQuestions;
        });
    };

    const decrementQuestions = (index) => {
        setQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index] = Math.max(updatedQuestions[index] - 1, 1);
            return updatedQuestions;
        });
    };

    useEffect(() => {
        if (!quizData || !quizData.quiz) return;
        setQuizData(quizData);
    }, [quizData]);
    
    useEffect(() => {
        if (quizData && quizData.quiz && Array.isArray(quizData.quiz.questions)) {
            const quizContainer = document.getElementById('quizContainer');
            if (quizContainer) {
                quizContainer.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [quizData]);
    

    return (
        <>
        <ToastContainer />
        <section className="relative mt-20">
            <div className="flex flex-wrap justify-center">
                {features.map((item, idx) => (
                    <div key={idx} className="flex flex-col max-w-md bg-white rounded-lg shadow-md p-6 m-4">
                        <div className="mt-4">
                            <h4 className="text-lg text-black font-semibold">
                                {item.title}
                            </h4>
                            <p className="mt-3">
                                {item.desc}
                            </p>
                            <label
                                htmlFor={`questions-input-${idx}`}
                                className="block mt-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Number of questions
                            </label>
                            <div className="relative flex items-center w-full">
                                <button
                                    type="button"
                                    id={`decrement-button-${idx}`}
                                    onClick={() => decrementQuestions(idx)}
                                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    id={`questions-input-${idx}`}
                                    aria-describedby="helper-text-explanation"
                                    className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                    value={questions[idx]}
                                    readOnly
                                />
                                <button
                                    type="button"
                                    id={`increment-button-${idx}`}
                                    onClick={() => incrementQuestions(idx)}
                                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                >
                                    +
                                </button>
                            </div>
                            <div className="mt-4">
                                {item.id === "manualTextEntryInput" ? (
                                    <>
                                        <textarea
                                            placeholder="Enter your text here..."
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            id='manualTextEntryInput'
                                        />
                                        <button onClick={() => fetchmanualTextEntryInput(questions[idx])} className="mt-2 w-full rounded-md bg-[#6A64F1] py-3 px-6 text-center text-base font-semibold text-white hover:bg-[#5C58C2] focus:outline-none focus:ring focus:ring-[#6A64F1]">
                                            Generate Quiz
                                        </button>
                                    </>
                                ) : item.id === "pdfFileInput" ? (
                                    <div>
                                        <input
                                            type="file"
                                            id="pdfFileInput"
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        />
                                        <button onClick={() => item.fetchContent(questions[idx])} className="mt-2 w-full rounded-md bg-[#6A64F1] py-3 px-6 text-center text-base font-semibold text-white hover:bg-[#5C58C2] focus:outline-none focus:ring focus:ring-[#6A64F1]">
                                            Upload PDF
                                        </button>
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        placeholder={item.title === "YouTube Integration" ? "https://www.youtube.com/PLc2Cn0hhk" :
                                            item.title === "Website Content Conversion" ? "https://mahsook.tech/" : ""}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        id={item.id}
                                    />
                                )}
                                {item.id !== "pdfFileInput" && item.id !== "manualTextEntryInput" && (
                                    <button onClick={() => item.fetchContent(questions[idx])} className="mt-2 w-full rounded-md bg-[#6A64F1] py-3 px-6 text-center text-base font-semibold text-white hover:bg-[#5C58C2] focus:outline-none focus:ring focus:ring-[#6A64F1]">
                                        {item.title === "YouTube Integration" ? "Fetch YouTube Captions" : "Fetch Website Text"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}></div>
        </section>
        {quizData && quizData.quiz && Array.isArray(quizData.quiz.questions) && (
            <div id="quizContainer" className="container mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">Quiz</h2>
                {quizData.quiz.questions.map((question, index) => (
                    <div key={index} className="mb-6 p-4 bg-blue-100 rounded-md shadow-sm">
                        <p className="font-semibold text-blue-700">{index + 1}. {question.question}</p>
                        <ul className="list-disc list-inside mt-2">
                            {question.options.map((option, idx) => (
                                <li key={idx} className="text-gray-700">{option}</li>
                            ))}
                        </ul>
                        <p className="text-gray-600 mt-2">Correct Answer: <span className="font-semibold text-green-600">{question.correct_answer}</span></p>
                    </div>
                ))}
            </div>
        )}
    </>
    );
}
