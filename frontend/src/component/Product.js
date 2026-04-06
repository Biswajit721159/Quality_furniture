import React from 'react';
import Footer from '../component/Footer'
import SubComponent from './SubComponent';
import Homepage1 from '../AHomepage/Homepage1';
import About from '../AHomepage/About';
import Contact from '../AHomepage/Contact';
import Catagory from '../AHomepage/Catagory'

export default function Product() {
  return (
    <div className="min-h-screen bg-page flex flex-col">
      {/* Hero Section */}
      <Homepage1 />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16 py-12 flex-1">
        
        {/* Categories Grid */}
        <section>
          <Catagory />
        </section>

        {/* Top Products & Offers */}
        <section className="space-y-12">
          <SubComponent />
        </section>

        <hr className="border-stone-200" />

        {/* About Section */}
        <section id="about">
          <About />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Contact />
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
