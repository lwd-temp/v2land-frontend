import rfdc from 'rfdc';
import { EventsState, EventAction } from '@Interfaces';

const clone = rfdc();

const updateEventOffshelfStackListOrder = (state: EventsState, action: EventAction) => {
  if (!action.stackIdList || !action.eventId) return state;
  const { stackIdList, eventId } = action;
  const index = state.idIndexMap[eventId];
  if (typeof index === 'undefined') return state;
  const event = clone(state.list[index]);

  for (let i = 0; i < stackIdList.length; i += 1) {
    const stackId = stackIdList[i];
    if (event.stackIdList.includes(stackId)) {
      event.stackIdList.splice(event.stackIdList.indexOf(stackId), 1);
    }
  }

  event.offshelfStackIdList = stackIdList;
  event.stackIdList = event.stackIdList.filter(id => !stackIdList.includes(id));
  return {
    ...state,
    list: [...state.list.slice(0, index), event, ...state.list.slice(index + 1)],
  };
};

export default updateEventOffshelfStackListOrder;
