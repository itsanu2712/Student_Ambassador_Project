import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import { Header } from './components/Header'
import Footer from './components/Footer'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ApplyNow } from './pages/ApplyNow'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventDetailPage from './pages/EventDetailPage'
import Dashboard from './pages/Dashboard'
import AllAmbassadors from "./pages/AllAmbassadors.jsx"
import About from './pages/About.jsx'

export default function App(){
  return (
    <BrowserRouter>
      <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/event/:id" element={<EventDetailPage />} />
      <Route path='/dashboard' element={<Dashboard />} />

      <Route path='/applyNow' element={<ApplyNow/>}/>
      <Route path='/allAmbassadors' element={<AllAmbassadors />} />
      <Route path='/about' element={<About />} />
    </Routes>
    <Footer />
    <ToastContainer />
    </BrowserRouter>
    
  )
}