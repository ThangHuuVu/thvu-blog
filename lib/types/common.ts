export interface Container {
  children: React.ReactNode;
}

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export type ArrayElement<
  ArrayType extends readonly Record<string, any>[] | null
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
