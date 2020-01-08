import React from 'react';
import { useLocation, useParams } from 'dva';
import ContentLayout from '@/layouts/ContentLayout';

const TestName: React.FC = () => {
  const location = useLocation<{ name: string }>();
  const params = useParams<{ name: string }>();
  return (
    <ContentLayout>
      <div>Params: {params.name}</div>
      <div>Search: {location.search}</div>
    </ContentLayout>
  );
};

export default TestName;
