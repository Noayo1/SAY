import { siteConfig } from "@/config";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1
          className="text-5xl font-bold mb-4"
          style={{ color: siteConfig.colors.primary }}
        >
          Welcome to {siteConfig.companyName}
        </h1>
        <p className="text-xl text-gray-600 mb-8">{siteConfig.tagline}</p>
        <button
          className="px-8 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition"
          style={{ backgroundColor: siteConfig.colors.primary }}
        >
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-2">Quality</h3>
          <p className="text-gray-600">
            We deliver exceptional quality in every project.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-xl font-semibold mb-2">Innovation</h3>
          <p className="text-gray-600">
            Cutting-edge solutions for modern challenges.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold mb-2">Support</h3>
          <p className="text-gray-600">Dedicated support for all your needs.</p>
        </div>
      </div>
    </div>
  );
}
