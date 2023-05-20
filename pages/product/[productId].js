import { useRouter } from 'next/router'

export function getStaticPaths() {
    return {
        paths: [
            { params: { productId: '9' }},
            { params: { productId: '12' }},
            { params: { productId: '13' }},
            { params: { productId: '14' }},
        ],
        fallback: true,
    }
}

export function getStaticProps() {
    return {
        props: {},
    }
}

export default function ProductDetail() {

    // React hooks
    // Nextjs (react hooks)
    const router = useRouter()
    console.log(router)

    return (
        <div className="pt-48">
            ProductDetail
        </div>
    )
}