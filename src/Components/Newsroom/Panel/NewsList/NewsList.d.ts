import React from 'react';

declare namespace INewsroomPanelNewsList {
  export interface IProps {
    newsIdList: number[];
    droppableId?: string;
    isNested?: boolean;
    style?: React.CSSProperties;
  }
}

export { INewsroomPanelNewsList };
