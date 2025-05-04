import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '../components/common/ProductGrid';
import { 
  getFeaturedProducts, 
  getNewArrivals, 
  getProductsOnSale 
} from '../data/products';
import { Product } from '../types/product';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Load products
    setFeaturedProducts(getFeaturedProducts());
    setNewArrivals(getNewArrivals());
    setSaleProducts(getProductsOnSale());
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">
            Handcrafted Wooden <br /> Masterpieces
          </h1>
          <p className="text-xl max-w-lg mb-8">
            Discover our collection of timeless wooden crafts, 
            meticulously handcrafted by skilled artisans.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop" className="btn-accent">
              Shop Now
            </Link>
            <Link to="/about" className="btn border-2 border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-4xl mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Furniture",
                image: "https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=1600",
                link: "/shop/furniture"
              },
              {
                name: "Decoration",
                image: "https://images.pexels.com/photos/691034/pexels-photo-691034.jpeg?auto=compress&cs=tinysrgb&w=1600",
                link: "/shop/decoration"
              },
              {
                name: "Kitchen",
                image: "https://images.pexels.com/photos/5824901/pexels-photo-5824901.jpeg?auto=compress&cs=tinysrgb&w=1600",
                link: "/shop/kitchen"
              },
              {
                name: "Toys",
                image: "https://images.pexels.com/photos/3661348/pexels-photo-3661348.jpeg?auto=compress&cs=tinysrgb&w=1600",
                link: "/shop/toys"
              }
            ].map(category => (
              <Link 
                key={category.name}
                to={category.link}
                className="block group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-[280px] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl font-serif mb-2">{category.name}</h3>
                    <span className="text-white flex items-center">
                      Shop Now <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-4xl">Featured Products</h2>
            <Link to="/shop" className="text-accent hover:text-accent-light flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts.slice(0, 4)} columns={4} />
        </div>
      </section>
      
      {/* Banner Section */}
      <section className="py-24 bg-wood-texture bg-cover bg-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white bg-opacity-90 p-10 rounded-lg text-center">
            <h2 className="font-serif text-4xl mb-4">The Beauty of Natural Wood</h2>
            <p className="text-lg mb-8">
              Each piece of wood tells a story. Our craftsmen work with the finest materials 
              to create unique pieces that bring the warmth and beauty of nature into your home.
            </p>
            <Link to="/about" className="btn-accent">
              Our Craftsmanship
            </Link>
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-4xl">New Arrivals</h2>
            <Link to="/shop" className="text-accent hover:text-accent-light flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <ProductGrid products={newArrivals} columns={3} />
        </div>
      </section>
      
      {/* Special Offers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-4xl">Special Offers</h2>
            <Link to="/shop" className="text-accent hover:text-accent-light flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <ProductGrid products={saleProducts} columns={3} />
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-accent text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-4xl mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The oak dining table we purchased has become the centerpiece of our home. The craftsmanship is exceptional, and it's clear that a lot of care went into making it.",
                author: "Sarah Johnson",
                location: "New York, NY"
              },
              {
                text: "I've bought wooden toys for my grandchildren from many places, but none match the quality and attention to detail that I've found here. These are heirloom pieces that will be passed down.",
                author: "Robert Miller",
                location: "Seattle, WA"
              },
              {
                text: "The custom bookshelf exceeded all my expectations. It fits perfectly in my space and the walnut finish is absolutely beautiful. Worth every penny for such quality work.",
                author: "Emily Chen",
                location: "Austin, TX"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-accent-light p-6 rounded-lg">
                <div className="text-amber-300 text-4xl mb-4">"</div>
                <p className="mb-6 italic">
                  {testimonial.text}
                </p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-300">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl mb-4">Ready to bring natural beauty into your home?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Browse our collection of handcrafted wooden products and discover 
            the perfect piece for your space.
          </p>
          <Link to="/shop" className="btn bg-white text-secondary hover:bg-gray-100">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;