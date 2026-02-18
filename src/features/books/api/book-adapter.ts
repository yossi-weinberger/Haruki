import type { Book } from '@/features/books/types';

export type GoogleBookVolume = {
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    description?: string;
    publishedDate?: string;
    publisher?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
};

const toHttpsUrl = (url?: string) => {
  if (!url) {
    return;
  }

  if (url.startsWith('http://')) {
    return `https://${url.slice('http://'.length)}`;
  }

  return url;
};

export const adaptGoogleBookVolume = (volume: GoogleBookVolume): Book => {
  const volumeInfo = volume.volumeInfo;
  const imageLinks = volumeInfo?.imageLinks;

  return {
    id: volume.id,
    title: volumeInfo?.title?.trim() ?? 'Untitled',
    authors: volumeInfo?.authors?.filter(Boolean) ?? [],
    thumbnail: toHttpsUrl(imageLinks?.thumbnail ?? imageLinks?.smallThumbnail),
    description: volumeInfo?.description?.trim(),
    publishedDate: volumeInfo?.publishedDate?.trim(),
    publisher: volumeInfo?.publisher?.trim()
  };
};

export const adaptGoogleBookVolumes = (volumes: GoogleBookVolume[]): Book[] =>
  volumes.map((volume) => adaptGoogleBookVolume(volume));
