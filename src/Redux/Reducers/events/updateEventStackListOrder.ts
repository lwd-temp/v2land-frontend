import { EventsState, EventAction } from '@Interfaces';

const updateEventStackListOrder = (state: EventsState, action: EventAction) => {
  if (!action.stackIdList || !action.eventId) return state;
  const { stackIdList, eventId } = action;
  const index = state.idIndexMap[eventId];
  if (typeof index === 'undefined') return state;
  const event = { ...state.list[index] };

  for (let i = 0; i < stackIdList.length; i += 1) {
    const stackId = stackIdList[i];
    if (event.offshelfStackIdList.includes(stackId)) {
      event.offshelfStackIdList.splice(event.offshelfStackIdList.indexOf(stackId), 1);
    }
  }

  event.stackIdList = stackIdList;
  event.offshelfStackIdList = event.offshelfStackIdList.filter(id => !stackIdList.includes(id));
  return {
    ...state,
    list: [...state.list.slice(0, index), event, ...state.list.slice(index + 1)],
  };
};

export default updateEventStackListOrder;
