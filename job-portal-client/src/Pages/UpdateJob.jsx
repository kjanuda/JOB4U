import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateJob = () => {
  const { jobId } = useParams(); // Get job ID from URL
  const [jobData, setJobData] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    minPrice: "",
    maxPrice: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the job details by ID
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/job/${jobId}`);
        const data = await response.json();
        setJobData(data); // Set job details
        setFormData({
          jobTitle: data.jobTitle,
          companyName: data.companyName,
          minPrice: data.minPrice,
          maxPrice: data.maxPrice,
        });
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/job/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: "Job updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/my-jobs"); // Redirect to MyJobs page after update
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  if (!jobData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <h1 className="text-2xl font-semibold text-center mt-8">Update Job</h1>
      <form onSubmit={handleUpdateJob} className="max-w-2xl mx-auto mt-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Minimum Salary
          </label>
          <input
            type="number"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Maximum Salary
          </label>
          <input
            type="number"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateJob;
