import { Suspense, useEffect, lazy } from "react";
import {
  useRoutes,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import routes from "tempo-routes";

// Lazy load components for better performance
const LoginPage = lazy(() => import("./components/auth/LoginPage"));
const Home = lazy(() => import("./components/home"));
const CartPage = lazy(() => import("./components/cart/CartPage"));
const ProfilePage = lazy(() => import("./components/layout/ProfilePage"));
const StorePage = lazy(() => import("./components/store/StorePage"));

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in and redirect to login page if not
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [navigate, location]);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl">جاري التحميل...</p>
        </div>
      }
    >
      <>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Add tempobook route before the catchall */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}

          {/* Redirect all other routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
