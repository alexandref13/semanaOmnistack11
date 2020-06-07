import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncidents() {

  const ongId = localStorage.getItem('ongId')

  const history = useHistory()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  async function handleNewIncident(e) {
    e.preventDefault()

    const data = {
      title, 
      description,
      value
    }
    try{
      await api.post('incidents', data ,{
        headers:{
          Authorization: ongId
        }
      })

      history.push('/profile')
    }catch(err){
      alert('Erro ao cadastrar caso, tente novamente.')
    }
  }

  return (
    <div className="new-incident-container">
        <div className="content">
            <section>

            <img src={logoImg} alt='Be the Hero' />

            <h1>Cadatrar novo caso</h1>            
            <p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>

            <Link className='back-link' to="/profile">
            <FiArrowLeft size={16} color='#e02041' />
            Voltar para home</Link>

            </section>

            <form onSubmit={handleNewIncident}>

            <input 
              placeholder='Titulo do caso'
              value={title}
              onChange={e => setTitle(e.target.value)}
              />
            <textarea 
              placeholder='Descrição' 
              value={description}
              onChange={e => setDescription(e.target.value)}
              />
            <input 
              placeholder='Valor em reais'
              value={value}
              onChange={e => setValue(e.target.value)}
              />

            <button className="button" type='submit'>
                Cadastrar
            </button>

            </form>

        </div>
    </div>
  );
}