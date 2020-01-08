import React from 'react';
import { Table } from 'antd';
import { useAntdTable } from '@umijs/hooks';
import { FnParams } from '@umijs/hooks/es/useAntdTable';
import NormalSearchContainer from '@/containers/NormalSearchContainer';

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

interface Result {
  total: number;
  data: Item[];
}

const getTableData = ({ current, pageSize }: FnParams<Item>) =>
  fetch(`https://randomuser.me/api?results=55&page=${current}&size=${pageSize}`)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      data: res.results,
    }));

const UserInfo: React.FC = () => {
  const { tableProps } = useAntdTable<Result, Item>(getTableData);

  return (
    <NormalSearchContainer title="用户列表">
      <Table {...(tableProps as any)} rowKey="email" scroll={{ x: true, y: 600 }}>
        <Table.Column title="name" dataIndex="name.last" />
        <Table.Column title="email" dataIndex="email" />
        <Table.Column title="phone" dataIndex="phone" />
        <Table.Column title="gender" dataIndex="gender" />
      </Table>
    </NormalSearchContainer>
  );
};

export default UserInfo;
