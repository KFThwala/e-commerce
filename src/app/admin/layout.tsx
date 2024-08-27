import Navigation, { NavLink } from "@/components/Navigation";

export const dynamic = "force-dynamic"
export default function AdminLayout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <Navigation>
                <NavLink href="/admin">DashBoard</NavLink>
                <NavLink href="/admin/products">Products</NavLink>
                <NavLink href="/admin/orders">Sales</NavLink>
                <NavLink href="/admin/users">Customers</NavLink>
            </Navigation>
            <div className="container my-6">
                {children}
            </div>
        </>
    )
}

