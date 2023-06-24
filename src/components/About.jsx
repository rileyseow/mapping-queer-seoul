import React from 'react'
import '../App.css'


export default function About() {

  const [glowColor, setGlowColor] = React.useState({
    background:'none',
    sources:'none',
    todo:'none'
  })
  const pastelRainbow = ['#ffa79b', '#ffb48e', '#ffbb77', '#ffc973', '#ffdf80', '#dee190', '#badc9e', '#b5d7cf', '#8eb8f6', '#b4a7ee', '#cf9ce5']
  function setGlow(name) {
    setGlowColor(prevGlowColor => ({
        ...prevGlowColor,
        [name]: `0 0 100px 0.1px ${pastelRainbow[Math.floor(Math.random() * pastelRainbow.length)]}`
      }))
  }
  function removeGlow(name) {
    setGlowColor(prevGlowColor => ({
      ...prevGlowColor,
      [name]: 'none'
    }))
  }

  const [sectionDisplays, setSectionDisplays] = React.useState({
    background: false,
    sources: false,
    todo: false
  })
  function toggleDisplay(name) {
    setSectionDisplays(prevSectionDisplays => ({
      ...prevSectionDisplays,
      [name]: !prevSectionDisplays[name]
    }))
  }

  return (
    <section>

      <h1>About</h1>

      <fieldset onClick={() => toggleDisplay('background')}
                onMouseEnter={() => setGlow('background')} 
                onMouseLeave={() => removeGlow('background')} 
                style={{boxShadow: glowColor['background'],
                        cursor:'pointer'
                      }}
      >
        <legend className='accordion'>Project Background +</legend>
        {sectionDisplays.background &&
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
                style={{boxShadow: glowColor['sources'],
                        cursor:'pointer'
                      }}
      >
        <legend className='accordion'>Sources +</legend>
        {sectionDisplays.sources && 
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
              <li>Liberated Africans (<a target='_blank' href='https://www.liberatedafricans.org/public/index.php'>https://www.liberatedafricans.org/public/index.php</a>)</li>
              <li>Queering the Map (<a target='_blank' href='https://www.queeringthemap.com/'>https://www.queeringthemap.com/</a>)</li>
            </ul>
          </div>
        }
      </fieldset>

      <fieldset onClick={() => toggleDisplay('todo')}
                onMouseEnter={() => setGlow('todo')} 
                onMouseLeave={() => removeGlow('todo')} 
                style={{boxShadow: glowColor['todo'],
                        cursor:'pointer'
                      }}
      >
        <legend className='accordion'>To Do's +</legend>
        {sectionDisplays.todo &&   
          <div className='panel'>
            <ul>
              <li>GENERAL: make responsive and accessible</li>
              <li>GENERAL: eng / kor versions (find 한글 font)</li>
              <br/>
              <li>NEIGHBORHOODS: scan prof henry's neighborhood maps (9x), have them show up tilted LH side of seoul map when neighborhood is selected (probably unnecessary)</li>
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