import React from 'react';
import { router } from 'umi';
import { Menu } from 'antd';
import { IMenuItem } from '@/models/global';

interface INavMenu {
  menus: IMenuItem[];
}

const NavMenu: React.FC<INavMenu> = ({ menus }) => {
  function handleMenuSelect(params: { key: string }) {
    const { url = '' } = menus.find(n => String(n.id) === params.key) || {};
    // 若是站外链接，则跳转
    if (url.includes('//')) {
      window.open(url);
      return;
    }
    const [path, search] = url.split('?');

    router.replace({
      pathname: path,
      search,
    });
  }

  return (
    <Menu theme="dark" mode="inline" onSelect={handleMenuSelect}>
      {menus.map(item => (
        <Menu.Item key={item.id}>
          <span className="nav-text">{item.title}</span>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default NavMenu;
