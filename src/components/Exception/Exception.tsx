import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import typeConfig from './typeConfig';

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Content = styled.div`
  width: auto;

  h1 {
    margin-bottom: 24px;
    color: #434e59;
    font-size: 72px;
    line-height: 1;
    font-weight: bold;
  }
`;

const Description = styled.div`
  color: #777;
  font-size: 20px;
  line-height: 1.4;
  margin-bottom: 16px;
`;

interface IException {
  type?: string;
  title?: string;
  description?: React.ReactNode;
}

const Exception: React.FC<IException> = ({ type = '404', title, description }) => (
  <Container>
    <Content>
      <h1>{title || typeConfig[type].title}</h1>
      <Description>{description || typeConfig[type].desc}</Description>
      <a href="/">
        <Button type="primary">
          <FormattedMessage id="homePage" />
        </Button>
      </a>
    </Content>
  </Container>
);

export default Exception;
