import React from 'react';
import { Layout, Menu, message, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SolutionOutlined,
  DownOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { connect, DispatchProp } from 'dva';
import { ConnectState, GlobalModelState } from '@/models/connect';
import styles from './NavHeader.less';

interface IDispatchParams {
  global: GlobalModelState;
}

interface INavHeaderProps {
  collapsed: boolean;
  onCollapse: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const NavHeader: React.FC<IDispatchParams & INavHeaderProps & DispatchProp> = ({
  collapsed,
  onCollapse,
  global: { userInfo },
}) => {
  async function handleMenuClick(key: string) {
    // 登出
    if (key === 'logout') {
      message.success('退出成功');
    }
  }

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.menuSwitch} onClick={onCollapse}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className={styles.rightProfile}>
        <Dropdown
          overlay={
            <Menu selectedKeys={[]} onClick={({ key }) => handleMenuClick(key)}>
              <Menu.Item>
                <SolutionOutlined /> 个人信息
              </Menu.Item>
              <Menu.Item key="logout">
                <LogoutOutlined /> 退出
              </Menu.Item>
            </Menu>
          }
          placement="bottomRight"
          trigger={['click']}
        >
          <div className={styles.menuItem}>
            <span>{userInfo.email}</span>
            <DownOutlined className={styles.icon} />
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default connect<IDispatchParams, {}, INavHeaderProps, ConnectState>(({ global }) => ({
  global,
}))(NavHeader);
