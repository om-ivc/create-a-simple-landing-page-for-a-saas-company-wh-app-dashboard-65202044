'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { validateEmail } from '@/lib/validation';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      if (data.success) {
        setSubscribed(true);
        toast.success('Successfully subscribed to our newsletter!');
        setEmail('');
      } else {
        throw new Error(data.error || 'Failed to subscribe');
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      toast.error(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-purple-600/30 backdrop-blur-lg border border-white/20 rounded-3xl p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          
          <div className="relative z-10">
            {/* Main CTA */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already transforming their operations with FutureSaaS
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button 
                    size="lg" 
                    className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold group"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-purple-600/50 px-4 py-1 text-sm text-white rounded-full">
                  Or subscribe to our newsletter
                </span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="max-w-md mx-auto">
              {subscribed ? (
                <div className="flex items-center justify-center space-x-2 text-green-400 bg-green-400/10 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">You're subscribed! Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pl-10 h-12"
                      disabled={loading}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-white text-purple-600 hover:bg-gray-100 h-12 px-6 font-semibold"
                    disabled={loading}
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
              )}
              <p className="text-sm text-gray-300 text-center mt-4">
                Get the latest updates, tips, and exclusive offers delivered to your inbox
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">14 Days</div>
                <div className="text-sm text-gray-300">Free Trial</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">No Credit Card</div>
                <div className="text-sm text-gray-300">Required</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">Cancel</div>
                <div className="text-sm text-gray-300">Anytime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}