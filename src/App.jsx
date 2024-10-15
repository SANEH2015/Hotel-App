import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import ReactDOM from "react-dom/client";
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import LoginAdmin from './pages/LoginAdmin'
import AdminPage from './pages/AdminPage'
import Accommodation from './pages/Accommodation'
import BookingPage from './pages/BookingPage'
import Bokingview from './pages/Bokingview'
import BookingHistory from './pages/BookingHistory'
import PaymentPage from './pages/PaymentPage'
import CheckoutPage from './pages/CheckoutPage'
import FaviratePage from './pages/FaviratePage'
import RatingPage from './pages/RatingPage'
import AdminPost from './pages/AdminPost'
import RegisterPage from './pages/RegisterPage'
import RegisterAdmin from './pages/RegisterAdmin'
import Layout from './pages/Layout';
import Footer from './component/Footer';
import Nav from './component/Nav';

function App() {


  return (
 
      <BrowserRouter>
      <Nav/>
    <div className='h-screen'>
    <Routes>

<Route path="/" element={<Layout />}>
  <Route index element={<LandingPage />} />
  <Route path ="LoginPage" element={<LoginPage />} />
  <Route path="LoginAdmin" element={<LoginAdmin />} />
  <Route path="ProfilePage" element={<ProfilePage />} />
  <Route path="AdminPage" element={<AdminPage />} />
  <Route path="Accommodation" element={<Accommodation />} />
  <Route path="Bokingview" element={<Bokingview />} />
  <Route path="BookingPage" element={<BookingPage />} />
  <Route path="BookingHistory" element={<BookingHistory />} />
  <Route path="PaymentPage" element={<PaymentPage />} />
  <Route path="CheckoutPage" element={<CheckoutPage />} />
  <Route path="FaviratePage" element={<FaviratePage />} />
  <Route path="RatingPage" element={<RatingPage />} />
  <Route path="AdminPost" element={<AdminPost />} />
  <Route path="RegisterPage" element={<RegisterPage />} />
  <Route path="RegisterAdmin" element={<RegisterAdmin />} />
  <Route path="LandingPage" element={<LandingPage />} />
  <Route path="FaviratePage" element={<FaviratePage />} />
  <Route path="RatingPage" element={<RatingPage />} />
  <Route path="AdminPost" element={<AdminPost />} />
  <Route path="RegisterPage" element={<RegisterPage />} />
  <Route path="RegisterAdmin" element={<RegisterAdmin />} />
  {/* <Route path="*" element={<NoPage />} /> */}
</Route>
</Routes> 
    </div>
      <Footer />
    </BrowserRouter>
  
   
  )
}

export default App
