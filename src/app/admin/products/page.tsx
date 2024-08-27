import { Button } from "@/components/ui/button";
import PageHeader from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { db } from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency } from "@/lib/formatter";
import { DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductAction";

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

export async function ProductsTable() {
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            priceInCents: true,
            filePath: true,
            isAvailableForPurchase: true,
            _count: { select: {orders: true}}
        },
        orderBy: {
            name: "asc"
        }
    })

    if (products.length === 0) return <p>No Products found</p>
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
                    {products.map(product => (
                        <TableRow key={product.id}>
                            <TableCell>
                                {product.isAvailableForPurchase ? 
                                <>
                                <CheckCircle2 className="stroke-green-700" /> 
                                <span className="sr-only">Available</span>
                                </>: <>
                                <XCircle className="stroke-destructive" />
                                <span className="sr-only">UnAvailable</span>
                                </>}
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product._count.orders}</TableCell>
                            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                            <TableCell>
                            <DropdownMenu>
                                    <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <a download href={`/admin/products/${product.id}/download`}>
                                        Download
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/products/${product.id}/edit`}>
                                        Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem
                                        id={product.id}
                                        isAvailableForPurchase={product.isAvailableForPurchase}
                                    />
                                    <DropdownMenuSeparator />
                                    <DeleteDropdownItem
                                        
                                        id={product.id}
                                        disabled={product._count.orders > 0}
                                    />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>

    )
}