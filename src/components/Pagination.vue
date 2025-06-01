<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'page-change', page: number): void;
}>();

const pages = computed(() => {
  const pageNumbers = [];
  const maxVisiblePages = 5;
  
  if (props.totalPages <= maxVisiblePages) {
    // If we have fewer pages than our max, show all
    for (let i = 1; i <= props.totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Always show first page
    pageNumbers.push(1);
    
    let startPage = Math.max(2, props.currentPage - 1);
    let endPage = Math.min(props.totalPages - 1, props.currentPage + 1);
    
    // Adjust if at the beginning
    if (props.currentPage <= 3) {
      endPage = Math.min(4, props.totalPages - 1);
    }
    
    // Adjust if at the end
    if (props.currentPage >= props.totalPages - 2) {
      startPage = Math.max(props.totalPages - 3, 2);
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push('...');
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < props.totalPages - 1) {
      pageNumbers.push('...');
    }
    
    // Always show last page
    if (props.totalPages > 1) {
      pageNumbers.push(props.totalPages);
    }
  }
  
  return pageNumbers;
});

function changePage(page: number | string) {
  if (typeof page === 'number') {
    emit('page-change', page);
  }
}

function goToPreviousPage() {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1);
  }
}

function goToNextPage() {
  if (props.currentPage < props.totalPages) {
    emit('page-change', props.currentPage + 1);
  }
}
</script>

<template>
  <div class="pagination">
    <button 
      class="pagination-btn" 
      :disabled="currentPage === 1" 
      @click="goToPreviousPage"
    >
      &laquo;
    </button>
    
    <button 
      v-for="(page, index) in pages" 
      :key="index"
      class="pagination-btn"
      :class="{ 
        active: page === currentPage,
        ellipsis: page === '...'
      }"
      :disabled="page === '...'"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    
    <button 
      class="pagination-btn" 
      :disabled="currentPage === totalPages" 
      @click="goToNextPage"
    >
      &raquo;
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: calc(var(--spacing-unit) * 3);
  margin-bottom: calc(var(--spacing-unit) * 3);
  gap: calc(var(--spacing-unit) * 1);
}

.pagination-btn {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-card-bg);
  color: var(--color-text);
  border: 1px solid #dee2e6;
  border-radius: calc(var(--border-radius) / 2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled):not(.active) {
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.pagination-btn.active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-btn.ellipsis {
  background: transparent;
  border: none;
}
</style>