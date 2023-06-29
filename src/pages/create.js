import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/header'

import hooksList from '../hooks.json'
import '../index.css'

const Content = styled.div`
`


const Hook = ({ hook, onChange, checked, disabled }) => {
  return (
    <tr>
      <td>        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
        disabled={disabled}
        /></td>
      <td>{hook.name}</td>
      <td>{hook.Fee}</td>
      <td>{hook.Type}</td>
      <td>{hook.Ownership}</td>
    </tr>
  )
}

const HookList = () => {
  const [selected, setSelected] = useState([])

  return (
    <>
    <table>
<tr>
      <th></th>
      <th>Name</th>
      <th>Fee</th>
      <th>Type</th>
      <th>Ownership</th>
    </tr>

    {
      Object.keys(hooksList).map((hookName) => {
        const hook = hooksList[hookName]
        const checked = selected.includes(hookName)
        const disabled = selected.some(name => name !== hookName && hooksList[name].Type === hook.Type)
        return (
          <Hook hook={hook} checked={checked} disabled={disabled} onChange={() => {
            if (checked) {
              setSelected(selected.filter(name => name !== hookName))
            } else {
              setSelected([...selected, hookName])
            }
          }}/>
        )
        })
    }
    </table>
      Count: {selected.length}
    </>
  )
}

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="app">
      <Header />
      <Content>
        <HookList/>
      </Content>
    </div>
  )
}

export default Home
