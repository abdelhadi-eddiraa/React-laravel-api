import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:8000/api/v1/';

const SkillContext = createContext();

export const SkillProvider = ({ children }) => {
const initForms={
    name: '',
    slug: ''
  }
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initForms);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getSkills = async () => {
    try {
      const response = await axios.get('skills');
      setSkills(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSkill = async (id) => {
    try {
      const response = await axios.get(`skills/${id}`);
      const apiSkill=response.data.data
      setSkill(apiSkill);
      setFormValues({
        name:apiSkill.SkillName,
        slug:apiSkill.url
      })
    } catch (error) {
      console.error(error);
    }
  };

  const createSkill = async (e) => {
    e.preventDefault();
    try {
      await axios.post('skills', formValues);
    
      setFormValues(initForms)
      navigate('/skills');
    } catch (error) {
      
      setErrors(error.response.data.errors);
    }
  };

  const editSkill=async(e)=>{
    e.preventDefault();
    try {
        await axios.put('skills/' + skill.id, formValues);
        setFormValues(initForms)

        navigate('/skills');
      } catch (error) {
        
        setErrors(error.response.data.errors);
      }

  }

  const deleteSkill=async(id)=>{
    await axios.delete('skills/' + id);
    getSkills()
    navigate('/skills');
  }

  return (
    <SkillContext.Provider
      value={{
        getSkill,
        getSkills,
        onChange,
        formValues,
        setFormValues,
        skills,
        skill,
        createSkill,
        errors,
        setErrors,
        editSkill,
        deleteSkill
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};

export default SkillContext;
