declare module 'next/augment' {
  import type {Form} from 'form';

  export declare type Params<P> = {[key in keyof P]: string};
  export declare type PageProps<P extends Params<P>, SP extends Params<SP>> = {
    params: P;
    searchParams: SP;
  };
  export declare type SearchParamsSubmittedViaForm<
    T extends Form<HTMLFormControlsCollection>,
    E = Extract<T['elements'], HTMLFormControlsCollection>
  > = Params<
    Omit<
      {
        [key in keyof E]: E[key] extends HTMLInputElement ? E[key] : never;
      },
      keyof HTMLFormControlsCollection
    >
  >;
  export declare type HeadProps<P extends Params<P>> = Pick<
    PageProps<P, never>,
    'params'
  >;
  export declare type GenerateStaticParams<P extends Params<P>> = () => Promise<
    P[]
  >;
}
