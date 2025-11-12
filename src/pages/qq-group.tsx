import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';
import QRCodeModal from '../components/QRCodeModal';

export default function QQGroup() {
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const history = useHistory();

  const handleClose = () => {
    setIsModalOpen(false);
    // 关闭弹窗后返回上一页
    history.goBack();
  };

  return (
    <Layout
      title="加入QQ群"
      description="扫描二维码加入隙间月影社团QQ群">
      <QRCodeModal 
        isOpen={isModalOpen}
        onClose={handleClose}
        imageSrc="/img/groupQRcode.JPG"
        title="扫码加入QQ群"
      />
    </Layout>
  );
}
