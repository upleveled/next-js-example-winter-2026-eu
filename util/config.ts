import postgres from 'postgres';

// Centralized configuration will be
// applied to both the Next.js app
// and the Ley migrations
export const postgresJsConfig = {
  transform: {
    ...postgres.camel,
    undefined: null,
  },
};
