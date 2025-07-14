import { config } from 'dotenv';
config();

import '@/ai/flows/demand-forecaster.ts';
import '@/ai/flows/return-router.ts';
import '@/ai/flows/dynamic-pricer.ts';
