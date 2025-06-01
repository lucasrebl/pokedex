<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="app-container">
    <Navbar />
    <main>
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style>
:root {
  --color-primary: #ff3e4e;
  --color-primary-light: #ff6b78;
  --color-primary-dark: #d32638;
  --color-secondary: #3b5ba5;
  --color-secondary-light: #5273c0;
  --color-secondary-dark: #2a4580;
  --color-accent: #ffcb05;
  --color-accent-light: #ffe066;
  --color-accent-dark: #d9ad00;
  --color-success: #48d0b0;
  --color-warning: #ffa726;
  --color-error: #ef5350;
  --color-background: #f8f9fa;
  --color-card-bg: #ffffff;
  --color-text: #212529;
  --color-text-secondary: #6c757d;
  --border-radius: 12px;
  --spacing-unit: 8px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.5;
  background-color: var(--color-background);
  color: var(--color-text);
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: calc(var(--spacing-unit) * 2);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Container styles */
.container {
  padding: 0 calc(var(--spacing-unit) * 2);
  max-width: 1200px;
  margin: 0 auto;
}

/* Button styles */
.btn {
  display: inline-block;
  padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 2);
  border-radius: calc(var(--spacing-unit) * 0.5);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  border: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: white;
}

.btn-secondary:hover {
  background-color: var(--color-secondary-dark);
}
</style>