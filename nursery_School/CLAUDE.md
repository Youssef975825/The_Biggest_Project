# 🚀 Project Specifications: Little Wonder

## 1. Project Overview & Goals
- **Concept:** A SaaS-like educational and interactive entertainment platform for children ("Little Wonder"). It evolved from simple games into a high-quality professional experience featuring memory games, customizable/printable worksheets, interactive stories, and an e-commerce-ready interface.
- **Main Objectives:**
  - Provide a premium UX/UI with futuristic/modern design aesthetics (Glassmorphism & Rodin 3D Style).
  - Write clean, scalable, type-safe code prepared for future backend/database integration.
  - Maintain clean Git contribution history with Semantic Commits.

---

## 2. Tech Stack & Architecture
- **Frontend:**
  - React + TypeScript (Type Safety)
  - Tailwind CSS (Responsive Design & Glassmorphism Styling)
  - `canvas-confetti` (Winning Celebration Effects)
- **State Management & Logic:**
  - React Standard Hooks (`useState`, `useEffect`)
- **Backend & Database (Planned):**
  - Firebase Firestore (Preferred choice for direct React integration and scalability without full custom server overhead).

---

## 3. Project File Structure
```text
src/
│
├── components/
│   ├── Header.tsx                # Main navigation header (4 links + payment CTA)
│   ├── Bee_Memory_Match.tsx      # Memory Match game for Bee World
│   └── DinoMemoryMatch.tsx       # Memory Match game for Dino World
│
├── App.tsx                       # Main component and world/page routing
└── index.css / tailwind.css      # Tailwind configurations & global styles
4. Completed Features
Header Component:

Responsive layout with navigation links (Theme Packs, Worksheets, Contact Us, About Us).

Payment card container with modern UI styling.

Bee Memory Match (Bee_Memory_Match.tsx):

Pure Fisher-Yates Shuffle algorithm for true 100% randomness.

Moves and Pairs tracking, coupled with an interactive Win Modal.

Dino Memory Match (DinoMemoryMatch.tsx):

Implemented Fisher-Yates shuffle algorithm.

Dinosaur theme with canvas-confetti triggers on completion.

Git Practices:

Structured Semantic Commits for clear repository maintenance.

5. Pending & Next Steps
Space World (Space World):

Build games and activities specific to the Space theme (Space Memory / Activities).

Theme Packs Component:

Card selection UI displaying the 3 primary worlds (Bee World, Dino World, Space World) directing users to each theme.

Worksheets (Worksheets):

Build worksheet pages (Bee Worksheet, Dino Worksheet, Space Worksheet) with inputs for child name & date, plus direct print functionality (window.print()).

Interactive Stories:

Add themed interactive stories sections.

Dark Mode & Full Responsive Polishing:

Audit all components for dark mode classes and ensure mobile UI smoothness.

Firebase Integration:

Connect Firebase Firestore for persisting user/child details and worksheet data.

6. Design Decisions & Coding Rules
Themes Scope: Consolidated to 3 Worlds only: Bee World, Dino World, Space World (Nature World has been removed).

Code Logic: Pure React State management; separate pure shuffle math (Fisher-Yates) from ID generation.

Visual Style: Glassmorphism, colorful child-friendly gradients, and glowing borders.

7. Design References & Inspiration Links
(Add your design links below before prompting Claude Code)

Design Reference 1: [Put Link Here] - Short note on what to take from this design

Design Reference 2: [Put Link Here] - Short note on what to take from this design