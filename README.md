# Thai Language Learning Game

A React-based interactive game for learning Thai phrases. Built with Next.js, TypeScript, and Tailwind CSS using the shadcn/ui component library.

## Features

- Interactive quiz format for learning Thai phrases
- Text-to-speech functionality for Thai pronunciation
- Customizable game settings:
  - Adjustable timer duration
  - Optional romanized text display
  - Configurable number of questions per round
- Progress tracking with scores
- Anti-repetition system to prevent frequent phrase repetition
- Clean, modern UI with animations and feedback
- Mobile-responsive design

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/thai-language-game.git
cd thai-language-game
```

2. Install dependencies:

```bash
npm install
# or
yarn
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
├── app/
│   └── page.tsx           # Main app page
├── components/
│   ├── game/
│   │   ├── GameScreen.tsx     # Game interface
│   │   ├── MainMenu.tsx       # Main menu
│   │   ├── SettingsPanel.tsx  # Game settings
│   │   └── ThaiPhraseGame.tsx # Main game component
│   └── ui/                # shadcn/ui components
├── constants/
│   ├── config.ts         # Game configuration
│   ├── phrases.ts        # Thai phrases data
│   └── settings.ts       # Default settings
├── hooks/
│   └── useGameLogic.ts   # Game logic hook
└── types/
    ├── FeedbackType.ts   # Feedback type definitions
    ├── GameSettings.ts   # Settings type definitions
    └── ThaiPhrase.ts     # Phrase type definitions
```

## Game Features

### Learning Modes

- Multiple choice quiz format
- Thai script with optional romanization
- Audio pronunciation

### Customization

- Timer settings (5-30 seconds)
- Number of questions per round (5-20)
- Romanized text toggle

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

- [ ] Additional Thai phrases and categories
- [ ] Different game modes (writing practice, listening comprehension)
- [ ] Progress tracking across sessions
- [ ] Difficulty levels
- [ ] Spaced repetition system
- [ ] User accounts and progress saving
- [ ] Leaderboards and achievements
