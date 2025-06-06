import { useRouteError } from "react-router-dom";
import '../styles/pages/Error.css'

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}