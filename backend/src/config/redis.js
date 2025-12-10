import Redis from 'ioredis';
import { REDIS_URL } from './config.js';

let redisClient;

if (REDIS_URL) {
    redisClient = new Redis(REDIS_URL);

    redisClient.on('connect', () => {
        console.log('Connected to Redis');
    });

    redisClient.on('error', (err) => {
        console.error('Redis connection error:', err);
    });
} else {
    console.warn('REDIS_URL not found in configuration. Redis client will not be initialized.');
}

export default redisClient;
