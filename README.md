# Pokémon Explorer

A beautiful Vue.js application that lets you explore the world of Pokémon, with detailed information about each creature, filtering by region, and comprehensive search capabilities.

## Features

- **Browse Pokémon**: Explore all Pokémon with a beautiful card-based interface
- **Region Filtering**: Filter Pokémon by their native regions
- **Search System**: Search Pokémon by name or ID
- **Detailed Information**: View comprehensive details about each Pokémon
- **Responsive Design**: Works seamlessly on all devices
- **Pagination**: Easy navigation through large sets of Pokémon
- **Smooth Animations**: Enjoyable user experience with subtle transitions

## Tech Stack

- **Vue.js 3**: Modern composition API with script setup
- **TypeScript**: Type-safe code
- **Vue Router**: For navigation between pages
- **Pinia**: State management
- **Axios**: HTTP client for API requests
- **Vite**: Fast development server and build tool

## Project Structure

```
pokemon-explorer/
├── public/             # Static assets
├── src/
│   ├── components/     # Vue components
│   │   ├── LoadingSpinner.vue
│   │   ├── Navbar.vue
│   │   ├── Pagination.vue
│   │   ├── PokemonCard.vue
│   │   ├── RegionFilter.vue
│   │   └── SearchBar.vue
│   ├── views/          # Page components
│   │   ├── HomePage.vue
│   │   └── DetailPage.vue
│   ├── stores/         # Pinia stores
│   │   └── pokemon.ts
│   ├── App.vue         # Root component
│   ├── main.ts         # Entry point
│   └── style.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lucasrebl/Pokédex.git
cd pokemon-explorer
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

4. Open your browser and navigate to the local server URL (usually http://localhost:5173)

## Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## API Source

This project uses the [PokéAPI](https://pokeapi.co/) for all Pokémon data.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Vue.js](https://vuejs.org/)
- [PokéAPI](https://pokeapi.co/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)