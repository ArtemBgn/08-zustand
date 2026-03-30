import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';
import { Metadata } from 'next';

type NotePageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] === 'all' ? 'all' : slug[0];
  return {
    title: `NoteHub: ${category}`,
    description: `NoteHub filtred by category: ${category}`,
    openGraph: {
      title: `NoteHub: ${category}`,
      description: `NoteHub filtred by category: ${category}`,
      url: `https://notehub.com/notes/filter/${category}`,
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

export default async function NotePage({ params }: NotePageProps) {
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
