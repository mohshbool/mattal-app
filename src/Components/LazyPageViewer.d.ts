import React from 'react';

declare module 'react' {
  // Redefine to better support generics.
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (
    props: React.PropsWithoutRef<P> & React.RefAttributes<T>,
  ) => React.ReactElement | null;
}
