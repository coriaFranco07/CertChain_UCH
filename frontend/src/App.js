import './App.css';
import { Route, Routes, Navigate, useLocation, BrowserRouter} from 'react-router-dom';
import UploadCert from "./views/UploadCert";
import ViewCert from "./views/ViewCert";
import Navbar from './components/Navbar';
import Register from "./views/Register";
import PrivateRoute from './PrivateRoute';
import Login from "./views/Login";
import Validate from "./views/NftValidation";

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/login','/register','/mis-evidencias'];

  return (
    <div className="App">
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/carga-evidencias" />} />
         <Route path="/carga-evidencias" element={<PrivateRoute element={<UploadCert />} />} /> 
        {/*<Route path="/mis-evidencias" element={<PrivateRoute element={<ViewCert />} />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mis-evidencias" element={<ViewCert />} /> 
        <Route path="/validate" element={<Validate />} />
      </Routes>
    </div>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
