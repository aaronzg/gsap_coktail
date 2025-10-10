import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"

export const Hero = () => {
  useGSAP(() => {
    // Split the text
    const heroSplit = new SplitText('.title', { type: 'chars, words' })
    const paragraphSplit = new SplitText('.subtitle', { type: 'lines' })

    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06
    })

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 1 // starts 1 second after the hero animation
    })

    const leavesTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true, // makes the animation progress directly related to the scroll, so it's more natural
      }  
    })
    leavesTl.to('.right-leaf', { y: 200 }, 0)
    leavesTl.to('.left-leaf', { y: -200 }, 0)
  },[])
  return (
    <>
      <section id='hero' className='noisy'>
        <h1 className='title'>MOJITO</h1>

        <img src="/images/hero-left-leaf.png" alt="left-leaft" className='left-leaf' />
        
        <img src="/images/hero-right-leaf.png" alt="right-leaft" className='right-leaf' />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. CLassic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of the Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients, creative falir, and timeless recipes - designed to delight your senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
