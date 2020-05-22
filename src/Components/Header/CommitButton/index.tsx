import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'react-redux';
import { Button, message } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import { getNewsroomSocket, NewsroomSocket } from '@Services';

export const HeaderCommitButton: React.FunctionComponent = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const eventId = +router.query.eventName;
  const store = useStore();

  const makeCommit = async () => {
    setLoading(true);
    try {
      const socket = getNewsroomSocket(eventId, store) as NewsroomSocket;
      const { commit } = await socket.makeCommit('Hey', 'Yo');
      if (commit) {
        message.success('成功更新时间线');
      } else {
        message.info('更新失败，时间线没有任何改变');
      }
    } catch (err) {
      // Do nothing
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="button">
      <Button
        type="primary"
        size="large"
        shape="round"
        icon={<FormOutlined />}
        loading={isLoading}
        onClick={makeCommit}
      >
        更新时间线
      </Button>
      <style jsx>
        {`
          .button {
            transition: all 0.5s;
            margin-left: 0.5rem;
          }

          .button:active {
            transform: scale(0.9);
          }
        `}
      </style>
    </div>
  );
};
