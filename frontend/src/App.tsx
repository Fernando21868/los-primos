import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePageAdmin } from './pagesAdmin/homePageAdmin/HomePageAdmin';
import { HomePage } from './pages/homePage/HomePage';
import { Layout } from './pagesAdmin/layoutAdmin/Layout';
import { Login } from './components/login/Login';
import { List } from './pagesAdmin/list/List';
import { Single } from './pagesAdmin/single/Single';
import { New } from './pagesAdmin/new/New';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { LayoutSite } from './components/layoutSite/LayoutSite';
import { Logout } from './components/logout/Logout';
import { PersistGate } from 'redux-persist/integration/react';

export function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/admin" element={<Layout></Layout>}>
                <Route index element={<HomePageAdmin></HomePageAdmin>}></Route>
                <Route path="users">
                  <Route index element={<List></List>}></Route>
                  <Route path=":userId" element={<Single component={'form'}></Single>}></Route>
                  <Route path="new" element={<New></New>}></Route>
                  <Route
                    path="detail/:userId"
                    element={<Single component={'view'}></Single>}
                  ></Route>
                </Route>
                <Route path="products">
                  <Route index element={<List></List>}></Route>
                  <Route path=":productId" element={<Single component={'form'}></Single>}></Route>
                  <Route path="new" element={<New></New>}></Route>
                  <Route
                    path="detail/:productId"
                    element={<Single component={'view'}></Single>}
                  ></Route>
                </Route>
                <Route path="categories">
                  <Route index element={<List></List>}></Route>
                  <Route path=":categoryId" element={<Single component={'form'}></Single>}></Route>
                  <Route path="new" element={<New></New>}></Route>
                  <Route
                    path="detail/:categoryId"
                    element={<Single component={'view'}></Single>}
                  ></Route>
                </Route>
              </Route>
              <Route path="/" element={<LayoutSite></LayoutSite>}>
                <Route index element={<HomePage></HomePage>}></Route>
                <Route path="login" element={<Login></Login>}></Route>
              </Route>
              <Route path="/logout" element={<LayoutSite></LayoutSite>}>
                <Route index element={<Logout></Logout>}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}
