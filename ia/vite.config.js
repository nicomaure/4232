import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configura la URL base para el despliegue en GitHub Pages.
  // Reemplaza '4232' con el nombre exacto de tu repositorio de GitHub.
  base: '/4232/ia/dist/',
});
