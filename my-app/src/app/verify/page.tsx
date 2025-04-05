'use client';

import { useState } from 'react';
import { WorldIDWidget } from '@worldcoin/minikit-react';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const handleVerificationSuccess = () => {
    setIsVerified(true);
    // Store verification status in localStorage
    localStorage.setItem('worldcoin_verified', 'true');
    // Redirect to collection page after a short delay
    setTimeout(() => {
      router.push('/collection');
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Verify Your Humanity</h1>
          
          {isVerified ? (
            <div className="bg-green-500/20 p-8 rounded-xl backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Verification Successful! 🎉</h2>
              <p className="text-lg">Redirecting you to your collection...</p>
            </div>
          ) : (
            <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
              <p className="text-lg mb-8">
                To start collecting other Worldcoin users, you need to verify your humanity first.
                This ensures that each user in the collection is unique and verified.
              </p>
              
              <div className="flex justify-center">
                <WorldIDWidget
                  actionId="collect_balls" // Replace with your action ID
                  signal="user_verification"
                  onSuccess={handleVerificationSuccess}
                  enableTelemetry={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 