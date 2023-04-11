/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($owner: String!) {
    getUser(owner: $owner) {
      owner
      name
      birthdate
      address
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $owner: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      owner: $owner
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        owner
        name
        birthdate
        address
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getInterest = /* GraphQL */ `
  query GetInterest($id: ID!) {
    getInterest(id: $id) {
      owner
      topic
      parent
      id
      createdAt
      updatedAt
    }
  }
`;
export const listInterests = /* GraphQL */ `
  query ListInterests(
    $filter: ModelInterestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInterests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        owner
        topic
        parent
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const interestsByOwner = /* GraphQL */ `
  query InterestsByOwner(
    $owner: String!
    $sortDirection: ModelSortDirection
    $filter: ModelInterestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    interestsByOwner(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        owner
        topic
        parent
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      owner
      begin
      end
      location
      minAge
      maxAge
      topics
      rsvps
      status
      id
      createdAt
      updatedAt
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        owner
        begin
        end
        location
        minAge
        maxAge
        topics
        rsvps
        status
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const eventsByOwner = /* GraphQL */ `
  query EventsByOwner(
    $owner: String!
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByOwner(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        owner
        begin
        end
        location
        minAge
        maxAge
        topics
        rsvps
        status
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const eventsByStatus = /* GraphQL */ `
  query EventsByStatus(
    $status: Status!
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByStatus(
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        owner
        begin
        end
        location
        minAge
        maxAge
        topics
        rsvps
        status
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
