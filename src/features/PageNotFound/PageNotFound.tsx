import {
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div>
      <h1>404: PAGE NOT FOUND</h1>
      <nav>
        <Link to="/">Back to todolists</Link>
      </nav>
    </div>
  )
}