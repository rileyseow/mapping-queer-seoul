import React from 'react'
import '../App.css'
import Row from './Row.jsx'

/* import: data.js file of rows info */
import data from '../assets/data.js'


export default function Database() {

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


  /* state: keep track of searchbar input and only show relevant rows */
  const [searchInput, setSearchInput] = React.useState("")

  /* state: track whether db is hovered (used in Row component to render IIIF viewer only within table, not when user scrolls outside of table) */
  const [dbFocused, setDbFocused] = React.useState(false)

  /* element mapping: render Row component for each row of data */
  let rowElems = data.filter(row => row.name.toLowerCase().includes(searchInput.toLowerCase())
                                      || row.neighborhood.toLowerCase().includes(searchInput.toLowerCase()) 
                                      || row.date.toLowerCase().includes(searchInput.toLowerCase())
                                      || row.description.toLowerCase().includes(searchInput.toLowerCase())
                                      || row.address.toLowerCase().includes(searchInput.toLowerCase()))
  const numSearchResults = rowElems.length
  rowElems = rowElems.map(row => <Row key={row.id} offsets={offsets} dbFocused={dbFocused} {...row} />)


  /* state: randomize glow for "more coming soon!" subtext on hover */
  const [glow, setGlow] = React.useState(false)
  const rainbow = ['#ED715A', '#EC963F', '#EFC344', '#8EC065', '#6996DB', '#B25FD4'];
  function toggleGlow() {
    setGlow(prevGlow => !prevGlow)
  }


     /*********************/
    /*** JSX RENDERING ***/
   /*********************/
  return (
    <section>
      <h1 className='Database--title'>Search Database</h1>

      <div className='Database--search'>
        <input className='Database--searchbar' 
               type='text' 
               placeholder='Search here...'
               value={searchInput}
               onChange={event => setSearchInput(event.target.value)}>
        </input>
        <p className='Database--searchbarIcon'>🔍</p>
      </div>

      <p className='Database--resultCount'>{`${numSearchResults} result${numSearchResults != 1 ? 's' : ''} for '${searchInput}'`}</p>

      <div className='Database--tableContainer'>
        <div className='Database--table' ref={ref} 
                                         onScroll={handleScroll}
                                         onMouseEnter={() => setDbFocused(true)}
                                         onMouseLeave={() => setDbFocused(false)}>
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