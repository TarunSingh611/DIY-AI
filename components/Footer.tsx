import { Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Brand Section */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">DIY_AI</h3>
              <p className="text-sm text-slate-400">Your AI Assistant Hub</p>
            </div>
          </div>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Experience the power of AI across multiple domains with our specialized applications. 
            From travel planning to recipe generation, we've got you covered.
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="text-slate-400 text-sm">
              © {currentYear} DIY_AI. All rights reserved. Made with ❤️ for AI enthusiasts worldwide.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 