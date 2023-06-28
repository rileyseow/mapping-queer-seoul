import React from 'react'
import '../App.css'
import Row from './Row.jsx'

/* import: data.js file of rows info */
import data from '../assets/data.js'


export default function Database() {

  /* state: randomize glow for "more coming soon!" subtext on hover */
  const [glow, setGlow] = React.useState(false)
  const rainbow = ['#ED715A', '#EC963F', '#EFC344', '#8EC065', '#6996DB', '#B25FD4'];
  function toggleGlow() {
    setGlow(prevGlow => !prevGlow)
  }

  /* ref / state: reference .Database--table to track its top, left, and scroll offsets */
  const ref = React.useRef(null)
  const [offsets, setOffsets] = React.useState({
    left:0,
    top:0,
    scroll:0
  })
  /* behavior: update offsets on viewport (global) scroll */
  window.onscroll = function() {
    setOffsets(prevOffsets => ({
      ...prevOffsets,
      left: ref.current.getBoundingClientRect().left,
      top: ref.current.getBoundingClientRect().top
    }))
  }
  /* behavior: update offsets on table (internal) scroll */
  function handleScroll(event) {
    setOffsets(prevOffsets => ({
      ...prevOffsets,
      scroll: event.target.scrollTop
    }))
  }
  /* element mapping: render Row component for each row of data */
  const rowElems = data.map(row => <Row key={row.id} offsets={offsets} {...row} />)


     /*********************/
    /*** JSX RENDERING ***/
   /*********************/
  return (
    <section>
      <h1 className='Database--title'>Search Database</h1>

      <div className='Database--tableContainer'>
        <div className='Database--table' ref={ref} 
                                         onScroll={handleScroll}>
          <div className='Database--headerRow'>
            <p className='Row--name'>Name</p>
            <p className='Row--neighborhood'>Neighborhood</p>
            <p className='Row--date'>Est.</p>
            <p className='Row--description' id='headerDesc'>Description</p>
            <p className='Row--address'>Address</p>
          </div>
          {rowElems}
        </div>
      </div>

      <h5 className='Database--subtext'
          onMouseEnter={toggleGlow}
          onMouseLeave={toggleGlow}
          style={{filter: glow ? `drop-shadow(0 0 0.4rem ${rainbow[Math.floor(Math.random() * rainbow.length)]})` : 'none'}}>
        more coming soon!
      </h5>
    </section>
  )
}