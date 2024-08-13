import React from "react"
import { Button } from "./_components/ui/button"
import Header from "./_components/header"
import Image from "next/image"
import { quickSearchOptions } from "./_constants/quickSearch"
import BookingItem from "./_components/booking-item"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import Greatings from "./_components/greetings"
import Search from "./_components/search"
import Link from "next/link"

const Home = async () => {
  // chamar banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const shuffledBarbershops = barbershops.sort(() => Math.random() - 0.5)

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="p-5">
        <Greatings />

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RAPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Link
              href={`/barbershops?search=${option.title}`}
              key={option.title}
            >
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

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende com os melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* AGENDAMENTO */}
        <BookingItem />

        <h2 className="mb-3 mt-6 text-xl font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {shuffledBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xl font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
