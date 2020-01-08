import React from 'react';
import { RouterTypes } from 'umi';
import BasicLayout from '@/layouts/BasicLayout';

const CoreLayout: React.FC<RouterTypes> = props => {
  return <BasicLayout>{props.children}</BasicLayout>;
};

export default CoreLayout;
