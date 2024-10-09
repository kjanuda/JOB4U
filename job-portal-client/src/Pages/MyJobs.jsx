import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/myJobs/janudakodi@gmail.com`);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = () => {
    const filteredJobs = jobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setJobs(filteredJobs);
    setCurrentPage(1);
  };

  const nextPage = () => {
    if (indexOfLastItem < jobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This job will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/job/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              Swal.fire(
                'Deleted!',
                'Your job has been deleted.',
                'success'
              );
              setJobs(jobs.filter(job => job._id !== id)); // Remove job from the list
            }
          })
          .catch((error) => {
            console.error("Error deleting job:", error);
          });
      }
    });
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="my-jobs-container">
        <h1 className="text-center p-4">ALL My Jobs</h1>
        <div className="search-box p-2 text-center mb-2">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4"
          >
            Search
          </button>
        </div>

        {/* Table */}
        <section className="py-1 bg-blueGray-50">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex md:flex-row gap-4 flex-col items-center">
                  <h3 className="font-semibold text-base text-blueGray-700">All Jobs</h3>
                  <Link
                    to="/post-job"
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Post A New Job
                  </Link>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-20">
                    <p>Loading...</p>
                  </div>
                ) : (
                  <table className="items-center bg-transparent w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">
                          No.
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">
                          Title
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">
                          Company Name
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">
                          Salary
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">
                          Edit
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 py-3 text-xs uppercase font-semibold text-left">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentJobs.map((job, index) => (
                        <tr key={job._id}>
                          <td className="border-t-0 px-6 p-4 text-xs text-blueGray-700">
                            {index + 1 + indexOfFirstItem}
                          </td>
                          <td className="border-t-0 px-6 p-4 text-xs">{job.jobTitle}</td>
                          <td className="border-t-0 px-6 p-4 text-xs">{job.companyName}</td>
                          <td className="border-t-0 px-6 p-4 text-xs">${job.minPrice} - ${job.maxPrice}k</td>
                          <td className="border-t-0 px-6 p-4 text-xs">
                            <Link to={`/update-job/${job._id}`} className="text-blue-500 hover:underline">
                              Edit
                            </Link>
                          </td>
                          <td className="border-t-0 px-6 p-4 text-xs">
                            <button className="bg-red-700 py-2 px-6 text-white rounded-sm" onClick={() => handleDelete(job._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center text-black space-x-8">
            {currentPage > 1 && (
              <button onClick={prevPage} className="hover:underline">
                Previous
              </button>
            )}
            {indexOfLastItem < jobs.length && (
              <button onClick={nextPage} className="hover:underline">
                Next
              </button>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 mt-10">
        <div className="max-w-screen-2xl mx-auto text-center text-sm text-gray-600">
          <nav className="flex justify-center space-x-6 mb-4">
            {["Hiring Lab", "Career Advice", "Browse Jobs", "Companies", "Help Center"].map(
              (link) => (
                <a key={link} href="#" className="hover:text-black">
                  {link}
                </a>
              )
            )}
          </nav>
          <p>&copy; {new Date().getFullYear()} Job Portal. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MyJobs;
