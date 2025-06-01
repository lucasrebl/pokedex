<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="navbar">
    <div class="container navbar-container">
      <RouterLink to="/" class="navbar-brand">
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" 
          alt="Pikachu"
          class="brand-icon"
        />
        <span class="brand-text">PokéDex</span>
      </RouterLink>
      <nav class="navbar-nav">
        <RouterLink to="/" class="nav-link" active-class="active">
          Browse Pokémon
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  padding: calc(var(--spacing-unit) * 1.5) 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc(var(--spacing-unit) * 3);
}

.navbar-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  gap: calc(var(--spacing-unit) * 1.5);
}

.brand-icon {
  width: 40px;
  height: 40px;
  filter: brightness(0) invert(1);
  transition: transform 0.3s ease;
}

.navbar-brand:hover .brand-icon {
  transform: scale(1.1) rotate(-5deg);
}

.brand-text {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(to right, #fff, var(--color-accent));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-nav {
  display: flex;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 0 calc(var(--spacing-unit) * 2);
  }

  .brand-text {
    font-size: 1.5rem;
  }

  .brand-icon {
    width: 32px;
    height: 32px;
  }
}
</style>