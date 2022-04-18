import React from 'react';
import Link from 'next/link';

import { Logo } from '@Components/Basic/Logo';

export const HeaderLogo: React.FunctionComponent = () => {
  return (
    <Link href="/">
      <a href="/" className="link">
        <Logo styles={{ width: '1.85rem', height: '1.85rem' }} />
        <style jsx>
          {`
            a {
              padding: 0.45rem;
              width: 2.75rem;
              height: 2.75rem;
              margin-right: 1.5rem;
              border-radius: 50%;
              transition: all 0.2s;
              display: block;
            }

            a:hover {
              background-color: rgba(0, 0, 0, 0.075);
            }

            a:active {
              transform: scale(0.9);
            }

            .link > :global(span) {
              width: 2.75rem !important;
              display: block;
            }

            @media (max-width: 700px) {
              a {
                display: none;
              }
            }
          `}
        </style>
      </a>
    </Link>
  );
};
