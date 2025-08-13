"use client"
import { useState, useEffect, useRef } from "react"

export default function AstrophysicsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [particles, setParticles] = useState([])
  const canvasRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
    }))
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.vy + window.innerHeight) % window.innerHeight,
        })),
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen text-white relative overflow-hidden flex flex-col gap-3">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-5"
        width={typeof window !== "undefined" ? window.innerWidth : 1400}
        height={typeof window !== "undefined" ? window.innerHeight : 900}
      />

      <div className="absolute inset-0 pointer-events-none z-5">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black to-gray-800/20"></div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 900">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g stroke="rgb(156 163 175)" strokeWidth="0.3" fill="none" opacity="0.25" filter="url(#glow)">
            <line x1="100" y1="150" x2="250" y2="120" />
            <line x1="250" y1="120" x2="400" y2="180" />
            <line x1="400" y1="180" x2="580" y2="140" />
            <line x1="580" y1="140" x2="720" y2="200" />
            <line x1="720" y1="200" x2="900" y2="160" />
            <line x1="900" y1="160" x2="1100" y2="220" />

            <line x1="150" y1="300" x2="320" y2="280" />
            <line x1="320" y1="280" x2="480" y2="340" />
            <line x1="480" y1="340" x2="650" y2="300" />
            <line x1="650" y1="300" x2="820" y2="360" />
            <line x1="820" y1="360" x2="1000" y2="320" />

            <line x1="80" y1="450" x2="280" y2="420" />
            <line x1="280" y1="420" x2="450" y2="480" />
            <line x1="450" y1="480" x2="620" y2="440" />
            <line x1="620" y1="440" x2="800" y2="500" />
            <line x1="800" y1="500" x2="980" y2="460" />

            <line x1="200" y1="600" x2="380" y2="580" />
            <line x1="380" y1="580" x2="560" y2="640" />
            <line x1="560" y1="640" x2="740" y2="600" />
            <line x1="740" y1="600" x2="920" y2="660" />

            <line x1="100" y1="150" x2="150" y2="300" />
            <line x1="250" y1="120" x2="320" y2="280" />
            <line x1="400" y1="180" x2="480" y2="340" />
            <line x1="580" y1="140" x2="650" y2="300" />
            <line x1="720" y1="200" x2="820" y2="360" />
            <line x1="900" y1="160" x2="1000" y2="320" />

            <line x1="150" y1="300" x2="80" y2="450" />
            <line x1="320" y1="280" x2="280" y2="420" />
            <line x1="480" y1="340" x2="450" y2="480" />
            <line x1="650" y1="300" x2="620" y2="440" />
            <line x1="820" y1="360" x2="800" y2="500" />

            <line x1="280" y1="420" x2="200" y2="600" />
            <line x1="450" y1="480" x2="380" y2="580" />
            <line x1="620" y1="440" x2="560" y2="640" />
            <line x1="800" y1="500" x2="740" y2="600" />

            <line x1="250" y1="120" x2="480" y2="340" />
            <line x1="580" y1="140" x2="280" y2="420" />
            <line x1="720" y1="200" x2="450" y2="480" />
            <line x1="400" y1="180" x2="650" y2="300" />
            <line x1="320" y1="280" x2="620" y2="440" />
          </g>

          <g fill="rgb(209 213 219)" opacity="0.4">
            <circle cx="100" cy="150" r="1.5" />
            <circle cx="250" cy="120" r="1.5" />
            <circle cx="400" cy="180" r="1.5" />
            <circle cx="580" cy="140" r="1.5" />
            <circle cx="720" cy="200" r="1.5" />
            <circle cx="900" cy="160" r="1.5" />
            <circle cx="1100" cy="220" r="1.5" />

            <circle cx="150" cy="300" r="1.5" />
            <circle cx="320" cy="280" r="1.5" />
            <circle cx="480" cy="340" r="1.5" />
            <circle cx="650" cy="300" r="1.5" />
            <circle cx="820" cy="360" r="1.5" />
            <circle cx="1000" cy="320" r="1.5" />

            <circle cx="80" cy="450" r="1.5" />
            <circle cx="280" cy="420" r="1.5" />
            <circle cx="450" cy="480" r="1.5" />
            <circle cx="620" cy="440" r="1.5" />
            <circle cx="800" cy="500" r="1.5" />
            <circle cx="980" cy="460" r="1.5" />

            <circle cx="200" cy="600" r="1.5" />
            <circle cx="380" cy="580" r="1.5" />
            <circle cx="560" cy="640" r="1.5" />
            <circle cx="740" cy="600" r="1.5" />
            <circle cx="920" cy="660" r="1.5" />
          </g>

          <g fill="rgb(255 255 255)">
            <circle cx="180" cy="80" r="0.8" opacity="0.9" className="animate-pulse" />
            <circle cx="350" cy="50" r="0.4" opacity="0.7" />
            <circle cx="520" cy="90" r="0.8" opacity="1" className="animate-pulse" style={{ animationDelay: "1s" }} />
            <circle cx="680" cy="70" r="0.4" opacity="0.8" />
            <circle
              cx="850"
              cy="110"
              r="0.8"
              opacity="0.9"
              className="animate-pulse"
              style={{ animationDelay: "2s" }}
            />
            <circle cx="1050" cy="80" r="0.4" opacity="0.7" />
            <circle cx="1200" cy="150" r="0.8" opacity="1" className="animate-pulse" style={{ animationDelay: "3s" }} />

            <circle cx="50" cy="250" r="0.4" opacity="0.8" />
            <circle
              cx="220"
              cy="230"
              r="0.8"
              opacity="0.9"
              className="animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <circle cx="390" cy="260" r="0.4" opacity="0.7" />
            <circle
              cx="550"
              cy="240"
              r="0.8"
              opacity="1"
              className="animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
            <circle cx="710" cy="270" r="0.4" opacity="0.8" />
            <circle
              cx="880"
              cy="250"
              r="0.8"
              opacity="0.9"
              className="animate-pulse"
              style={{ animationDelay: "2.5s" }}
            />
            <circle cx="1080" cy="280" r="0.4" opacity="0.7" />

            <circle
              cx="120"
              cy="380"
              r="0.8"
              opacity="1"
              className="animate-pulse"
              style={{ animationDelay: "0.3s" }}
            />
            <circle cx="300" cy="350" r="0.4" opacity="0.8" />
            <circle
              cx="470"
              cy="390"
              r="0.8"
              opacity="0.9"
              className="animate-pulse"
              style={{ animationDelay: "1.3s" }}
            />
            <circle cx="640" cy="370" r="0.4" opacity="0.7" />
            <circle
              cx="810"
              cy="400"
              r="0.8"
              opacity="1"
              className="animate-pulse"
              style={{ animationDelay: "2.3s" }}
            />
            <circle cx="990" cy="380" r="0.4" opacity="0.8" />

            <circle cx="90" cy="680" r="0.8" opacity="1" className="animate-pulse" style={{ animationDelay: "0.7s" }} />
            <circle cx="270" cy="660" r="0.4" opacity="0.8" />
            <circle
              cx="440"
              cy="690"
              r="0.8"
              opacity="0.9"
              className="animate-pulse"
              style={{ animationDelay: "1.7s" }}
            />
            <circle cx="610" cy="670" r="0.4" opacity="0.7" />
            <circle
              cx="780"
              cy="700"
              r="0.8"
              opacity="1"
              className="animate-pulse"
              style={{ animationDelay: "2.7s" }}
            />
            <circle cx="950" cy="680" r="0.4" opacity="0.8" />

            <circle cx="1300" cy="300" r="0.4" opacity="0.7" />
            <circle
              cx="1250"
              cy="450"
              r="0.8"
              opacity="0.9"
              className="animate-pulse"
              style={{ animationDelay: "1.2s" }}
            />
            <circle cx="1150" cy="550" r="0.4" opacity="0.8" />
            <circle cx="30" cy="350" r="0.8" opacity="1" className="animate-pulse" style={{ animationDelay: "2.2s" }} />
            <circle cx="70" cy="550" r="0.4" opacity="0.9" />
            <circle
              cx="1320"
              cy="180"
              r="0.8"
              opacity="0.8"
              className="animate-pulse"
              style={{ animationDelay: "0.8s" }}
            />
          </g>
        </svg>
      </div>

      <main className="relative z-10 container mx-auto px-6 py-12 ">
        <div className="text-center mb-16 flex flex-col gap-3">
          <h1
            className="text-5xl md:text-7xl font-bold mb-8 text-white drop-shadow-lg relative group cursor-default"
            style={{
              transform: `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight / 2) * 0.01}deg) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg)`,
              textShadow: `${(mousePosition.x - window.innerWidth / 2) * 0.01}px ${(mousePosition.y - window.innerHeight / 2) * 0.01}px 20px rgba(255,255,255,0.3)`,
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="relative inline-block">
              Astrophotography
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-1000 ${isHovering ? "translate-x-full opacity-100" : "-translate-x-full opacity-0"}`}
              ></div>
            </span>
          </h1>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-lg md:text-xl leading-relaxed text-gray-200 mb-8 relative group">
              <p className="relative overflow-hidden">
                <span className="inline-block animate-pulse bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]">
                  The cosmos is a vast, breathtaking tapestry waiting to be explored. From distant galaxies to celestial
                  wonders closer to home, the night sky offers endless inspiration for amateur astronomers. Join the
                  National Students' Space Challenge 2024 and showcase your astrophotography skills. Grab your camera,
                  point it to the heavens, and let your imagination soar!
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-[slide_2s_ease-in-out_infinite]"></div>
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-lg">
              <div className="flex items-center gap-2 group">
                <span className="text-gray-300 group-hover:text-white transition-colors">Deadline:</span>
                <span className="font-semibold text-white group-hover:scale-110 transition-transform">
                  November 7, 2024
                </span>
              </div>
              <div className="flex items-center gap-2 group">
                <span className="text-gray-300 group-hover:text-white transition-colors">Prize:</span>
                <span className="font-bold text-2xl text-white group-hover:scale-110 transition-transform animate-pulse">
                  Rs. 8,000
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-16">
          <div
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-gray-400 flex items-center justify-center relative text-gray-300 group hover:border-white transition-all duration-500 hover:scale-110 cursor-pointer"
            style={{
              transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.05}) rotate(${Math.cos(Date.now() * 0.0005) * 5}deg)`,
              boxShadow: `0 0 ${20 + Math.sin(Date.now() * 0.002) * 10}px rgba(255,255,255,0.3)`,
            }}
          >
            <svg
              className="w-20 h-20 md:w-24 md:h-24 animate-[spin_20s_linear_infinite] group-hover:animate-[spin_5s_linear_infinite]"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle
                cx={20 + Math.sin(Date.now() * 0.001) * 3}
                cy={20 + Math.cos(Date.now() * 0.001) * 3}
                r="2"
                fill="currentColor"
                className="animate-pulse"
                style={{ animationDelay: "0s", filter: "drop-shadow(0 0 3px currentColor)" }}
              />
              <circle
                cx={50 + Math.sin(Date.now() * 0.0015) * 2}
                cy={15 + Math.cos(Date.now() * 0.0015) * 2}
                r="2"
                fill="currentColor"
                className="animate-pulse"
                style={{ animationDelay: "0.5s", filter: "drop-shadow(0 0 3px currentColor)" }}
              />
              <circle
                cx={80 + Math.sin(Date.now() * 0.0012) * 2.5}
                cy={25 + Math.cos(Date.now() * 0.0012) * 2.5}
                r="2"
                fill="currentColor"
                className="animate-pulse"
                style={{ animationDelay: "1s", filter: "drop-shadow(0 0 3px currentColor)" }}
              />
              <circle
                cx={30 + Math.sin(Date.now() * 0.0008) * 3}
                cy={50 + Math.cos(Date.now() * 0.0008) * 3}
                r="2"
                fill="currentColor"
                className="animate-pulse"
                style={{ animationDelay: "1.5s", filter: "drop-shadow(0 0 3px currentColor)" }}
              />
              <circle
                cx={70 + Math.sin(Date.now() * 0.0018) * 2}
                cy={45 + Math.cos(Date.now() * 0.0018) * 2}
                r="2"
                fill="currentColor"
                className="animate-pulse"
                style={{ animationDelay: "2s", filter: "drop-shadow(0 0 3px currentColor)" }}
              />
              <circle
                cx={25 + Math.sin(Date.now() * 0.0014) * 2.5}
                cy={80 + Math.cos(Date.now() * 0.0014) * 2.5}
                r="2"
                fill="currentColor"
                className="animate-pulse"
                style={{ animationDelay: "2.5s", filter: "drop-shadow(0 0 3px currentColor)" }}
              />
              <circle
                cx={75 + Math.sin(Date.now() * 0.0016) * 2}
                cy={75 + Math.cos(Date.now() * 0.0016) * 2}
                r="2"
                fill="currentColor"
                className="animate-pulse"
                style={{ animationDelay: "3s", filter: "drop-shadow(0 0 3px currentColor)" }}
              />

              <line
                x1="20"
                y1="20"
                x2="50"
                y2="15"
                opacity="0.6"
                className="animate-[fade_2s_ease-in-out_infinite]"
                style={{ animationDelay: "0s" }}
              />
              <line
                x1="50"
                y1="15"
                x2="80"
                y2="25"
                opacity="0.6"
                className="animate-[fade_2s_ease-in-out_infinite]"
                style={{ animationDelay: "0.3s" }}
              />
              <line
                x1="20"
                y1="20"
                x2="30"
                y2="50"
                opacity="0.6"
                className="animate-[fade_2s_ease-in-out_infinite]"
                style={{ animationDelay: "0.6s" }}
              />
              <line
                x1="80"
                y1="25"
                x2="70"
                y2="45"
                opacity="0.6"
                className="animate-[fade_2s_ease-in-out_infinite]"
                style={{ animationDelay: "0.9s" }}
              />
              <line
                x1="30"
                y1="50"
                x2="70"
                y2="45"
                opacity="0.6"
                className="animate-[fade_2s_ease-in-out_infinite]"
                style={{ animationDelay: "1.2s" }}
              />
              <line
                x1="30"
                y1="50"
                x2="25"
                y2="80"
                opacity="0.6"
                className="animate-[fade_2s_ease-in-out_infinite]"
                style={{ animationDelay: "1.5s" }}
              />
              <line
                x1="70"
                y1="45"
                x2="75"
                y2="75"
                opacity="0.6"
                className="animate-[fade_2s_ease-in-out_infinite]"
                style={{ animationDelay: "1.8s" }}
              />
            </svg>

            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-500/10 to-gray-300/10 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-gray-200/5 animate-[ping_3s_ease-in-out_infinite]"></div>
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[ping_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes slide {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes fade {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}
