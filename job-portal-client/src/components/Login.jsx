import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import Swal from "sweetalert2"; 
import { FaGoogle } from "react-icons/fa"; 

const Login = () => {
  const [user, setUser] = useState(null); 
  const [email, setEmail] = useState(''); // State to store Gmail address
  const [phoneNumber, setPhoneNumber] = useState(''); // State to store phone number
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = (provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user); 

        Swal.fire({
          title: "Login Successful!",
          text: `Welcome, ${user.displayName}`,
          icon: "success",
          confirmButtonText: "Go to Homepage",
        }).then(() => {
          window.location.href = "http://localhost:5173/";
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          title: "Login Failed!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gmail:", email);
    console.log("Phone Number:", phoneNumber);
    // You can add additional validations or logic here
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md">
        <a href="/" className="flex items-center gap-2 mb-6 text-2xl text-blue-600 font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 24 24" fill="none" stroke="#3575E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-briefcase">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 3v4H8V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="text-black font-bold">JOB4U</span>
        </a>
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Login to Your Account</h1>

        {user ? (
          <div className="text-center mb-6">
            <img src={user.photoURL} alt={user.displayName} className="w-20 h-20 rounded-full mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-800">Welcome, {user.displayName}!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Input field for Gmail address */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Enter your Gmail address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@gmail.com"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Input field for phone number */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Enter your phone number
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone number"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Google login button */}
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={() => handleLogin(googleProvider)}
                className="flex items-center justify-center bg-blue text-white p-4 rounded-full transition duration-300 hover:bg-blue-700"
              >
                <FaGoogle size={24} className="mr-2" />
                Login with Google
              </button>
            </div>
          </form>
        )}

        <div className="text-center mt-6">
          <a href="#" className="text-blue-500 text-sm">Don't have a Job4U Account?</a>
        </div>
        <div className="text-center mt-2">
          <a href="#" className="text-blue-500 text-sm">How do I login?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
