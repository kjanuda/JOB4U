import { useState } from "react";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import Swal from 'sweetalert2';

const Card = ({ data }) => {
  const { _id, companyLogo, jobTitle, companyName, jobLocation, employmentType, minPrice, maxPrice, postingDate, description } = data;

  // State to control the form modal visibility
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cv: null,
  });

  // Function to handle the "Apply Now" button click
  const handleApplyClick = () => {
    setShowForm(true); // Show the modal when the button is clicked
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle file upload
  const handleFileUpload = (e) => {
    setFormData({ ...formData, cv: e.target.files[0] });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    const result = await Swal.fire({
      title: 'Submit your application?',
      text: "Please confirm the submission of your details.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      console.log("Submitting application...", formData);
      Swal.fire('Submitted!', 'Your application has been submitted successfully.', 'success');
      setShowForm(false);
      setFormData({ name: '', email: '', cv: null });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'Your application was not submitted.', 'error');
    }
  };

  // Function to handle "Back" button click
  const handleBackClick = () => {
    setShowForm(false); // Close the modal when "Back" is clicked
  };

  // Inline styles for modal and background blur effect
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(5px)',
    zIndex: 1000,
  };

  const modalContentStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1001,
    width: '90%',
    maxWidth: '500px',
  };

  return (
    <div>
      <section className="card p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300">
        <div className="flex gap-4 flex-col sm:flex-row items-start">
          <img src={companyLogo} alt={jobTitle} className="w-16 h-16 mb-4 object-contain" />
          <div className="card-details flex-1">
            <h4 className="text-primary mb-1">{companyName}</h4>
            <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>

            {/* Job Meta Information */}
            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
              <span className="flex items-center gap-2"><FiMapPin /> {jobLocation}</span>
              <span className="flex items-center gap-2"><FiClock /> {employmentType}</span>
              <span className="flex items-center gap-2"><FiDollarSign /> {minPrice}-{maxPrice}k</span>
              <span className="flex items-center gap-2"><FiCalendar /> {postingDate}</span>
            </div>

            {/* Job Description */}
            <p className="text-base text-primary/70">{description}</p>
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-4 text-right">
          <button
            onClick={handleApplyClick}
            className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition duration-300 focus:outline-none"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* Conditionally render the form modal */}
      {showForm && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3 className="text-lg font-semibold mb-4">Job Information</h3>
            <div className="flex items-center mb-4">
              <img src={companyLogo} alt={companyName} className="w-10 h-10 mr-2" />
              <div>
                <h4 className="text-lg font-semibold">{jobTitle}</h4>
                <p className="text-primary/70">Company: {companyName}</p>
                <p className="text-primary/70">Salary: {minPrice}-{maxPrice}k</p>
              </div>
            </div>
            <p className="text-base text-primary/70 mb-4">{description}</p>

            <form onSubmit={handleSubmit} className="p-4">
              <h3 className="text-lg font-semibold mb-4">Submit your Application</h3>

              {/* Name Input */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* CV Upload */}
              <div className="mb-4">
                <label htmlFor="cv" className="block text-sm font-medium text-gray-700">Upload CV</label>
                <input
                  type="file"
                  name="cv"
                  id="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 focus:outline-none mr-2"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={handleBackClick}
                  className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition duration-300 focus:outline-none"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
