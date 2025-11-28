import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Carousel from 'react-bootstrap/Carousel';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { Routes, Route, Link } from 'react-router-dom';
import AboutPage from './AboutPage';
import './App.css';

// Mock Data for menu items
const menuItems = [
  // 主餐
  {
    id: 1,
    name: '紅燒牛肉麵',
    description: '濃郁湯頭搭配軟嫩牛肉與Q彈麵條。',
    price: 180,
    image: `${process.env.PUBLIC_URL}/images/beefnoodles.jpg`,
    category: '主餐',
  },
  {
    id: 2,
    name: '紅燒牛肉飯',
    description: '特選牛肉燴飯，份量十足。',
    price: 160,
    image: `${process.env.PUBLIC_URL}/images/beef_rice.jpg`,
    category: '主餐',
  },
  {
    id: 3,
    name: '麻油雞麵線',
    description: '溫補的麻油與鮮嫩雞肉的經典組合。',
    price: 150,
    image: `${process.env.PUBLIC_URL}/images/sesame_oil_chicken_noodles.jpg`,
    category: '主餐',
  },
  // 小菜
  {
    id: 4,
    name: '涼拌木耳',
    description: '清爽開胃的家常涼拌菜。',
    price: 40,
    image: `${process.env.PUBLIC_URL}/images/cold_black_fungus_salad.jpg`,
    category: '小菜',
  },
  {
    id: 5,
    name: '涼拌海帶芽',
    description: '滑順爽口，營養豐富。',
    price: 40,
    image: `${process.env.PUBLIC_URL}/images/cold_seaweed.jpg`,
    category: '小菜',
  },
  {
    id: 6,
    name: '涼拌豬耳朵',
    description: 'Q彈有嚼勁，佐以特製醬料。',
    price: 50,
    image: `${process.env.PUBLIC_URL}/images/cold_pig_ear_salad.jpg`,
    category: '小菜',
  },
  // 飲料
  {
    id: 7,
    name: '可樂',
    description: '冰涼暢快的經典選擇。',
    price: 30,
    image: `${process.env.PUBLIC_URL}/images/harmony_cola.png`,
    category: '飲料',
  },
  {
    id: 8,
    name: '檸檬茶',
    description: '新鮮檸檬的酸甜滋味。',
    price: 35,
    image: `${process.env.PUBLIC_URL}/images/harmony_lemontea.png`,
    category: '飲料',
  },
];

const featuredItems = menuItems.filter(item => [1, 2, 3].includes(item.id));
const categories = ['全部', ...new Set(menuItems.map(item => item.category))];

// Logo Component
const Logo = () => (
  <img 
    src={`${process.env.PUBLIC_URL}/harmony_logo.png`} 
    alt="Logo" 
    style={{ width: '32px', height: '32px' }} 
  />
);

// Header Component
const Header = ({ onShowOrderHistory }) => (
  <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
    <div className="container">
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <Logo />
        <span className="ms-2">哈蒙妮亞洲靈魂麵</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link as={Link} to="/about">品牌故事</Nav.Link>
          <Nav.Link onClick={onShowOrderHistory}>訂單紀錄</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </div>
  </Navbar>
);

// Featured Carousel Component
const FeaturedCarousel = ({ items, onAddToCart }) => (
  <Carousel className="mb-4 shadow-sm">
    {items.map(item => (
      <Carousel.Item key={item.id} className="featured-item">
        <img
          className="d-block w-100"
          src={item.image}
          alt={item.name}
        />
        <Carousel.Caption className="featured-item-caption">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <Button variant="warning" onClick={() => onAddToCart(item)}>
            立即訂購 NT$ {item.price}
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);

// Category Navigation Component
const CategoryNavigation = ({ selectedCategory, onSelectCategory }) => (
    <Nav variant="pills" className="justify-content-center mb-4">
        {categories.map(category => (
            <Nav.Item key={category}>
                <Nav.Link 
                    active={selectedCategory === category}
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </Nav.Link>
            </Nav.Item>
        ))}
    </Nav>
);

// MenuItem Component
const MenuItem = ({ item, onAddToCart }) => (
  <div className="col-md-6 col-lg-4 mb-4">
    <div className="card h-100 shadow-sm">
      <img src={item.image} className="card-img-top" alt={item.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text flex-grow-1">{item.description}</p>
        <p className="card-text h5 text-primary">NT$ {item.price}</p>
        <Button variant="primary" className="mt-auto" onClick={() => onAddToCart(item)}>
          加入購物車
        </Button>
      </div>
    </div>
  </div>
);

// Menu Component
const Menu = ({ items, onAddToCart }) => (
  <div className="row">
    {items.length > 0 ? (
      items.map(item => (
        <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
      ))
    ) : (
      <div className="col-12 text-center">
        <p>這個分類目前沒有餐點喔！</p>
      </div>
    )}
  </div>
);

// Cart Component
const Cart = ({ cartItems, onUpdateCart, onRemoveFromCart, onCheckout }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <p className="text-center text-muted">您的購物車是空的。</p>
      ) : (
        <ul className="list-group list-group-flush">
          {cartItems.map(item => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h6>{item.name}</h6>
                <small className="text-muted">NT$ {item.price} x {item.quantity}</small>
              </div>
              <div className="d-flex align-items-center">
                <Button size="sm" variant="secondary" className="me-2" onClick={() => onUpdateCart(item, item.quantity - 1)}>-</Button>
                <span>{item.quantity}</span>
                <Button size="sm" variant="secondary" className="ms-2" onClick={() => onUpdateCart(item, item.quantity + 1)}>+</Button>
                <Button size="sm" variant="danger" className="ms-3" onClick={() => onRemoveFromCart(item)}>X</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="text-center mt-3 p-3 border-top">
          <h5>總計: NT$ {getTotalPrice()}</h5>
          <Button variant="success" className="w-100" onClick={onCheckout}>前往結帳</Button>
        </div>
      )}
    </>
  );
};

// Floating Cart Button Component
const FloatingCartButton = ({ cartItemCount, onClick }) => (
  <Button 
    variant="warning"
    onClick={onClick}
    className="position-fixed bottom-0 end-0 m-4 rounded-circle shadow-lg"
    style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
  >
    🛒
    {cartItemCount > 0 && 
      <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
        {cartItemCount}
      </Badge>
    }
  </Button>
);

// Checkout Modal Component
const CheckoutModal = ({ show, onHide, cartItems, onConfirmOrder }) => {
  const [deliveryOption, setDeliveryOption] = useState('takeout');
  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>結帳</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>訂單摘要</h5>
        <ul className="list-group mb-3">
          {cartItems.map(item => (
            <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">{item.name}</h6>
              </div>
              <span className="text-muted">NT$ {item.price} x {item.quantity}</span>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between">
            <strong>總計</strong>
            <strong>NT$ {getTotalPrice()}</strong>
          </li>
        </ul>

        <Form onSubmit={(e) => { e.preventDefault(); onConfirmOrder(getTotalPrice()); }}>
          <h5 className="mt-4">聯絡資訊</h5>
          <Form.Group className="mb-3">
            <Form.Label>姓名</Form.Label>
            <Form.Control type="text" placeholder="請輸入您的姓名" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>手機號碼</Form.Label>
            <Form.Control type="tel" placeholder="請輸入您的手機號碼" required />
          </Form.Group>

          <h5 className="mt-4">取餐方式</h5>
          <Form.Check 
            type="radio" 
            id="takeout-radio"
            label="外帶自取"
            name="deliveryOption"
            value="takeout"
            checked={deliveryOption === 'takeout'}
            onChange={(e) => setDeliveryOption(e.target.value)}
          />
          <Form.Check 
            type="radio" 
            id="delivery-radio"
            label="外送"
            name="deliveryOption"
            value="delivery"
            checked={deliveryOption === 'delivery'}
            onChange={(e) => setDeliveryOption(e.target.value)}
          />
          {deliveryOption === 'delivery' && (
            <Form.Group className="mt-2">
              <Form.Label>外送地址</Form.Label>
              <Form.Control type="text" placeholder="請輸入您的外送地址" required />
            </Form.Group>
          )}

          <h5 className="mt-4">付款方式</h5>
          {['現金付款', '信用卡', 'Line Pay'].map(type => (
            <Form.Check key={type} type="radio" id={`payment-${type}`} label={type} name="paymentMethod" defaultChecked={type === '現金付款'} />
          ))}

          <h5 className="mt-4">訂單備註</h5>
          <Form.Control as="textarea" rows={3} placeholder="有什麼特殊需求嗎？ (例如：不要加辣)" />
           <Modal.Footer className="mt-4 px-0">
            <Button variant="secondary" onClick={onHide}>取消</Button>
            <Button variant="primary" type="submit">確認下單</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// Order History Modal Component
const OrderHistoryModal = ({ show, onHide, orders, onReorder }) => (
  <Modal show={show} onHide={onHide} centered size="lg">
    <Modal.Header closeButton>
      <Modal.Title>訂單紀錄</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {orders.length === 0 ? (
        <p className="text-center text-muted">目前沒有任何歷史訂單。</p>
      ) : (
        <Accordion defaultActiveKey="0">
          {orders.map((order, index) => (
            <Accordion.Item eventKey={index.toString()} key={order.id}>
              <Accordion.Header>
                <span>{new Date(order.date).toLocaleString()}</span>
                <strong className="ms-auto">總金額: NT$ {order.total}</strong>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="list-group list-group-flush mb-3">
                  {order.items.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between">
                      <span>{item.name}</span>
                      <span>x {item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="info" className="w-100" onClick={() => onReorder(order.items)}>
                  再次訂購
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Modal.Body>
  </Modal>
);


// Main App Component
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('food-orders') || '[]');
      setOrders(savedOrders);
    } catch (error) {
      console.error("Failed to parse orders from localStorage", error);
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    if (process.env.REACT_APP_VERSION) {
      console.log(`Food Ordering Page version: ${process.env.REACT_APP_VERSION}`);
    }
  }, []);

  const handleCartClose = () => setShowCart(false);
  const handleCartShow = () => setShowCart(true);

  const handleCheckoutClose = () => setShowCheckout(false);
  const handleCheckoutShow = () => {
    if (cartItems.length === 0) return; // Do not show checkout if cart is empty
    setShowCart(false);
    setShowCheckout(true);
  }

  const handleOrderHistoryClose = () => setShowOrderHistory(false);
  const handleOrderHistoryShow = () => setShowOrderHistory(true);

  const handleConfirmOrder = (totalPrice) => {
    const newOrder = {
      id: Date.now(),
      date: new Date(),
      items: cartItems,
      total: totalPrice,
    };
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('food-orders', JSON.stringify(updatedOrders));

    setShowCheckout(false);
    setCartItems([]);
    alert('下單成功！感謝您的訂購！');
  }

  const handleAddToCart = (item) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(cartItem => cartItem.id === item.id);
      if (itemExists) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };
  
  const handleReorder = (itemsToReorder) => {
      let newCartItems = [...cartItems];
      itemsToReorder.forEach(itemToAdd => {
          const existingItemIndex = newCartItems.findIndex(cartItem => cartItem.id === itemToAdd.id);
          if (existingItemIndex > -1) {
              newCartItems[existingItemIndex].quantity += itemToAdd.quantity;
          } else {
              newCartItems.push({ ...itemToAdd });
          }
      });
      setCartItems(newCartItems);
      handleOrderHistoryClose();
      handleCartShow();
  };

  const handleUpdateCart = (item, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(item);
    } else {
      setCartItems(prevItems =>
        prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
        )
      );
    }
  };

  const handleRemoveFromCart = (item) => {
    setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== item.id));
  };

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const filteredMenuItems = selectedCategory === '全部' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <Header onShowOrderHistory={handleOrderHistoryShow} />
      
      <Routes>
        <Route path="/" element={
          <>
            <FeaturedCarousel items={featuredItems} onAddToCart={handleAddToCart} />
            <div className="container mt-4 menu-container">
              <CategoryNavigation 
                  selectedCategory={selectedCategory} 
                  onSelectCategory={setSelectedCategory} 
              />
              <Menu items={filteredMenuItems} onAddToCart={handleAddToCart} />
            </div>
          </>
        } />
        <Route path="/about" element={<AboutPage />} />
      </Routes>

      <FloatingCartButton cartItemCount={cartItemCount} onClick={handleCartShow} />

      <Offcanvas show={showCart} onHide={handleCartClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>您的購物車</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Cart 
            cartItems={cartItems} 
            onUpdateCart={handleUpdateCart} 
            onRemoveFromCart={handleRemoveFromCart} 
            onCheckout={handleCheckoutShow}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <CheckoutModal 
        show={showCheckout} 
        onHide={handleCheckoutClose} 
        cartItems={cartItems} 
        onConfirmOrder={handleConfirmOrder}
      />

      <OrderHistoryModal
        show={showOrderHistory}
        onHide={handleOrderHistoryClose}
        orders={orders}
        onReorder={handleReorder}
      />
    </>
  );
}

export default App;