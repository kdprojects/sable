import { faker } from '@faker-js/faker';
function generateRestaurants() {
    let res = [];
    for (let id = 1; id <= 100; id++) {
        let name = faker.company.name();
        let canDeliver = faker.datatype.boolean();
        let rId = faker.datatype.uuid();
        res.push({
            "userId": id,
            "name": name,
            "canDeliver": canDeliver,
            "id": rId
        });
    }
    return { "data": res };
}
let obj = generateRestaurants();
export default obj;
