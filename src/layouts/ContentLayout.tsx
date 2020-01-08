import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const MainInner = styled.div`
  padding: 20px;
`;

const ContentLayout: React.FC = ({ children }) => {
  return (
    <Content>
      <MainInner>{children}</MainInner>
    </Content>
  );
};

export default ContentLayout;
