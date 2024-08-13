import Link from "next/link"
import BarbershopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { quickSearchOptions } from "../_constants/quickSearch"
import { db } from "../_lib/prisma"
import { Button } from "../_components/ui/button"
import Image from "next/image"

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchParams?.search,
            mode: "insensitive",
          },
        },
        {
          services: {
            some: {
              name: {
                contains: searchParams?.search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
  })

  console.log(searchParams.search)
  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="mx-5 mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {quickSearchOptions.map((option) => (
          <Link href={`/barbershops?search=${option.title}`} key={option.title}>
            <Button className="gap-2" variant="secondary">
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          </Link>
        ))}
      </div>
      <div className="px-5">
        <h2 className="mb-3 mt-6 text-base font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams.search}&quot;
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
