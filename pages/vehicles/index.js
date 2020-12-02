import Head from 'next/head'
import Link from 'next/link'

export async function getStaticProps(context) {
    const res = await fetch(`https://swapi.dev/api/vehicles/`)
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { data }, // will be passed to the page component as props
    }
}

export default function People({ data }) {
    return (
        <div>
            <h1 className="text-center text-xl font-semibold my-6">Vehicles</h1>
            <div className="flex flex-wrap justify-center">
                {data.results.map(vehicle => {
                    const urlArr = vehicle.url.split("/")
                    const id = urlArr[urlArr.length - 2];

                    return (
                        <div className="mx-2 mb-2 bg-gray-700 py-2 px-4 rounded-md text-white" key={id}>
                            <Link href={`/vehicles/${id}`}>{vehicle.name}</Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
