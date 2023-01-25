import React, { useState, memo } from 'react'
import styled from 'styled-components'
import Search from './search'
import CopyHelper from './copy'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { lookUpchain, lookupScanner } from '../utils/getChainId'

import { toChecksumAddress } from 'ethereumjs-util'
import FilterResults from 'react-filter-search'

const TokenItem = styled.section`
  display: grid;
  max-width: 960px;
  grid-gap: 1rem;
  grid-template-columns: 1fr 100px 120px 96px 148px;
  margin-bottom: 1rem;
  a {
    color: #131313;
  }

  @media screen and (max-width: 960px) {
    display: grid;
    max-width: 960px;
    grid-gap: 1rem;
    grid-template-columns: 24px 96px 1fr;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 360px) {
    grid-template-columns: 24px 96px 150px;
  }
`
const TokenInfo = styled.span`
  display: grid;
  grid-template-columns: 16px 1fr;
  grid-gap: 1rem;
  height: fit-content;
  align-items: center;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const TokenIcon = styled.img`
  width: 16px;
  border-radius: 32px;
  background-color: white;
  height: 16px;
`
const TokenTagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 960px) {
    display: none;
  }
`

const TokenTag = styled.div`
  font-size: 11px;
  background-color: rgb(230, 230, 230, 0.4);
  color: #858585;
  padding: 0.25rem 0.35rem;
  margin-right: 0.2rem;
  border-radius: 4px;
  height: 14px;
  width: fit-content;
`

const TokenAddress = styled.span`
  display: grid;
  grid-template-columns: auto 16px;
  grid-gap: 0.5rem;
  height: fit-content;
  align-items: center;
`

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

export const ListItem = memo(function ListItem({ token }) {
  const scanner = lookupScanner(token.chainId); 
  const tokenAddress = toChecksumAddress(token.address); 
  const scannerUrl = scanner == "" ? "" : scanner + tokenAddress; 
  return (
    <TokenItem>
      <TokenInfo>
        <TokenIcon
          className="token-icon"
          alt={`${token.name} token icon`}
          src={
            !token.logoURI
              ? `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${toChecksumAddress(
                  token.address
                )}/logo.png`
              : token.logoURI.startsWith('ipfs')
              ? `https://ipfs.io/ipfs/${token.logoURI.split('//')[1]}`
              : token.logoURI
          }
          onError={(e) => {
            e.target.className = 'replace'
            e.target.src = 'https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg'
          }}
        />

        <span className="hide-small">
          <a style={{ textAlign: 'right' }} href={scannerUrl}>
            {token.name}
          </a>
        </span>
      </TokenInfo>
      <Chain>{lookUpchain(token.chainId)}</Chain>
      <span>{token.symbol}</span>
      <TokenTagWrapper className="hide-small">
        {token?.tags?.length > 0 && (
          <>
            <TokenTag>{token.tags[0].toUpperCase()}</TokenTag>
            {token.tags.length > 1 && <TokenTag>...</TokenTag>}
          </>
        )}
      </TokenTagWrapper>
      <TokenAddress>
        <a style={{ textAlign: 'right' }} href={scannerUrl}>
          {`${tokenAddress?.slice(0, 6)}...${tokenAddress?.slice(38, 42)}`}
        </a>
        <CopyHelper toCopy={token.address} />
      </TokenAddress>
    </TokenItem>
  )
})

const Title = styled.h1`
  font-size: 48px;
  line-height: 125%;
  @media screen and (max-width: 960px) {
  }
`

const TokenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 960px;
  width: 100%;
  height: fit-content;
  min-height: 60vh;
  margin-bottom: 2rem;
`

const ListWrapper = styled.section`
  @media screen and (max-width: 414px) {
  }
`

const ListTitle = styled.div`
  font-weight: 500;
  color: #1f1f1f80;
  display: grid;
  max-width: 960px;
  grid-gap: 1rem;
  grid-template-columns: 1fr 100px 120px 96px 148px;
  margin-bottom: 1rem;
  @media screen and (max-width: 414px) {
    display: none;
  }
`

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '24px',
  p: 4,
};

const ListHeader = styled.div`
  display: flex;
  align-items: baseline;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    margin-bottom: 2rem;
  }
`

const StyledButton = styled(Button)`

`

const StyledTextField = styled.div`
  margin: 12px 0px;
`

export default function Tokens({ tokens }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [age, setAge] = useState('');

  const handleMenuSelect = (event) => {
    setAge(event.target.value);
  };

  const addTokenSubmit = () => {
    // submit token here
    setOpen(false)
  }


  const [value, setValue] = useState('')
  const sortedTokens = tokens.sort((a,b) =>{ 
    return a.symbol > b.symbol ? 1 : 
      a.symbol < b.symbol ? -1 : 0; 
  })

  function handleChange(e) {
    const { value } = e.target
    setValue(value)
  }

  return (
    <ListWrapper>
      <ListHeader className="flex-between" style>
        <Title>List Tokens</Title>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton style={{ display: 'flex', alignItems: 'center' }} size="small" onClick={() => setOpen(false)}>
                <ClearIcon fontSize='small'/>
              </IconButton>
            </div>
            <TextField
              id="outlined-name-input"
              label="Name"
              type="name"
            />
            <TextField
              id="chain-id-input"
              label="Chain ID"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-symbol"
              label="Symbol"
              type="symbol"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-number"
              label="Decimals"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-logo-uri-input"
              label="Logo URI"
              type="logo-uri"
            />
            <TextField
              id="outlined-address-input"
              label="Address"
              type="address"
            />
             <TextField
              id="chain-id-input"
              label="Chain ID"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Uniswap Labs Token List"
              onChange={handleMenuSelect}
            >
              <MenuItem value={10}>Default</MenuItem>
              <MenuItem value={20}>Extended</MenuItem>
              <MenuItem value={30}>Blocked</MenuItem>
            </Select>
            <div>
              <Button variant="outlined" onClick={addTokenSubmit}>Submit</Button>
            </div>
          </Box>
        </Modal>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={handleOpen} variant="outlined" style={{margin: "12px"}}>Add Token</Button>
          <Search handleChange={handleChange} value={value} setValue={setValue} />
        </div>
      </ListHeader>

      <TokenWrapper>
        <ListTitle>
          <p className="hide-small">Name</p>
          <p className="hide-small">Chain</p>
          <p className="hide-small">Symbol</p>
          <p className="hide-small">Tags</p>
          <p className="hide-small" style={{ textAlign: 'right' }}>
            Address
          </p>
        </ListTitle>

        <FilterResults
          value={value}
          data={sortedTokens}
          renderResults={(results) =>
            results.length === 0 ? 'None found!' : results.map((data, i) => <ListItem key={i} token={data} />)
          }
        />
      </TokenWrapper>
    </ListWrapper>
  )
}
