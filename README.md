# Thai Language Learning Game

A React-based interactive game for learning Thai phrases and script. Built with Next.js, TypeScript, and Tailwind CSS, utilizing the shadcn/ui component library.

<img width="821" alt="Screenshot 2024-10-28 at 15 09 09" src="https://github.com/user-attachments/assets/28cb3621-a95c-4c11-acce-cfcdca70c46c">

## Features

- Multiple learning categories covering Thai script, common phrases, numbers, and more
- Three difficulty levels: beginner, intermediate, and advanced
- Interactive quiz format with multiple-choice questions
- Text-to-speech functionality for Thai pronunciation
- Customizable game settings:
  - Adjustable timer duration (5-30 seconds)
  - Optional romanized text display
  - Configurable number of questions per round (5-20)
  - Auto-play pronunciation setting
- Progress tracking with scores and review of incorrect answers
- Anti-repetition system to prevent frequent phrase repetition
- Clean, modern UI with animations and feedback
- Mobile-responsive design

## Tech Stack

- [Next.js 15](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) component library
- [Lucide Icons](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/RichiePowell/thai-language-game.git
cd thai-language-game
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── game/                # Game components
│   │   ├── AudioToggle.tsx
│   │   ├── CategorySelector.tsx
│   │   ├── FilterBar.tsx
│   │   ├── GameHeader.tsx
│   │   ├── GameScreen.tsx
│   │   ├── MainMenu.tsx
│   │   ├── SettingsPanel.tsx
│   │   ├── ThaiCharacterDisplay.tsx
│   │   ├── ThaiPhraseGame.tsx
│   │   └── ThemeToggle.tsx
│   └── ui/                  # Reusable UI components
├── constants/
│   ├── content/             # Learning content by category
│   ├── categories.ts        # Category definitions
│   ├── config.ts           # Game configuration
│   └── settings.ts         # Default settings
├── context/                # React context providers
│   ├── AudioContext.tsx
│   └── ThemeContext.tsx
├── hooks/                  # Custom React hooks
│   ├── useGameLogic.ts
│   └── useSpeech.ts
├── lib/                    # Utility functions
│   ├── storage.ts
│   └── utils.ts
└── types/                  # TypeScript type definitions
```

## Game Features

### Learning Categories

- Thai Script (Beginner, Intermediate, Advanced)
- Common Phrases
- Numbers & Counting
- Food & Drink
- Travel & Transport
- Directions
- Pronouns & Polite Particles
- Classifiers
- And more

### Customization

- Timer settings (5-30 seconds)
- Number of questions per round (5-20)
- Romanized text toggle
- Auto-play pronunciation

### Anti-Repetition System

The game implements a history-based system to prevent phrases from repeating too frequently, ensuring a varied learning experience.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thai phrase data curated for common, practical usage
- UI design inspired by modern language learning apps
- Built using the amazing shadcn/ui component library

## Future Enhancements

- [ ] Expanded content library with more phrases and categories
- [ ] Different game modes (writing practice, listening comprehension)
- [ ] Progress tracking across sessions
- [ ] Spaced repetition system for optimized learning
- [ ] User accounts and progress saving
- [ ] Leaderboards and achievements
- [ ] Mobile app version
