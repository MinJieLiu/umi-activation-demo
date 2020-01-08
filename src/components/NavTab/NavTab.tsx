import React from 'react';
import { useLocation } from 'dva';
import { delay } from 'lodash';
import { router } from 'umi';
import { Dropdown, Menu, Tag } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { __RouterContext } from 'react-router';
import { useAliveController, fixContext, CachingNode } from 'react-activation';
import styles from './NavTab.less';
import { IMenuItem } from '@/models/global';

// 解决 KeepAlive 导致 React-Router context 失效的问题
// useParams 须在 trunk 中使用
fixContext(__RouterContext);

export interface INavTab {
  menus: IMenuItem[];
}

/**
 * 页签
 */
const NavTab: React.FC<INavTab> = ({ menus }) => {
  const { getCachingNodes, dropScope, clear } = useAliveController();
  const { pathname, search } = useLocation();
  // 固定列表
  const [fixedArr, setFixedArr] = React.useState<string[]>([]);

  const cachingNodes = getCachingNodes ? getCachingNodes().filter(node => node.name) : [];
  const currentUrl = pathname + search;

  // 有标签页变化时清空未固定的列表
  React.useEffect(() => {
    const cachingName = cachingNodes.map(node => node.name);
    const notFixed = cachingName.filter(
      itemName => !fixedArr.find(n => itemName === n || itemName === currentUrl),
    );
    notFixed.forEach(name => dropScope(name!));
  }, [cachingNodes.length]);

  // 固定/取消固定
  function toggleFixedTab(itemName: string) {
    setFixedArr(arr =>
      arr.includes(itemName) ? arr.filter(n => n !== itemName) : arr.concat(itemName),
    );
  }

  // 关闭
  function clearOne(itemName: string, isActive: boolean) {
    // 当前标签在关闭时，需跳转到上一个标签
    if (isActive) {
      const currentIndex = cachingNodes.findIndex(node => node.name === itemName);
      router.replace(currentIndex >= 1 ? cachingNodes[currentIndex - 1].name || '/' : '/');
    }
    setFixedArr(arr => arr.filter(n => n !== itemName));
    delay(() => dropScope(itemName), 0);
  }

  // 关闭其他
  function handleClearOther(item: CachingNode) {
    router.replace({
      pathname: item.pathname,
      search: item.search,
    });
    setFixedArr(arr => arr.filter(n => n === item.name));
    delay(() => dropScope(new RegExp(`^((?!${item.name}).)+$`)), 0);
  }

  // 跳转到首页，关闭所有
  function handleClearAll() {
    router.replace('/');
    setFixedArr([]);
    delay(clear, 0);
  }

  return (
    <div className={styles.tagList}>
      {cachingNodes.map(item => {
        const itemName = item.name!;
        const isActive = itemName === currentUrl;
        const fixed = fixedArr.includes(itemName);
        const currentTab = menus.find(n => n.url === item.pathname + item.search);

        return (
          <Dropdown
            key={itemName}
            overlay={
              <Menu>
                <Menu.Item onClick={() => clearOne(itemName, isActive)}>关闭</Menu.Item>
                <Menu.Item onClick={() => handleClearOther(item)}>关闭其他</Menu.Item>
                <Menu.Item onClick={handleClearAll}>关闭所有</Menu.Item>
              </Menu>
            }
            trigger={['contextMenu']}
            placement="bottomLeft"
          >
            <Tag
              color={isActive ? '#26a69a' : undefined}
              closable
              onClose={() => clearOne(itemName, isActive)}
              onClick={() =>
                router.replace({
                  pathname: item.pathname,
                  search: item.search,
                })
              }
            >
              {fixed || <div className={styles.dot} onClick={() => toggleFixedTab(itemName)} />}
              <div className={styles.tagInner}>{currentTab?.title || item.name}</div>
            </Tag>
          </Dropdown>
        );
      })}
    </div>
  );
};

export default NavTab;
