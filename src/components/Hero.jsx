import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { useRef } from "react"
import { useMediaQuery } from "react-responsive"

export const Hero = () => {
  const videoRef = useRef()

  const isMobile = useMediaQuery({ maxWidth: 767 })

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
    
    // If it's mobile the animation starts when the top of the video reaches 50% of the viewport
    // else it starts when the center of the video reaches the 60% of the screen
    const startValue = isMobile ? 'top 50%' : 'center 60%'
    // Same but with the end
    // If it's mobile then when the top of the video reaches 120% of the screen the animation ends
    // else the animation ends when the bottom of the video reaches the top of the screen
    const endValue = isMobile ? '120% top' : 'bottom top'

    // ** VIDEO ANIMATION ON SCROLL **

    const videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'video',
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true, // Makes the video to stay in place, so it doesn't move when you scroll
      }
    })

    videoRef.current.onloadedmetadata = () => {
      videoTl.to(videoRef.current, {
        currentTime: videoRef.current.duration
      })
    }

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

      <div className="video absolute inset-0">
        <video 
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  )
}
