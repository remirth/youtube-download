import {RedirectProvider} from './redirect';

export default async function Page() {
  return (
    <>
      <RedirectProvider to="/home" />
    </>
  );
}
