/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      owner
      name
      birthdate
      address
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      owner
      name
      birthdate
      address
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      owner
      name
      birthdate
      address
      createdAt
      updatedAt
    }
  }
`;
export const onCreateInterest = /* GraphQL */ `
  subscription OnCreateInterest(
    $filter: ModelSubscriptionInterestFilterInput
    $owner: String
  ) {
    onCreateInterest(filter: $filter, owner: $owner) {
      owner
      topic
      parent
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInterest = /* GraphQL */ `
  subscription OnUpdateInterest(
    $filter: ModelSubscriptionInterestFilterInput
    $owner: String
  ) {
    onUpdateInterest(filter: $filter, owner: $owner) {
      owner
      topic
      parent
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInterest = /* GraphQL */ `
  subscription OnDeleteInterest(
    $filter: ModelSubscriptionInterestFilterInput
    $owner: String
  ) {
    onDeleteInterest(filter: $filter, owner: $owner) {
      owner
      topic
      parent
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent(
    $filter: ModelSubscriptionEventFilterInput
    $owner: String
  ) {
    onCreateEvent(filter: $filter, owner: $owner) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent(
    $filter: ModelSubscriptionEventFilterInput
    $owner: String
  ) {
    onUpdateEvent(filter: $filter, owner: $owner) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent(
    $filter: ModelSubscriptionEventFilterInput
    $owner: String
  ) {
    onDeleteEvent(filter: $filter, owner: $owner) {
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
