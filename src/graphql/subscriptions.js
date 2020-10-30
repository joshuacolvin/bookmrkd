/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBook = /* GraphQL */ `
  subscription OnCreateBook($owner: String!) {
    onCreateBook(owner: $owner) {
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
      status
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
export const onUpdateBook = /* GraphQL */ `
  subscription OnUpdateBook($owner: String!) {
    onUpdateBook(owner: $owner) {
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
      status
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
export const onDeleteBook = /* GraphQL */ `
  subscription OnDeleteBook($owner: String!) {
    onDeleteBook(owner: $owner) {
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
      status
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
export const onCreateRecommendation = /* GraphQL */ `
  subscription OnCreateRecommendation($owner: String!) {
    onCreateRecommendation(owner: $owner) {
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
        status
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
export const onUpdateRecommendation = /* GraphQL */ `
  subscription OnUpdateRecommendation($owner: String!) {
    onUpdateRecommendation(owner: $owner) {
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
        status
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
export const onDeleteRecommendation = /* GraphQL */ `
  subscription OnDeleteRecommendation($owner: String!) {
    onDeleteRecommendation(owner: $owner) {
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
        status
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
