import React from 'react'
import './App.css'

import Header from './components/Header.jsx'
import Neighborhoods from './components/Neighborhoods.jsx'
import Database from './components/Database.jsx'
import Gallery from './components/Gallery.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'


export default function App() {

  const resultRef = React.useRef(null)

  return (
    <>
      <Header resultRef={resultRef} />
      <Neighborhoods ref={resultRef} />
      <Database />
      <Gallery />
      <About />
      <Footer />
    </>
  )
}