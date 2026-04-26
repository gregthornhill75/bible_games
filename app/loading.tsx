import { Container } from '@/components/layout';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Container className="py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </Container>
  );
}
