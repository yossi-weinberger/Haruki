type LoadingStateProperties = {
  label?: string;
};

export default function LoadingState({
  label = 'Loading books...'
}: Readonly<LoadingStateProperties>) {
  return (
    <div className='surface flex min-h-52 flex-col items-center justify-center gap-4 p-6'>
      <div className='book-loader' aria-hidden='true'>
        <div className='book-loader__page-shadow' />
        <div className='book-loader__page' />
        <div className='book-loader__page book-loader__page--2' />
        <div className='book-loader__page book-loader__page--3' />
        <div className='book-loader__page book-loader__page--4' />
        <div className='book-loader__page book-loader__page--5' />
      </div>
      <div className='text-muted-foreground text-sm'>{label}</div>
    </div>
  );
}
