import { createSelector } from 'reselect';
import { IStore } from '@Interfaces';

import { getNewsList } from '../news';
import { getStackList } from '../stacks';

export const getEventsState = (state: IStore) => state.events;

export const getEvent = (eventId: number) =>
  createSelector(
    getEventsState,
    eventState => {
      if (typeof eventState.idIndexMap[eventId] === 'undefined') return null;
      return eventState.list[eventState.idIndexMap[eventId]];
    }
  );

export const getEventStackIdList = (eventId: number) =>
  createSelector(
    getEvent(eventId),
    event => (event ? event.stackIdList : []) as number[]
  );

export const getEventOffshelfStackIdList = (eventId: number) =>
  createSelector(
    getEvent(eventId),
    event => (event ? event.offshelfStackIdList : []) as number[]
  );

export const getEventStackList = (eventId: number, sorted = false) =>
  createSelector(
    state => state,
    getEventStackIdList(eventId),
    (state, stackIdList) => getStackList(stackIdList, sorted)(state)
  );

export const getEventNewsIdList = (eventId: number) =>
  createSelector(
    getEvent(eventId),
    event => (event ? event.newsIdList : []) as number[]
  );

export const getEventTemporaryStackNewsIdList = (eventId: number) =>
  createSelector(
    getEvent(eventId),
    event => (event ? event.temporaryStackNewsIdList : []) as number[]
  );

export const getEventOffshelfNewsIdList = (eventId: number) =>
  createSelector(
    getEvent(eventId),
    event => (event ? event.offshelfNewsIdList : []) as number[]
  );

export const getEventNewsList = (eventId: number, sorted = false) =>
  createSelector(
    state => state,
    getEventNewsIdList(eventId),
    (state, newsIdList) => getNewsList(newsIdList, sorted)(state)
  );

export const getEventOffshelfNewsList = (eventId: number, sorted = false) =>
  createSelector(
    state => state,
    getEventOffshelfNewsIdList(eventId),
    (state, newsIdList) => getNewsList(newsIdList, sorted)(state)
  );

export const getEventTemporaryStackNewsList = (eventId: number, sorted = false) =>
  createSelector(
    state => state,
    getEventTemporaryStackNewsIdList(eventId),
    (state, newsIdList) => getNewsList(newsIdList, sorted)(state)
  );
