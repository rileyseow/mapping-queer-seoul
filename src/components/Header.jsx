import React from 'react'
import '../App.css'

import map_1 from '../assets/map_1.png'
import map_2 from '../assets/map_2.png'
import map_3 from '../assets/map_3.png'
import map_4 from '../assets/map_4.png'
import map_5 from '../assets/map_5.png'
import map_6 from '../assets/map_6.png'
import map_7 from '../assets/map_7.png'
import map_8 from '../assets/map_8.png'
import map_9 from '../assets/map_9.png'

import archive_1 from '../assets/archive_1.png'
import archive_2 from '../assets/archive_2.png'
import archive_3 from '../assets/archive_3.png'
import archive_4 from '../assets/archive_4.png'
import archive_5 from '../assets/archive_5.png'
import archive_6 from '../assets/archive_6.png'
import archive_7 from '../assets/archive_7.png'
import archive_8 from '../assets/archive_8.png'
import archive_9 from '../assets/archive_9.png'


export default function Header(props) {

  const [mousePosition, setMousePosition] = React.useState({
    x: 0,
    y: 0
  })
  window.onscroll = function() {
  }
  React.useEffect(() => {
    function mouseMove(event) {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      })
    }
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  const [tileHovered, setTileHovered] = React.useState(0)
  const mapImages = [map_1, map_2, map_3, map_4, map_5, map_6, map_7, map_8, map_9]
  const mapImageElems = mapImages.map((file, index) => (
    <img key={index}
         src={file} 
         onMouseEnter={() => setTileHovered(index + 1)}
         onMouseLeave={() => setTileHovered(0)}
    />
  ))
  const archiveImages = [archive_1, archive_2, archive_3, archive_4, archive_5, archive_6, archive_7, archive_8, archive_9]
  const positionToFollowCursorStyling = {
    left:mousePosition.x,
    top:mousePosition.y + window.scrollY
  }

  React.useEffect(() => {
    archiveImages.forEach(img => new Image().src = img)
  }, [])

  const title = 'Mapping Queer Seoul'
  const defaultTitleColors = {}
  for (let i = 0; i < title.length; i++) {
    defaultTitleColors[i] = 'black'
  }
  const rainbow = ['#EE705F', '#ED8450', '#EC9740', '#EEAD42', '#EFC344', '#BFC255', '#8EC065', '#7BABA0', '#6896DB', '#8C7CD7', '#B061D3'];
  const [titleColors, setTitleColors] = React.useState(defaultTitleColors)
  function randomizeCharColor(event) {
    setTitleColors(prevTitleColors => ({
      ...prevTitleColors,
      //[event.target.id]: `#${Math.floor(Math.random()*16777215).toString(16)}`
      [event.target.id]: `${rainbow[Math.floor(Math.random() * rainbow.length)]}`
    }))
  }
  const titleElems = title.split('').map((char, index) => (
    <span key={index} 
          id={index} 
          onMouseOver={randomizeCharColor}
          style={{color:titleColors[index]}}
    >
    {char}</span>
  ))

  function scrollDown() {
    props.resultRef.current?.scrollIntoView({behavior: 'smooth'})
  }


  return (
    <nav>
      <div>
        <div className='Header--tiles'>
          {mapImageElems}
        </div>
        {tileHovered != 0 
            && <img className='Header--archiveImgPopUp' 
                      src={archiveImages[(tileHovered) - 1]} 
                      style={positionToFollowCursorStyling}
              />
        }
      </div>

      <div className='Header--text'>
        <h1>{titleElems}</h1>
        <h3>A digital mapping project for historically queer spaces in Seoul, South Korea.</h3>
        <button className='Header--downBtn' onClick={scrollDown}>↓</button>
      </div>
    </nav>
  )
}