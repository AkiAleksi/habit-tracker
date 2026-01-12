'use client';

import { useEffect, useState } from 'react';
import { Level } from '@/lib/gamification';

interface LevelUpModalProps {
  isOpen: boolean;
  level: Level;
  onClose: () => void;
}

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
}

export function LevelUpModal({ isOpen, level, onClose }: LevelUpModalProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Generate confetti particles
      const newParticles: Particle[] = [];
      const colors = ['#238636', '#2ea043', '#3fb950', '#f97316', '#58a6ff', '#a855f7'];

      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
        });
      }
      setParticles(newParticles);

      // Delay content appearance for dramatic effect
      setTimeout(() => setShowContent(true), 200);

      // Auto-close after 4 seconds
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      setParticles([]);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop"
      onClick={onClose}
    >
      {/* Confetti */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="confetti fixed w-3 h-3 rounded-sm"
          style={{
            left: `${particle.x}%`,
            top: '-20px',
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Modal content */}
      {showContent && (
        <div
          className="level-up-animation text-center p-8 rounded-2xl max-w-sm mx-4"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '2px solid var(--color-primary)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Level icon */}
          <div
            className="bounce-in inline-flex items-center justify-center w-24 h-24 rounded-2xl text-6xl mb-4"
            style={{
              backgroundColor: 'var(--color-success-bg)',
              boxShadow: '0 0 40px rgba(35, 134, 54, 0.4)',
            }}
          >
            {level.icon}
          </div>

          {/* Title */}
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--color-primary)' }}
          >
            TASO YLÖS!
          </h2>

          {/* Level info */}
          <p
            className="text-lg font-semibold"
            style={{ color: 'var(--color-text)' }}
          >
            {level.title}
          </p>
          <p
            className="font-mono text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Taso {level.level}
          </p>

          {/* Motivational message */}
          <p
            className="mt-4 text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Jatka samaan malliin! 🚀
          </p>

          {/* Close button */}
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 rounded-lg font-medium text-sm"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white',
            }}
          >
            Mahtavaa!
          </button>
        </div>
      )}
    </div>
  );
}
