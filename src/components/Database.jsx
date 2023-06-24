import React from 'react'
import '../App.css'
import Row from './Row.jsx'
import data from '../assets/data.js'


export default function Database() {

  const [glow, setGlow] = React.useState(false)
  const rainbow = ['#ED715A', '#EC963F', '#EFC344', '#8EC065', '#6996DB', '#B25FD4'];
  function toggleGlow() {
    setGlow(prevGlow => !prevGlow)
  }

  const ref = React.useRef(null)
  const [offsets, setOffsets] = React.useState({
    left:0,
    top:0,
    scroll:0
  })
  window.onscroll = function() {
    setOffsets(prevOffsets => ({
      ...prevOffsets,
      left: ref.current.getBoundingClientRect().left,
      top: ref.current.getBoundingClientRect().top
    }))
  }
  function handleScroll(event) {
    setOffsets(prevOffsets => ({
      ...prevOffsets,
      scroll: event.target.scrollTop
    }))
  }
  const [hover, setHover] = React.useState(false)
  const rowElems = data.map(row => <Row key={row.id} offsets={offsets} dbFocused={hover} {...row} />)

  return (
    <section>
      <h1 className='Database--title'>Search Database</h1>

      <div className='Database--tableContainer'>
        <div className='Database--table' ref={ref} 
                                         onScroll={handleScroll} 
                                         onMouseEnter={() => setHover(true)}
                                         onMouseLeave={() => setHover(false)}>
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