import {RedirectProvider} from './redirect';

export default function Page() {
  return (
    <>
      <RedirectProvider to="/home" />
    </>
  );
}
