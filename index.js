import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID
    title: String
    author: String
    createdAt: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    book(id: ID): Book
  }
`;

const books = [
  {
    id: 1,
    title: 'The Awakening',
    author: 'Kate Chopin',
    createdAt: 458295425,
  },
  {
    id: 2,
    title: 'City of Glass',
    author: 'Paul Auster',
    createdAt: 458295426,
  },
  {
    id: 3,
    title: 'Glorp World',
    author: 'Professor T. Glorp',
    createdAt: 458295427,
  },
  {
    id: 4,
    title: 'The Trindletips Trilogy',
    author: 'Eamonn F. Flange',
    createdAt: 458295428,
  },
  {
    id: 5,
    title: 'The Chronicles of Christmas',
    author: 'The Duchess of Christmas',
    createdAt: 458295429,
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args, context, info) => {
      console.log('Its working' + args.id);
      return books.find((book) => book.id === parseInt(args.id));
    },
  },
  Book: {
    createdAt: (parent) => {
      return new Date(parent.createdAt).toISOString();
    },
  },
};

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
