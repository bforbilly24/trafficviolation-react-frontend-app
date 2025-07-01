import { createLazyFileRoute } from '@tanstack/react-router'
import Landing from '@/features/landing';

// Make sure this exactly matches your file structure
export const Route = createLazyFileRoute('/(landing)/home')({
  component: Landing,
});
