// import { OpenRouter } from '@openrouter/sdk';
// import { envVars } from './envVars';

// const openRouter = new OpenRouter({
//     apiKey: envVars.OPENROUTER_API_KEY
// });

// export default openRouter;

import OpenAI from 'openai';
import { envVars } from './envVars';
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: envVars.OPENROUTER_API_KEY,
  
});

export default openai