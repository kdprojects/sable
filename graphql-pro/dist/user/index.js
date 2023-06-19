import { faker } from '@faker-js/faker';
function generateUsers() {
    let users = [];
    for (let id = 1; id <= 100; id++) {
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let email = faker.internet.email();
        users.push({
            "id": id,
            "first_name": firstName,
            "last_name": lastName,
            "email": email
        });
    }
    return { "data": users };
}
const obj = generateUsers();
export default obj;
