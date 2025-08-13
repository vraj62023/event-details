"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"

// Individual triangular facet component
function TriangularFacet({ 
  vertices, 
  color,
  position = [0, 0, 0]
}) {
  const meshRef = useRef(null)
  
  // Create geometry from vertices
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const positions = new Float32Array(vertices.flat())
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.computeVertexNormals()
    return geom
  }, [vertices])

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      geometry={geometry}
    >
      <meshLambertMaterial 
        color={color}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Generate low-poly surface
function LowPolySurface() {
  const facets = useMemo(() => {
    const triangles = []
    const gridSize = 40 
    const spacing = 1.0 
    const heightVariation = 2
    
    // Generate height map
    const heights = []
    for (let i = 0; i <= gridSize; i++) {
      heights[i] = []
      for (let j = 0; j <= gridSize; j++) {
        const noise1 = Math.sin(i * 0.15) * Math.cos(j * 0.15) 
        const noise2 = Math.sin(i * 0.05) * Math.cos(j * 0.05) * 2 
        const noise3 = Math.random() * 0.5
        heights[i][j] = (noise1 + noise2 + noise3) * heightVariation
      }
    }
    
    // Generate triangular facets
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x1 = (i - gridSize / 2) * spacing
        const y1 = (j - gridSize / 2) * spacing
        const x2 = (i + 1 - gridSize / 2) * spacing
        const y2 = (j + 1 - gridSize / 2) * spacing
        
        const z1 = heights[i][j]
        const z2 = heights[i + 1][j]
        const z3 = heights[i][j + 1]
        const z4 = heights[i + 1][j + 1]
        
        // Create two triangles per grid cell
        const triangle1 = [
          [x1, y1, z1],
          [x2, y1, z2],
          [x1, y2, z3]
        ]
        
        const triangle2 = [
          [x2, y1, z2],
          [x2, y2, z4],
          [x1, y2, z3]
        ]
        
        // Calculate colors based on height only
        const avgHeight1 = (z1 + z2 + z3) / 3
        const avgHeight2 = (z2 + z4 + z3) / 3
        
        const variation1 = Math.floor(avgHeight1 * 10 + 40)
        const variation2 = Math.floor(avgHeight2 * 10 + 40)
        
        const color1 = `rgb(${variation1}, ${variation1}, ${variation1})`
        const color2 = `rgb(${variation2}, ${variation2}, ${variation2})`
        
        triangles.push(
          <TriangularFacet 
            key={`tri1-${i}-${j}`}
            vertices={triangle1}
            color={color1}
          />
        )
        
        triangles.push(
          <TriangularFacet 
            key={`tri2-${i}-${j}`}
            vertices={triangle2}
            color={color2}
          />
        )
      }
    }
    
    return triangles
  }, []) 
  
  return <>{facets}</>
}

// Camera component with mouse-linked movement
function MouseControlledCamera({ mousePosition }) {
  const cameraRef = useRef(null)
  
  useFrame((state) => {
    if (cameraRef.current) {
      const sensitivityX = 3; 
      const sensitivityY = 1.5; 
      const smoothness = 0.08; 
                               
      const targetX = mousePosition.x * sensitivityX;
      const targetY = mousePosition.y * sensitivityY;
      const targetZ = 20; 

      cameraRef.current.position.lerp(
        new THREE.Vector3(targetX, targetY, targetZ),
        smoothness
      );
      cameraRef.current.lookAt(0, 0, 0); 
    }
  });
  
  return (
    <PerspectiveCamera 
      ref={cameraRef}
      makeDefault 
      position={[0, 0, 20]} 
      fov={60} 
    />
  )
}

// Stars component
function Stars({ count = 5000, range = 100 }) {
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Random positions within a cube, centered at 0,0,0
      positions[i * 3] = (Math.random() - 0.5) * range
      positions[i * 3 + 1] = (Math.random() - 0.5) * range
      positions[i * 3 + 2] = (Math.random() - 0.5) * range
    }
    return positions
  }, [count, range])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={positions.length / 3} 
          array={positions} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#ffffff" 
        size={0.1} // Size of each star
        sizeAttenuation={true} // Stars closer to camera appear larger
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending} // Makes stars glow
      />
    </points>
  )
}


export default function LowPolyBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }} className="bg-black">
      <Canvas>
        {/* Changed background color to pure black */}
        <color attach="background" args={["#000000"]} /> 
        
        {/* Lighting setup for low-poly effect */}
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8}
          color="#ffffff"
        />
        <directionalLight 
          position={[-10, -10, -5]} 
          intensity={0.3}
          color="#444444"
        />
        <pointLight 
          position={[0, 0, 10]} 
          intensity={0.5}
          color="#666666"
        />
        
        {/* Low-poly surface */}
        <LowPolySurface />
        
        {/* Mouse-controlled camera */}
        <MouseControlledCamera mousePosition={mousePosition} />

        {/* Stars in the background */}
        <Stars count={5000} range={150} />
        
      </Canvas>
    </div>
  )
}
