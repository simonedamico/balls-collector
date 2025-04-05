"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CollectUser from '@/components/CollectUser';

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const [recentlyCollected, setRecentlyCollected] = useState<{
    id: string;
    address: string;
    timestamp: number;
  } | null>(null);

  // Check if user is verified on component mount
  useEffect(() => {
    const verified = localStorage.getItem('worldcoin_verified') === 'true';
    setIsVerified(verified);
  }, []);

  const handleCollect = (user: { id: string; address: string; timestamp: number }) => {
    setRecentlyCollected(user);
    // Clear the recently collected user after 3 seconds
    setTimeout(() => {
      setRecentlyCollected(null);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 animate-bounce">
            Gotta Catch Them Balls! 🎯
          </h1>
          <p className="text-xl mb-8">
            Collect unique Worldcoin users and build your collection of verified humans!
          </p>
          
          <div className="flex justify-center gap-4">
            {!isVerified ? (
              <Link 
                href="/verify" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full text-lg transition-all transform hover:scale-105"
              >
                Verify Yourself
              </Link>
            ) : (
              <Link 
                href="/collection" 
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all transform hover:scale-105"
              >
                View Collection
              </Link>
            )}
          </div>
        </div>

        {isVerified && (
          <div className="max-w-2xl mx-auto mb-16">
            <CollectUser onCollect={handleCollect} />
          </div>
        )}

        {recentlyCollected && (
          <div className="fixed bottom-4 right-4 bg-green-500/90 text-white p-4 rounded-lg shadow-lg animate-fade-in">
            <p className="font-bold">New User Collected! 🎉</p>
            <p className="text-sm">
              {`${recentlyCollected.address.substring(0, 6)}...${recentlyCollected.address.substring(38)}`}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Verify</h3>
            <p>Prove you're a unique human using Worldcoin's iris scanning technology</p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Collect</h3>
            <p>Add other verified Worldcoin users to your collection</p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Share</h3>
            <p>Show off your collection of unique humans</p>
          </div>
        </div>
      </div>
    </main>
  );
}

