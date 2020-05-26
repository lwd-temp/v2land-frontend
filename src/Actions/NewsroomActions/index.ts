// #region Local Imports
import { Newsroom } from '@Interfaces';
import { ActionConsts } from '@Definitions';
// #endregion Local Imports

export const NewsroomActions = {
  AddNewsroom: (newsroom: Newsroom) => ({
    newsroom,
    type: ActionConsts.Newsroom.AddNewsroom,
  }),

  UpdateNewsroom: (newsroom: Newsroom) => ({
    newsroom,
    type: ActionConsts.Newsroom.UpdateNewsroom,
  }),

  AddNewsroomClient: (eventId: number, clientId: number) => ({
    eventId,
    clientId,
    type: ActionConsts.Newsroom.AddNewsroomClient,
  }),

  SetNewsroomClientRole: (eventId: number, clientId: number, role?: string) => ({
    eventId,
    clientId,
    role,
    type: ActionConsts.Newsroom.SetNewsroomClientRole,
  }),

  RemoveNewsroomClient: (eventId: number, clientId: number) => ({
    eventId,
    clientId,
    type: ActionConsts.Newsroom.RemoveNewsroomClient,
  }),

  LockResource: (eventId: number, model: string, resourceId: number, locker?: number) => ({
    eventId,
    model,
    resourceId,
    locker,
    type: ActionConsts.Newsroom.LockResource,
  }),

  UnlockResource: (eventId: number, model: string, resourceId: number) => ({
    eventId,
    model,
    resourceId,
    type: ActionConsts.Newsroom.UnlockResource,
  }),

  SetPanelsOrder: (panels: string[]) => ({
    panels,
    type: ActionConsts.Newsroom.SetPanelsOrder,
  }),

  SetStackNewsVisible: (visible: boolean) => ({
    visible,
    type: ActionConsts.Newsroom.SetStackNewsVisible,
  }),

  SetNewsroomClientInvitationVisible: (visible: boolean) => ({
    visible,
    type: ActionConsts.Newsroom.SetNewsroomClientInvitationVisible,
  }),

  SetIndividualStackNewsVisible: (stackId: number, visible: boolean) => ({
    stackId,
    visible,
    type: ActionConsts.Newsroom.SetIndividualStackNewsVisible,
  }),

  SetActiveNewsroom: (eventId: number) => ({
    eventId,
    type: ActionConsts.Newsroom.SetActiveNewsroom,
  }),
};
