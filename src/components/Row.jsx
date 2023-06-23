import React from 'react'
import '../App.css'


export default function Row(props) {

  const [selectedText, setSelectedText] = React.useState('black')
  function select() {
    setSelectedText('#6896DB')
  }
  function deselect() {
    setSelectedText('black')
  }

  let stateArr = new Array(props.additionalDocumentsLinks.length).fill({
    hovered:false,
    clicked: false,
    x: 0,
    y: 0
  })
  const [IIIFViewers, setIIIFViewers] = React.useState(stateArr)
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
  function handleKeywordHover(isHovered, keywordIndex, event) {
    setIIIFViewers(prevIIIFViewers => prevIIIFViewers.map((elem, index) => {
      if (index === keywordIndex) {
        return({
          hovered: isHovered,
          clicked: elem.clicked,
          x: elem.x === 0 ? event.clientX - props.offsets.left + 55 : elem.x,
          y: elem.y === 0 ? event.clientY - props.offsets.top + props.offsets.scroll - 30 : elem.y
        })
      } else {
        return elem
      }
    }))
  }
  let linkfulDesc = props.description.split(' ').map(word => word + ' ')
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


  return (
    <div className='Row'
         onMouseEnter={select}
         onMouseLeave={deselect}
         style={{color: selectedText}}
    >
      <p className='Row--name'>{props.name}</p>
      <p className='Row--neighborhood'>{props.neighborhood}</p>
      <p className='Row--date'>{props.date}</p>
      <p className='Row--description'>{linkfulDesc}</p>
      <a className='Row--address' href={props.naverAddressLink} target='_blank'>{props.address}</a>
    </div>
  )
}