import React from 'react';
import { useSelector } from 'react-redux';
import { getNews } from '@Selectors';

import { Image } from '@Components/Basic';

import { INewsItem } from './NewsItem';

export const NewsItem: React.FunctionComponent<INewsItem.IProps> = ({ id }) => {
  const news = useSelector(getNews(id));
  const url = news ? news.url : '';
  return (
    <div className="news-item">
      <div className="news-link">
        <div className="img">
          <Image src="/images/defaultSource.png" alt="media icon" width={64} height={64} />
        </div>
        <a href={url} target="_blank" rel="noreferrer">
          {news && news.title}
        </a>
      </div>

      <div className="news-source">
        <p>{news && news.source}</p>
      </div>

      <style jsx>
        {`
          .news-item {
            max-height: 2.2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
          }

          .news-link {
            display: flex;
            align-items: center;
            flex-grow: 1;
          }

          .news-item .img {
            height: 1.2rem;
            width: 1.2rem;
            margin-right: 0.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .news-item :global(img) {
            height: 1rem;
            width: 1rem;
          }

          .news-source {
            position: absolute;
            right: 0;
            line-height: 2rem;
            padding-left: 1.5rem;
            background: #fff;
            background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff 1rem, #fff 100%);
            white-space: nowrap;
          }

          a {
            color: black;
            line-height: 1.75;
            border-top: 1.5px solid transparent;
            border-bottom: 1.5px solid transparent;
            white-space: nowrap;
          }

          a:hover {
            text-decoration: none !important;
            border-bottom-color: #333;
          }

          p {
            margin: 0;
            font-size: 0.9rem;
            color: gray;
          }
        `}
      </style>
    </div>
  );
};
