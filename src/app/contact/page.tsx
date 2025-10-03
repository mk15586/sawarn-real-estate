"use client"
import Image from 'next/image'
import { Mail, Phone, MapPin, ArrowRight, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)

  // Small hook to detect when an element enters the viewport
  const useOnScreen = (options: IntersectionObserverInit = { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }) => {
    const ref = useRef<HTMLElement | null>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
      const el = ref.current
      if (!el) return
      if (visible) return // already visible, no need to observe

      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      }, options)

      obs.observe(el)
      return () => obs.disconnect()
    }, [ref, options, visible])

    return [ref, visible] as const
  }

  // refs + visibility flags for sections that should animate on scroll
  const [galleryRef, galleryVisible] = useOnScreen({ threshold: 0.12 })
  const [ctaRef, ctaVisible] = useOnScreen({ threshold: 0.12 })
  const [detailsRef, detailsVisible] = useOnScreen({ threshold: 0.12 })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="bg-white min-h-screen">
      {/* Enhanced Hero Section with Parallax */}
      <section className="relative bg-[url('/homepage-images/homepage-1.jpg')] bg-cover bg-center h-screen rounded-b-4xl overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6">
            <div 
              className={`rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 py-8 px-6 text-center mx-auto max-w-3xl 
                         transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
                Contact Us
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-white/80 to-white/40 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg md:text-xl text-white/90 font-light tracking-wider max-w-2xl mx-auto leading-relaxed">
                Let's create something extraordinary together. Your vision, our expertise.
              </p>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Strip with Hover Effects */}
      <section ref={galleryRef as any} className="container mx-auto max-w-7xl px-6 py-20 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i, index) => (
            <div 
              key={i} 
              className={`rounded-3xl overflow-hidden h-96 relative group cursor-pointer transform transition-all duration-1000 ${
                  galleryVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Image
                src={`/homepage-images/homepage-${i}.jpg`}
                alt={`Project ${i}`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <span className="text-white text-xl font-semibold">Project {i}</span>
                  <p className="text-white/80 mt-2">Exclusive residential design</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced CTA Section with Elegant Form */}
      <section ref={ctaRef as any} className="container mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image Section */}
          <div className={`rounded-4xl overflow-hidden h-[600px] relative group transform transition-all duration-1000 ${
              ctaVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <Image
              src="/homepage-images/homepage-3.jpg"
              alt="Living space"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
            {/* Floating badge */}
            <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
              <span className="text-white font-semibold">Since 2015</span>
            </div>
          </div>

          {/* Interactive Form Section */}
          <div className={`group relative transform transition-all duration-1000 ${
            ctaVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="relative overflow-hidden rounded-4xl transition-all duration-1000 ease-out transform shadow-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white group-hover:bg-white group-hover:text-black group-hover:shadow-3xl">
              
              {/* Preview Panel */}
              <div className="p-16 transition-all duration-1000 ease-out transform will-change-transform group-hover:opacity-0 group-hover:scale-95 group-hover:-translate-y-4">
                <div className="mb-4">
                  <span className="text-white/60 text-sm font-medium tracking-widest uppercase">Ready to Begin?</span>
                </div>
                <h2 className="text-6xl font-bold mb-10 leading-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Start Your Journey
                </h2>
                <p className="text-xl text-white/80 mb-14 leading-relaxed font-light max-w-md">
                  Share your vision with us and let's transform your space into a masterpiece of design and comfort.
                </p>
                <div className="w-72">
                  <div className="group/btn inline-flex items-center gap-6 bg-white text-black rounded-full px-12 py-6 font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-white/20">
                    <span>Begin Conversation</span>
                    <ArrowRight className="w-6 h-6 transform group-hover/btn:translate-x-2 transition-transform duration-500" />
                  </div>
                </div>
              </div>

              {/* Enhanced Form Panel */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-all duration-1000 ease-out transform scale-95 translate-y-8 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 group-hover:translate-y-0">
                <div className="relative w-full max-w-lg mx-6 md:mx-0">
                  {/* Close button */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer text-gray-600 hover:text-black transition-colors">
                    ✕
                  </div>
                  
                  <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-2xl">
                    {/* Form Header */}
                    <div className="text-center mb-10">
                      <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                        Share Your Vision
                      </h3>
                      <div className="w-20 h-0.5 bg-gradient-to-r from-gray-300 to-gray-100 mx-auto rounded-full"></div>
                      <p className="text-gray-500 mt-4 text-sm">We'll get back to you within 24 hours</p>
                    </div>

                    {/* Enhanced Form */}
                    <form action="mailto:connect@sawarnempire.com" method="post" className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group/input">
                          <label className="sr-only">Full Name</label>
                          <input 
                            name="name" 
                            placeholder="Full Name" 
                            className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-500 font-medium"
                          />
                          <div className="w-0 h-0.5 bg-black transform transition-all duration-500 group-focus-within/input:w-full"></div>
                        </div>
                        
                        <div className="group/input">
                          <label className="sr-only">Email</label>
                          <input 
                            name="email" 
                            placeholder="Email Address" 
                            className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-500 font-medium"
                          />
                          <div className="w-0 h-0.5 bg-black transform transition-all duration-500 group-focus-within/input:w-full"></div>
                        </div>
                      </div>

                      <div className="group/input">
                        <label className="sr-only">Mobile</label>
                        <input 
                          name="mobile" 
                          placeholder="Mobile Number" 
                          className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-500 font-medium"
                        />
                        <div className="w-0 h-0.5 bg-black transform transition-all duration-500 group-focus-within/input:w-full"></div>
                      </div>

                      <div className="group/input">
                        <label className="sr-only">Message</label>
                        <textarea 
                          name="message" 
                          placeholder="Tell us about your project..." 
                          rows={4} 
                          className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-500 font-medium resize-none"
                        />
                        <div className="w-0 h-0.5 bg-black transform transition-all duration-500 group-focus-within/input:w-full"></div>
                      </div>

                      <div className="pt-8">
                        <button 
                          type="submit" 
                          className="w-full group/btn inline-flex items-center justify-center gap-4 bg-black text-white rounded-full px-12 py-5 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 border-2 border-transparent hover:border-white/20"
                        >
                          <span>Submit Project Details</span>
                          <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-500" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Details Section */}
      <section ref={detailsRef as any} className="container mx-auto max-w-7xl px-6 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Interactive Map Section */}
          <div className={`rounded-4xl overflow-hidden h-[600px] relative group transform transition-all duration-1000 ${
              detailsVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <Image
              src="/map.png"
              alt="Map - Sawarn Empire"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
            
            {/* Location Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="animate-pulse">
                <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-2xl"></div>
                <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white absolute top-0 left-0 animate-ping"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Information */}
          <div className="space-y-10">
            {/* Section Header */}
            <div className={`transform transition-all duration-1000 ${
              detailsVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <h2 className="text-4xl font-black text-gray-900 mb-4">Get In Touch</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-200 rounded-full mb-6"></div>
              <p className="text-gray-600 text-lg leading-relaxed">
                We're here to bring your architectural dreams to life. Reach out through any channel that suits you best.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: 'Email Us',
                  value: 'connect@sawarnempire.com',
                  color: 'blue',
                  delay: 0
                },
                {
                  icon: Phone,
                  label: 'Call Us',
                  value: '+91 9910992625',
                  color: 'green',
                  delay: 100
                },
                {
                  icon: MapPin,
                  label: 'Visit Us',
                  value: 'F-5/18, Krishna Nagar, Delhi-110018',
                  color: 'purple',
                  delay: 200
                }
              ].map((item, index) => (
                <div 
                  key={item.label}
                  className={`flex items-center justify-between p-6 rounded-3xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                    detailsVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${item.delay}ms` }}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 flex items-center justify-center group-hover:bg-${item.color}-100 transition-colors duration-500`}>
                      <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm font-medium mb-2 block tracking-wide">{item.label}</span>
                      <h3 className={`text-xl font-semibold text-gray-900 group-hover:text-${item.color}-600 transition-colors duration-500`}>
                        {item.value}
                      </h3>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 transform group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              ))}
            </div>

            {/* Enhanced Social Media */}
            <div className={`pt-12 transform transition-all duration-1000 ${
              detailsVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`} style={{ transitionDelay: '300ms' }}>
              <span className="text-gray-500 text-sm font-medium mb-6 block tracking-widest uppercase">Connect Socially</span>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, name: 'Facebook', bg: 'bg-blue-600', hover: 'hover:bg-blue-700' },
                  { icon: Instagram, name: 'Instagram', bg: 'bg-gradient-to-r from-purple-500 to-pink-500', hover: 'hover:from-purple-600 hover:to-pink-600' },
                  { icon: Linkedin, name: 'LinkedIn', bg: 'bg-blue-500', hover: 'hover:bg-blue-600' },
                  { icon: Twitter, name: 'Twitter', bg: 'bg-black', hover: 'hover:bg-gray-800' }
                ].map((social, index) => (
                  <a 
                    key={social.name}
                    className={`w-16 h-16 rounded-2xl text-white grid place-items-center transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 ${social.bg} ${social.hover} shadow-lg group/social`}
                  >
                    <social.icon className="w-6 h-6 transform group-hover/social:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/** footer CTA removed per request */}
    </main>
  )
}