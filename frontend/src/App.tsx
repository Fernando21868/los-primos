import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePageAdmin } from './pagesAdmin/homePageAdmin/HomePageAdmin';
import { HomePage } from './pages/homePage/HomePage';
import { Layout } from './pagesAdmin/layoutAdmin/Layout';
import { Login } from './pagesAdmin/login/Login';
import { List } from './pagesAdmin/list/List';
import { Single } from './pagesAdmin/single/Single';
import { New } from './pagesAdmin/new/New';

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Layout></Layout>}>
            <Route index element={<HomePageAdmin></HomePageAdmin>}></Route>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="users">
              <Route index element={<List></List>}></Route>
              <Route path=":userId" element={<Single></Single>}></Route>
              <Route path="new" element={<New></New>}></Route>
            </Route>
            <Route path="products">
              <Route index element={<List></List>}></Route>
              <Route path=":productId" element={<Single></Single>}></Route>
              <Route path="new" element={<New></New>}></Route>
            </Route>
            <Route path="categories">
              <Route index element={<List></List>}></Route>
              <Route path=":categoryId" element={<Single></Single>}></Route>
              <Route path="new" element={<New></New>}></Route>
            </Route>
          </Route>
          <Route path="/" element={<Layout></Layout>}>
            <Route index element={<HomePage></HomePage>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
