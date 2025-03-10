'use client'
import React from 'react'
import Section from '../layout/Section'
import CountUp from 'react-countup';

interface AboutProps {
  id: string;
  counterHeading: string;
  start: number;
  end: number;
  suffix?: string;
}

const AboutItens: AboutProps[] = [
  {
    id: '1',
    counterHeading: 'Pacientes Felizes',
    start: 0,
    end: 1506,
    suffix: '+',
  },
  {
    id: '2',
    counterHeading: 'Médicos Especialistas',
    start: 0,
    end: 100,
    suffix: '+',
  },
  {
    id: '3',
    counterHeading: 'Vencedores do Prêmio',
    start: 0,
    end: 50,
  },
  {
    id: '4',
    counterHeading: 'Sorrisos Melhorados',
    start: 0,
    end: 700,
    suffix: '+',
  }
]

export default function Counter() {
  return (
    <Section noContainer={true} className='relative bg-banner w-full contain-none bg-cover bg-center bg-no-repeat text-white text-center'>
      <div className='absolute inset-0 h-full w-full opacity-60 bg-slate-900'></div>
      <div className="relative container justify-center mx-auto">
        <div className="flex flex-wrap items-center justify-center">
          {AboutItens.map((item) => (
            <div key={item.id} className="w-full md:w-1/2 lg:w-1/4">
              <div className="block p-[15px]">
                <div className="counter-contents">
                  <h2 className='text-white text-[45px] font-bold mb-[5px] '>
                    <CountUp
                      start={item.start}
                      end={item.end}
                      duration={25.75}
                      separator="."
                      suffix={item.suffix}
                    >
                    </CountUp>
                  </h2>
                  <h3 className="text-white text-[18px] font-semibold">{item.counterHeading}</h3>
                </div>
              </div>
            </div>))}
        </div>
      </div>

    </Section>
  )
}

