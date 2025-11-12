import React, { useEffect } from 'react';
import styles from './styles.module.css';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title?: string;
}

export default function QRCodeModal({ isOpen, onClose, imageSrc, title }: QRCodeModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {title && <h3 className={styles.modalTitle}>{title}</h3>}
        <img 
          src={imageSrc} 
          alt="QQ群二维码" 
          className={styles.qrImage}
          onClick={onClose}
        />
      </div>
    </div>
  );
}
