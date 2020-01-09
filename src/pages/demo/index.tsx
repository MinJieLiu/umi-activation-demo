import React from 'react';
import ContentLayout from '@/layouts/ContentLayout';
import { Card } from 'antd';

const Demo: React.FC = () => {
  return (
    <ContentLayout>
      <Card title="demo" bordered={false}>
        这是一个 Demo
      </Card>
    </ContentLayout>
  );
};

export default Demo;
