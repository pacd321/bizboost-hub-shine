
import React from 'react';
import { Link } from 'react-router-dom';

export function WebsiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">BizBoost Shop</h3>
            <p className="text-sm">
              Quality products for businesses and individuals.
              Fast delivery, excellent customer service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/website/products/electronics" className="text-sm hover:text-white">Electronics</Link></li>
              <li><Link to="/website/products/apparel" className="text-sm hover:text-white">Apparel</Link></li>
              <li><Link to="/website/products/kitchenware" className="text-sm hover:text-white">Kitchenware</Link></li>
              <li><Link to="/website/products/beauty" className="text-sm hover:text-white">Beauty</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/website/about" className="text-sm hover:text-white">About Us</Link></li>
              <li><Link to="/website/contact" className="text-sm hover:text-white">Contact</Link></li>
              <li><Link to="/website/careers" className="text-sm hover:text-white">Careers</Link></li>
              <li><Link to="/website/blog" className="text-sm hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/website/support" className="text-sm hover:text-white">Help Center</Link></li>
              <li><Link to="/website/shipping" className="text-sm hover:text-white">Shipping Policy</Link></li>
              <li><Link to="/website/returns" className="text-sm hover:text-white">Returns & Refunds</Link></li>
              <li><Link to="/website/faq" className="text-sm hover:text-white">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} BizBoost Shop. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/website/terms" className="text-sm hover:text-white">Terms of Service</Link>
            <Link to="/website/privacy" className="text-sm hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
