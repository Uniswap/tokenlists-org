import React, { useState } from 'react'
import styled from 'styled-components'
// import './App.css'

const Chain = styled.span`
  display: grid;
  grid-template-columns: auto 16px;
  grid-gap: 0.5rem;
  height: fit-content;
  align-items: center;
  @media screen and (max-width: 960px) {
    display: none;
  }
`

const data = [
  { name: 'Arrakis Hook', Type: 'Before Swap', Fee: 'Dynamic', Ownership: 'Renounced', Details: 'Link' },
  { name: 'BlackRock Hook', Type: 'Before Swap', Fee: '1 bp', Ownership: 'blackrock.eth' },
  { name: 'JP Morgan Hook', Type: 'After Swap', Fee: '1 bp', Ownership: 'jpm.eth' },
  { name: 'Froggy Friends Hook', Type: 'Before Add Liquidity', Fee: '1 bp', Ownership: 'frog.eth' },
  // Add more options as necessary
]
function App() {
  const [checkedCount, setCheckedCount] = useState(0)
  const [selectedTypes, setSelectedTypes] = useState({})
  const handleCheck = (type, isChecked) => {
    if (isChecked) {
      setCheckedCount((prev) => prev + 1)
      setSelectedTypes((prev) => ({ ...prev, [type]: true }))
    } else {
      setCheckedCount((prev) => prev - 1)
      setSelectedTypes((prev) => {
        const newSelected = { ...prev }
        delete newSelected[type]
        return newSelected
      })
    }
  }
  return (
    <div className="App">
      <h1>My Website</h1>
      <h2>Select Your Options:</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Chain</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((option, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  disabled={selectedTypes[option.type]}
                  onChange={(e) => handleCheck(option.type, e.target.checked)}
                />
              </td>
              <td>{option.name}</td>
              <td>{option.chain}</td>
              <td>{option.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Checked boxes: {checkedCount}</p>
        <p>:shopping_trolley:</p>
      </div>
    </div>
  )
}

export default App
