<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const route = useRoute();
const router = useRouter();
const pokemon = ref<any>(null);
const pokemonSpecies = ref<any>(null);
const evolutionChain = ref<any>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

async function fetchPokemonDetails() {
  try {
    isLoading.value = true;
    error.value = null;
    
    // Fetch basic Pokemon data
    const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`);
    pokemon.value = pokemonResponse.data;
    
    // Fetch species data for evolution chain
    const speciesResponse = await axios.get(pokemon.value.species.url);
    pokemonSpecies.value = speciesResponse.data;
    
    const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);
    evolutionChain.value = evolutionResponse.data.chain;
    
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
    error.value = 'Failed to load Pokemon details. Please try again later.';
    console.error('Error fetching Pokemon details:', err);
  }
}

function getFlavorText() {
  const entries = pokemonSpecies.value?.flavor_text_entries || [];
  const englishEntry = entries.find(entry => entry.language.name === 'en');
  return englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : '';
}

function getGenus() {
  const genera = pokemonSpecies.value?.genera || [];
  const englishGenus = genera.find(g => g.language.name === 'en');
  return englishGenus ? englishGenus.genus : '';
}

function getEvolutionDetails(chain: any): any[] {
  const evolutions: any[] = [];
  
  function processChain(currentChain: any) {
    if (currentChain) {
      const evolutionDetails = {
        name: currentChain.species.name,
        min_level: currentChain.evolution_details[0]?.min_level || null,
        trigger: currentChain.evolution_details[0]?.trigger?.name || null,
        item: currentChain.evolution_details[0]?.item?.name || null,
      };
      evolutions.push(evolutionDetails);
      
      if (currentChain.evolves_to.length > 0) {
        currentChain.evolves_to.forEach((evolution: any) => {
          processChain(evolution);
        });
      }
    }
  }
  
  processChain(chain);
  return evolutions;
}

function navigateToPokemon(id: number) {
  router.push(`/pokemon/${id}`);
}

onMounted(() => {
  fetchPokemonDetails();
});

// Watch for route changes to refetch data when navigating between Pokemon
watch(
  () => route.params.id,
  () => {
    fetchPokemonDetails();
  }
);
</script>

<template>
  <div class="pokemon-detail-page">
    <div v-if="isLoading" class="loading-container">
      <LoadingSpinner />
    </div>
    
    <div v-else-if="error" class="error-container">
      <p class="error-message">{{ error }}</p>
      <button @click="fetchPokemonDetails" class="btn btn-primary">
        Try Again
      </button>
    </div>
    
    <div v-else-if="pokemon && pokemonSpecies" class="pokemon-detail-container">
      <div class="navigation-buttons">
        <button 
          v-if="pokemon.id > 1" 
          @click="navigateToPokemon(pokemon.id - 1)"
          class="nav-button prev"
        >
          ← #{{ pokemon.id - 1 }}
        </button>
        
        <button 
          @click="navigateToPokemon(pokemon.id + 1)"
          class="nav-button next"
        >
          #{{ pokemon.id + 1 }} →
        </button>
      </div>
      
      <div class="pokemon-header">
        <h1 class="pokemon-name">
          {{ pokemon.name }}
          <span class="pokemon-number">#{{ pokemon.id.toString().padStart(3, '0') }}</span>
        </h1>
        <p class="pokemon-genus">{{ getGenus() }}</p>
        <p class="pokemon-description">{{ getFlavorText() }}</p>
      </div>
      
      <div class="pokemon-main-info">
        <div class="pokemon-image-container">
          <img 
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
            :alt="pokemon.name"
            class="pokemon-image"
          />
        </div>
        
        <div class="pokemon-stats">
          <div class="stat-group">
            <h2>Base Stats</h2>
            <div 
              v-for="stat in pokemon.stats" 
              :key="stat.stat.name"
              class="stat-item"
            >
              <span class="stat-name">{{ stat.stat.name }}</span>
              <span class="stat-value">{{ stat.base_stat }}</span>
            </div>
          </div>
          
          <div class="type-group">
            <h2>Types</h2>
            <div class="type-list">
              <span 
                v-for="type in pokemon.types" 
                :key="type.type.name"
                class="type-badge"
                :class="type.type.name"
              >
                {{ type.type.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pokemon-details">
        <div class="detail-section">
          <h2>Physical Characteristics</h2>
          <div class="characteristics">
            <div class="characteristic">
              <span class="label">Height:</span>
              <span class="value">{{ pokemon.height / 10 }}m</span>
            </div>
            <div class="characteristic">
              <span class="label">Weight:</span>
              <span class="value">{{ pokemon.weight / 10 }}kg</span>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h2>Abilities</h2>
          <div class="abilities-list">
            <div 
              v-for="ability in pokemon.abilities" 
              :key="ability.ability.name"
              class="ability-item"
            >
              {{ ability.ability.name }}
              <span v-if="ability.is_hidden">(Hidden)</span>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h2>Moves</h2>
          <div class="moves-list">
            <div 
              v-for="move in pokemon.moves" 
              :key="move.move.name"
              class="move-item"
            >
              {{ move.move.name }}
            </div>
          </div>
        </div>
        
        <div v-if="evolutionChain" class="detail-section">
          <h2>Evolution Chain</h2>
          <div class="evolution-chain">
            <div 
              v-for="(evolution, index) in getEvolutionDetails(evolutionChain)"
              :key="index"
              class="evolution-item"
            >
              <div class="evolution-name">
                {{ evolution.name }}
              </div>
              <div v-if="evolution.min_level" class="evolution-level">
                Level: {{ evolution.min_level }}
              </div>
              <div v-if="evolution.trigger" class="evolution-trigger">
                Trigger: {{ evolution.trigger }}
              </div>
              <div v-if="evolution.item" class="evolution-item-needed">
                Item: {{ evolution.item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokemon-detail-page {
  padding: calc(var(--spacing-unit) * 4) 0;
  max-width: 1000px;
  margin: 0 auto;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: calc(var(--spacing-unit) * 3);
}

.nav-button {
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
  background-color: var(--color-secondary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-button:hover {
  background-color: var(--color-secondary-dark);
  transform: translateY(-2px);
}

.pokemon-header {
  text-align: center;
  margin-bottom: calc(var(--spacing-unit) * 4);
}

.pokemon-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: calc(var(--spacing-unit) * 1);
  text-transform: capitalize;
}

.pokemon-number {
  color: var(--color-text-secondary);
  font-size: 1.8rem;
  margin-left: calc(var(--spacing-unit) * 2);
}

.pokemon-genus {
  color: var(--color-text-secondary);
  font-size: 1.2rem;
  margin-bottom: calc(var(--spacing-unit) * 2);
}

.pokemon-description {
  max-width: 600px;
  margin: 0 auto;
  color: var(--color-text);
  line-height: 1.6;
}

.pokemon-main-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing-unit) * 4);
  margin-bottom: calc(var(--spacing-unit) * 4);
}

.pokemon-image-container {
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: var(--border-radius);
  padding: calc(var(--spacing-unit) * 4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemon-image {
  width: 250px;
  height: 250px;
  object-fit: contain;
}

.pokemon-stats {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 3);
}

.stat-group, .type-group {
  background-color: var(--color-card-bg);
  padding: calc(var(--spacing-unit) * 3);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.stat-group h2, .type-group h2 {
  margin-bottom: calc(var(--spacing-unit) * 2);
  font-size: 1.2rem;
  font-weight: 600;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: calc(var(--spacing-unit) * 1);
}

.stat-name {
  text-transform: capitalize;
  color: var(--color-text-secondary);
}

.stat-value {
  font-weight: 600;
}

.type-list {
  display: flex;
  gap: calc(var(--spacing-unit) * 1);
}

.type-badge {
  padding: calc(var(--spacing-unit) * 0.5) calc(var(--spacing-unit) * 2);
  border-radius: calc(var(--border-radius) / 2);
  color: white;
  font-weight: 500;
  text-transform: capitalize;
}

.pokemon-details {
  display: grid;
  gap: calc(var(--spacing-unit) * 3);
}

.detail-section {
  background-color: var(--color-card-bg);
  padding: calc(var(--spacing-unit) * 3);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.detail-section h2 {
  margin-bottom: calc(var(--spacing-unit) * 2);
  font-size: 1.2rem;
  font-weight: 600;
}

.characteristics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: calc(var(--spacing-unit) * 2);
}

.characteristic {
  display: flex;
  flex-direction: column;
}

.label {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.value {
  font-weight: 600;
  font-size: 1.1rem;
}

.abilities-list {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing-unit) * 1);
}

.ability-item {
  background-color: var(--color-background);
  padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 2);
  border-radius: calc(var(--border-radius) / 2);
  font-weight: 500;
  text-transform: capitalize;
}

.moves-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: calc(var(--spacing-unit) * 1);
}

.move-item {
  background-color: var(--color-background);
  padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 2);
  border-radius: calc(var(--border-radius) / 2);
  text-transform: capitalize;
  font-size: 0.9rem;
}

.evolution-chain {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 2);
}

.evolution-item {
  background-color: var(--color-background);
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
}

.evolution-name {
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: calc(var(--spacing-unit) * 1);
}

.evolution-level,
.evolution-trigger,
.evolution-item-needed {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

/* Pokemon type colors */
.normal { background-color: #A8A878; }
.fire { background-color: #F08030; }
.water { background-color: #6890F0; }
.electric { background-color: #F8D030; }
.grass { background-color: #78C850; }
.ice { background-color: #98D8D8; }
.fighting { background-color: #C03028; }
.poison { background-color: #A040A0; }
.ground { background-color: #E0C068; }
.flying { background-color: #A890F0; }
.psychic { background-color: #F85888; }
.bug { background-color: #A8B820; }
.rock { background-color: #B8A038; }
.ghost { background-color: #705898; }
.dragon { background-color: #7038F8; }
.dark { background-color: #705848; }
.steel { background-color: #B8B8D0; }
.fairy { background-color: #EE99AC; }

@media (max-width: 768px) {
  .pokemon-main-info {
    grid-template-columns: 1fr;
  }
  
  .pokemon-image {
    width: 200px;
    height: 200px;
  }
  
  .pokemon-name {
    font-size: 2rem;
  }
  
  .pokemon-number {
    font-size: 1.5rem;
  }
}
</style>