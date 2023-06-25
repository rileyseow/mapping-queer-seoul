import React from 'react'
import '../App.css'


export default function About() {

  const [sectionDisplays, setSectionDisplays] = React.useState({
    background:{
      shown:false,
      glowColor:'none'
    },
    sources:{
      shown:false,
      glowColor:'none'
    },
    todo:{
      shown:false,
      glowColor:'none'
    }
  })

  const pastelRainbow = ['#ffc6bf', '#fccdb5', '#fed3a8', '#ffc973', '#ffebb0', '#dfe1ab', '#c9deb9', '#b8dbd3', '#b1cefa', '#c8bff0', '#dfbfed']
  function setGlow(name) {
    setSectionDisplays(prevSectionDisplays => ({
      ...prevSectionDisplays,
      [name]: {
        shown:prevSectionDisplays[name].shown,
        glowColor: `0 0 100px 0.1px ${pastelRainbow[Math.floor(Math.random() * pastelRainbow.length)]}`
      }
    }))
  }
  function removeGlow(name) {
    setSectionDisplays(prevSectionDisplays => ({
      ...prevSectionDisplays,
      [name]: {
        shown:prevSectionDisplays[name].shown,
        glowColor: 'none'
      }
    }))
  }
  
  function toggleDisplay(name) {
    setSectionDisplays(prevSectionDisplays => ({
      ...prevSectionDisplays,
      [name]: {
        shown:!prevSectionDisplays[name].shown,
        glowColor: (prevSectionDisplays[name].shown === true
                     && prevSectionDisplays[name].glowColor != 'none') 
                        ? 'none'
                        : prevSectionDisplays[name].glowColor
      }
    }))
  }

  return (
    <section>

      <h1>About</h1>

      <fieldset onClick={() => toggleDisplay('background')}
                onMouseEnter={() => setGlow('background')} 
                onMouseLeave={() => removeGlow('background')} 
                style={{boxShadow: sectionDisplays.background.glowColor,
                        cursor:'pointer'
                      }}
      >
        <legend className='accordion'>Project Background +</legend>
        {sectionDisplays.background.shown &&
          <div className='panel'>
            <p>Lying at the intersection of the digital humanities and Korean studies, this project is interested in the preservation and accessibility of an informational and photographic archive of lived queer experience in South Korea during the second half of the twentieth century.</p> 
            <p>The site aims to localize and visualize the physical spaces that were taken up, repurposed, and/or queered by South Koreans during a period of rapid industrialization, growing economic inequality, and authoritarian rule — circumstances which presented unique and difficult constraints for sexual and gender non-conforming groups. </p>
            <p>In particular, the end of the Korean War (1953) until South Korea's first democratic elections (1987) saw the country under various dictatorships which disseminated particularly stringent cultural messaging against queerness. And while a subversive counterculture remained active, particularly in the cultural epicenter of Seoul, by necessity queerness was almost always pushed underground, hidden, or camouflaged.</p>
            <p>This project is part of an attempt to make these histories and spaces more visible in a way that touches both past and present. It might serve as a learning resource, or as a tour guide for your next trip to Seoul.</p>
          </div>
        }
      </fieldset>

      <fieldset onClick={() => toggleDisplay('sources')}
                onMouseEnter={() => setGlow('sources')} 
                onMouseLeave={() => removeGlow('sources')} 
                style={{boxShadow: sectionDisplays.sources.glowColor,
                        cursor:'pointer'
                      }}
      >
        <legend className='accordion'>Sources +</legend>
        {sectionDisplays.sources.shown && 
          <div className='panel'>
            <p>This project is based on the work of Professor Todd Henry, UCSD. Neighborhood descriptions are copied directly from his lecture pamphlet on gay spatiality in authoritarian-era Seoul (see below). Everything else is written in my own words — but the inspiration for this project and, widely, its informational credit, go to Professor Henry and should be cited accordingly.</p>
            <br/>
            <p>For further reference, see:</p>
              <ul>
                <li>Todd A. Henry, "Gay and Queer Map of Authoritarian-Era Seoul (1950-1990)" [prepared for film premiere of 'Paradise' (Minki Hong, Director, and Todd A. Henry, Producer), December 2022].</li>  
              </ul>
            
            <p>Images from:</p>
            <ul>
              <li>Korea Queer Archive (<a target='_blank' href='https://queerarchive.org/'>https://queerarchive.org/</a>)</li>
            </ul>

            <p>Embedded using:</p>
            <ul>
              <li>Universal Viewer (<a target='_blank' href='https://universalviewer.io'>https://universalviewer.io</a>)</li>
            </ul>

            <p>Design / methodology inspiration from:</p>
            <ul>
              <li>The U.S. Press Freedom Tracker (<a target='_blank' href='https://pressfreedomtracker.us/'>https://pressfreedomtracker.us/</a>)</li>
              <li>Liberated Africans (<a target='_blank' href='https://www.liberatedafricans.org/public/index.php'>https://www.liberatedafricans.org</a>)</li>
              <li>Queering the Map (<a target='_blank' href='https://www.queeringthemap.com/'>https://www.queeringthemap.com/</a>)</li>
            </ul> 
          </div>
        }
      </fieldset>

      <fieldset onClick={() => toggleDisplay('todo')}
                onMouseEnter={() => setGlow('todo')} 
                onMouseLeave={() => removeGlow('todo')} 
                style={{boxShadow: sectionDisplays.todo.glowColor,
                        cursor:'pointer'
                      }}
      >
        <legend className='accordion'>To Do's +</legend>
        {sectionDisplays.todo.shown &&   
          <div className='panel'>
            <ul>
              <li>GENERAL: make responsive and accessible (remember to center neighborhood with display flex)</li>
              <li>GENERAL: eng / kor versions (try https://googlefonts.github.io/korean/, 2nd font (도틱A1))</li>
              <br/>
              <li>NAV: lazy load header images</li>
              <br/>
              <li>NEIGHBORHOODS: add images? (slam animation? scan prof henry's neighborhood maps?)</li>
              <li>NEIGHBORHOODS: have markers remember z-indices based on click/selected history</li>
              <li>NEIGHBORHOODS: description UI updates? animate page transitions?</li>
              <br/>
              <li>DATABASE: improve search and replace functionality (correctly strip nonalphanumerics)</li>
              <li>DATABASE: replace default iiif src links with relevant ones (doesn't seem to work on universalviewer? may have to switch systems)</li>
              <li>DATABASE: searchbar</li>
              <li>DATABASE: if a lot more data, replace local data file with cloud rdbms</li>
            </ul>
          </div>
        }
      </fieldset>

    </section>
  )
}