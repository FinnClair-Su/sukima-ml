import React from 'react';
import GiscusComments from '../GiscusComments';
import styles from './styles.module.css';

interface CommentsSectionProps {
  title?: string;
  description?: string;
  className?: string;
  forceTheme?: 'light' | 'dark';
}

export default function CommentsSection({ 
  title = '评论区', 
  description,
  className = '',
  forceTheme
}: CommentsSectionProps) {
  return (
    <div className={`${styles.commentsWrapper} ${className}`}>
      <div className={styles.commentsHeader}>
        <h2 className={styles.commentsTitle}>{title}</h2>
        {description && (
          <p className={styles.commentsDescription}>{description}</p>
        )}
      </div>
      <div className={styles.commentsContent}>
        <GiscusComments forceTheme={forceTheme} />
      </div>
    </div>
  );
}
