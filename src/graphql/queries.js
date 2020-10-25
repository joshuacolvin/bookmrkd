/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      title
      authors
      categories
      isbn
      pageCount
      publisher
      thumbnail
      createdAt
      description
      recommendations {
        items {
          id
          recommendedBy
          bookID
          url
          notes
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
export const listBooks = /* GraphQL */ `
  query ListBooks(
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        authors
        categories
        isbn
        pageCount
        publisher
        thumbnail
        createdAt
        description
        recommendations {
          nextToken
        }
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getRecommendation = /* GraphQL */ `
  query GetRecommendation($id: ID!) {
    getRecommendation(id: $id) {
      id
      recommendedBy
      bookID
      url
      notes
      createdAt
      book {
        id
        title
        authors
        categories
        isbn
        pageCount
        publisher
        thumbnail
        createdAt
        description
        recommendations {
          nextToken
        }
        updatedAt
        owner
      }
      updatedAt
      owner
    }
  }
`;
export const listRecommendations = /* GraphQL */ `
  query ListRecommendations(
    $filter: ModelRecommendationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecommendations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        recommendedBy
        bookID
        url
        notes
        createdAt
        book {
          id
          title
          authors
          categories
          isbn
          pageCount
          publisher
          thumbnail
          createdAt
          description
          updatedAt
          owner
        }
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
