import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import { ComponentType } from 'preact';

import { Header } from './components/Header.tsx';
import { AdminRoute } from './components/AdminRoute.tsx';

import { Home } from './pages/Home/index.tsx';
import { Session } from './pages/Session/index.tsx';

import { AllDevices } from "./pages/Admin/Devices/index.tsx";
import { Users } from "./pages/Admin/Users/index.tsx";
import { NotFound } from './pages/_404.tsx';
import './style.css';

const withAdmin = (Component: ComponentType) => () => (
    <AdminRoute>
        <Component />
    </AdminRoute>
);

export function App() {
    return (
        <LocationProvider>
            <Header />
            <main>
                <Router>
                    <Route path="/" component={Home} />
                    <Route path="/session" component={Session} />
                    <Route path="/admin/devices" component={withAdmin(AllDevices)} />
                    <Route path="/admin/users" component={withAdmin(Users)} />
                    <Route default component={NotFound} />
                </Router>
            </main>
        </LocationProvider>
    );
}

render(<App />, document.getElementById('app')!);
