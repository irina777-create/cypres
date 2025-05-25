export function generateTestEmail() {
    const random = Math.floor(Math.random() * 10000);
    return `aqa-user${random}@test.com`;
}
