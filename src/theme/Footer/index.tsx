import React, { useState } from 'react';
import Footer from '@theme-original/Footer';
import QRCodeModal from '../../components/QRCodeModal';

export default function FooterWrapper(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 拦截 QQ群链接的点击事件
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href="/qq-group"]');
      
      if (link) {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <Footer {...props} />
      <QRCodeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc="/img/groupQRcode.JPG"
        title="扫码加入QQ群"
      />
    </>
  );
}
