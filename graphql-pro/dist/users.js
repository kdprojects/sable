import { faker } from '@faker-js/faker';
function generateUsers() {
    let users = [];
    for (let id = 1; id <= 10; id++) {
        let firstName = faker.person.firstName();
        let lastName = faker.person.lastName();
        let email = faker.internet.email();
        users.push({
            "id": id,
            "firstName": firstName,
            "lastName": lastName,
            "email": email
        });
    }
    return { "data": users };
}
const obj = generateUsers();
export default obj;
