import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Task Prioritizer - DIY_AI',
  description: 'AI-powered task prioritization and management',
};

export default function TaskPrioritizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
