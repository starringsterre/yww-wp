import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@awarenessinbusiness.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            contact us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Young Wise Women is a modern community space where everyone can find
            their perfect practice. We've created a welcoming space with
            professional guidance to help you achieve harmony, strength, and
            flexibility.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                Contact information
              </h2>

              <p className="text-gray-700 mb-8">
                Young Wise Women is a modern community space where everyone can
                find their perfect practice. We've created a welcoming space
                with professional guidance to help you achieve harmony, strength
                and flexibility.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <p className="font-medium text-gray-900 mb-1">Address</p>
                  <p className="text-gray-600">
                    Saint-Petersburg
                    <br />
                    Peace st. 42
                  </p>
                </div>

                <div>
                  <p className="font-medium text-gray-900 mb-1">Phone</p>
                  <a
                    href="tel:+31655334728"
                    className="text-primary hover:underline"
                  >
                    +31 (0)6 55334728
                  </a>
                </div>

                <div>
                  <p className="font-medium text-gray-900 mb-1">Email</p>
                  <a
                    href="mailto:info@awarenessinbusiness.com"
                    className="text-primary hover:underline"
                  >
                    info@awarenessinbusiness.com
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <span className="text-gray-500">Map placeholder</span>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-white hover:bg-primary/90 py-3"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-center text-gray-900 mb-12">
            Other Ways to Reach Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
              <a
                href="mailto:info@awarenessinbusiness.com"
                className="text-primary hover:underline"
              >
                info@awarenessinbusiness.com
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Phone</h3>
              <a href="tel:+31655334728" className="text-primary hover:underline">
                +31 (0)6 55334728
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                WhatsApp
              </h3>
              <a
                href="https://api.whatsapp.com/send?phone=0655334728"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Send a message
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Can I still register if I missed the deadline?
              </h3>
              <p className="text-gray-700">
                Yes, you can! Please contact us via email or phone. We're happy
                to help and explore options.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Is there a payment plan available?
              </h3>
              <p className="text-gray-700">
                Yes, for individuals, payment in 3 installments is possible.
                Contact us for more information about payment options.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Do you organize group retreats?
              </h3>
              <p className="text-gray-700">
                Yes, group retreats are available upon request. This can be very
                interesting for teams or groups. Let us know and we'll discuss
                the possibilities!
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                What if I can't attend the scheduled date?
              </h3>
              <p className="text-gray-700">
                Subscribe to the newsletter so you stay informed about upcoming
                editions. We organize new retreats regularly.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How do I prepare for the retreat?
              </h3>
              <p className="text-gray-700">
                After registration, you'll receive all information and have a
                personal intake with one of our coaches. This helps us tailor
                the retreat perfectly for you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
