import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard/page"
import Categories from "./pages/categories/page"
import Products from "./pages/products/page"
import Warehouses from "./pages/warehouses/page"
import Layout from "./components/layout/layout"
import PageTitle from "./components/common/page-title"
import CategoryForm from "./pages/categories/form"
import ProductForm from "./pages/products/form"
import WarehouseForm from "./pages/warehouses/form"
import Authorization from "./pages/auth/page"
import ProtectedRoute from "./components/common/protected-route"
import PublicRoute from "./components/common/public-route"
import StockLevels from "./pages/stock-levels/page"
import StockLevelForm from "./pages/stock-levels/form"
import StockInPage from "./pages/stock-in/page"
import StockInForm from "./pages/stock-in/form"
import StockOutPage from "./pages/stock-out/page"
import StockOutForm from "./pages/stock-out/form"

const links = [
    {
        title: "Dashboard",
        path: "/",
        component: <Dashboard />
    },
    {
        title: "Categories",
        path: "/categories",
        component: <Categories />
    },
    {
        title: "Category Form",
        path: "/categories/form",
        component: <CategoryForm />
    },
    {
        title: "Category Form",
        path: "/categories/form/:id",
        component: <CategoryForm />
    },
    {
        title: "Products",
        path: "/products",
        component: <Products />
    },
    {
        title: "Product Form",
        path: "/products/form",
        component: <ProductForm />
    },
    {
        title: "Product Form",
        path: "/products/form/:id",
        component: <ProductForm />
    },
    {
        title: "Warehouses",
        path: "/warehouses",
        component: <Warehouses />
    },
    {
        title: "Warehouse Form",
        path: "/warehouses/form",
        component: <WarehouseForm />
    },
    {
        title: "Warehouse Form",
        path: "/warehouses/form/:id",
        component: <WarehouseForm />
    },
    {
        title: "Stocks",
        path: "/stock-levels",
        component: <StockLevels />
    },
    {
        title: "Stock Form",
        path: "/stock-levels/form",
        component: <StockLevelForm />
    },
    {
        title: "Stock Form",
        path: "/stock-levels/form/:id",
        component: <StockLevelForm />
    },
    {
        title: "Stock In",
        path: "/stock-in",
        component: <StockInPage />
    },
    {
        title: "Stock In Form",
        path: "/stock-in/form",
        component: <StockInForm />
    },
    {
        title: "Stock In Form",
        path: "/stock-in/form/:id",
        component: <StockInForm />
    },
    {
        title: "Stock Out",
        path: "/stock-out",
        component: <StockOutPage />
    },
    {
        title: "Stock Out Form",
        path: "/stock-out/form",
        component: <StockOutForm />
    },
    {
        title: "Stock Out Form",
        path: "/stock-out/form/:id",
        component: <StockOutForm />
    },
]

function App() {
    return (
        <Routes>
            <Route path="/sign-in" element={
                <PublicRoute>
                    <Authorization />
                    <PageTitle title="Sign In" />
                </PublicRoute>
            } />
            {links.map((link, index) => (
                <Route key={index} path={link.path} element={
                    <ProtectedRoute>
                        <Layout children={
                            link.component
                        } />
                        <PageTitle title={link.title} />
                    </ProtectedRoute>
                } />
            ))}
        </Routes>
    )
}

export default App
