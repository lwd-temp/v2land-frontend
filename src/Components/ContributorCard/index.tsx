import React from 'react';

import { IContributorCard } from './ContributorCard';

const ContributorCard: React.FunctionComponent<IContributorCard.IProps> = ({ contributor }) => {
  return (
    <div>
      <img src="/images/default.jpg" alt="Contributor avatar" />
      <span>{contributor}</span>
      <style jsx>
        {`
          div {
            display: flex;
            align-items: center;
            padding: 0.25rem 1rem;
            background-color: #fff;
            box-shadow: 0 2.5px 7.5px rgba(0, 0, 0, 0.0375);
          }

          div:first-child,
          div.first-child {
            border-top-right-radius: 0.25rem;
            border-top-left-radius: 0.25rem;
            padding-top: 0.5rem;
          }

          div:last-child {
            border-bottom-right-radius: 0.25rem;
            border-bottom-left-radius: 0.25rem;
            padding-bottom: 0.5rem;
          }

          img {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
          }

          span {
            font-size: 1.25rem;
            margin-left: 0.75rem;
          }
        `}
      </style>
    </div>
  );
};

export { ContributorCard };
