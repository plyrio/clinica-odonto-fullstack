import ButtonDefault from "@/components/utils/ButtonDefault";

export default function BtnMenu () {
  return (
      <div className='md:flex sm:gap-4'>
          <ButtonDefault
              href='#'
              text='Entrar'
              className='rounded-md px-5 py-2.5 text-sm font-medium shadow-sm'
          />

          <div className='hidden md:flex'>
              {' '}
              <ButtonDefault
                  href='#'
                  variant='white-blue'
                  text='Registrar'
                  className='rounded-md px-5 py-2.5 text-sm font-medium shadow-sm bg-gray-100'
              />
          </div>
      </div>
  )
}