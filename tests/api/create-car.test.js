
import { test, expect } from '@playwright/test';
import { getAuthToken } from '../../utils/api-auth.js';

const baseURL = 'https://qauto.forstudy.space';
const userCredentials = {
    email: 'aqa_test_user@example.com',
    password: '123456'
};

let authToken;

test.beforeAll(async () => {
    authToken = await getAuthToken(userCredentials.email, userCredentials.password);
});

test(' Позитивний: створення машини', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/cars`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
        data: {
            brandId: 1,
            modelId: 1,
            mileage: 12345
        }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.status).toBe('ok');
    expect(body.data).toHaveProperty('id');
});

test( 'Негативний: без токена', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/cars`, {
        data: {
            brandId: 1,
            modelId: 1,
            mileage: 123
        }
    });

    expect(response.status()).toBe(401);
});

test(' Негативний: невалідні/порожні дані', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/cars`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
        data: {
            brandId: null,
            modelId: null,
            mileage: ''
        }
    });

    expect(response.status()).toBe(200);
});
