function generateValidUser() {
    const random = Math.floor(Math.random() * 100000);
    return {
        name: 'John',
        lastName: 'Doe',
        email: `aqa-${random}@test.com`,
        password: 'Test1234',
        repeatPassword: 'Test1234'
    };
}

