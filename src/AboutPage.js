import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const AboutPage = () => {
  return (
    <>
      {/* Hero Logo Section */}
      <div className="content-section bg-dark-2 hero-logo-section">
        <Image src={`${process.env.PUBLIC_URL}/harmony_logo.png`} className="hero-logo" fluid />
      </div>

      {/* Section 1: Background */}
      <div className="content-section bg-dark-1">
        <Container>
          <Row className="align-items-center">
            <Col md={5} className="about-text">
              <h3>餐廳成立背景</h3>
              <p>
                「哈蒙妮亞洲靈魂麵」源自於創辦人對亞洲各地麵食文化的熱愛與探索。在多年的旅行中，我們品嚐了從台灣的牛肉麵、日本的拉麵到東南亞的叻沙，每一碗麵都蘊含著獨特的地域風情與動人故事。我們夢想著能有一個地方，將這些感動匯集起來，用我們的方式重新詮釋，與更多人分享。
              </p>
            </Col>
            <Col md={7}>
              <Row>
                <Col lg={6} className="mb-3 mb-lg-0">
                  <Image src={`${process.env.PUBLIC_URL}/images/harmony_street.png`} rounded fluid />
                </Col>
                <Col lg={6}>
                  <Image src={`${process.env.PUBLIC_URL}/images/harmony_kitchen.png`} rounded fluid />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 2: Philosophy */}
      <div className="content-section bg-dark-2">
        <Container>
          <Row className="align-items-center">
            <Col md={5} className="order-md-2 about-text">
              <h3>成立理念</h3>
              <p>
                我們的理念是「一碗麵，一個世界」。我們相信，麵食不僅是果腹的食物，更是文化與情感的載體。"哈蒙妮 (Harmony)" 象徵著我們致力於將不同風味完美融合，創造出和諧而富有層次的味覺體驗。"亞洲靈魂麵" 則代表我們對傳統的尊重與創新的追求，每一碗麵都注入了我們對料理的靈魂與熱情。
              </p>
            </Col>
            <Col md={7} className="order-md-1">
              <Row>
                <Col lg={6} className="mb-3 mb-lg-0">
                  <Image src={`${process.env.PUBLIC_URL}/images/harmony_beefnoodles.png`} rounded fluid />
                </Col>
                <Col lg={6}>
                  <Image src={`${process.env.PUBLIC_URL}/images/harmony_establishment.png`} rounded fluid />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Section 3: Ingredients */}
      <div className="content-section bg-dark-1">
        <Container>
          <Row className="align-items-center">
            <Col md={5} className="about-text">
              <h3>食材來源</h3>
              <p>
                我們堅持使用最新鮮、最優質的在地食材。牛肉選用台灣本地飼養的黃牛，蔬菜則是與小農合作，每日新鮮直送。我們相信，好的食材是美味的基礎，也是對顧客最真誠的承諾。我們用心處理每一個細節，從湯頭的熬煮到麵條的製作，都力求完美，只為呈現給您最安心、最美味的一餐。
              </p>
            </Col>
            <Col md={7}>
              <Row>
                <Col lg={6} className="mb-3 mb-lg-0">
                  <Image src={`${process.env.PUBLIC_URL}/images/harmony_local_food.png`} rounded fluid />
                </Col>
                <Col lg={6}>
                  <Image src={`${process.env.PUBLIC_URL}/images/harmony_local_beef.png`} rounded fluid />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AboutPage;
