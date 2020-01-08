import React from 'react';
import { Select } from 'antd';
import { debounce } from 'lodash';
import { useSearch } from '@umijs/hooks';
import { ISearchFnData, RemoteSearchSelectProps } from '@/components/RemoteSelect/types';

/**
 * 远程搜索 Select
 */
const RemoteSearchSelect = ({
  searchFn,
  searchOnMount,
  renderOption,
  ...props
}: RemoteSearchSelectProps) => {
  const { data, loading, onChange, cancel, run } = useSearch(searchFn);

  React.useEffect(() => {
    const runDebounce = debounce(run, 300);
    if (searchOnMount) {
      runDebounce();
    }
    return () => {
      if (searchOnMount) {
        runDebounce.cancel();
      }
    };
  }, []);

  return (
    <Select
      loading={loading}
      onSearch={onChange}
      onBlur={cancel}
      allowClear
      showSearch
      filterOption={false}
      // allow reset
      maxTagCount={2}
      maxTagTextLength={4}
      {...props}
    >
      {data &&
        (renderOption
          ? renderOption(data)
          : data.map((item: ISearchFnData) => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            )))}
    </Select>
  );
};

export default RemoteSearchSelect;
