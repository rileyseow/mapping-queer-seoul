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
  /* responsivity: on viewport resize, reset keyword / IIIF viewer state to not clicked and default */
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
  /* element mapping: from a neighborhood description paragraph (props.description), find each keyword listed in props.additionalDocumentsLinks. 
     replace each keyword with a span that allows responsivity to clicks, hovers, etc. 
     below the span, conditionally render the IIIF viewer if keyword is clicked or hovered and table is in focus. */
  let linkfulDesc = []
  let descIndexPointer = 0
  for (let i = 0; i < props.additionalDocumentsLinks.length; i++) {
    const keyword = props.additionalDocumentsLinks[i][0]
    const index = props.description.indexOf(keyword)

    if (index === -1) continue;

    linkfulDesc.push(props.description.slice(descIndexPointer, index))
    linkfulDesc.push(
      <>
        <span key={index}
            className='IIIFKeyword' 
            style={{fontWeight: IIIFViewers[i].clicked ? '700' : '400'}}
            onClick={() => handleKeywordClick(i)}
            onMouseEnter={() => handleKeywordHover(true, i, event)}
            onMouseLeave={() => handleKeywordHover(false, i, event)}>
        {keyword} </span>
      
        {(IIIFViewers[i].hovered 
            || IIIFViewers[i].clicked
          ) 
          && props.dbFocused
          && <iframe className='Row--IIIFViewer' 
                      style={{
                      width:348,
                      height:261,
                      left:IIIFViewers[i].x,
                      top:IIIFViewers[i].y
                    }} 
                      src={props.additionalDocumentsLinks[i][1]} 
                      allowFullScreen>
            </iframe>
        }
      </>
    )
    descIndexPointer = index + keyword.length
  }
  if (descIndexPointer < props.description.length) {
    linkfulDesc.push(props.description.slice(descIndexPointer))
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