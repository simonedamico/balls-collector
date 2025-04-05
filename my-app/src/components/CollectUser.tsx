'use client';

import { useState } from 'react';
import { WorldIDWidget } from '@worldcoin/minikit-react';

interface CollectUserProps {
  onCollect: (user: { id: string; address: string; timestamp: number }) => void;
}

export default function CollectUser({ onCollect }: CollectUserProps) {
  const [isCollecting, setIsCollecting] = useState(false);

  const handleVerificationSuccess = (verificationResponse: any) => {
    // Generate a unique ID for the collected user
    const userId = `user_${Date.now()}`;
    
    // Create the collected user object
    const collectedUser = {
      id: userId,
      address: verificationResponse.address,
      timestamp: Date.now(),
    };

    // Get existing collection from localStorage
    const existingCollection = localStorage.getItem('collected_users');
    let collection: any[] = [];
    
    if (existingCollection) {
      collection = JSON.parse(existingCollection);
    }

    // Check if user is already collected
    const isAlreadyCollected = collection.some(
      (user) => user.address === collectedUser.address
    );

    if (!isAlreadyCollected) {
      // Add new user to collection
      collection.push(collectedUser);
      localStorage.setItem('collected_users', JSON.stringify(collection));
      
      // Notify parent component
      onCollect(collectedUser);
    }

    setIsCollecting(false);
  };

  return (
    <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4">Collect a Worldcoin User</h2>
      <p className="text-lg mb-8">
        Verify another user's humanity to add them to your collection.
        Each user can only be collected once!
      </p>
      
      <div className="flex justify-center">
        <WorldIDWidget
          actionId="collect_user" // Replace with your action ID
          signal="collect_user"
          onSuccess={handleVerificationSuccess}
          enableTelemetry={true}
        />
      </div>
    </div>
  );
} 