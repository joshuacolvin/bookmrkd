export const listBooksAndRecommendations = /* GraphQL */ `
  query ListBooks(
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        thumbnail
        recommendations {
          items {
            id
          }
          nextToken
        }
        owner
      }
      nextToken
    }
  }
`;
