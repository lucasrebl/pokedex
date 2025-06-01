import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

interface Pokemon {
  id: number
  name: string
  url: string
}

interface Region {
  name: string
  url: string
  offset: number
  limit: number
}

export const usePokemonStore = defineStore('pokemon', () => {
  const allPokemon = ref<Pokemon[]>([])
  const filteredPokemon = ref<Pokemon[]>([])
  const regions = ref<Region[]>([])
  const selectedRegion = ref<string>('all')
  const searchQuery = ref<string>('')
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const currentPage = ref<number>(1)
  const itemsPerPage = ref<number>(20)
  
  const regionData: Region[] = [
    { name: 'kanto', url: 'https://pokeapi.co/api/v2/region/1', offset: 0, limit: 151 },
    { name: 'johto', url: 'https://pokeapi.co/api/v2/region/2', offset: 151, limit: 100 },
    { name: 'hoenn', url: 'https://pokeapi.co/api/v2/region/3', offset: 251, limit: 135 },
    { name: 'sinnoh', url: 'https://pokeapi.co/api/v2/region/4', offset: 386, limit: 108 },
    { name: 'unova', url: 'https://pokeapi.co/api/v2/region/5', offset: 494, limit: 155 },
    { name: 'kalos', url: 'https://pokeapi.co/api/v2/region/6', offset: 649, limit: 72 },
    { name: 'alola', url: 'https://pokeapi.co/api/v2/region/7', offset: 721, limit: 88 },
    { name: 'galar', url: 'https://pokeapi.co/api/v2/region/8', offset: 809, limit: 89 },
    { name: 'paldea', url: 'https://pokeapi.co/api/v2/region/9', offset: 898, limit: 122 }
  ]

  const displayedPokemon = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value
    const endIndex = startIndex + itemsPerPage.value
    return filteredPokemon.value.slice(startIndex, endIndex)
  })

  const totalPages = computed(() => 
    Math.ceil(filteredPokemon.value.length / itemsPerPage.value)
  )

  async function fetchAllPokemon() {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1025')
      
      allPokemon.value = response.data.results.map((pokemon: any, index: number) => ({
        id: index + 1,
        name: pokemon.name,
        url: pokemon.url
      }))
      
      regions.value = regionData
      applyFilters()
      isLoading.value = false
    } catch (err) {
      isLoading.value = false
      error.value = 'Failed to fetch Pokémon data. Please try again later.'
      console.error('Error fetching Pokemon:', err)
    }
  }

  function applyFilters() {
    let filtered = [...allPokemon.value]
    
    if (selectedRegion.value !== 'all') {
      const regionInfo = regions.value.find(r => r.name === selectedRegion.value)
      if (regionInfo) {
        filtered = filtered.slice(regionInfo.offset, regionInfo.offset + regionInfo.limit)
      }
    }
    
    if (searchQuery.value.trim() !== '') {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(query) ||
        pokemon.id.toString() === query
      )
    }
    
    filteredPokemon.value = filtered
    currentPage.value = 1
  }

  function setRegionFilter(region: string) {
    selectedRegion.value = region
    applyFilters()
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
    applyFilters()
  }

  function setPage(page: number) {
    currentPage.value = page
  }

  return {
    allPokemon,
    filteredPokemon,
    displayedPokemon,
    regions,
    selectedRegion,
    searchQuery,
    isLoading,
    error,
    currentPage,
    totalPages,
    fetchAllPokemon,
    setRegionFilter,
    setSearchQuery,
    setPage,
    applyFilters
  }
})