import React from 'react';
import { Layout } from 'antd';
import { connect, DispatchProp } from 'dva';
import styled from 'styled-components';
import NavHeader from '@/components/NavHeader';
import { ConnectState, GlobalModelState, Loading } from '@/models/connect';
import Spinner from '@/components/Spinner';
import NavTab from '@/components/NavTab';
import NavMenu from '@/components/NavMenu/NavMenu';

const { Sider } = Layout;

const MainContainer = styled(Layout)`
  height: 100%;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 26px;
  height: 24px;

  img {
    height: 100%;
  }

  .logoText {
    margin-left: 10px;
    color: white;
    font-size: 16px;
    font-weight: bold;
  }
`;

const MenuWrap = styled.div`
  max-height: calc(100% - 48px);
  padding-bottom: 48px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: #999;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background: #ccc;
  }
`;

const MainLayout = styled(Layout)`
  height: 100%;
`;

const MainContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

interface IBasicLayoutParams {
  globalModal: GlobalModelState;
  loading: Loading;
}

const BasicLayout: React.FC<IBasicLayoutParams & DispatchProp> = ({
  dispatch,
  globalModal,
  loading,
  children,
}) => {
  const { collapsed, menuList = [] } = globalModal;
  function handleCollapse() {
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !collapsed,
    });
  }

  React.useEffect(() => {
    dispatch({
      type: 'global/getGlobalData',
    });
  }, []);

  if (loading.models.global !== false) {
    return <Spinner />;
  }

  return (
    <MainContainer>
      <Sider collapsed={collapsed} width={230}>
        <LogoWrap>{!collapsed && <div className="logoText" />}</LogoWrap>
        <MenuWrap>
          <NavMenu menus={menuList} />
        </MenuWrap>
      </Sider>
      <MainLayout>
        <NavHeader collapsed={collapsed!} onCollapse={handleCollapse} />
        <MainContent>
          <NavTab menus={menuList} />
          {children}
        </MainContent>
      </MainLayout>
    </MainContainer>
  );
};

export default connect<IBasicLayoutParams, {}, {}, ConnectState>(({ global, loading }) => ({
  globalModal: global,
  loading,
}))(BasicLayout);
