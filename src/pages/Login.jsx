// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setUser } from "../redux/slices/userSlice";
// import { loadUserCart } from "../redux/slices/cartSlice";
// import axiosInstance from "../utils/axiosInstance";
// import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
// // import './Login.css';
// // import background from '../assets/login.png';



// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showResetModal, setShowResetModal] = useState(false);
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const response = await axiosInstance.post("/users/login", {
//         username,
//         password,
//       });

//       if (!response.data) {
//         throw new Error("Invalid response format");
//       }

//       const token = response.data;
//       const tokenParts = token.split('.');
//       const payload = JSON.parse(atob(tokenParts[1]));
//       const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      
//       dispatch(setUser({ token, role, username }));
//       dispatch(loadUserCart());
      
//       if (role === "staff") {
//         navigate("/order-tracking");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setError(error.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     if (!username) {
//       setError("Vui lòng nhập tên đăng nhập.");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setError("Mật khẩu xác nhận không khớp!");
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/auth/change-password", {
//         username,
//         password: newPassword,
//         confirmPassword,
//       });

//       if (response.data.success) {
//         alert("Mật khẩu đã được cập nhật thành công!");
//         setShowResetModal(false);
//       } else {
//         throw new Error(response.data.message || "Cập nhật mật khẩu thất bại!");
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
//         <div> 
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Đăng nhập
//           </h2>
//         </div>
//         {/* <div className="login-container">
//           <div className="login-box">
//               <h2>👋 Đăng nhập</h2>
                
//               </div>
//             </div> */}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaUser className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Tên đăng nhập"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaLock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 required
//                 className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Mật khẩu"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div className="rounded-md bg-red-50 p-4">
//               <div className="flex">
//                 <div className="ml-3">
//                   <h3 className="text-sm font-medium text-red-800">{error}</h3>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
//                 loading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {loading ? "Đang đăng nhập..." : "Đăng nhập"}
//             </button>
//           </div>
//         </form>

//         <div className="text-center mt-4">
//           <button 
//             onClick={() => setShowResetModal(true)} 
//             className="text-indigo-600 hover:text-indigo-500 font-medium"
//           >
//             Quên mật khẩu?
//           </button>
//         </div>

//         <div className="text-center mt-4">
//           <p className="text-sm text-gray-600">
//             Chưa có tài khoản?{' '}
//             <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
//               Đăng ký
//             </a>
//           </p>
//         </div>
//       </div>

//       {/* Modal Quên Mật Khẩu */}
//       {showResetModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
//             <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Quên mật khẩu</h2>
//             <div className="space-y-4">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaUser className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Tên đăng nhập"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   required
//                 />
//               </div>

//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaLock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="password"
//                   placeholder="Mật khẩu mới"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   required
//                 />
//               </div>

//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaLock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="password"
//                   placeholder="Xác nhận mật khẩu mới"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   required
//                 />
//               </div>

//               {error && (
//                 <div className="rounded-md bg-red-50 p-4">
//                   <div className="flex">
//                     <div className="ml-3">
//                       <h3 className="text-sm font-medium text-red-800">{error}</h3>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col gap-3">
//                 <button
//                   onClick={handleResetPassword}
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Cập nhật mật khẩu
//                 </button>
//                 <button
//                   onClick={() => setShowResetModal(false)}
//                   className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Hủy
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;





import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/userSlice";
import { loadUserCart } from "../redux/slices/cartSlice";
import axiosInstance from "../utils/axiosInstance";
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/users/login", {
        username,
        password,
      });

      if (!response.data) {
        throw new Error("Invalid response format");
      }

      const token = response.data;
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      
      dispatch(setUser({ token, role, username }));
      dispatch(loadUserCart());
      
      if (role === "staff") {
        navigate("/order-tracking");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!username) {
      setError("Vui lòng nhập tên đăng nhập.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await axiosInstance.post("/users/change-password", {
        username,
        password: newPassword,
        confirmPassword,
      });

      if (response.data.success) {
        alert("Mật khẩu đã được cập nhật thành công!");
        setShowResetModal(false);
      } else {
        throw new Error(response.data.message || "Cập nhật mật khẩu thất bại!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  
  return (
    <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
      <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#002D74]">Đăng nhập</h2>
          <p className="text-sm mt-4 text-[#002D74]">Nếu bạn đã có tài khoản, hãy đăng nhập ngay.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                className="pl-10 pr-3 py-2 w-full border rounded-md"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="p-2 rounded-xl border w-full pl-10 pr-10"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
          <div className="mt-4 text-sm border-b border-gray-500 py-5 text-center">
            {/* <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-500">Quên mật khẩu?</a>
             */}
             <button 
             onClick={() => setShowResetModal(true)} 
             className="text-indigo-600 hover:text-indigo-500 font-medium"
           >
             Quên mật khẩu?
           </button>
          </div>
          <div className="mt-4 text-sm flex justify-between items-center">
            <p className="mr-3">Chưa có tài khoản?</p>
            <a href="/register" className="bg-[#002D74] text-white py-2 px-5 rounded-xl hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">Đăng ký</a>
          </div>
        </div>
        {/* Modal Quên Mật Khẩu */}
       {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Quên mật khẩu</h2>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleResetPassword}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cập nhật mật khẩu
                </button>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl max-h-[400px]" src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Login illustration" />
        </div>
      </div>
    </section>
  );
};

export default Login;

