import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import users from './users.js'
import resturants from './restaurants.js'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    firstName: String
    lastName: String
    email: String
    dob: String
    quests: [Quest]
    restaurants: [Restaurant]
  }
  
  type Restaurant {
    name: String
    logo: String
    location: [Address]
    staff: [Staff]
    menus: [Menu]
    canDeliver: Boolean
    isChain: Boolean
    settings: Setting
  }

  type Address {
    friendlyName: String
    addressLine1: String
    addressLine2: String
    addressLine3: String
    postal: String
    country: Country
  }

  type Country {
    name: String
    code: String
  }

  type Staff {
    user: User
    role: Role
    active: Boolean
    hireDate: String
  }

  type Menu {
    dishes: [Dish]
    dayServed: [ServiceDay]
  }

  enum Role {
    USER
    CONTROBUTOR
    ADMIN
  }

  enum ServiceDay{
    EVERYDAY
    WEEKDAYS
    WEEKENDS
    CUSTOM
  }

  type Dish {
    name: String
    howToMake: [Recipe]
  }

  type Ingredient {
    name: String
    uom: [String]
    onHandQty: Int
  }

  type Recipe {
    name: String
  }

  type Setting {
    name: String
    value: String
  }

  type Quest {
    title: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
    restaurants: [Restaurant]
    user: User
    restaurant: Restaurant
  }
`;

const resolvers = {
    Query: {
        users: ()=>users.data,
        restaurants: ()=> resturants.data,
        user: id=>users.data.filter(u=> u.id == id),
        restaurant: id => resturants.data.filter(r=>r.userId == id)
    }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);