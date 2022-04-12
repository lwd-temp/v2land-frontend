import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TFunction } from 'next-i18next';

import { useTranslation } from '@I18n';

import { NewsroomPanelNewsCard } from '../NewsCard';
import { INewsroomPanelNewsList } from './NewsList';

const showPlaceholder = (newsIdList: number[], t: TFunction) => {
  const show = newsIdList.length === 0;

  return (
    <div>
      <span>{t('Newsroom_NewsList_DragSuggestion')}</span>
      <style jsx>
        {`
          div {
            width: calc(100% - 1rem);
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 0.5rem;
            padding: 0rem 0.5rem;
            background-color: rgb(232, 232, 232);
            opacity: ${show ? 1 : 0};
            border-radius: 0.25rem;
            user-select: none;
            transition: all 0.3s;
            z-index: 0;
          }
        `}
      </style>
    </div>
  );
};

const NewsroomPanelNewsListImpl: React.FunctionComponent<INewsroomPanelNewsList.IProps> = ({
  newsIdList,
  droppableId = 'newsroom-news-panel',
  isNested = false,
  style,
}) => {
  const { t } = useTranslation('common');
  return (
    <Droppable droppableId={droppableId} type="NEWS">
      {provided => (
        <div style={style} ref={provided.innerRef} {...provided.droppableProps}>
          {newsIdList.map((newsId, index) => (
            <NewsroomPanelNewsCard newsId={newsId} key={`news-${newsId}`} index={index} />
          ))}
          {provided.placeholder}
          {showPlaceholder(newsIdList, t)}
          <style jsx>
            {`
              div {
                position: relative;
                padding: ${isNested ? '0 0 0.25rem' : '0 0.5rem 0.5rem'};
                min-height: ${isNested ? '2.5rem' : '3rem'};
                ${isNested ? '' : 'overflow-y: scroll'};
              }

              div > :global(div:last-child) {
                width: ${isNested ? '100%' : 'calc(100% - 1rem)'};
                left: ${isNested ? '0' : '0.5rem'};
                top: ${isNested ? '0.3rem' : '0.5rem'};
                height: ${isNested ? 'calc(100% - 0.5rem)' : 'calc(100% - 1rem)'};
              }
            `}
          </style>
        </div>
      )}
    </Droppable>
  );
};

export const NewsroomPanelNewsList = NewsroomPanelNewsListImpl;
