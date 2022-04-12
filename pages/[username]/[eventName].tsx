// #region Global Imports
import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { message } from 'antd';
// #endregion Global Imports

// #region Local Imports
import { useTranslation } from '@I18n';
import {
  Background,
  EventHead,
  Footer,
  Card,
  EventTitle,
  EventStats,
  EventTagList,
  EventDescription,
  EventContributorList,
  EventCardShimmer,
  Stack,
  StackShimmer,
  StackSideMenu,
  Share,
  SectionHeader,
} from '@Components';
import { getEvent, getEventStackIdList, getStackListTime, isLoading } from '@Selectors';
import { UtilService } from '@Services';
import styles from '@Static/css/common.module.scss';
// #endregion Local Imports

// #region Interface Imports
import { IEventPage, ReduxNextPageContext } from '@Interfaces';
// #endregion Interface Imports

const EventPage: NextPage<IEventPage.IProps, IEventPage.InitialProps> = ({ eventId }) => {
  const { t } = useTranslation('common');
  const event = useSelector(getEvent(eventId));
  const stackIdList = useSelector(getEventStackIdList(eventId));
  const stackTimeList = useSelector(getStackListTime(stackIdList));
  const router = useRouter();

  let username = (router.query.username as string) || '';
  if (username.startsWith('@')) {
    username = username.slice(1);
  }

  const identifier = `event-${eventId}-${username}-0`;
  const isEventLoading = useSelector(isLoading(identifier));

  useEffect(() => {
    if (router.query.client_not_authorized) {
      message.error('你没有进入该事件新闻编辑室的权限');
      const index = router.asPath.indexOf('?');
      if (index >= 0) {
        UtilService.replace(router.asPath.slice(0, index), { shallow: true });
      } else {
        UtilService.replace(router.asPath, { shallow: true });
      }
    }
  }, [router.query.client_not_authorized]);

  const eventCard = event ? (
    <Card>
      <EventTitle>{event.name}</EventTitle>
      <EventStats newsCount={event.newsCount} stackCount={event.stackCount} />
      <EventDescription description={event.description || ''} />
      <EventTagList tagIdList={event.tagIdList} />
      <div className="bottom">
        <EventContributorList eventId={event.id} />
        <Share event={event} />
      </div>
      <style jsx>
        {`
          .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.5rem;
          }
        `}
      </style>
    </Card>
  ) : (
    <EventCardShimmer />
  );

  const stacks: React.ReactElement[] = [];
  let lastTimeStr = '';
  let lastTime = new Date();
  for (let i = 0; i < stackIdList.length; i += 1) {
    const time = stackTimeList[i];
    const timeStr = UtilService.getTimeString(time, { showMonthOnly: true, forceShowYear: true });
    if (
      time &&
      timeStr &&
      (!lastTimeStr || timeStr !== lastTimeStr) &&
      time.getTime() < lastTime.getTime()
    ) {
      lastTimeStr = timeStr;
      stacks.push(
        <SectionHeader key={`section-${timeStr}`} className={styles['stack-section-header']}>
          {timeStr}
        </SectionHeader>
      );
    }
    if (time && time.getTime() < lastTime.getTime()) {
      lastTime = time;
    }
    const stackId = stackIdList[i];
    stacks.push(<Stack stackId={stackId} isLatestStack={i === 0} key={`stack-${stackId}`} />);
  }

  const showShimmer = (isEventLoading || !event) && stackIdList.length === 0;
  if (showShimmer) {
    for (let i = 0; i < 4; i += 1) {
      stacks.push(<StackShimmer key={`shimmer-${i}`} />);
    }
  }

  return (
    <Background>
      <EventHead eventId={eventId} />
      <StackSideMenu
        stackIdList={stackIdList}
        title={event ? event.name : ''}
        loading={showShimmer}
      />
      {eventCard}
      {stacks}
      <Footer />
    </Background>
  );
};

EventPage.getInitialProps = async (ctx: ReduxNextPageContext): Promise<IEventPage.InitialProps> => {
  const eventId = (await UtilService.getEventIdMiddleware(ctx, '', { lazyLoad: true })) || 0;

  return {
    namespacesRequired: ['common'],
    eventId,
  };
};

export default EventPage;
