import React from 'react'
import { Button } from './_components/ui/button'
import Header from './_components/header'
import { Input } from './_components/ui/input'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'

const Home= () => {
  return (
    <div>
      {/* HEADER */}
      <Header/>
      <div className='p-5'>
        <h2 className='text-xl font-bold'>Olá, Yaguera</h2>
        <p>Terça-feira, 06 de Agosto</p>

        <div className='mt-6 flex items-center gap-2'>
          <Input placeholder='Faça sua busca...'/>
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className='h-[150px] mt-6 w-full relative'>
          <Image alt="Agende com os melhores com FSW Barber" src="/banner-01.png" fill className='object-cover rounded-xl'/>
        </div>
      </div>
    </div>
  )
}

export default Home
