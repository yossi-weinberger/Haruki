import * as React from 'react';

import { Dialog as DialogPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

function DialogOverlay({
  className,
  ...properties
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot='dialog-overlay'
      className={cn(
        'data-open:animate-in data-closed:animate-out data-open:fade-in-0 data-closed:fade-out-0 fixed inset-0 z-50 bg-black/55 duration-200',
        className
      )}
      {...properties}
    />
  );
}

function DialogContent({
  className,
  children,
  ...properties
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot='dialog-portal'>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot='dialog-content'
        className={cn(
          'bg-card data-open:animate-in data-closed:animate-out data-open:fade-in-0 data-closed:fade-out-0 data-open:zoom-in-95 data-closed:zoom-out-95 fixed top-1/2 left-1/2 z-50 grid max-h-[85vh] w-[min(92vw,40rem)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-auto overscroll-contain rounded-xl border p-5 shadow-lg duration-200',
          className
        )}
        {...properties}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...properties }: React.ComponentProps<'div'>) {
  return <div className={cn('space-y-1', className)} {...properties} />;
}

function DialogFooter({ className, ...properties }: React.ComponentProps<'div'>) {
  return <div className={cn('flex items-center justify-end gap-2', className)} {...properties} />;
}

function DialogTitle({
  className,
  ...properties
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot='dialog-title'
      className={cn('text-lg leading-none font-semibold', className)}
      {...properties}
    />
  );
}

function DialogDescription({
  className,
  ...properties
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot='dialog-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...properties}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
};
