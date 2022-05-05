import React from 'react';

import { Tag } from '@Components/Tag';
import { StarCard } from '../StarCard';

import { IInfoList } from './InfoList';

export const EventInfoList: React.FC<IInfoList.IProps> = ({
  className,
  starCount,
  tagIdList = [],
}) => {
  const empty = tagIdList.length === 0 && !starCount;

  return (
    <div className={`container ${className}`}>
      {starCount ? <StarCard starCount={starCount} /> : null}
      {tagIdList.map(tagId => (
        <Tag tagId={tagId} key={`tag-${tagId}`} />
      ))}
      <style jsx>
        {`
        .container {
          margin-top: ${empty ? 0 : '0.5rem'};
          display; flex;
          flex-wrap: wrap;
          height: ${empty ? '0' : '1.5rem'};
          overflow: hidden;
          position: relative;
          z-index: 10;
        }
      `}
      </style>
    </div>
  );
};
