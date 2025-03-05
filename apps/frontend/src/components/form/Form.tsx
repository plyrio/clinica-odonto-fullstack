'use client'
import ButtonDefault from '../utils/ButtonDefault';
import TitlesSection from '../utils/TitlesSection'
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    nomecompleto: string,
    email: string,
    telefone: string,
    data: string,
    mensagem: string
}

const Form = () => {

    const { register, handleSubmit, watch, formState: {errors} } = useForm<Inputs>({});
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  
    
    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} className='py-[100px]'>

                <TitlesSection title="Faça Um Agendamento" subtitle="Agendamento Online" titleClassName='text-white' />

                <div className="relative z-0 mb-5 group">
                    <input type="text" {...register("nomecompleto")} id="nomecompleto" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="nomecompleto" className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome Completo</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" {...register("email")} id="email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">E-mail</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="tel" pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}" {...register("telefone")} id="telefone" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="telefone" className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefone</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="date" {...register("data")} id="data" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="data" className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Calendario</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <textarea {...register("mensagem")} id="mensagem" className="block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer h-[100px]" placeholder=" " />
                    <label htmlFor="mensagem" className="peer-focus:font-medium absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sua Mensagem</label>
                </div>

                <ButtonDefault href='' variant='blue-white' text='Agendar Consulta'  className="w-full"/>
            </form>
        </>

    )
}

export default Form





