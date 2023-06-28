import React from 'react'
import '../App.css'


export default function Row(props) {

     /*********************/
    /**** IIIF VIEWER ****/
   /*********************/
  /* state: track hover state, click state, and x-y location of each row's description keyword(s) 
     (stored in props.additionalDocumentsLinks) */
  const stateArr = new Array(props.additionalDocumentsLinks.length).fill({
    hovered:false,
    clicked: false,
    x: 0,
    y: 0
  })
  const [IIIFViewers, setIIIFViewers] = React.useState(stateArr)
  /* behavior: show + freeze IIIF viewer popup on keyword click */
  function handleKeywordClick(keywordIndex) {
    setIIIFViewers(prevIIIFViewers => prevIIIFViewers.map((elem, index) => {
      if (index === keywordIndex) {
        return({
          ...elem,
          hovered: elem.clicked ? false : true,
          clicked: !elem.clicked
        })
      } else {
        return elem
      }
    }))
  }
  /* behavior: show IIIF viewer popup on keyword hover */
  function handleKeywordHover(isHovered, keywordIndex, event) {
    setIIIFViewers(prevIIIFViewers => prevIIIFViewers.map((elem, index) => {
      if (index === keywordIndex) {
        return({
          hovered: isHovered,
          clicked: elem.clicked,
          x: window.innerWidth > 1120 
                ? (elem.x === 0 ? event.clientX - props.offsets.left + 55 : elem.x)
                : (elem.x === 0 ? event.clientX - props.offsets.left - 150 : elem.x),
          y: window.innerWidth > 1120 
                ? (elem.y === 0 ? event.clientY - props.offsets.top + props.offsets.scroll - 30 : elem.y)
                : (elem.y === 0 ? event.clientY - props.offsets.top + props.offsets.scroll + 40 : elem.y)
        })
      } else {
        return elem
      }
    }))
  }
  /* behavior: on viewport resize, reset keyword / IIIF viewer state to not clicked and default */
  React.useEffect(() => {
    function watchWidth() {
      setIIIFViewers(stateArr)
    }
    window.addEventListener('resize', watchWidth)
    return () => {
      window.removeEventListener('resize', watchWidth)
    }
  }, [])

  

     /*****************************/
    /*** DESCRIPTIONS KEYWORDS ***/
   /*****************************/
  /* element mapping: create array of each word in a neighborhood's description string. */
  let linkfulDesc = props.description.split(' ').map(word => word + ' ')
  /* element mapping: find and return starting index of each keyword */
  function searchForKeywords(keywordStr) {
    if (!props.description.includes(keywordStr)) return -1
    
    const keywordArr = keywordStr.split(' ')
    const allStartIndexMatches = []
    linkfulDesc.forEach((word, index) => {
      if (word === keywordArr[0] + ' ') allStartIndexMatches.push(index)
    })

    for (const startIndex of allStartIndexMatches) {
      // slice(0, -1) gets rid of the last trailing space
      let subArrKeywordSlice = linkfulDesc.slice(startIndex, startIndex + keywordArr.length).join('').slice(0,-1)
      // gets rid of end commas (improve later)
      if (subArrKeywordSlice.slice(-1) === ',') subArrKeywordSlice = subArrKeywordSlice.slice(0, -1)      
      if (subArrKeywordSlice === keywordStr) {
        return startIndex
      }
    }
    return -1
  }
  /* element mapping: in the array of words of a neighborhood's description string,
     replace each keyword with span (allows responsivity to clicks, hovers, etc.). */
  /* element mapping: below the span, 
     conditionally render the IIIF viewer if keyword is clicked or hovered and table is in focus.*/
  for (const keywordRow of props.additionalDocumentsLinks) {
    const keywordStr = keywordRow[0]
    const index = searchForKeywords(keywordStr)
    if (index === -1) {
      continue;
    } else {
      const indexOfKeyword = props.additionalDocumentsLinks.indexOf(keywordRow)
      linkfulDesc.splice(index, keywordStr.split(' ').length, 
          <>
            <span key={index}
                className='IIIFKeyword' 
                style={{fontWeight: IIIFViewers[indexOfKeyword].clicked ? '700' : '400'}}
                onClick={() => handleKeywordClick(indexOfKeyword)}
                onMouseEnter={() => handleKeywordHover(true, indexOfKeyword, event)}
                onMouseLeave={() => handleKeywordHover(false, indexOfKeyword, event)}>
            {keywordStr} </span>
          
            {(IIIFViewers[indexOfKeyword].hovered 
                || IIIFViewers[indexOfKeyword].clicked
              ) 
              && props.dbFocused
              && <iframe className='Row--IIIFViewer' 
                         style={{
                          width:348,
                          height:261,
                          left:IIIFViewers[indexOfKeyword].x,
                          top:IIIFViewers[indexOfKeyword].y
                        }} 
                         src={props.additionalDocumentsLinks[indexOfKeyword][1]} 
                         allowFullScreen>
                </iframe>
            }
          </>
       )
    }
  }


     /*********************/
    /*** RESPONSIVITY ****/
   /*********************/
  /* responsivity (small viewports): handle whether additional info (neighborhood, date, description, and address) 
     is shown or not for each row, on click. 
     default: only name is shown for each row */
  const [additionalInfoVisible, setAdditionalInfoVisible] = React.useState(false)
  function handleClick() {
    if (window.innerWidth <= 1120) {
      setAdditionalInfoVisible(!additionalInfoVisible)
    }
  }
  const additionalInfoStyles = {
    display: ((window.innerWidth <= 1120 && additionalInfoVisible)
                  || window.innerWidth > 1120) 
                  ? 'inline-block' : 'none'
  }

  
     /*********************/
    /*** JSX RENDERING ***/
   /*********************/
  return (
    <div className='Row'>
      <div className='Row--nameContainer' onClick={handleClick}>
        <p className='Row--name'>{props.name}</p>
        <p className='Row--plusSign' rotate={additionalInfoVisible.toString()}>+</p>
      </div>
      <p className='Row--neighborhood' style={additionalInfoStyles} >{props.neighborhood}</p>
      <p className='Row--date' style={additionalInfoStyles} >{props.date}</p>
      <p className='Row--description' style={additionalInfoStyles} >{linkfulDesc}</p>
      <a className='Row--address'  style={additionalInfoStyles} href={props.naverAddressLink} target='_blank'>{props.address}</a>
    </div>
  )
}