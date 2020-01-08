import React from 'react';
import { SelectProps } from 'antd/es/select';

/**
 * 接口返回格式要求
 */
export interface ISearchFnData {
  value: string;
  label: React.ReactNode;
}

interface ISearchProps {
  /**
   * 接口函数 返回值需组装
   */
  searchFn: (value: string) => Promise<ISearchFnData[]>;
  /**
   * 自定义渲染
   */
  renderOption?: (data: ISearchFnData[]) => React.ReactChild;
}

/**
 * 远程搜索框
 */
export interface RemoteSearchSelectProps
  extends Omit<
      SelectProps<any>,
      'loading' | 'onSearch' | 'onBlur' | 'allowClear' | 'showSearch' | 'filterOption'
    >,
    ISearchProps {
  /**
   * 是否在装载时执行 search
   */
  searchOnMount?: boolean;
}

/**
 * 远程选择框
 */
export interface RemoteSelectProps extends Omit<SelectProps<any>, 'loading'>, ISearchProps {}
