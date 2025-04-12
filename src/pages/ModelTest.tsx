
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import ModelViewer from '@/components/ModelViewer';
import { Suspense } from 'react';

export default function ModelTest() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-6">
        <h1 className="text-3xl font-bold">3D Model Test Page</h1>
        <p className="text-muted-foreground">A dedicated environment for testing 3D models</p>
      </header>
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        <div className="bg-secondary/20 rounded-lg p-4 min-h-[400px]">
          <h2 className="text-xl font-semibold mb-4">Model Viewer</h2>
          <div className="h-[350px] bg-black/20 rounded-lg overflow-hidden">
            <Canvas shadows>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <Suspense fallback={null}>
                <ModelViewer position={[0, 0, 0]} scale={1} rotation={[0, 0, 0]} />
                <OrbitControls />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </div>
        </div>
        
        <div className="bg-secondary/20 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Controls</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Mouse Controls:</p>
              <ul className="list-disc list-inside text-sm">
                <li>Left-click + drag: Rotate the model</li>
                <li>Right-click + drag: Pan the camera</li>
                <li>Scroll: Zoom in/out</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Model Information:</p>
              <p className="text-sm text-muted-foreground">Path: /models/scene.glb</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8">
        <div className="bg-secondary/20 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Console Output</h2>
          <p className="text-sm text-muted-foreground">Check your browser console for logs and errors.</p>
          <pre className="bg-black/90 text-green-400 p-4 rounded-md mt-2 text-xs overflow-auto max-h-[200px]">
            {/* Output will appear in the browser console */}
            &gt; Loading 3D model...
          </pre>
        </div>
      </div>
      
      <div className="container mx-auto py-4 text-center">
        <a href="/" className="text-primary hover:underline">
          Return to Home Page
        </a>
      </div>
    </div>
  );
}
