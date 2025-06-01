<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  initialValue?: string;
}>();

const emit = defineEmits<{
  (e: 'search', query: string): void;
}>();

const searchQuery = ref(props.initialValue || '');
const debounceTimeout = ref<number | null>(null);

function handleInput() {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }
  
  debounceTimeout.value = setTimeout(() => {
    emit('search', searchQuery.value);
  }, 300) as unknown as number;
}

function clearSearch() {
  searchQuery.value = '';
  emit('search', '');
}
</script>

<template>
  <div class="search-container">
    <div class="search-input-container">
      <input
        v-model="searchQuery"
        @input="handleInput"
        type="text"
        class="search-input"
        placeholder="Search Pokémon by name..."
      />
      <button v-if="searchQuery" @click="clearSearch" class="clear-button">
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  margin-bottom: calc(var(--spacing-unit) * 3);
  width: 100%;
}

.search-input-container {
  display: flex;
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 2);
  border: 2px solid #ddd;
  border-radius: calc(var(--border-radius) / 2);
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  padding-right: calc(var(--spacing-unit) * 5);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 62, 78, 0.1);
}

.clear-button {
  position: absolute;
  right: calc(var(--spacing-unit) * 1.5);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.clear-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--color-primary);
}
</style>