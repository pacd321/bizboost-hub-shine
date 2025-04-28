

export function WebsiteTestimonials() {
  const testimonials = [
    {
      name: 'Rahul Sharma',
      position: 'CEO, TechStart',
      content: 'BizAarambhShop has been a reliable partner for all our office supply needs. Their products are top-notch and the customer service is excellent.'
    },
    {
      name: 'Priya Patel',
      position: 'Owner, Fashion Boutique',
      content: 'I\'ve been ordering from BizAarambhfor over a year now. The quality is consistent and delivery is always on time.'
    },
    {
      name: 'Amit Kumar',
      position: 'Manager, Retail Chain',
      content: 'What impressed me most was how they handled our bulk orders efficiently. The pricing is competitive and the online platform is easy to use.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">Don't just take our word for it</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex-1">
                <p className="text-lg mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
