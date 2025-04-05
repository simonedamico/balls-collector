'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CollectedUser {
  id: string;
  address: string;
  timestamp: number;
}

export default function CollectionPage() {
  const [collectedUsers, setCollectedUsers] = useState<CollectedUser[]>([]);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Check if user is verified
    const verified = localStorage.getItem('worldcoin_verified') === 'true';
    setIsVerified(verified);

    // Load collected users from localStorage
    const storedUsers = localStorage.getItem('collected_users');
    if (storedUsers) {
      setCollectedUsers(JSON.parse(storedUsers));
    }
  }, []);

  if (!isVerified) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8">Access Denied</h1>
            <p className="text-lg mb-8">
              You need to verify your humanity first to view your collection.
            </p>
            <Link 
              href="/verify"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full text-lg transition-all transform hover:scale-105"
            >
              Verify Now
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Your Collection</h1>
          <p className="text-xl">
            {collectedUsers.length} unique Worldcoin users collected
          </p>
        </div>

        {collectedUsers.length === 0 ? (
          <div className="text-center">
            <p className="text-lg mb-8">Your collection is empty. Start collecting other Worldcoin users!</p>
            <Link 
              href="/"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full text-lg transition-all transform hover:scale-105"
            >
              Find Users
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectedUsers.map((user) => (
              <div 
                key={user.id}
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-xl">👁️</span>
                  </div>
                  <span className="text-sm text-gray-300">
                    {new Date(user.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-lg font-mono">
                  {`${user.address.substring(0, 6)}...${user.address.substring(38)}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 