import React from 'react';
import { Card } from 'antd';
import ContentLayout from '@/layouts/ContentLayout';

export default (): React.ReactNode => (
  <ContentLayout>
    <Card title="提醒" bordered={false}>
      新开页面后，点击 Tab 左边的点即可固定
    </Card>
  </ContentLayout>
);
