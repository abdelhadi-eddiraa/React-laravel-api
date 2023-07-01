import React,{useContext,useEffect} from 'react'
import SkillContext from '../context/SkillContext'
import { useParams } from 'react-router-dom'
const SkillEdit = () => {
  const {onChange,formValues,skill,editSkill,getSkill,errors,setErrors}=useContext(SkillContext)
 let {id}=useParams()
  useEffect(()=>{
    getSkill(id)
    setErrors({})
  },[])

  return (
    <div className='m-12'>
    <form onSubmit={editSkill} className='max-w-2xl mx-auto p-4 bg-white shadow-md rounded-sm'>
       <div className='space-y-6'>
           <div className='mb-4'>
               <label htmlFor='name' className='block mb-2 text-sm font-medium'>Name</label>
               <input name='name' defaultValue={formValues['name']} onChange={onChange} className='border border-gray-300 text-sm rounded-md block w-full p-2'/>
               {errors.name && <span className='text-sm text-red-400'>{errors.name[0]}</span>}

           </div>


           <div className='mb-4'>
               <label htmlFor='slug' className='block mb-2 text-sm font-medium'>Slug</label>
               <input  name='slug' defaultValue={formValues['slug']} onChange={onChange} className='border border-gray-300 text-sm rounded-md block w-full p-2'/>
               {errors.slug && <span className='text-sm text-red-400'>{errors.slug[0]}</span>}

           </div>
       </div>
       <div className='my-4'>
        <button type='submit' className='px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md'>
          Edit
        </button>

       </div>
    </form>
  </div>
  )
}

export default SkillEdit