import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, useGLTF, Stage } from '@react-three/drei';

// Pre-load a real car model (Porsche 911 from pmndrs open source models)
// This serves as a high-quality realistic placeholder
function CarModel() {
  const { scene } = useGLTF('https://raw.githubusercontent.com/pmndrs/drei-assets/master/porsche-911-991-transformed.glb');
  return <primitive object={scene} scale={1.2} position={[0, -0.6, 0]} />;
}

export default function Scene3D({ showCar = true, className = '' }) {
  return (
    <div className={`w-full h-full cursor-grab active:cursor-grabbing ${className}`}>
      <Canvas
        camera={{ position: [4, 1.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          {showCar && <CarModel />}
          
          {/* Clean studio environment */}
          <Environment preset="city" />
          
          {/* Soft shadow below the car */}
          <ContactShadows 
            position={[0, -0.6, 0]} 
            opacity={0.7} 
            scale={10} 
            blur={2} 
            far={4} 
            color="#000000"
          />
        </Suspense>
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minZoom={0.5}
          maxZoom={2}
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.1} 
          autoRotate 
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}

// Preload the model so it loads faster
useGLTF.preload('https://raw.githubusercontent.com/pmndrs/drei-assets/master/porsche-911-991-transformed.glb');
