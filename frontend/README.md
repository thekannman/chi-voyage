# Chi Voyage

Chi Voyage is a modern web application that helps users discover the best activities, restaurants, and attractions in Chicago. Built with Next.js and TypeScript, it provides a user-friendly interface for exploring the Windy City.

## Features

- 🏙️ Comprehensive directory of Chicago activities and places
- 🔍 Advanced search functionality
- 📱 Responsive design for all devices
- 🎯 Category-based browsing
- ⭐ User reviews and ratings
- 📍 Interactive maps integration

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chivoyage.git
cd chivoyage
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
chivoyage/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable React components
│   ├── lib/             # Utility functions and helpers
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
│   └── images/          # Image assets
└── ...config files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Chicago tourism data providers
- Open source community
- Contributors and maintainers
