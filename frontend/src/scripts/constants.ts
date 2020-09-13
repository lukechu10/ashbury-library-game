// @ts-expect-error
export const API_URL_BASE = process.env.NODE_ENV === 'production' ? 'https://ash-game-api.herokuapp.com' : 'http://localhost:8080';
