import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // Add image snapshot comparison
      // Commented out until dependency is installed
      // import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';
      // addMatchImageSnapshotPlugin(on);
      
      on('task', {
        log(message: string) {
          console.log(message);
          return null;
        },
      });
      
      return config;
    },
    viewportWidth: 1280,
    viewportHeight: 720,
  },
  env: {
    'cypress-real-events/config': {
      chromeWebSecurity: false,
    },
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  video: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
}); 