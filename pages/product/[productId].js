import { useRouter } from 'next/router'

export default function ProductDetail() {

    // React hooks
    // Nextjs (react hooks)
    const router = useRouter()
    console.log(router)

    return (
        <div>
            ProductDetail
            { router.query.productId }
        </div>
    )
}