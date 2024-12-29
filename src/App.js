import React from 'react'
import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Outlet, NavLink, Link} from "react-router-dom";
import './Styles.css'
import Note from './Note';
import DraggableNotes from './DraggableNotes';
import Login from './Login';
import Typing from './Typing'
import Blog from './Blog'
import Animation from './Animation'

function App() {
  const [status, setStatus] = useState('');



const Home = () => {


  return <h1>{status}</h1>;
}

const Contact = () => {
  return (
    <div className='hello'>
      <h2>Contact</h2>
    </div>
  )
}

const Layout = () => {


  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'active-link' : undefined} to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'active-link' : undefined} to="/blogs">Blogs</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'active-link' : undefined} to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'active-link' : undefined} to="/note">Note</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'active-link' : undefined} to="/drag">drag</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'active-link' : undefined} to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'active-link' : undefined} to="/typing">Typing</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'active-link' : undefined} to="/blog">Blog</NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => isActive ? 'active-link' : undefined} to="/animation">Animation</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};




const Blogs = () => {
  return (
    <div className='hello'>
      <h2>Blogs</h2>
      <nav>
        <ul>
          <li>
            <Link to={'sandy'}>1</Link>
          </li>
          <li>
            <Link to={'bandy'}>2</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

const NoPage = () => {
  return <h1>404</h1>;
};

<Note />




  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home status={status} setStatus={setStatus} />} />
          <Route path="blogs" element={<Blogs />}>
            <Route index path="sandy" element={<h1>Blog Post1</h1>} />
            <Route path="bandy" element={<h1>Blog Post2</h1>} />
          </Route>
          <Route path="contact" element={<Contact />} />
          <Route path="note" element={<Note />} />
          <Route path="drag" element={<DraggableNotes />} />
          <Route path="login" element={<Login status={status} setStatus={setStatus} />} />
          <Route path="typing" element={<Typing />} />
          <Route path="blog" element={<Blog />} />
          <Route path="animation" element={<Animation />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
