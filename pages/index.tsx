// #region Global Imports
import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Col, message, Row } from 'antd';
// #endregion Global Imports
// #region Local Imports
import { useTranslation } from '@I18n';
import { EventActions, TagActions } from '@Actions';
import {
  Background,
  EventCardList,
  Footer,
  Head,
  SectionHeader,
  TagCard,
} from '@Components';
import { RedstoneService, UtilService } from '@Services';
// #endregion Local Imports
// #region Interface Imports
import { IHomePage, ReduxNextPageContext } from '@Interfaces';
// #endregion Interface Imports

const Home: NextPage<IHomePage.IProps, IHomePage.InitialProps> = ({ tagList }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  useEffect(() => {
    if (router.query.event_not_found) {
      message.error(t('Home_EventNotFound'));
      UtilService.replace('/', { shallow: true });
    }
  }, [router.query.event_not_found]);

  useEffect(() => {
    if (router.query.client_not_found) {
      message.error(t('Home_ClientNotFound'));
      UtilService.replace('/', { shallow: true });
    }
  }, [router.query.client_not_found]);

  return (
    <Background>
      <Head />
      <Row className="grid" justify="space-between" gutter={32}>
        <Col span={18}>
          <EventCardList className="left" />
        </Col>

        <Col span={6}>
          <div className="tagList">
            <SectionHeader>{t('Home_Topics_TrendingTopics')}</SectionHeader>
            <>
              {tagList.map(tag => (
                <TagCard tag={tag} key={tag.id} />
              ))}
            </>
            {/* <SectionHeader>{t('Home_Contributions_ContributionRanking')}</SectionHeader>
            <>
              <ContributorCard contributor="Vincent" />
              <ContributorCard contributor="CCAV" />
              <ContributorCard contributor="Alan" />
              <ContributorCard contributor="Erick" />
            </> */}
          </div>
        </Col>
      </Row>
      <Footer />
      <style jsx>
        {`
          .grid {
            //display: grid;
            width: 100%;
            max-width: 58rem;
            //grid-auto-columns: 40rem 2rem 16rem;
          }

          //.left > :global(*) {
          //  grid-column: 1;
          //}
          //
          //.right {
          //  display: block;
          //  grid-column: 3;
          //}

          .tagList {
            position: sticky;
            top: 5rem;
          }
        `}
      </style>
    </Background>
  );
};

Home.getInitialProps = async (ctx: ReduxNextPageContext): Promise<IHomePage.InitialProps> => {
  await ctx.store.dispatch(EventActions.GetEventList());
  let tagList = await RedstoneService.getTagList();
  for (let i = 0; i < tagList.length; i += 1) {
    ctx.store.dispatch(TagActions.AddTag(tagList[i]));
  }
  tagList = tagList.filter(tag => tag.eventIdList.length > 0);
  return {
    tagList,
    namespacesRequired: ['common'],
  };
};

export default Home;
