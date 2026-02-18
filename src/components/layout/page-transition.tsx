import type { PropsWithChildren } from 'react';

import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

type PageTransitionProperties = PropsWithChildren<{
  className?: string;
}>;

export default function PageTransition({
  children,
  className
}: Readonly<PageTransitionProperties>) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <section className={cn('space-y-6', className)}>{children}</section>;
  }

  return (
    <motion.section
      className={cn('space-y-6', className)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
