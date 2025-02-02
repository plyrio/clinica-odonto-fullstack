'use client'
import React from 'react'
import Section from '../layout/Section'
import CountUp from 'react-countup';

export default function About() {
  return (
    <Section className='bg-banner w-screen px-0 md:container bg-cover bg-center bg-no-repeat text-white'>
      <CountUp
        start={-875.039}
        end={160527.012}
        duration={2.75}
        separator=" "
        decimals={4}
        decimal=","
        prefix="EUR "
        suffix=" left"
        onEnd={() => console.log('Ended! 👏')}
        onStart={() => console.log('Started! 💨')}
      >
        {({ countUpRef, start }) => (
          <div>
            <span ref={countUpRef} />
            <button onClick={start}>Start</button>
          </div>
        )}

      </CountUp>
    </Section>
  )
}

