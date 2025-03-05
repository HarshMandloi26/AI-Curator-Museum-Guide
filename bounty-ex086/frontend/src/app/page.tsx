"use client";

import { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/constants';

export default function Home() {
  const [githubUrl, setGithubUrl] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const { address } = useAccount();
  
  const { write: submitProject } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'submitProject',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;
    
    try {
      await submitProject({ args: [githubUrl, telegramId] });
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Open Innovation Submission</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label>GitHub URL</label>
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Telegram ID</label>
          <input
            type="text"
            value={telegramId}
            onChange={(e) => setTelegramId(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!address}
        >
          Submit Project
        </button>
      </form>
    </main>
  );
}