import { useState, useEffect } from 'react';
import './App.css';
import Checkout from './Checkout';

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const cakeCategories = {
    party: {
      name: 'Party Cakes',
      cakes: [
        {
          id: 1,
          name: "Chocolate Party Cake",
          price: 899,
          description: "Rich chocolate cake perfect for parties",
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&q=80",
          weight: "1 kg"
        },
        {
          id: 2,
          name: "Rainbow Party Cake",
          price: 1299,
          description: "Colorful layered cake for celebrations",
          image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop&q=80",
          weight: "1.5 kg"
        },
        {
          id: 3,
          name: "Butterscotch Party Cake",
          price: 999,
          description: "Delicious butterscotch flavor",
          image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=300&fit=crop&q=80",
          weight: "1 kg"
        },
        {
          id: 4,
          name: "Black Forest Party Cake",
          price: 1199,
          description: "Classic black forest with cherries",
          image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=300&fit=crop&q=80",
          weight: "1.5 kg"
        },
        {
          id: 5,
          name: "Pineapple Party Cake",
          price: 849,
          description: "Fresh pineapple flavor",
          image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=300&fit=crop&q=80",
          weight: "1 kg"
        },
        {
          id: 6,
          name: "Red Velvet Party Cake",
          price: 1099,
          description: "Elegant red velvet with cream cheese",
          image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=300&h=300&fit=crop&q=80",
          weight: "1.5 kg"
        }
      ]
    },
    birthday: {
      name: 'Birthday Cakes',
      cakes: [
        {
          id: 7,
          name: "Chocolate Birthday Cake",
          price: 799,
          description: "Perfect chocolate cake for birthdays",
          image: "https://images.unsplash.com/photo-1606312619070-d48b4bcbcb69?w=300&h=300&fit=crop&q=80",
          weight: "1 kg"
        },
        {
          id: 8,
          name: "Vanilla Birthday Cake",
          price: 699,
          description: "Classic vanilla with buttercream",
          image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=300&fit=crop&q=80",
          weight: "1 kg"
        },
        {
          id: 9,
          name: "Strawberry Birthday Cake",
          price: 949,
          description: "Fresh strawberries with cream",
          image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=300&fit=crop&q=80",
          weight: "1 kg"
        },
        {
          id: 10,
          name: "Mango Birthday Cake",
          price: 999,
          description: "Tropical mango flavor",
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&q=80",
          weight: "1 kg"
        },
        {
          id: 11,
          name: "KitKat Birthday Cake",
          price: 1299,
          description: "Chocolate cake with KitKat decoration",
          image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=300&fit=crop&q=80",
          weight: "1.5 kg"
        },
        {
          id: 12,
          name: "Oreo Birthday Cake",
          price: 1199,
          description: "Chocolate cake with Oreo cookies",
          image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=300&h=300&fit=crop&q=80",
          weight: "1.5 kg"
        }
      ]
    },
    wedding: {
      name: 'Wedding Cakes',
      cakes: [
        {
          id: 13,
          name: "Elegant White Wedding Cake",
          price: 4999,
          description: "Multi-tier elegant wedding cake",
          image: "https://images.unsplash.com/photo-1519869325935-377c969b3a8c?w=300&h=300&fit=crop&q=80",
          weight: "3 kg"
        },
        {
          id: 14,
          name: "Royal Wedding Cake",
          price: 6999,
          description: "Luxurious multi-tier wedding cake",
          image: "https://images.unsplash.com/photo-1519869325935-377c969b3a8c?w=300&h=300&fit=crop&q=80",
          weight: "5 kg"
        },
        {
          id: 15,
          name: "Floral Wedding Cake",
          price: 5999,
          description: "Beautiful floral decorated cake",
          image: "https://images.unsplash.com/photo-1519869325935-377c969b3a8c?w=300&h=300&fit=crop&q=80",
          weight: "4 kg"
        },
        {
          id: 16,
          name: "Gold Accent Wedding Cake",
          price: 7999,
          description: "Premium cake with gold accents",
          image: "https://images.unsplash.com/photo-1519869325935-377c969b3a8c?w=300&h=300&fit=crop&q=80",
          weight: "5 kg"
        }
      ]
    },
    anniversary: {
      name: 'Anniversary Cakes',
      cakes: [
        {
          id: 17,
          name: "Heart Shaped Anniversary Cake",
          price: 1499,
          description: "Romantic heart-shaped cake",
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&q=80",
          weight: "1.5 kg"
        },
        {
          id: 18,
          name: "Chocolate Truffle Anniversary",
          price: 1699,
          description: "Rich chocolate truffle cake",
          image: "https://images.unsplash.com/photo-1606312619070-d48b4bcbcb69?w=300&h=300&fit=crop&q=80",
          weight: "2 kg"
        },
        {
          id: 19,
          name: "Red Velvet Anniversary",
          price: 1599,
          description: "Elegant red velvet for couples",
          image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=300&h=300&fit=crop&q=80",
          weight: "1.5 kg"
        }
      ]
    },
    custom: {
      name: 'Custom Cakes',
      cakes: [
        {
          id: 20,
          name: "Photo Cake",
          price: 1999,
          description: "Custom photo printed cake",
          image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop&q=80",
          weight: "2 kg"
        },
        {
          id: 21,
          name: "Theme Cake",
          price: 2499,
          description: "Custom themed cake design",
          image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=300&fit=crop&q=80",
          weight: "2 kg"
        },
        {
          id: 22,
          name: "Number Cake",
          price: 1299,
          description: "Custom number shaped cake",
          image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=300&fit=crop&q=80",
          weight: "1.5 kg"
        },
        {
          id: 23,
          name: "Character Cake",
          price: 1799,
          description: "Custom character design cake",
          image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=300&h=300&fit=crop&q=80",
          weight: "2 kg"
        }
      ]
    },
    traditional: {
      name: 'Traditional Indian Cakes',
      cakes: [
        {
          id: 24,
          name: "Gulab Jamun Cake",
          price: 899,
          description: "Fusion of gulab jamun in cake",
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&q=80",
          weight: "1 kg"
        },
        {
          id: 25,
          name: "Kaju Katli Cake",
          price: 1499,
          description: "Rich cashew cake",
          image: "https://images.unsplash.com/photo-1606312619070-d48b4bcbcb69?w=300&h=300&fit=crop&q=80",
          weight: "1.5 kg"
        },
        {
          id: 26,
          name: "Rasmalai Cake",
          price: 1099,
          description: "Rasmalai flavored cake",
          image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=300&h=300&fit=crop&q=80",
          weight: "1.5 kg"
        },
        {
          id: 27,
          name: "Kesar Pista Cake",
          price: 1199,
          description: "Saffron pistachio cake",
          image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop&q=80",
          weight: "1.5 kg"
        }
      ]
    }
  };

  const allCakes = Object.values(cakeCategories).flatMap(category => category.cakes);

  // Featured cakes for carousel
  const featuredCakes = allCakes.slice(0, 6);

  // Promo codes
  const promoCodes = {
    'WELCOME20': { discount: 20, description: '20% off on your first order' },
    'CAKE50': { discount: 50, description: 'Flat ₹50 off on orders above ₹1000' },
    'PARTY30': { discount: 30, description: '30% off on party cakes' },
    'BIRTHDAY25': { discount: 25, description: '25% off on birthday cakes' },
    'SAVE100': { discount: 100, description: 'Flat ₹100 off on orders above ₹2000' }
  };

  // Offers and deals
  const offers = [
    { id: 1, title: 'Buy 2 Get 1 Free', description: 'On all party cakes', discount: '33% OFF', color: '#f5576c' },
    { id: 2, title: 'Weekend Special', description: 'Extra 15% off on weekends', discount: '15% OFF', color: '#667eea' },
    { id: 3, title: 'Free Delivery', description: 'On orders above ₹500', discount: 'FREE', color: '#f093fb' },
    { id: 4, title: 'Combo Deal', description: '2 Cakes + 1 Pastry', discount: '₹299', color: '#4facfe' }
  ];

  const getFilteredCakes = () => {
    if (activeCategory === 'all') {
      return allCakes;
    }
    return cakeCategories[activeCategory]?.cakes || [];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price);
  };

  const addToCart = (cake) => {
    const existingItem = cart.find(item => item.id === cake.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === cake.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...cake, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) {
          return null;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscountedPrice = () => {
    let total = getTotalPrice();
    if (appliedPromo) {
      if (appliedPromo.discount <= 100) {
        // Percentage discount
        total = total * (1 - appliedPromo.discount / 100);
      } else {
        // Fixed amount discount
        total = Math.max(0, total - appliedPromo.discount);
      }
    }
    return total;
  };

  const getDiscountAmount = () => {
    return getTotalPrice() - getDiscountedPrice();
  };

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase().trim();
    if (promoCodes[code]) {
      setAppliedPromo(promoCodes[code]);
      setPromoCode('');
      alert(`Promo code "${code}" applied! ${promoCodes[code].description}`);
    } else {
      alert('Invalid promo code. Please try again.');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCakes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [featuredCakes.length]);

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleImageError = (cakeId) => {
    setImageErrors(prev => ({
      ...prev,
      [cakeId]: true
    }));
  };

  const getImageUrl = (originalUrl, cakeId) => {
    if (imageErrors[cakeId]) {
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23f0f0f0" width="300" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="20"%3E🍰%3C/text%3E%3C/svg%3E';
    }
    return originalUrl;
  };

  const handleOrderComplete = () => {
    setOrderComplete(true);
    setCart([]);
    setTimeout(() => {
      setOrderComplete(false);
      setShowCheckout(false);
    }, 3000);
  };

  if (orderComplete) {
    return (
      <div className="order-success">
        <div className="order-success-content">
          <div className="success-icon">✅</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your order. We'll deliver your cakes soon!</p>
          <button className="back-to-shop-btn" onClick={() => {
            setOrderComplete(false);
            setShowCheckout(false);
          }}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <Checkout
        cart={cart}
        totalPrice={getDiscountedPrice()}
        onBack={() => setShowCheckout(false)}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1 className="logo">🍰 Mithai & Cakes</h1>
          <nav>
            <button className="cart-button" onClick={() => setShowCart(!showCart)}>
              🛒 Cart ({getCartItemCount()})
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="container">
            <h2>Fresh Cakes Made with Love</h2>
            <p>Premium quality cakes for every celebration - Party, Birthday, Wedding & More!</p>
          </div>
        </section>

        {/* Moving Offers Banner */}
        <section className="offers-banner">
          <div className="offers-scroll">
            <div className="offers-track">
              {[...offers, ...offers].map((offer, index) => (
                <div key={`${offer.id}-${index}`} className="offer-item" style={{ '--offer-color': offer.color }}>
                  <span className="offer-badge">{offer.discount}</span>
                  <div className="offer-content">
                    <strong>{offer.title}</strong>
                    <span>{offer.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Cakes Carousel */}
        <section className="featured-section">
          <div className="container">
            <h2 className="section-title">Featured Cakes</h2>
            <div className="carousel-container">
              <div 
                className="carousel-track" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredCakes.map((cake, index) => (
                  <div key={cake.id} className="carousel-slide">
                    <div className="carousel-cake-card">
                      <div className="carousel-image-wrapper">
                        <img 
                          src={getImageUrl(cake.image, cake.id)} 
                          alt={cake.name} 
                          className="carousel-cake-image"
                          loading="lazy"
                          decoding="async"
                          onError={() => handleImageError(cake.id)}
                        />
                      </div>
                      <div className="carousel-cake-info">
                        <h3>{cake.name}</h3>
                        <p className="carousel-description">{cake.description}</p>
                        <div className="carousel-price">₹{formatPrice(cake.price)}</div>
                        <button 
                          className="carousel-add-btn" 
                          onClick={() => addToCart(cake)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="carousel-controls">
                {featuredCakes.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
              <button 
                className="carousel-nav carousel-prev"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredCakes.length) % featuredCakes.length)}
              >
                ‹
              </button>
              <button 
                className="carousel-nav carousel-next"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredCakes.length)}
              >
                ›
              </button>
            </div>
          </div>
        </section>

        {/* Deals Section */}
        <section className="deals-section">
          <div className="container">
            <h2 className="section-title">Special Deals</h2>
            <div className="deals-grid">
              {offers.map(offer => (
                <div key={offer.id} className="deal-card" style={{ '--deal-color': offer.color }}>
                  <div className="deal-badge">{offer.discount}</div>
                  <h3>{offer.title}</h3>
                  <p>{offer.description}</p>
                  <button className="deal-btn">Shop Now</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {showCart && (
          <div className="cart-overlay" onClick={() => setShowCart(false)}>
            <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
              <div className="cart-header">
                <h2>Your Cart</h2>
                <button className="close-cart" onClick={() => setShowCart(false)}>×</button>
              </div>
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-info">
                          <img 
                            src={getImageUrl(item.image, item.id)} 
                            alt={item.name} 
                            className="cart-item-image"
                            loading="lazy"
                            decoding="async"
                            onError={() => handleImageError(item.id)}
                          />
                          <div>
                            <h4>{item.name}</h4>
                            <p>₹{formatPrice(item.price)}</p>
                          </div>
                        </div>
                        <div className="cart-item-controls">
                          <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                          <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-footer">
                    {/* Promo Code Section */}
                    <div className="promo-section">
                      {!appliedPromo ? (
                        <div className="promo-input-group">
                          <input
                            type="text"
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="promo-input"
                            onKeyPress={(e) => e.key === 'Enter' && applyPromoCode()}
                          />
                          <button className="promo-apply-btn" onClick={applyPromoCode}>
                            Apply
                          </button>
                        </div>
                      ) : (
                        <div className="promo-applied">
                          <span>✅ {appliedPromo.description}</span>
                          <button className="promo-remove-btn" onClick={removePromoCode}>
                            Remove
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="cart-totals">
                      <div className="total-row">
                        <span>Subtotal:</span>
                        <span>₹{formatPrice(getTotalPrice())}</span>
                      </div>
                      {appliedPromo && (
                        <div className="total-row discount-row">
                          <span>Discount:</span>
                          <span>-₹{formatPrice(getDiscountAmount())}</span>
                        </div>
                      )}
                      <div className="cart-total">
                        <strong>Total: ₹{formatPrice(getDiscountedPrice())}</strong>
                      </div>
                    </div>
                    <button 
                      className="checkout-btn" 
                      onClick={() => {
                        setShowCart(false);
                        setShowCheckout(true);
                      }}
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <section className="products">
          <div className="container">
            <div className="category-tabs">
              <button 
                className={activeCategory === 'all' ? 'tab active' : 'tab'}
                onClick={() => setActiveCategory('all')}
              >
                All Cakes
              </button>
              {Object.entries(cakeCategories).map(([key, category]) => (
                <button
                  key={key}
                  className={activeCategory === key ? 'tab active' : 'tab'}
                  onClick={() => setActiveCategory(key)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <h2 className="section-title">
              {activeCategory === 'all' 
                ? 'All Our Cakes' 
                : cakeCategories[activeCategory]?.name || 'Our Cakes'}
            </h2>
            
            <div className="cake-grid">
              {getFilteredCakes().map(cake => (
                <div key={cake.id} className="cake-card">
                  <div className="cake-image-wrapper">
                    <img 
                      src={getImageUrl(cake.image, cake.id)} 
                      alt={cake.name} 
                      className="cake-image"
                      loading="lazy"
                      decoding="async"
                      onError={() => handleImageError(cake.id)}
                    />
                  </div>
                  <h3>{cake.name}</h3>
                  <p className="cake-description">{cake.description}</p>
                  <p className="cake-weight">Weight: {cake.weight}</p>
                  <div className="cake-footer">
                    <span className="cake-price">₹{formatPrice(cake.price)}</span>
                    <button className="add-to-cart-btn" onClick={() => addToCart(cake)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Mithai & Cakes. Made with ❤️ in India. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
