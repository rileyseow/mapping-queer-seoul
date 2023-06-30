import React from 'react'
import '../App.css'

/* import: gallery images (also used in Header.jsx) */
import archive_1 from '../assets/archive_1.png'
import archive_2 from '../assets/archive_2.png'
import archive_3 from '../assets/archive_3.png'
import archive_4 from '../assets/archive_4.png'
import archive_5 from '../assets/archive_5.png'
import archive_6 from '../assets/archive_6.png'
import archive_7 from '../assets/archive_7.png'
import archive_8 from '../assets/archive_8.png'
import archive_9 from '../assets/archive_9.png'


/* const: object mapping card number : card description */
const cardInfo = {
    1: 'A public bath in Samseongdong that was rumored to be a gay sauna.',
    2: 'Namjeong, a popular gay bar near Tapgol Park in Jongno.',
    3: "Demonstrators at the 'Contest for Correct Enactment of the National Human Rights Act and Condemnation of Public Security Oppression,' which was held in front of Myeongdong Cathedral in April 1999.",
    4: 'Shots of a press conference held to propose changes in the way school textbooks in Korea described gay sexuality.',
    5: 'People gathered in the foyer of the Art Sonje Center for the 1998 Seoul Queer Film Festival.',
    6: 'Picketers in Marronnier Park calling for the abolition of current HIV / AIDS legislation in South Korea, which criminalizes HIV exposure and transmission.',
    7: "Demonstrators on the fourth day of a hunger strike at the 'Contest for Correct Enactment of the National Human Rights Act and Condemnation of Public Security Oppression.'",
    8: "The panel for 'Heterofilm or Homosexual Imagination?' at the 1998 Seoul Queer Film Festival, held after the screening of 'Different Body / Different Perspective.'",
    9: 'The Yonsei University Alumni Hall during the first scheduled Seoul Queer Film Festival (1997), which was shut down by the government.',
    
    /* 4 repeat images for seamless gallery moving effect: */
    10: 'A public bath in Samseongdong that was rumored to be a gay sauna.',
    11: 'Namjeong, a popular gay bar near Tapgol Park in Jongno.',
    12: "Demonstrators at the 'Contest for Correct Enactment of the National Human Rights Act and Condemnation of Public Security Oppression,' which was held in front of Myeongdong Cathedral in April 1999.",
    13: 'Shots of a press conference held to propose changes in the way school textbooks in Korea described gay sexuality.'
}


export default function Gallery() {
  /* state: track whether each photo card is flipped or not to show correct side */
  const [flipped, setFlipped] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    
    /* 4 repeat images for seamless gallery moving effect: */
    10: false,
    11: false,
    12: false,
    13: false
  })

  /* handle card flip */
  function handleCardFlip(event) {
    setFlipped(prevFlipped => ({
      ...prevFlipped,
      [event.target.id]: !prevFlipped[event.target.id]
    }))
  }

  /* element mapping: render cards as images or info depending on which side it is flipped to */
  const cardImages = [archive_1, archive_2, archive_3, archive_4, archive_5, archive_6, archive_7, archive_8, archive_9]
  const cardImageElems = Object.keys(flipped).map(id => (
    <img key={id} id={id} onClick={handleCardFlip} src={cardImages[(id - 1) % 9]} />
  ))
  const cardInfoElems = Object.keys(flipped).map(id => (
    <div key={id} id={id} onClick={handleCardFlip}>{cardInfo[id]}</div>
  ))


     /*********************/
    /*** JSX RENDERING ***/
   /*********************/
  return (
    <section className='Gallery'>
      <div className='Gallery--container'>
        {Object.keys(flipped).map(cardId => (
          flipped[cardId]
            ? cardInfoElems[cardId - 1]
            : cardImageElems[cardId - 1]
        ))}
      </div>
    </section>
  )
}