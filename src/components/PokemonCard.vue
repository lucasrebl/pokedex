<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  id: number;
  name: string;
}>();

const imageUrl = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;
});
</script>

<template>
  <RouterLink :to="`/pokemon/${id}`" class="pokemon-card">
    <div class="pokemon-image-container">
      <img :src="imageUrl" :alt="name" class="pokemon-image" loading="lazy" />
    </div>
    <div class="pokemon-info">
      <span class="pokemon-id">#{{ id.toString().padStart(3, '0') }}</span>
      <h3 class="pokemon-name">{{ name }}</h3>
    </div>
  </RouterLink>
</template>

<style scoped>
.pokemon-card {
  background-color: var(--color-card-bg);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--color-text);
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.pokemon-image-container {
  padding: calc(var(--spacing-unit) * 2);
  background-color: rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
}

.pokemon-image {
  width: 130px;
  height: 130px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.pokemon-card:hover .pokemon-image {
  transform: scale(1.1);
}

.pokemon-info {
  padding: calc(var(--spacing-unit) * 2);
  text-align: center;
}

.pokemon-id {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  display: block;
  margin-bottom: calc(var(--spacing-unit) * 0.5);
}

.pokemon-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-text);
}
</style>