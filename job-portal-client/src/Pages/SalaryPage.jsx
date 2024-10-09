import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';

const SalaryPage = () => {
  const [salary, setSalary] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [salaryAmount, setSalaryAmount] = useState(50); // Default salary per day
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [holidaysPerYear, setHolidaysPerYear] = useState(10);
  const [vacationDaysPerYear, setVacationDaysPerYear] = useState(15);
  const [results, setResults] = useState({});

  useEffect(() => {
    fetch("salary.json")
      .then((res) => res.json())
      .then((data) => setSalary(data));
  }, [searchText]);

  // Search functionality
  const handleSearch = () => {
    const filter = salary.filter(
      (job) =>
        job.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    setSalary(filter);
  };

  // Salary calculation logic
  const calculateSalary = () => {
    const hoursPerDay = hoursPerWeek / daysPerWeek;
    const unadjustedHourly = salaryAmount / hoursPerDay;
    const unadjustedDaily = salaryAmount;
    const unadjustedWeekly = salaryAmount * daysPerWeek;
    const unadjustedMonthly = (unadjustedWeekly * 52) / 12;
    const unadjustedAnnual = unadjustedWeekly * 52;

    const totalWorkDaysPerYear = 260 - holidaysPerYear - vacationDaysPerYear;
    const adjustedHourly = (unadjustedHourly * 260) / totalWorkDaysPerYear;
    const adjustedDaily = (unadjustedDaily * 260) / totalWorkDaysPerYear;
    const adjustedWeekly = (unadjustedWeekly * 260) / totalWorkDaysPerYear;
    const adjustedMonthly = (adjustedWeekly * 52) / 12;
    const adjustedAnnual = adjustedWeekly * 52;

    setResults({
      unadjusted: {
        hourly: unadjustedHourly.toFixed(2),
        daily: unadjustedDaily.toFixed(2),
        weekly: unadjustedWeekly.toFixed(2),
        monthly: unadjustedMonthly.toFixed(2),
        annual: unadjustedAnnual.toFixed(2),
      },
      adjusted: {
        hourly: adjustedHourly.toFixed(2),
        daily: adjustedDaily.toFixed(2),
        weekly: adjustedWeekly.toFixed(2),
        monthly: adjustedMonthly.toFixed(2),
        annual: adjustedAnnual.toFixed(2),
      },
    });
  };

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <PageHeader title={"Estimate Salary"} path={"Salary"} />

      {/* Job salary search input and button */}
      <div className='mt-5'>
        <div className="search-box p-2 text-center mb-2">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
            placeholder="Search for a job..."
          />
          <button
            onClick={handleSearch}
            className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4"
          >
            Search
          </button>
        </div>
      </div>

      {/* Salary card list */}
      <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12'>
        {salary.map((data) => (
          <div key={data.id} className='shadow px-4 py-8'>
            <h4 className='font-semibold text-xl'>{data.title}</h4>
            <p className='my-2 font-medium text-blue text-lg'>{data.salary}</p>
            <div className='flex flex-wrap gap-4'>
              <a href='/' className='underline'>{data.status}</a>
              <a href='/' className='underline'>{data.skills}</a>
            </div>
          </div>
        ))}
      </div>

      {/* Salary Calculator */}
      <div className="calculator-section mt-10">
        <h2 className="text-2xl font-bold mb-4">Salary Calculator</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label>Salary Amount (Per Day)</label>
            <input
              type="number"
              value={salaryAmount}
              onChange={(e) => setSalaryAmount(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label>Hours Per Week</label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label>Days Per Week</label>
            <input
              type="number"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label>Holidays Per Year</label>
            <input
              type="number"
              value={holidaysPerYear}
              onChange={(e) => setHolidaysPerYear(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label>Vacation Days Per Year</label>
            <input
              type="number"
              value={vacationDaysPerYear}
              onChange={(e) => setVacationDaysPerYear(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
        <button
          onClick={calculateSalary}
          className="mt-5 bg-blue text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Calculate
        </button>
      </div>

      {/* Salary Calculation Results with Table */}
      {results.unadjusted && (
        <div className="results-section mt-10">
          <h3 className="text-xl font-semibold mb-4">Calculation Results</h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Hourly</th>
                  <th className="px-4 py-2">Daily</th>
                  <th className="px-4 py-2">Weekly</th>
                  <th className="px-4 py-2">Monthly</th>
                  <th className="px-4 py-2">Annual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Unadjusted</td>
                  <td className="border px-4 py-2">${results.unadjusted.hourly}</td>
                  <td className="border px-4 py-2">${results.unadjusted.daily}</td>
                  <td className="border px-4 py-2">${results.unadjusted.weekly}</td>
                  <td className="border px-4 py-2">${results.unadjusted.monthly}</td>
                  <td className="border px-4 py-2">${results.unadjusted.annual}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Adjusted</td>
                  <td className="border px-4 py-2">${results.adjusted.hourly}</td>
                  <td className="border px-4 py-2">${results.adjusted.daily}</td>
                  <td className="border px-4 py-2">${results.adjusted.weekly}</td>
                  <td className="border px-4 py-2">${results.adjusted.monthly}</td>
                  <td className="border px-4 py-2">${results.adjusted.annual}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

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

export default SalaryPage;
