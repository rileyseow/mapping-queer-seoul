import React from 'react'
import '../App.css'


export default function About() {

  /* state: track display of each fieldset */
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

  /* behavior: handle glow color of each fieldset on hover */
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
  
  /* behavior: handle whether each fieldset is displayed on click */
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


     /*********************/
    /*** JSX RENDERING ***/
   /*********************/
  return (
    <section className='About'>

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
            <p>This project is based on the work of Professor Todd Henry, UCSD. Neighborhood descriptions are copied directly from his lecture pamphlet on gay spatiality in authoritarian-era Seoul (see below). The inspiration for this project and, widely, its informational credit, go to Professor Henry and should be cited accordingly.</p>
              <ul>
                <li>Todd A. Henry, "Gay and Queer Map of Authoritarian-Era Seoul (1950-1990)" [prepared for film premiere of 'Paradise' (Minki Hong, Director, and Todd A. Henry, Producer), December 2022].</li>  
              </ul>
            
            <br />
            <p>Images and image descriptions are taken with only minimal edits from the Korea Queer Archive, also known as QueerArch. As the largest (and maybe only?) digital collection project cataloging queer experience in Korea, the influence of this resource must not be understated. Informational credit for any images and descriptions on this site go to QueerArch and should be cited accordingly.</p>
            <ul>
              <li>Korea Queer Archive (<a target='_blank' href='https://queerarchive.org/'>https://queerarchive.org/</a>)</li>
            </ul>

            <br />
            <p>As a test, IIIF viewers are currently embedded in the site's database using Universal Viewer.</p>
            <ul>
              <li>Universal Viewer (<a target='_blank' href='https://universalviewer.io'>https://universalviewer.io</a>)</li>
            </ul>

            <br />
            <p>Broadly, my design and/or methodology inspiration for this project come from the following sites:</p>
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
              <li>GENERAL: make site accessible</li>
              <li>GENERAL: eng / kor versions (try https://googlefonts.github.io/korean/, 2nd font (도틱A1))</li>
              <br/>
              <li>NEIGHBORHOODS: add images? (prof henry's neighborhood maps?)</li>
              <li>NEIGHBORHOODS: have markers remember z-indices based on click history</li>
              <br/>
              <li>DATABASE: replace default iiif src links with relevant ones (doesn't seem to work on universalviewer? may have to switch systems)</li>
              <li>DATABASE: if a lot more data, replace local data file with cloud rdbms</li>
            </ul>
          </div>
        }
      </fieldset>

    </section>
  )
}