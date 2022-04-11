import React from 'react';
import H from 'next/head';
import { useSelector } from 'react-redux';

import { getEvent, getEventOwner } from '@Selectors';
import { UtilService } from '@Services';
import { useTranslation } from '@I18n';

import { Head } from '../Head';
import { IEventHead } from './EventHead';

const EventHeadComp: React.FunctionComponent<IEventHead.IProps> = ({ title: t = '', eventId }) => {
  const { t: i18n } = useTranslation('common');
  const event = useSelector(getEvent(eventId));
  const owner = useSelector(getEventOwner(eventId));
  if (!event || !owner) return <Head />;

  let title = `@${owner.username}/${event.name}`;
  if (t.length > 0) {
    title = `${title} - ${t}`;
  }
  title += i18n('Head_Suffix');

  const list = [
    <meta key="twitter:title" name="twitter:title" content={title} />,
    <meta key="og:title" property="og:title" content={title} />,
  ];

  if (event.description) {
    const description = event.description.split('\n').join('');
    list.push(<meta key="description" name="description" content={description} />);
    list.push(<meta key="twitter:description" name="twitter:description" content={description} />);
    list.push(<meta key="og:description" property="og:description" content={description} />);
  }

  if (event.headerImage) {
    const imageUrl = UtilService.getImageUrl(event.headerImage.imageUrl, 500, 300);
    list.push(<meta key="twitter:image" name="twitter:image" content={imageUrl} />);
    list.push(<meta key="og:image" property="og:image" content={imageUrl} />);
  }

  return (
    <H>
      <title>{title}</title>
      {list}
    </H>
  );
};

export const EventHead = EventHeadComp;
