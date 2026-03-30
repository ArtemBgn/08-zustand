import { fetchNoteById } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Note } from '@/types/note';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

interface pageProps {
  params: Promise<{ id: Note['id'] }>;
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const { id } = await params;
  const queryClient = new QueryClient();

  const note = await queryClient.fetchQuery({
    queryKey: ['notesId', id],
    queryFn: () => fetchNoteById(id),
  });
  return {
    title: `NoteHub note: ${note.title}`,
    description: `NoteHub note description: ${note.content.slice(0, 30)}`,
    openGraph: {
      title: `NoteHub note: ${note.title}`,
      description: `NoteHub note description: ${note.content.slice(0, 30)}`,
      url: `https://notehub.com/notes/filter/${note.id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub',
        },
      ],
    },
  };
}

export default async function page({ params }: pageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notesId', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
