import React from 'react';
import { Select } from 'antd';
import { debounce } from 'lodash';
import { useAsync } from '@umijs/hooks';
import { ISearchFnData, RemoteSelectProps } from '@/components/RemoteSelect/types';

/**
 * 远程加载数据 Select
 */
const RemoteSelect = ({ searchFn, renderOption, ...props }: RemoteSelectProps) => {
  const { data, loading, run } = useAsync(searchFn, [], { manual: true });

  React.useEffect(() => {
    const runDebounce = debounce(run, 300);
    runDebounce();
    return () => {
      runDebounce.cancel();
    };
  }, []);

  return (
    <Select loading={loading} maxTagCount={2} maxTagTextLength={4} {...props}>
      {data &&
        (renderOption
          ? renderOption(data)
          : data.map((item: ISearchFnData) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            )))}
    </Select>
  );
};

export default RemoteSelect;
