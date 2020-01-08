import React from 'react';
import { Link } from 'umi';
import ContentLayout from '@/layouts/ContentLayout';

export default (): React.ReactNode => (
  <ContentLayout>
    <div>
      <Link to="/user-info">用户列表</Link>
    </div>

    <div>
      <Link to="/test/hello">test with params</Link>
    </div>
    <div>
      <Link to="/test/hello?result=world">test with params and queryString</Link>
    </div>
  </ContentLayout>
);
