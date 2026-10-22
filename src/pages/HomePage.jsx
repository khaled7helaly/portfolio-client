import About from '../sections/aboutMe/About';
import Hero from '../sections/hero/Hero'
import SelectedProjects from "../sections/SelectedProjects/SelectedProjects";
// import WhatDo from '../sections/whatIDo/WhatIDo';
import SkillsTeaser from '../sections/Skills/SkillsTeaser';
import Contact from '../sections/Contact/Contact';
import HomeServices from '../sections/HomeServices/HomeServices';

// import CommentsSection from '../components/CommentsPreview/CommentsPreview';
// import CommentsProvider from '../components/CommentsPreview/'

function Home() {
  return (
    <main>
      {/* <CommentsProvider> */}
      <Hero />
      <SelectedProjects />
      <About/>
      {/* <WhatDo/> */}
      <HomeServices />
       {/* <CommentsSection /> */}
      <SkillsTeaser />
      <Contact />
       {/* </CommentsProvider> */}
    </main>
  )
}

export default Home