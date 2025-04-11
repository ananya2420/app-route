"use client";

import { useRef } from "react";

export default function Home() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    console.log("Email:", enteredEmail);
    console.log("Feedback:", enteredFeedback);

    const reqBody ={email:enteredEmail,text:'enteredFeedback'}

    fetch('/api/feedback',{
      method:'POST',
      body: JSON.stringify(reqBody),
      headers:{
        'content-type':'application/json'
      }
    }).then(response=>response.json()).then(data=>console.log(data))
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">The Home Page</h1>
      <form
        onSubmit={submitFormHandler}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email Address
          </label>
          <input
            type="email"
            id="email"
            ref={emailInputRef}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
            Your Feedback
          </label>
          <input
            type="text"
            id="feedback"
            ref={feedbackInputRef}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Send Feedback
        </button>
      </form>
    </div>
  );
}

