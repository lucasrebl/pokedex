<script setup lang="ts">
import { onMounted } from 'vue';
import PokemonCard from '../components/PokemonCard.vue';
import SearchBar from '../components/SearchBar.vue';
import RegionFilter from '../components/RegionFilter.vue';
import Pagination from '../components/Pagination.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { usePokemonStore } from '../stores/pokemon';

const pokemonStore = usePokemonStore();

onMounted(() => {
  if (pokemonStore.allPokemon.length === 0) {
    pokemonStore.fetchAllPokemon();
  }
});

function handleSearchChange(query: string) {
  pokemonStore.setSearchQuery(query);
}

function handleRegionChange(region: string) {
  pokemonStore.setRegionFilter(region);
}

function handlePageChange(page: number) {
  pokemonStore.setPage(page);
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>

<template>
  <div class="home-page">
    <div class="page-header">
      <h1 class="page-title">Pokémon Explorer</h1>
      <p class="page-description">
        Browse through all Pokémon, filter by region, or search for your favorites!
      </p>
    </div>

    <div class="filters-container">
      <SearchBar
        :initial-value="pokemonStore.searchQuery"
        @search="handleSearchChange"
      />
      
      <RegionFilter
        :regions="pokemonStore.regions"
        :selected-region="pokemonStore.selectedRegion"
        @region-change="handleRegionChange"
      />
    </div>

    <div v-if="pokemonStore.isLoading">
      <LoadingSpinner />
    </div>
    
    <div v-else-if="pokemonStore.error" class="error-message">
      <p>{{ pokemonStore.error }}</p>
      <button @click="pokemonStore.fetchAllPokemon" class="btn btn-primary">
        Try Again
      </button>
    </div>
    
    <div v-else>
      <div v-if="pokemonStore.displayedPokemon.length === 0" class="no-results">
        <p>No Pokémon found matching your criteria.</p>
        <button @click="() => { 
          pokemonStore.setSearchQuery('');
          pokemonStore.setRegionFilter('all');
        }" class="btn btn-secondary">
          Clear Filters
        </button>
      </div>
      
      <div v-else>
        <div class="results-summary">
          <p>
            Showing {{ pokemonStore.displayedPokemon.length }} of {{ pokemonStore.filteredPokemon.length }} Pokémon
          </p>
        </div>
        
        <div class="pokemon-grid">
          <PokemonCard
            v-for="pokemon in pokemonStore.displayedPokemon"
            :key="pokemon.id"
            :id="pokemon.id"
            :name="pokemon.name"
          />
        </div>
        
        <Pagination
          :current-page="pokemonStore.currentPage"
          :total-pages="pokemonStore.totalPages"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  padding: calc(var(--spacing-unit) * 2) 0;
}

.page-header {
  margin-bottom: calc(var(--spacing-unit) * 4);
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: calc(var(--spacing-unit) * 1);
}

.page-description {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.filters-container {
  margin-bottom: calc(var(--spacing-unit) * 4);
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: calc(var(--spacing-unit) * 3);
  margin-bottom: calc(var(--spacing-unit) * 4);
}

.error-message {
  text-align: center;
  padding: calc(var(--spacing-unit) * 6) 0;
  color: var(--color-error);
}

.error-message p {
  margin-bottom: calc(var(--spacing-unit) * 2);
  font-size: 1.1rem;
}

.no-results {
  text-align: center;
  padding: calc(var(--spacing-unit) * 6) 0;
}

.no-results p {
  margin-bottom: calc(var(--spacing-unit) * 2);
  font-size: 1.1rem;
  color: var(--color-text-secondary);
}

.results-summary {
  margin-bottom: calc(var(--spacing-unit) * 3);
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .pokemon-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .pokemon-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1025px) {
  .pokemon-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>