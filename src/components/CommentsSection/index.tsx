import React from 'react';
import GiscusComments from '../GiscusComments';
import styles from './styles.module.css';

interface CommentsSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function CommentsSection({ 
  title = '评论区', 
  description,
  className = ''
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
        <GiscusComments />
      </div>
    </div>
  );
}
