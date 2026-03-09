// Dependency imports
import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import { ComponentType } from 'preact';

// Basic components
import { Header } from './components/Header.tsx';
import { AdminRoute } from './components/AdminRoute.tsx';

// Non admin routes
import { Home } from './pages/Home/index.tsx';
import { Session } from './pages/Session/index.tsx';
import { SessionHistory } from './pages/Session/history.tsx';
import { SessionDetail } from './pages/Session/detail.tsx';

// Admin routes
import { AllDevices } from "./pages/Admin/Devices/index.tsx";
import { Users } from "./pages/Admin/Users/index.tsx";
import { Sessions } from "./pages/Admin/Sessions/index.tsx";

// Misc
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
                    <Route path="/session/history" component={SessionHistory} />
                    <Route path="/session/history/:id" component={SessionDetail} />
                    <Route path="/admin/devices" component={withAdmin(AllDevices)} />
                    <Route path="/admin/users" component={withAdmin(Users)} />
                    <Route path="/admin/sessions" component={withAdmin(Sessions)} />
                    <Route default component={NotFound} />
                </Router>
            </main>
        </LocationProvider>
    );
}

render(<App />, document.getElementById('app')!);
