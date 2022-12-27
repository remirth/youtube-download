declare module 'form' {
  interface Form<T extends HTMLFormControlsCollection> extends HTMLFormElement {
    readonly elements: T;
  }
  interface SearchFormElements extends HTMLFormControlsCollection {
    q: HTMLInputElement;
  }
  type SearchForm = Form<SearchFormElements>;
}
