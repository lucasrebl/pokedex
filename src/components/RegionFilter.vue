<script setup lang="ts">
const props = defineProps<{
  regions: { name: string; url: string }[];
  selectedRegion: string;
}>();

const emit = defineEmits<{
  (e: 'region-change', region: string): void;
}>();

function handleRegionChange(region: string) {
  emit('region-change', region);
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<template>
  <div class="regions-container">
    <h3 class="regions-title">Filter by Region</h3>
    <div class="regions-buttons">
      <button
        class="region-button"
        :class="{ active: selectedRegion === 'all' }"
        @click="handleRegionChange('all')"
      >
        All Regions
      </button>
      
      <button
        v-for="region in regions"
        :key="region.name"
        class="region-button"
        :class="{ active: selectedRegion === region.name }"
        @click="handleRegionChange(region.name)"
      >
        {{ capitalizeFirstLetter(region.name) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.regions-container {
  margin-bottom: calc(var(--spacing-unit) * 3);
}

.regions-title {
  margin-bottom: calc(var(--spacing-unit) * 2);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text);
}

.regions-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing-unit) * 1);
}

.region-button {
  padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 2);
  border: none;
  border-radius: calc(var(--border-radius) / 2);
  background-color: #e9ecef;
  color: var(--color-text);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.region-button:hover {
  background-color: #dee2e6;
}

.region-button.active {
  background-color: var(--color-secondary);
  color: white;
}

@media (max-width: 768px) {
  .regions-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: calc(var(--spacing-unit) * 1);
  }
}
</style>