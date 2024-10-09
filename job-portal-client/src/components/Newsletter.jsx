import React, { useState } from 'react';
import { FaEnvelope, FaRocket, FaFilePdf, FaUpload } from 'react-icons/fa'; // Import necessary icons

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState(''); // Message for email subscription
  const [file, setFile] = useState(null); // State for storing the uploaded file
  const [fileMessage, setFileMessage] = useState(''); // Message for file upload

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailMessage('Please enter a valid email address.');
      return;
    }

    setEmailMessage('Thank you for subscribing!');
    setEmail(''); // Clear email input after submission
  };

  const handleFileUpload = (e) => {
    e.preventDefault();

    // File validation (check if a file is uploaded and its type is PDF)
    if (!file) {
      setFileMessage('Please upload a PDF file.');
      return;
    }
    if (file && file.type !== 'application/pdf') {
      setFileMessage('Only PDF files are allowed.');
      return;
    }

    // Placeholder for actual file upload logic
    setFileMessage('PDF successfully uploaded!');
    setFile(null); // Clear file input after submission
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">Join Our Newsletter</h3>
      <p className="text-center text-gray-600 mb-6">
        Stay updated with the latest news, offers, articles, and trends.
      </p>

      {/* Email subscription box */}
      <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
        <div className="relative w-full">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-10 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-teal-300 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition duration-200 font-medium shadow-md flex items-center justify-center gap-2"
        >
          <FaRocket />
          Subscribe
        </button>

        {/* Email subscription message */}
        {emailMessage && (
          <p className="text-center text-sm text-green-500 mt-2 font-semibold">{emailMessage}</p>
        )}
      </form>

      {/* New PDF upload box */}
      <div className="mt-8 p-4 border border-gray-300 rounded-lg">
        <h4 className="text-xl font-semibold text-gray-800 text-center mb-4">Upload Your PDF</h4>
        <div className="relative w-full mb-4">
          <FaFilePdf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-10 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          />
        </div>

        <button
          onClick={handleFileUpload}
          className="bg-rose-400 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition duration-200 font-medium shadow-md flex items-center justify-center gap-2"
        >
          <FaUpload />
          Upload PDF
        </button>

        {/* PDF upload message */}
        {fileMessage && (
          <p className="text-center text-sm text-green-500 mt-2 font-semibold">{fileMessage}</p>
        )}
      </div>

      {/* Commercial Ad Section */}
      <div className="mt-8 p-4 border border-gray-300 rounded-lg">
        <h4 className="text-xl font-semibold text-gray-800 text-center mb-4">Sponsored Ad</h4>
        
        



        {/* Video ad player */}
<div className="relative w-full mb-4">
  <video
    width="100%"
    controls
    className="rounded-lg shadow-md"
    muted
    autoPlay
    loop
  >
    <source src="./public/images/Anura.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

</div>



         {/* Example of an animated ad (GIF) */}
         {/* Example of an animated ad (GIF) */}
{/* Video ad player */}
<div className="relative w-full mb-4">
  <video
    width="100%"
    controls
    className="rounded-lg shadow-md"
    muted
    autoPlay
    loop
  >
    <source src="./public/images/dialog.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

</div>

       
   
  );
};

export default Newsletter;
