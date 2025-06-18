import Home from "./pages/home/Home"
import Board from "./pages/board/Board"
import { createBrowserRouter, RouterProvider } from 'react-router'

const routes = createBrowserRouter([
  {path: "/", element: <Home />}, {path: "/board-details/:id", element: <Board />}
])


function App() {
  return (
    <>
    <RouterProvider router={routes} />
    </>
  )
}

export default App
