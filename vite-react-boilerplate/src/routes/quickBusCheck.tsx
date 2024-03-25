import { createFileRoute } from '@tanstack/react-router';
import QuickBusCheck from '../pages/QuickBusCheck';

export const Route = createFileRoute('/quickBusCheck')({
  component: QuickBusCheck
});