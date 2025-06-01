<template>
  <div class="loading-container">
    <div class="pokeball-spinner"></div>
    <p class="loading-text">Loading Pokémon data...</p>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: calc(var(--spacing-unit) * 6) 0;
}

.pokeball-spinner {
  width: 60px;
  height: 60px;
  background: linear-gradient(to bottom, #ff3e4e 0%, #ff3e4e 50%, #f0f0f0 50%, #f0f0f0 100%);
  border-radius: 50%;
  position: relative;
  animation: spin 1.5s linear infinite;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.pokeball-spinner::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background-color: #f0f0f0;
  border: 4px solid #212529;
  border-radius: 50%;
  z-index: 1;
}

.pokeball-spinner::after {
  content: "";
  position: absolute;
  top: calc(50% - 2px);
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #212529;
}

.loading-text {
  margin-top: calc(var(--spacing-unit) * 3);
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>