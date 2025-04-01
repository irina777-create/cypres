const axios = require('axios');
const fs = require('fs');

async function registerUsers(configPath) {
    const config = require(configPath);

    for (const user of config.users) {
        try {
            const response = await axios.post(`${config.baseUrl}api/auth/signup`, {
                email: user.email,
                password: user.password,
                name: 'Test User',
                lastName: 'Automation'
            });
            console.log(`User registered: ${user.email}`, response.data);
        } catch (error) {
            console.error(`Error registering ${user.email}:`, error.response?.data || error.message);
        }
    }
}

const configPath = process.argv[2];
if (!configPath) {
    console.error('Please provide a configuration file.');
    process.exit(1);
}