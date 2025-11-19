import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './friends.module.css';

type Friend = {
  name: string;
  url: string;
  linkText: string;
  description: string;
  avatar: {
    type: 'text' | 'image';
    content: string;
  };
};

const friends: Friend[] = [
  {
    name: 'Friend Name',
    url: 'https://example.com/',
    linkText: 'example.com',
    description: 'Description of your friend',
    avatar: {
      type: 'text',
      content: 'F',
    },
  },
  {
    name: 'Another Friend',
    url: 'https://github.com/username',
    linkText: 'GitHub Profile',
    description: 'Another friend\'s description',
    avatar: {
      type: 'text',
      content: 'A',
    },
  },
];

const FriendCard: React.FC<{ friend: Friend }> = ({ friend }) => {
  return (
    <Link to={friend.url} className={styles.friendCardLink}>
      <div className={styles.friendCard}>
        <div className={styles.avatarContainer}>
          {friend.avatar.type === 'text' ? (
            <div className={styles.avatarText}>{friend.avatar.content}</div>
          ) : (
            <img
              src={friend.avatar.content}
              alt={friend.name}
              className={styles.avatarImage}
            />
          )}
        </div>
        <div className={styles.infoContainer}>
          <h3 className={styles.friendName}>{friend.name}</h3>
          <p className={styles.friendLinkText}>{friend.linkText}</p>
          <p className={styles.friendDescription}>{friend.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default function FriendsPage() {
  return (
    <Layout title="Friends" description="A list of my friends and their websites.">
      <main className={styles.friendsContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Friends</h1>
          <p className={styles.subtitle}>Links to friends and interesting people</p>
        </div>

        <div className={styles.friendList}>
          {friends.map((friend, idx) => (
            <FriendCard key={idx} friend={friend} />
          ))}
        </div>
      </main>
    </Layout>
  );
} 