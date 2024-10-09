import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import Swal from 'sweetalert2';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({}); // Initialize as an empty object

  useEffect(() => {
    // Fetch job details using the job ID
    fetch(`http://localhost:5000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]); // Add `id` as a dependency to re-run the effect when ID changes

  const handleJobApply = async () => {
    // Prompt user for CV/Resume URL using SweetAlert
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "CV or Resume URL address",
      inputPlaceholder: "Enter the URL"
    });
    
    // If URL is provided, display success or failure messages
    if (url) {
      Swal.fire(`Entered URL: ${url}`).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Application Submitted Successfully!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title="Job Details Page" path="Single Job" />

      <div className="mt-10">
        <h3 className="font-semibold mb-2">Job ID: {parseInt(id)}</h3>

        <div className="my-4">
          <h2 className="text-2xl font-medium text-blue">Job details</h2>
          <p className="text-primary/75 md:w-1/3 text-sm italic my-1">
            Here<span>&apos;</span>s how the job details align with your job
            preferences. Manage job preferences anytime in your profile.
          </p>
        </div>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-2">
            <FaBriefcase />
            <p className="text-xl font-medium mb-2">Job type</p>
          </div>
          <button className="bg-blue px-6 py-1 text-white rounded-sm">
            {job.employmentType}
          </button>
          <button 
            className="bg-indigo-700 px-6 py-1 text-white rounded-sm ms-2" 
            onClick={handleJobApply}
          >
            Apply Now
          </button>
        </div>

        {/* Job Details Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mt-12">
          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Benefits</h4>
            <p className="text-sm text-primary/70 mb-2">
              Pulled from the full job description
            </p>
            <ul className="list-disc list-outside text-primary/90 space-y-2 text-base">
              <li>1. ${job.minPrice}-{job.maxPrice}k</li>
              <li>2. Disability insurance</li>
              <li>3. Employee discount</li>
              <li>4. Flexible spending account</li>
              <li>5. Health insurance</li>
              <li>6. Paid time off</li>
              <li>7. Vision insurance</li>
              <li>8. Volunteer time off</li>
              <li>9. Dental insurance</li>
            </ul>
          </div>

          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Outline</h4>
            <p className="text-primary/90">
              {job.description ? job.description : 'Job description not available.'}
            </p>
          </div>

          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Future Growth</h4>
            <p className="text-primary/90">
              We’re passionate about web design and development and are focused on delivering quality products to our customers in a team setting driven by strong culture and a good working atmosphere. We are hiring web developers at all levels of experience.
            </p>
          </div>
        </div>

        <div className="text-primary/75 my-5 space-y-6">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tempore alias dolores...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tempore alias dolores...</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tempore alias dolores...</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
