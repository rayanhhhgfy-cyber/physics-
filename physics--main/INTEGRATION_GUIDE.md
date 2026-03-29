# Physics Simulations Integration Guide

## Overview
The Next.js project has been successfully structured with all setup and infrastructure in place. The next step is to integrate the 12 physics simulations from the original HTML project into React components.

## Project Status: ✅ 60% Complete

### ✅ Completed
- [x] Next.js 14 project setup
- [x] TypeScript configuration
- [x] Tailwind CSS setup
- [x] Context API for state management
- [x] Bilingual support (Arabic/English)
- [x] Dark/Light mode theme
- [x] Authentication system
- [x] Login page with role selection
- [x] Hamburger menu navigation
- [x] Dashboard layout
- [x] Comments system
- [x] Logo upload functionality
- [x] Global CSS and styling

### ❌ To Complete
- [ ] Integrate 12 physics simulations as React components
- [ ] Canvas wrapper for physics calculations
- [ ] Performance optimization
- [ ] Testing
- [ ] Deployment

## Physics Simulations to Implement

### 1. Special Relativity & Time Dilation
**File**: `components/simulations/RelativitySimulator.tsx`
**Key Features**:
- Velocity slider (0-99.9% of light speed)
- Time dilation visualization
- Lorentz factor calculation
- Spaceship length contraction animation
- Two synchronized clocks display

**Implementation Notes**:
```tsx
// Use Canvas API with useRef
const canvasRef = useRef<HTMLCanvasElement>(null);

// Update on velocity change
const updateVelocity = (percent: number) => {
  const v = percent / 100;
  const gamma = 1 / Math.sqrt(1 - v * v);
  // Update displays with gamma, time dilation, etc.
};
```

### 2. Wave Interference Lab
**File**: `components/simulations/WaveSimulator.tsx`
**Key Features**:
- Two-source interference
- Frequency control
- Amplitude control
- Distance between sources control
- Constructive/destructive interference visualization

### 3. N-Body Gravity Simulator
**File**: `components/simulations/GravitySimulator.tsx`
**Key Features**:
- Click to add planets
- Preset scenarios (Solar System, Binary Stars)
- Real-time orbit calculation
- Energy tracking (kinetic, potential, total)
- Collision detection and merging

### 4. Magnetic Field & Charged Particle
**File**: `components/simulations/MagneticSimulator.tsx`
**Key Features**:
- Particle type selection (electron/proton)
- Charge control
- Speed control
- Magnetic field strength control
- Circular path visualization
- Radius calculation `r = mv/qB`

### 5. Nuclear Decay Simulator
**File**: `components/simulations/DecaySimulator.tsx`
**Key Features**:
- Half-life adjustment
- Particle grid visualization
- Start/pause/reset controls
- Real-time decay tracking
- Chart visualization of decay curve
- Exponential decay visualization

### 6. Butterfly Effect (Double Pendulum)
**File**: `components/simulations/DoublePendulumSimulator.tsx`
**Key Features**:
- Mass and length controls
- Initial angle adjustment
- Butterfly effect demonstration (0.001° difference)
- Chaotic path visualization
- Trail drawing

### 7. Ideal Gas & Maxwell-Boltzmann
**File**: `components/simulations/GasSimulator.tsx`
**Key Features**:
- Temperature control
- Volume control
- Particle collision physics
- Speed distribution histogram
- Pressure and temperature gauges
- PV = nRT visualization

### 8. Black Hole & Spacetime
**File**: `components/simulations/BlackHoleSimulator.tsx`
**Key Features**:
- Mass control for black hole
- Schwarzschild radius calculation
- Event horizon visualization
- Light ray deflection
- Accretion disk animation

### 9. Quantum Double Slit
**File**: `components/simulations/QuantumSimulator.tsx`
**Key Features**:
- Observation toggle
- Electron firing
- Interference pattern (unobserved)
- Particle pattern (observed)
- Detector hits tracking

### 10. Thermodynamics & Entropy
**File**: `components/simulations/EntropySimulator.tsx`
**Key Features**:
- Temperature gradient (hot/cold particles)
- Divider removal
- Entropy increase visualization
- Particle mixing animation
- Entropy chart

### 11. Particle Accelerator
**File**: `components/simulations/AcceleratorSimulator.tsx`
**Key Features**:
- Particle selection (proton/electron)
- Magnetic field strength
- Acceleration voltage
- Circular motion visualization
- Radius calculation

### 12. Fiber Optics
**File**: `components/simulations/OpticsSimulator.tsx`
**Key Features**:
- Medium selection (water/glass/diamond)
- Incident angle control
- Critical angle visualization
- Refraction vs reflection
- Refractive index display

## Implementation Strategy

### Step 1: Create Canvas Wrapper Hook
```tsx
// hooks/useCanvasSimulation.ts
export function useCanvasSimulation(canvasRef, updateFn) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let animationId;
    
    const animate = () => {
      updateFn(ctx);
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);
}
```

### Step 2: Create Physics Utility Functions
```tsx
// utils/physics.ts
export const calculateGamma = (velocityPercent: number) => {
  const v = velocityPercent / 100;
  return 1 / Math.sqrt(1 - v * v);
};

export const calculateLorentzForce = (q, v, B) => {
  return q * v * B;
};

// Add all physics calculations here
```

### Step 3: Create Individual Simulation Components
Each simulation should:
1. Use `useRef` for Canvas
2. Use `useCanvasSimulation` hook
3. Accept props for controls
4. Display calculations in real-time
5. Support both Arabic and English labels

### Step 4: Integrate into Dashboard
```tsx
// In dashboard/page.tsx
const SimulationRenderer = ({ id }) => {
  switch (id) {
    case 'relativity':
      return <RelativitySimulator />;
    case 'waves':
      return <WaveSimulator />;
    // ... other simulations
  }
};
```

## Development Workflow

### For Each Simulation:
1. Create new component file in `components/simulations/`
2. Copy physics logic from original HTML
3. Convert Canvas drawing code to React
4. Add TypeScript types
5. Implement control handlers
6. Add bilingual labels using `useLanguage()`
7. Test on desktop and mobile

### Guidelines:
- Use `requestAnimationFrame` for smooth animations
- Implement proper cleanup in useEffect
- Store settings in localStorage if needed
- Use React Context for shared state
- Keep physics logic in separate utils

## Performance Optimization

### Before Optimization:
- Multiple Canvas elements rendering
- Frequent state updates
- No memoization

### Optimization Steps:
1. Use `React.memo()` for simulators
2. Implement `useMemo()` for calculations
3. Use `useCallback()` for handlers
4. Lazy load simulators in dashboard
5. Optimize Canvas drawing (batch renders)
6. Use Web Workers for heavy calculations (optional)

## Testing Checklist

- [ ] Each simulator renders correctly
- [ ] Controls update values in real-time
- [ ] Bilingual text displays properly
- [ ] Dark/Light mode works
- [ ] Mobile responsiveness verified
- [ ] Performance is acceptable
- [ ] No memory leaks
- [ ] Comments system works

## File Structure After Complete
```
components/
├── HamburgerMenu.tsx
├── LoginForm.tsx
├── CommentsSection.tsx
└── simulations/
    ├── RelativitySimulator.tsx
    ├── WaveSimulator.tsx
    ├── GravitySimulator.tsx
    ├── MagneticSimulator.tsx
    ├── DecaySimulator.tsx
    ├── DoublePendulumSimulator.tsx
    ├── GasSimulator.tsx
    ├── BlackHoleSimulator.tsx
    ├── QuantumSimulator.tsx
    ├── EntropySimulator.tsx
    ├── AcceleratorSimulator.tsx
    └── OpticsSimulator.tsx

utils/
├── physics.ts
├── canvas.ts
└── constants.ts

hooks/
├── useCanvasSimulation.ts
└── useAnimationFrame.ts
```

## Key Resources
- Original HTML file: Contains all physics logic and formulas
- GSAP Docs: For animations https://gsap.com/
- Canvas API: For drawing https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- Chart.js: For data visualization https://www.chartjs.org/

## Next Steps
1. Start with RelativitySimulator (simplest)
2. Move to WaveSimulator (medium)
3. Progress to more complex simulations
4. Optimize performance
5. Add testing
6. Deploy

---
Good luck! The hard work of setup is done. Now it's time to bring the physics to life! 🚀
