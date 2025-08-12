# LoomRadio 🎵

A modern, responsive internet radio player built with Next.js 14, React 18, and TypeScript.

## ✨ Features

- **Modern Tech Stack**: Built with Next.js 14, React 18, and TypeScript
- **Responsive Design**: Beautiful, mobile-first UI with CSS Modules
- **Audio Controls**: Play, pause, stop, volume control, and playback rate adjustment
- **Station Management**: Easy switching between different radio stations
- **Picture-in-Picture**: Support for PiP mode
- **Light/Dark Themes**: Toggle between different visual themes
- **Progress Tracking**: Real-time playback progress and seeking
- **Modern UI**: Glassmorphism design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd loomradio
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
loomradio/
├── src/
│   ├── components/          # React components
│   │   └── LoomRadio.tsx   # Main radio player component
│   ├── stations/            # Radio station configurations
│   └── players/             # Media player implementations
├── styles/                  # CSS modules and global styles
├── pages/                   # Next.js pages
├── public/                  # Static assets
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Styling

The project uses CSS Modules for component-scoped styling with:
- Modern CSS features (Grid, Flexbox, CSS Variables)
- Responsive design principles
- Glassmorphism effects
- Smooth transitions and animations

## 🔧 Configuration

### TypeScript
- Strict type checking enabled
- Path aliases configured for clean imports
- Modern ES6+ features supported

### Next.js
- App Router ready (currently using Pages Router)
- Image optimization configured
- ESLint integration

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [React](https://reactjs.org/)
- Styled with modern CSS and [CSS Modules](https://github.com/css-modules/css-modules)