import { DashBoardCard } from "@/components/DashBoardCard"
import { db } from "@/db/db"
import { formatCurrency, formatNumber } from "@/lib/formatter"


async function getSalesData() {
    const data =  await db.order.aggregate({
        _sum: {pricePaidInCents: true},
        _count: true
    })
    await wait(2000)

return {
        amount: (data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count
    }
}

function wait(duration: number) {
    return new Promise((resolve) => setTimeout(resolve, duration))
}

async function getUserData() {
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: {pricePaidInCents: true},

        })
    ])

    return {
        userCount,
        averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
        
    }
}

async function getProductData() {
    const [activeCount, inActiveCount] = await Promise.all([
        db.product.count({ where : {isAvailableForPurchase: true}}),
        db.product.count({where : {isAvailableForPurchase: false}}),
    ])

    return {
        activeCount,
        inActiveCount,
    }
}
export default async function AdminDashboard() {

    const [salesData, userData, productData] = await Promise.all([ 
        getSalesData(),
        getUserData(),  // fetch user data from the database and return it as a promise
        getProductData()  // fetch product data from the database and return it as a promiseProductData()  // fetch product data from the database and return it as a promise
    ])


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashBoardCard 
                title="Sales" 
                description={`${formatNumber(salesData.numberOfSales)} orders`}
                body={formatCurrency(salesData.amount)}
            />
            <DashBoardCard 
                title="Customers" 
                description={`${formatCurrency(userData.averageValuePerUser)} Average Value`}
                body={formatNumber(userData.userCount)}
            />
            <DashBoardCard 
                title=" Active Products" 
                description={`${formatNumber(productData.inActiveCount)} inActive`}
                body={formatNumber(productData.activeCount)}
            />

        </div>
    )
}

