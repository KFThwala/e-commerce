import { Button } from "@/components/ui/button";
import PageHeader from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";

export default function AdminProduct() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>
                    Product
                </PageHeader>
                <Button asChild>
                    <Link href="/admin/products/new">Add Product</Link>
                </Button>
            </div>
            <ProductsTable />
        </>
    )
}

export function ProductsTable() {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-0">
                            <span className="sr-only">Available For Purchase</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="w-0">
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    
                </TableBody>
            </Table>
        </>

    )
}