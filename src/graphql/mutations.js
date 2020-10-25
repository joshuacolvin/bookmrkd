/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBook = /* GraphQL */ `
  mutation CreateBook(
    $input: CreateBookInput!
    $condition: ModelBookConditionInput
  ) {
    createBook(input: $input, condition: $condition) {
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
export const updateBook = /* GraphQL */ `
  mutation UpdateBook(
    $input: UpdateBookInput!
    $condition: ModelBookConditionInput
  ) {
    updateBook(input: $input, condition: $condition) {
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
export const deleteBook = /* GraphQL */ `
  mutation DeleteBook(
    $input: DeleteBookInput!
    $condition: ModelBookConditionInput
  ) {
    deleteBook(input: $input, condition: $condition) {
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
export const createRecommendation = /* GraphQL */ `
  mutation CreateRecommendation(
    $input: CreateRecommendationInput!
    $condition: ModelRecommendationConditionInput
  ) {
    createRecommendation(input: $input, condition: $condition) {
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
export const updateRecommendation = /* GraphQL */ `
  mutation UpdateRecommendation(
    $input: UpdateRecommendationInput!
    $condition: ModelRecommendationConditionInput
  ) {
    updateRecommendation(input: $input, condition: $condition) {
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
export const deleteRecommendation = /* GraphQL */ `
  mutation DeleteRecommendation(
    $input: DeleteRecommendationInput!
    $condition: ModelRecommendationConditionInput
  ) {
    deleteRecommendation(input: $input, condition: $condition) {
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
