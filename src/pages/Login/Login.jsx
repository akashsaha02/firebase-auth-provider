import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import auth from '../../firebase/firebase.init';

const Login = () => {
    const emailRef = useRef();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User logged in:', user);
                // Redirect or update UI after login
                if (!user.emailVerified) {
                    setErrorMessage('Please verify your email address to continue');
                    return;
                }
                setUser(user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.error('Error logging in:', errorMessage);
                setErrorMessage(errorMessage);
                setUser(null);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleForgetPassword = () => {
        // Add code to handle forgot password
        const email = emailRef.current.value;
        if (!email) {
            setErrorMessage("Please enter your email address to reset your password");
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Password reset email sent");
            })
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="">
                    {user && (
                        <div className="p-4 text-center text-green-600 bg-green-100 rounded-md flex flex-col justify-center items-center gap-2">
                            <img src={user.photoURL} alt="Avater" className='w-20 rounded-full border-2 border-red-500' />
                            <p className=""> Logged in successfully! {user.displayName || user.email}</p>

                        </div>
                    )}
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-700">Login to Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            ref={emailRef}
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-4 mt-6 flex items-center text-gray-600 hover:text-gray-800"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="">
                        <Link to="" onClick={() => handleForgetPassword()} className="text-sm text-blue-500 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600">
                    Don’t have an account?{' '}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Register
                    </a>
                </p>

                {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Login;
