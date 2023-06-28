import React from 'react'
import '../App.css'

/* import: 3x3 header map image */
import map_1 from '../assets/map_1.png'
import map_2 from '../assets/map_2.png'
import map_3 from '../assets/map_3.png'
import map_4 from '../assets/map_4.png'
import map_5 from '../assets/map_5.png'
import map_6 from '../assets/map_6.png'
import map_7 from '../assets/map_7.png'
import map_8 from '../assets/map_8.png'
import map_9 from '../assets/map_9.png'

/* import: pop-up images (correspond to hover over 3x3 map tiles) */
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

    /********************/
   /** MOUSE POSITION **/
  /********************/
  /* state: track mouse position */
  const [mousePosition, setMousePosition] = React.useState({
    x: 0,
    y: 0
  })
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


      /********************/
     /*** MAP HOVERING ***/
    /********************/
  /* state: track tile hovered */
  const [tileHovered, setTileHovered] = React.useState(0)
  /* element mapping: render img elems for each 3x3 map tile image */
  const mapImages = [map_1, map_2, map_3, map_4, map_5, map_6, map_7, map_8, map_9]
  const mapImageElems = mapImages.map((file, index) => (
    <img key={index + 1}
         id={index + 1}
         src={file} 
         onMouseEnter={() => setTileHovered(index + 1)}
         onMouseLeave={() => setTileHovered(0)}
    />
  ))
  /* preload: preload popup archive images (only appear on hover) */
  const archiveImages = [archive_1, archive_2, archive_3, archive_4, archive_5, archive_6, archive_7, archive_8, archive_9]
  React.useEffect(() => {
    archiveImages.forEach(img => new Image().src = img)
  }, [])
  /* style: define position of popup archive images to follow mouse cursor 
     (uses mousePosition state) */
  const positionToFollowCursorStyling = {
    left:mousePosition.x,
    top:mousePosition.y + window.scrollY
  }


     /********************/
    /** RAINBOW TITLE ***/
   /********************/
  /* element mapping: set up array tracking title colors for each character */
  const title = 'Mapping Queer Seoul'
  const rainbow = ['#EE705F', '#ED8450', '#EC9740', '#EEAD42', '#EFC344', '#BFC255', '#8EC065', '#7BABA0', '#6896DB', '#8C7CD7', '#B061D3'];
  const defaultTitleColors = {}
  for (let i = 0; i < title.length; i++) {
    defaultTitleColors[i] = 'black'
  }
  /* state: track title colors for each character. randomize on hover. */
  const [titleColors, setTitleColors] = React.useState(defaultTitleColors)
  function randomizeCharColor(event) {
    setTitleColors(prevTitleColors => ({
      ...prevTitleColors,
      [event.target.id]: `${rainbow[Math.floor(Math.random() * rainbow.length)]}`
    }))
  }
  /* element mapping: render span elems of each correctly-colored character in title */
  const titleElems = title.split('').map((char, index) => (
    <span key={index} 
          id={index} 
          onMouseOver={randomizeCharColor}
          style={{color:titleColors[index]}}
    >
    {char}</span>
  ))

  /* behavior: handle click of downBtn arrow */
  function scrollDown() {
    props.resultRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  
     /********************/
    /*** RESPONSIVITY ***/
   /********************/
  /* responsivity (mobile): handle touchscreen clicks as hover events 
     to keep map and title interactivity */
  const [isDragging, setIsDragging] = React.useState(false)
  /* state: track current finger touch coordinates and element touched */
  const [currTouchInfo, setCurrTouchInfo] = React.useState({
    x:0,
    y:0,
    element:null
  })
  function handleMobileDrag(event) {
    setCurrTouchInfo({
      x:event.touches[0].clientX, 
      y:event.touches[0].clientY,
      get element() {
        return document.elementFromPoint(this.x, this.y)
      }
    })
  }
  /* effect: when currTouchInfo changes, set archive popup image (tileHovered) or title character color (titleColors) 
     states to correct values if finger is touching map or title. */
  React.useEffect(() => {
    if (currTouchInfo.element) {
      if (currTouchInfo.element.tagName === 'IMG') {
        setTileHovered(currTouchInfo.element.id)
      } else if (currTouchInfo.element.tagName === 'SPAN') {
        setTitleColors(prevTitleColors => ({
          ...prevTitleColors,
          [currTouchInfo.element.id]: `${rainbow[Math.floor(Math.random() * rainbow.length)]}`
        }))
      } else {
        if (tileHovered != 0) setTileHovered(0)
      }
    }
  }, [currTouchInfo])
  /* effect: when no longer dragging finger on touchscreen, remove archive popup image */
  React.useEffect(() => {
    if (!isDragging) setTileHovered(0)
  }, [isDragging])


     /*********************/
    /*** JSX RENDERING ***/
   /*********************/
  return (
    <div style={{touchAction: currTouchInfo.element
                  && (currTouchInfo.element.tagName === 'IMG' || currTouchInfo.element.tagName === 'SPAN')
                     ? 'none' 
                     : 'auto'}}>
      <nav onTouchStart={() => setIsDragging(true)}
           onTouchMove={handleMobileDrag}
           onTouchEnd={() => setIsDragging(false)}>
         <div>
           <div className='Header--tiles'>
             {mapImageElems}
           </div>
           {tileHovered != 0 
               && <img className='Header--archiveImgPopUp' 
                         src={archiveImages[(tileHovered) - 1]} 
                         style={isDragging 
                                   ? {left:currTouchInfo.x, top:currTouchInfo.y}
                                   : positionToFollowCursorStyling}
                   />
           }
         </div>
 
         <div className='Header--text'>
           <h1>{titleElems}</h1>
           <h3>A digital mapping project for historically queer spaces in Seoul, South Korea.</h3>
           <button className='Header--downBtn' onClick={scrollDown}>↓</button>
         </div>
       </nav>
    </div>
  )
}