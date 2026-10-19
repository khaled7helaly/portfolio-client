import About from '../sections/aboutMe/About';
import Hero from '../sections/hero/Hero'
import SelectedProjects from "../sections/SelectedProjects/SelectedProjects";
import WhatDo from '../sections/whatIDo/WhatIDo';

function Home() {
  return (
    <main>
      <Hero />
      <SelectedProjects />
      <About/>
      <WhatDo/>
    </main>
  )
}

export default Home