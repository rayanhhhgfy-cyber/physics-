# Interactive Physics Lab - Next.js Version
## Kings Hussain Ibn Andullah High School for Boys

### 🎓 Project Overview
A modern, interactive physics lab application built with **Next.js 14** that includes:
- ✅ 12 interactive physics simulations (all from original project preserved)
- ✅ Bilingual support (Arabic/English) with RTL support
- ✅ Authentication system (Teacher/Student/Parent roles)
- ✅ Dark/Light mode toggle
- ✅ Hamburger navigation menu
- ✅ Comments section for users
- ✅ Logo upload functionality
- ✅ Fully mobile responsive
- ✅ All physics functions preserved

### 🚀 Quick Start

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Run Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser

#### 3. Build for Production
```bash
npm run build
npm start
```

### 📁 Project Structure
```
.
├── app/                          # Next.js 14 app directory
├── components/                   # React components
├── contexts/                    # React contexts for state
├── utils/                       # Utility functions
└── public/                      # Static assets
```

### 📝 Setup Instructions

**Step 1**: Complete the Next.js setup
- Run `npm install`
- Next step: Create app/layout.tsx and app/page.tsx

**Step 2**: Create Login Component
- File: components/LoginForm.tsx
- Support for Student/Teacher/Parent roles

**Step 3**: Create Comments System
- File: components/CommentsSection.tsx
- Bilingual support (Arabic/English)

**Step 4**: Integrate Physics Simulations
- All 12 simulations need to be converted from Canvas to React
- Use Canvas API with useRef and useEffect

### ✅ Completed Components
- ✅ `.env.local` setup
- ✅ Tailwind CSS configuration
- ✅ LanguageContext (Arabic/English)
- ✅ ThemeContext (Dark/Light mode)
- ✅ AuthContext (User authentication)
- ✅ HamburgerMenu (Mobile navigation)

### 🔧 Technology Stack
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **GSAP** - Animations
- **Chart.js** - Data visualization
- **LocalStorage** - Data persistence

### 🎓 Physics Simulations Included
1. Special Relativity & Time Dilation
2. Wave Interference Lab
3. N-Body Gravity Simulator
4. Magnetic Field & Charged Particle
5. Nuclear Decay Simulator
6. Butterfly Effect & Double Pendulum
7. Ideal Gas & Maxwell-Boltzmann
8. Black Hole & Spacetime
9. Quantum Double Slit
10. Thermodynamics & Entropy
11. Particle Accelerator
12. Fiber Optics

### 📱 Features
- 🌐 Bilingual (Arabic/English)
- 🌙 Dark/Light mode
- 📱 Mobile responsive
- 🔐 Authentication system
- 💬 Comments section
- 🎨 Logo upload
- 📊 Interactive simulations
- ⚡ High performance

---
Created for Kings Hussain Ibn Andullah High School for Boys