import { useState } from 'react';
import './Checkout.css';

function Checkout({ cart, totalPrice, onBack, onOrderComplete }) {
  // ============================================
  // CONFIGURATION: Update these with your details
  // ============================================
  // Replace with your PhonePe UPI ID
  // Format: yourphonenumber@ybl (for PhonePe) or yourphonenumber@paytm
  // Example: 9876543210@ybl or yourname@ybl
  // To get your UPI ID: Open PhonePe app > Profile > Your UPI IDs
  const MERCHANT_UPI_ID = 'yourphonenumber@ybl'; // ⚠️ CHANGE THIS TO YOUR ACTUAL PHONEPE UPI ID
  const MERCHANT_NAME = 'Mithai & Cakes'; // Your business name
  // ============================================

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPaymentLink, setShowPaymentLink] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid pincode';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!paymentMethod) newErrors.paymentMethod = 'Please select a payment method';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePhonePePaymentLink = () => {
    if (!validateForm()) {
      return;
    }

    setPaymentMethod('phonepe');
    
    // Create transaction note
    const transactionNote = `Order from ${formData.name} - Mithai & Cakes`;
    
    // PhonePe UPI deep link format
    // Format: phonepe://pay?pa=<UPI_ID>&pn=<MERCHANT_NAME>&am=<AMOUNT>&cu=INR&tn=<TRANSACTION_NOTE>
    const amount = totalPrice.toFixed(2);
    const upiId = encodeURIComponent(MERCHANT_UPI_ID);
    const merchantName = encodeURIComponent(MERCHANT_NAME);
    const note = encodeURIComponent(transactionNote);
    
    // PhonePe deep link
    const phonePeDeepLink = `phonepe://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=${note}`;
    
    // Also create a UPI payment link as fallback
    const upiLink = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=${note}`;
    
    // Try to open PhonePe app
    try {
      // Try PhonePe deep link first
      window.location.href = phonePeDeepLink;
      
      // Fallback: If PhonePe app doesn't open, show payment details
      setTimeout(() => {
        setShowPaymentLink(true);
      }, 1000);
    } catch (error) {
      console.error('Error opening PhonePe:', error);
      setShowPaymentLink(true);
    }
    
    // Show payment instructions
    setShowPaymentLink(true);
  };

  const handlePhonePe = () => {
    if (!validateForm()) {
      setPaymentMethod('phonepe');
      return;
    }
    generatePhonePePaymentLink();
  };

  const handleGPay = () => {
    if (!validateForm()) {
      return;
    }

    setPaymentMethod('gpay');
    setIsProcessing(true);

    // Google Pay UPI deep link
    const amount = totalPrice.toFixed(2);
    const upiId = encodeURIComponent(MERCHANT_UPI_ID);
    const merchantName = encodeURIComponent(MERCHANT_NAME);
    const transactionNote = encodeURIComponent(`Order from ${formData.name} - Mithai & Cakes`);
    
    const gpayLink = `tez://upi/pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=${transactionNote}`;
    
    try {
      window.location.href = gpayLink;
      setTimeout(() => {
        setIsProcessing(false);
        setShowPaymentLink(true);
      }, 1000);
    } catch (error) {
      console.error('Error opening GPay:', error);
      setIsProcessing(false);
      setShowPaymentLink(true);
    }
  };

  const handlePaymentComplete = () => {
    setIsProcessing(false);
    setShowPaymentLink(false);
    onOrderComplete();
  };

  const copyPaymentDetails = () => {
    const paymentText = `Pay ₹${formatPrice(totalPrice)} to ${MERCHANT_UPI_ID} via PhonePe`;
    navigator.clipboard.writeText(paymentText).then(() => {
      alert('Payment details copied to clipboard!');
    });
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <button className="back-button" onClick={onBack}>
          ← Back to Shopping
        </button>

        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <h2>Delivery Information</h2>
            <form className="checkout-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House/Flat No., Building Name, Street"
                  rows="3"
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    className={errors.pincode ? 'error' : ''}
                  />
                  {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  className={errors.state ? 'error' : ''}
                />
                {errors.state && <span className="error-message">{errors.state}</span>}
              </div>
            </form>

            <div className="payment-section">
              <h2>Payment Method</h2>
              {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}
              
              <div className="payment-options">
                <button
                  className={`payment-option ${paymentMethod === 'phonepe' ? 'selected' : ''}`}
                  onClick={handlePhonePe}
                  disabled={isProcessing}
                >
                  <div className="payment-icon">📱</div>
                  <div className="payment-info">
                    <h3>PhonePe</h3>
                    <p>Pay using PhonePe UPI</p>
                  </div>
                </button>

                <button
                  className={`payment-option ${paymentMethod === 'gpay' ? 'selected' : ''}`}
                  onClick={handleGPay}
                  disabled={isProcessing}
                >
                  <div className="payment-icon">💳</div>
                  <div className="payment-info">
                    <h3>Google Pay</h3>
                    <p>Pay using GPay UPI</p>
                  </div>
                </button>
              </div>

              {isProcessing && (
                <div className="processing">
                  <div className="spinner"></div>
                  <p>Opening payment app...</p>
                </div>
              )}

              {showPaymentLink && paymentMethod === 'phonepe' && (
                <div className="payment-instructions">
                  <h3>Payment Instructions</h3>
                  <div className="payment-details-box">
                    <p><strong>Amount:</strong> ₹{formatPrice(totalPrice)}</p>
                    <p><strong>UPI ID:</strong> {MERCHANT_UPI_ID}</p>
                    <p><strong>Merchant:</strong> {MERCHANT_NAME}</p>
                    <button className="copy-payment-btn" onClick={copyPaymentDetails}>
                      Copy Payment Details
                    </button>
                  </div>
                  <p className="instruction-text">
                    A payment request has been sent. Please complete the payment in your PhonePe app.
                  </p>
                  <div className="payment-actions">
                    <button className="payment-complete-btn" onClick={handlePaymentComplete}>
                      I've Completed Payment
                    </button>
                    <button className="cancel-payment-btn" onClick={() => {
                      setShowPaymentLink(false);
                      setPaymentMethod('');
                    }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {showPaymentLink && paymentMethod === 'gpay' && (
                <div className="payment-instructions">
                  <h3>Payment Instructions</h3>
                  <div className="payment-details-box">
                    <p><strong>Amount:</strong> ₹{formatPrice(totalPrice)}</p>
                    <p><strong>UPI ID:</strong> {MERCHANT_UPI_ID}</p>
                    <p><strong>Merchant:</strong> {MERCHANT_NAME}</p>
                  </div>
                  <p className="instruction-text">
                    Please complete the payment in your Google Pay app.
                  </p>
                  <div className="payment-actions">
                    <button className="payment-complete-btn" onClick={handlePaymentComplete}>
                      I've Completed Payment
                    </button>
                    <button className="cancel-payment-btn" onClick={() => {
                      setShowPaymentLink(false);
                      setPaymentMethod('');
                      setIsProcessing(false);
                    }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cart.map(item => (
                <div key={item.id} className="order-item">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="order-item-image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="order-item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity} × ₹{formatPrice(item.price)}</p>
                  </div>
                  <div className="order-item-price">
                    ₹{formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{formatPrice(totalPrice)}</span>
              </div>
              <div className="total-row">
                <span>Delivery Charges</span>
                <span>Free</span>
              </div>
              <div className="total-row final-total">
                <span>Total</span>
                <span>₹{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
