'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7 }
  }
}

// Animated component wrapper
type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <motion.div
      // use the ref returned by useInView to observe the DOM node
      ref={ref as any}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type AnimatedItemProps = {
  children: React.ReactNode
  variants?: Variants
  className?: string
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({ children, variants = fadeInUp, className = "" }) => {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <main className="bg-white overflow-hidden">
      {/* Enhanced Hero Section */}
    <section className="relative bg-[url('/homepage-images/homepage-1.jpg')] bg-cover bg-center h-[60vh] sm:h-screen min-h-[420px] md:min-h-[700px] rounded-b-4xl overflow-hidden flex items-center">
        {/* Dimmed static gradient overlay (match Contact hero) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

        {/* Centered content with enhanced glass effect */}
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="p-0"
            >
              <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 py-8 px-6 text-center mx-auto max-w-3xl">
                <motion.h1 
                  className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  About Us
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="w-32 h-1 bg-gradient-to-r from-white/80 to-white/40 mx-auto mb-6 rounded-full"
                />
                <motion.p 
                  className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  Crafting legacies through exceptional spaces and timeless architecture
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Enhanced Gallery Strip */}
      <AnimatedSection className="container mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, index) => (
            <AnimatedItem key={index} variants={scaleIn}>
              <motion.div 
                className="rounded-3xl overflow-hidden h-64 md:h-80 relative group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image 
                  src={`/homepage-images/homepage-${item}.jpg`} 
                  alt="" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center">
                    <span className="text-sm font-semibold text-gray-800">Project {index + 1}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedSection>

      {/* Animated headline removed — keep the styled static headline below to match the design */}
      {/* Headline (styled to match design) */}
      <section className="text-center py-16 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight text-black">
            Crafting Timeless Spaces
          </h2>

          <div className="mt-6 flex justify-center">
            <span className="block h-1 w-20 rounded bg-gradient-to-r from-blue-400 to-violet-500" aria-hidden />
          </div>

          <p className="mt-6 text-gray-700 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Building dreams and creating exceptional living experiences. Your trusted partner in premium real estate solutions.
          </p>
        </div>
      </section>

      {/* Enhanced Two Column Section */}
      <AnimatedSection className="container mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedItem variants={fadeInUp}>
            <motion.div 
              className="rounded-4xl overflow-hidden h-96 lg:h-[500px] relative group"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image 
                src="/homepage-images/homepage-1.jpg" 
                alt="Our Legacy" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </AnimatedItem>

          <div className="space-y-8">
            <AnimatedItem>
              <motion.div 
                className="bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-800 group hover:border-gray-600 transition-all duration-500 cursor-pointer"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold">Our Heritage</h3>
                  </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  With decades of excellence, we've shaped skylines and communities, building trust through 
                  unwavering commitment to quality and innovation in every project.
                </p>
              </motion.div>
            </AnimatedItem>

            <AnimatedItem>
              <motion.div 
                className="bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-800 group hover:border-gray-600 transition-all duration-500 cursor-pointer"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold">Our Expertise</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Combining cutting-edge technology with timeless design principles to create spaces 
                  that inspire, function flawlessly, and stand the test of time.
                </p>
              </motion.div>
            </AnimatedItem>
          </div>
        </div>
      </AnimatedSection>

      {/* Enhanced Card Grid */}
      <AnimatedSection className="container mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Art of Daylight Design", subtitle: "Harnessing natural light" },
            { title: "Art of Nightscape", subtitle: "Creating evening ambiance" }
          ].map((card, index) => (
            <AnimatedItem key={index} variants={scaleIn}>
              <motion.div 
                className="rounded-4xl overflow-hidden h-80 relative group cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image 
                  src={`/homepage-images/homepage-${index + 1}.jpg`} 
                  alt={card.title}
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-3xl font-bold text-white mb-2">{card.title}</h4>
                  <p className="text-gray-200 text-lg">{card.subtitle}</p>
                  <motion.div 
                    className="w-0 group-hover:w-16 h-0.5 bg-white mt-4 transition-all duration-500"
                    whileHover={{ width: 64 }}
                  />
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection className="bg-gradient-to-br from-gray-50 to-white py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "25+", label: "Years Experience" },
              { number: "50+", label: "Awards Won" },
              { number: "10K+", label: "Happy Clients" }
            ].map((stat, index) => (
              <AnimatedItem key={index} variants={fadeInUp}>
                <motion.div 
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-4xl md:text-6xl font-black mb-4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block">
                      {stat.number}
                    </span>
                  </motion.div>
                  <p className="text-black font-semibold text-lg" style={{ color: '#000' }}>{stat.label}</p>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}