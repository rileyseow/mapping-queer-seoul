import React from 'react'
import '../App.css'

import seoul_map from '../assets/seoul_map.png'
import default_marker from '../assets/map_marker_default.png'
import rainbow_marker from '../assets/map_marker_rainbow.png'


/* const: object storing neighborhood ids : neighborhood names */
const districtNames = {
  0: "Myeongdong - Namdaemun",
  1: "Sindangdong",
  2: "Myeongryundong",
  3: "Gwanggyo",
  4: "Keumhodong",
  5: "Cheonhodong",
  6: "Euljiro - Chungmuro",
  7: "Jongno",
  8: "Itaewon"
}

/* const: object storing neighborhood ids : neighborhood descriptions */
const districtDescs = {
  0: "After the Korean War (1950-1953), gay men and lesbian women as well as gender non-conforming and intersex people created innovative ways to appropriate heterosexual-dominated places in the creation of 'queer hubs.' The most important of these hubs during the 1950s and 1960s was Myeongdong / Namdaemun. Once home to approximately 150,000 Japanese settlers, Honmachi, as it was called during the colonial era (1910-1945), was popular for its tearooms, cafes, beauty salons, boutiques, department stores, and theaters. That Myeongdong continued to function as Seoul's cultural center after 1945 is a reminder of the undeniable power of post-colonialism — that this once occupied place continued to embody earlier histories of Japanese imperialism even after (South) Koreans regained their independence. From the 1950s and 1960s, gay fashion designers, dancers, and artists frequented such iconic tearooms such as Simji, Cheongja, Fiancé, Yanji, and Isabelle. They also met at neighborhood entertainment venues such as Myeongdong Theater (1946-1975) [earlier, Nanghwagwan (est. 1909)] and Donghwa Theater (1954-1982) [earlier, Sinbujwa (est. 1932) and Hanseong Theater (renamed in 1947); today, Lotte Young Plaza Myeongdong], transforming these straight sites into queer hangouts. From at least the 1970s, lesbian women also met in this entertainment district, gathering in such tearooms as the short-lived Channel (1973-1976), located behind the UNESCO building. So, too, did a growing number of Japanese male tourists who, after the normalization treaty of 1965, travelled or returned to Seoul, some of whom used this and other queer hubs to meet South Korean men for sex, friendships, and relationships.",
  1: "In addition to the Myeongdong / Namdaemun area, Sindangdong was one of the first queer hubs where gay men congregated in post-liberation Korea. Fragmentary evidence suggests that some small pubs (names are unclear) also emerged in the area between what is today Sindang Station and Wangsimni Station. In Sindangdong, Gwangmu Theater (1930-1986) and Seongdong Theater (1962-1996), both located near the Central Market, were popular cruising sites by the 1960s and 1970s; later, during the 1980s, several exclusive gay bars (i.e., Kevin and Five Seasons) appeared nearby, demonstrating the powerful effect of theaters as anchors of homo-spatiality.",
  2: "Although not boasting a second-run theater, Myeongryundong also functioned as a queer hub, consisting of several small clothing shops (e.g. Candlelight and Fashion Communication), cafes (e.g. Sand Gap) and restaurants (e.g. Pomegranate). The most famous of these places was Heart, located just north of the Seoul National University College of Medicine. Eager to find South Korea's first gay bar, one author has mistakenly identified Heart with these honors. Although operated by a homosexual businessman with connections to Japan, Heart was not a gay bar in the sense of catering to an exclusively homosexual clientele. Rather, it was a restaurant that served drinks and food; but, because of its worldly owner, it attracted well-heeled gay men who camouflaged themselves among Heart's more dominant heterosexual customers. This place was also one of the first to appear in Western gay guides. The most famous of these guides, the Netherlands-based Spartacus, first mentioned Heart in 1978, but this pub likely opened several years earlier. Heart continued to appear in Spartacus until 1982, suggesting that this hangout closed sometime thereafter, along with other restaurants and clothing stores in Myeongryundong. But this area's queer history and its proximity to Hyehwadong theaters and Sungkyunkwan University led to the establishment of other mixed hangouts in the 1980s and 1990s; these include Grapevine and Mistic, among others.",
  3: "Located north of Euljiro and south of Chongno, Gwanggyo of the 1970s and 1980s was known for its small clothing and accessory stores, many of them gay-owned. Some fashion designers also opened pubs in the area, using their connections to Seoul's creative industries in Myeongdong and Chungmuro to elicit homosexual friends and other customers. Like places in Myeongryundong, none of these hangouts catered exclusively to gay customers, but homosexual men did frequent Gwanggyo restaurants due to their charismatic owners. Both Temptation and Jealousy, the most popular pubs in Gwanggyo, opened in the mid-1970s but closed by the early 1980s when Seoul's fashion industry moved southward toward Gangnam.",
  4: "Also opened in the mid-1970s, the one queer hangout in this neighborhood did not hang a sign, likely because the owner feared outsiders would expose the drag and fire show performers and its diverse customers to police exposure. One former customer told me that male shamans and Buddhist monks frequented this hangout, while another relayed that Korean classical musicians and butch lesbians were regulars. Another interviewee who visited this Keumhodong pub in late 1976 described male hosts wearing makeup and Korean-style dresses. One well-known performer there used to dance flamenco to 'Quizás' (1947) and other Spanish folk songs.",
  5: "By the 1970s, Cheonhodong was also known for bars featuring gender non-conforming entertainers. These bars (e.g. That Time / That Place, BB, and Greenhouse) hired what journalists at the time called chungseong — male-born people who, for professional and/or personal reasons, presented themselves as women. One 1973 report, for example, claimed that these Cheonhodong bars, like others throughout authoritarian-era Seoul, drew mixed crowds, including a high percentage of women, suggesting a thriving and diverse subculture of queer entertainment.",
  6: "Although many people think of Jongno as the site of South Korea's first gay bar, these honors should probably go to Euljiro / Chungmuro. Located in close proximity to Myeongdong, Chungmuro has been the center of the film industry since the colonial period. Before 1945, printing shops also proliferated in this area to provide posters, tickets, and other promotional materials for nearby movie theaters, such as Daehan Theater and Myeongbo Theater. In addition to these first-run theaters, second-run movie houses appeared in this entertainment and commercial part of the city; second-run venues included Geukdong Theater (1970-2004) [earlier, Gyeongseongjwa Theater (est. 1905), rebuilt as Athena Theater (1961), and Chungmuro Theater (renamed in 1968); today, Skypark Hotel] and Bada Theater (1969-2010), among others. The area's first bar catering exclusively to a gay male clientele was Adam (est. in the mid-1970s), a place which, among others, hosted South Koreans who preferred Westerners (so-called 'potato queens'). Many gender non-conforming people worked as servers at this and several other nearby pubs, including Hwawon (inside the Inhyeon Market) which staged some of the earliest drag shows.",
  7: "Along with Itaewon, Jongno is one of the only two queer hubs that outlived the authoritarian era, becoming the city's and the country's most important gay gathering spot. Once the site of the March First Uprising (1919), Pagoda Park was the epicenter of this activity after liberation, bringing queer people to the very center of South Korean life. The two most important second-run theaters of this area were Hwasin Theater inside the former Hwasin Department Store (1931-1987) and the now extinct Pagoda (originally, Nagwon) Theater (est. 1960; renamed in 1966), the most famous cruising theater. From the 1970s, a number of pubs and bars also emerged in this area, allowing gay men and gender non-conforming people to drink and socialize with one another. The first of these bars were Oryukdo and Hyeonhaetan, both located near the Gugil Building. Other pubs blossomed around Pagoda Theater after this iconic venue closed in 2000. According to gay maps printed during the early 1990s, one could find more than 20 gay bars in Jongno. By 2000, that number jumped to more than 50.",
  8: "Although often known as a gay hangout today, Itaewon's queer origins lie in the post-liberation history of sex work by cis women, gender non-conforming women, and intersex people. As early as the 1960s, one can find textual references to queer and intersex South Koreans who camouflaged themselves among other female sex workers, all of whom sold their bodies to American soldiers and other foreign expatriates. This early history of sex work explains why so-called 'gay (=transgender) bars' appeared in this area during the 1980s. The opening of these bars brought queer streetwalkers indoors to work at transgender clubs that catered to heterosexual men, some of them tourists from Japan and other foreign countries. Often operated by gay men who had previously worked in Myeongdong as fashion designers, these bars featured Las Vegas-style package shows, eliciting politicians, businessmen, and other prominent customers. The most famous of these transgender clubs was Cafe Crazy Love; others included Cleopatra and Bocaccio, among others. Although the HIV/AIDS crisis of the mid-1980s and 1990s took a serious toll on these clubs and their employees, forcing many transgender people to return to the streets or move to Japan, 'gay (=transgender) bars' continued to operate in this important queer hub, which also came to include a number of homosexual bars (e.g. Spartacus and Always Homme) and dance clubs (e.g. Pashu and Zipper) from the 1990s."
}


const Neighborhoods = React.forwardRef((props, ref) => {

  /* const: wordcount cut off for each page of the neighborhood description */
  const sliceWordCount = 100

  /* state: track currently selected neighborhood */
  const [selectedDistrict, setSelectedDistrict] = React.useState({
    district: 0,
    page: 0,
    totalPages: 3
  })

  /* behavior: handle click of neighborhood marker icon */
  function selectDistrict(event) {
    const districtKey = event.target.id[1]
    setSelectedDistrict({
      district: districtKey,
      page: 0,
      totalPages: Math.ceil(districtDescs[districtKey].split(' ').length / sliceWordCount)
    })
  }
  /* element mapping: render img for each neighborhood marker icon on the map */
  const markerElems = Object.keys(districtNames).map(districtKey => {
    return <img className={`Neighborhoods--marker ${selectedDistrict.district == districtKey ? 'selected' : 'dummyClass'}`}
            src={selectedDistrict.district == districtKey 
              ? rainbow_marker
              : default_marker} 
            key={districtKey}
            // note: id = (first letter of neighborhood name) + (neighborhood id #)
            id={`${districtNames[districtKey][0]}${districtKey}`}
            onClick={selectDistrict}
          />
  })

  /* behavior: get current page of neighborhood description to display */
  function getPage(str, pageNum) {
    const start = pageNum * sliceWordCount;
    return str.split(' ').slice(start, start + sliceWordCount).join(' ')
  }
  /* behavior: handle clicks on neighborhood description box for previous page and next page */
  function handleLeftClick() {
    setSelectedDistrict(prevSelectedDistrict => ({
      ...prevSelectedDistrict,
      page: prevSelectedDistrict.page - 1
    }))
  }
  function handleRightClick() {
    setSelectedDistrict(prevSelectedDistrict => ({
      ...prevSelectedDistrict,
      page: prevSelectedDistrict.page + 1
    }))
  }


     /*********************/
    /*** JSX RENDERING ***/
   /*********************/
  return (
    <section ref={ref}>
      <h1>Explore by Neighborhood</h1>
      <div className='Neighborhoods--search-districts'>
        <div className='Neighborhoods--imgContainer'>
          {markerElems}
          <img src={seoul_map} />
        </div>

        <fieldset className='Neighborhoods--district-info'>
          <legend className='accordion'>
            📍 {Object.values(districtNames)[selectedDistrict.district]}
          </legend>
          <div className='Neighborhoods--panelContainer'>
            <div className='panel Neighborhoods--description'>
              {getPage(Object.values(districtDescs)[selectedDistrict.district], selectedDistrict.page)}
            </div>
            <div className='Neighborhoods--arrows'>
              <button onClick={handleLeftClick} disabled={selectedDistrict.page === 0 ? true : false}>←</button>
              <button onClick={handleRightClick} disabled={selectedDistrict.page === selectedDistrict.totalPages - 1 ? true : false}>→</button>
            </div>
          </div>
        </fieldset>

      </div>
    </section>
  )
})

export default Neighborhoods