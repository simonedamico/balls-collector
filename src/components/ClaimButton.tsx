"use client";

interface ClaimButtonProps {
  onSuccess: (txId: string) => void;
}

export function ClaimButton({ onSuccess }: ClaimButtonProps) {
  return (
    <button
      onClick={() => onSuccess("mock_tx_id")}
      className="w-full max-w-xs px-8 py-4 bg-purple-500 text-white font-medium text-lg rounded-xl shadow-sm hover:bg-purple-600 active:bg-purple-700 transition-colors touch-manipulation"
    >
      Claim Your TUTE
    </button>
  );
}
