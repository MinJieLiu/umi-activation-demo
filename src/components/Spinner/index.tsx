import React from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';
import { SpinProps } from 'antd/es/spin';
import styles from './Spinner.less';

Spin.setDefaultIndicator(<LoadingOutlined spin />);

const Spinner: React.FC<Omit<SpinProps, 'prefixCls'>> = ({
  className,
  size,
  tip,
  delay,
  indicator,
  spinning,
}) => (
  <Spin
    className={classNames(styles.spinWrap, className)}
    size={size}
    tip={tip}
    delay={delay}
    indicator={indicator || <LoadingOutlined spin />}
    spinning={spinning}
  />
);

export default Spinner;
