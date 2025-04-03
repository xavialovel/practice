
document.addEventListener('DOMContentLoaded', function () {
  fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data
    })
    .catch(error => console.error('Error loading header:', error))

  fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data
    })
    .catch(error => console.error('Error loading footer:', error))
})

// Vue

var app = new Vue({
  el: '#app',
  data: {
    products: [
      {
        id: 1,
        title: 'Red Baron Onion',
        short_text: 'Deep red, mild-flavored onion perfect for salads.',
        image: 'assets/images/red_onion.jpg',
        desc: 'Beautiful red onions with a crisp texture and slightly sweet flavor, ideal for fresh consumption.',
        characteristics: {
          resistance: 'HR: Downy Mildew; IR: Fusarium',
          plant: [
            'Strong growth with upright foliage.',
            'High yield potential with uniform bulbs.',
            'Early maturing variety (90-100 days).'
          ],
          fruit: [
            'Deep red, globe-shaped bulbs.',
            'Excellent storage qualities.',
            'Average bulb size: 7-9 cm diameter.'
          ],
          cycle: ['Spring', 'Summer'],
          color: 'Red'
        }
      },
      {
        id: 2,
        title: 'Sweet Spanish Onion',
        short_text: 'Large, sweet yellow onions with mild flavor.',
        image: 'assets/images/yellow_onion.jpg',
        desc: 'Classic yellow onions with high sugar content and low pungency, great for cooking and fresh use.',
        characteristics: {
          resistance: 'HR: Pink Root; IR: Thrips',
          plant: [
            'Vigorous growth with thick necks.',
            'Adaptable to various soil types.',
            'Long day variety (110-120 days).'
          ],
          fruit: [
            'Large, slightly flattened bulbs.',
            'Thin, golden-brown skin.',
            'Average bulb size: 10-12 cm diameter.'
          ],
          cycle: ['Summer', 'Fall'],
          color: 'Yellow'
        }
      },
      {
        id: 3,
        title: 'White Bermuda Onion',
        short_text: 'Mild, juicy white onions with thin skin.',
        image: 'assets/images/white_onion.jpg',
        desc: 'Popular white onions known for their juicy texture and clean, sharp flavor profile.',
        characteristics: {
          resistance: 'HR: Botrytis; IR: Onion Fly',
          plant: [
            'Medium-height plants with blue-green foliage.',
            'Excellent uniformity and standability.',
            'Short day variety (85-95 days).'
          ],
          fruit: [
            'Globe-shaped with pure white flesh.',
            'Thin, papery white skin.',
            'Average bulb size: 8-10 cm diameter.'
          ],
          cycle: ['Spring', 'Early Summer'],
          color: 'White'
        }
      },
      {
        id: 4,
        title: 'Shallot',
        short_text: 'Gourmet onion with delicate, complex flavor.',
        image: 'assets/images/shallot.png',
        desc: 'Premium shallots prized by chefs for their mild yet complex flavor and multiple bulbs per plant.',
        characteristics: {
          resistance: 'HR: Purple Blotch; IR: Stemphylium',
          plant: [
            'Compact growth habit.',
            'Produces clusters of bulbs.',
            'Long storage life (8-10 months).'
          ],
          fruit: [
            'Pear-shaped bulbs with copper-colored skin.',
            'Pink-tinged flesh when raw.',
            'Average bulb size: 5-7 cm diameter.'
          ],
          cycle: ['Fall', 'Winter'],
          color: 'Copper'
        }
      },
      {
        id: 5,
        title: 'Cipollini Onion',
        short_text: 'Italian flat onions with intense sweetness.',
        image: 'assets/images/cipollini.png',
        desc: 'Traditional Italian variety known for its flat shape and exceptional sweetness when caramelized.',
        characteristics: {
          resistance: 'HR: Neck Rot; IR: Onion Maggot',
          plant: [
            'Low-growing with slender leaves.',
            'Excellent for high-density planting.',
            'Very uniform maturity.'
          ],
          fruit: [
            'Distinctive flat, disc-like shape.',
            'Golden-brown skin with white flesh.',
            'Average bulb size: 4-6 cm diameter.'
          ],
          cycle: ['Spring', 'Summer'],
          color: 'Golden Brown'
        }
      }
    ],
    product: null,
    cart: [],
    contactFields: {
      name: '',
      companyName: '',
      position: '',
      city: '',
      country: '',
      phone: '',
      email: '',
      youAre: 'seedProducer',
      other: '',
      interest: '',
      captcha: ''
    },
    orderSummary: null,
    orderProducts: []
  },
  mounted: function () {
    const prodId = window.localStorage.getItem('prod')
    if (prodId) {
      this.product = this.products.find(p => p.id == prodId)
    }
    this.getCart()
  },
  methods: {
    addItem: function (id) {
      window.localStorage.setItem('prod', id)
    },

    addToCartAndGo () {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      if (!cart.includes(this.product.id)) {
        cart.push(this.product.id)
        localStorage.setItem('cart', JSON.stringify(cart))
      }
      window.location.href = 'contact-us.html'
    },

    getCart () {
      let cartIds = JSON.parse(localStorage.getItem('cart')) || []
      this.cart = this.products.filter(p => cartIds.includes(p.id))
    },

    removeFromCart (id) {
      let cartIds = JSON.parse(localStorage.getItem('cart')) || []
      cartIds = cartIds.filter(pId => pId !== id)
      localStorage.setItem('cart', JSON.stringify(cartIds))
      this.getCart()
    },

    makeOrder () {
      this.contactFields = {
        name: this.$refs.name.value,
        companyName: this.$refs.companyName.value,
        position: this.$refs.position.value,
        city: this.$refs.city.value,
        country: this.$refs.country.value,
        phone: this.$refs.phone.value,
        email: this.$refs.email.value,
        youAre: this.$refs.youAre.value,
        other: this.$refs.other.value,
        interest: this.$refs.interest.value,
        captcha: this.$refs.captcha.value
      }

      if (!this.contactFields.name || !this.contactFields.email) {
        alert('Please fill in the required fields: Name and Email.')
        return
      }
      if (this.cart.length === 0) {
        alert('Your cart is empty. Please add items before placing an order.')
        return
      }

      this.orderProducts = [...this.cart]

      this.cart = []
      localStorage.removeItem('cart')

      this.orderSummary = { ...this.contactFields }

      this.$refs.contactForm.reset()
    }
  }
})
