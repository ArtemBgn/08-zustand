import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const category = (slug[0] === 'all' ? undefined : slug[0]) as
    | NoteTag
    | undefined;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', category],
    queryFn: () => fetchNotes('', 1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
}
