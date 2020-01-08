import React from 'react';
import { Card } from 'antd';
import ContentLayout from '@/layouts/ContentLayout';
import styles from './NormalSearchContainer.less';

export interface NormalSearchContainerProps {
  title: string;
  searchContent?: React.ReactNode;
}

const NormalSearchContainer: React.FC<NormalSearchContainerProps> = ({
  title,
  searchContent,
  children,
}) => {
  return (
    <ContentLayout>
      <Card className={styles.container}>
        <div className={styles.contentHeader}>
          <div className={styles.title}>{title}</div>
          {searchContent}
        </div>
        {children}
      </Card>
    </ContentLayout>
  );
};

export default NormalSearchContainer;
