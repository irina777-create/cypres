
import { request } from '@playwright/test';

const baseURL = 'https://qauto.forstudy.space';

export async function getAuthToken(email, password) {
    const apiContext = await request.newContext();

    const response = await apiContext.post(`${baseURL}/api/auth/signin`, {
        data: {
            email,
            password
        }
    });

    if (!response.ok()) {
        throw new Error(`Login failed: ${response.status()}`);
    }

    const responseBody = await response.json();
    return responseBody.data.token;
}
