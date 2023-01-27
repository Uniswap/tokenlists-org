import React, { useState, memo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import Search from './search'
import CopyHelper from './copy'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import { lookUpchain, lookupScanner } from '../utils/getChainId'

import { toChecksumAddress, isValidAddress} from 'ethereumjs-util'
import FilterResults from 'react-filter-search'
import { ChangeType, getTokenChange, getTokenListDisplayName, updateList } from '../utils/tokenListUpdater'
import { useStyles } from '..'

const TokenItem = styled.section`
  display: grid;
  max-width: 960px;
  grid-gap: 1rem;
  grid-template-columns: 1fr 100px 100px 70px 148px 60px;
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

export const ListItem = memo(function ListItem({ token, onEditToken, onRemoveToken, isEditState, isEditedToken }) {
  const classes = useStyles()
  const scanner = lookupScanner(token.chainId)
  const tokenAddress = toChecksumAddress(token.address)
  const scannerUrl = scanner === '' ? '' : scanner + tokenAddress
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
      {
        isEditState && !isEditedToken && (
          <div style={{display: 'flex'}}>
            <IconButton style={{ display: 'flex', alignItems: 'center', marginLeft: '12px' }} size="small" onClick={onEditToken}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton style={{ display: 'flex', alignItems: 'center', marginLeft: '12px' }} size="small" onClick={onRemoveToken}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        )
      }
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
  grid-template-columns: 1fr 100px 100px 70px 148px 60px;
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
}

const ListHeader = styled.div`
  display: flex;
  align-items: baseline;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    margin-bottom: 2rem;
  }
`

const Required = styled.div`
  &:after {
    font-weight: bold;
    color: red;
    content: ' *';
  }
`

function EditModal({ token, open, handleClose, addToTokenChangesMap, tokenList, addingNewToken = true}) {
  const [editedToken, setEditedToken] = useState(null)
  const [showRequiredMessage, setShowRequiredMessage] = useState(false)
  const addressIsValid = isValidAddress(editedToken?.address)
  const metRequirements = addressIsValid && editedToken?.address && editedToken?.chainId && editedToken?.symbol && editedToken?.name && editedToken?.decimals

  useEffect(() => {
    if (!!token) {
      setEditedToken(token)
    } else {
      // default token decimals is 18
      setEditedToken({decimals: 18})
    }
  }, [token])

  const updateFunction = useCallback(
    (field) => (e) => {
      const newValue = e?.target?.value
      if (newValue !== null && newValue !== undefined) {
        setEditedToken((prev) => {
          const newToken = { ...prev }
          newToken[field] = newValue || undefined
          return newToken
        })
      }
    },
    []
  )

  const tokenListDisplayName = getTokenListDisplayName(tokenList)

  // TODO: save state and submit token here
  const addTokenSubmit = async () => {
    if (!metRequirements) {
      setShowRequiredMessage(true)
    } else {
      addingNewToken ? addToTokenChangesMap(editedToken, ChangeType.ADD) : addToTokenChangesMap( editedToken, ChangeType.EDIT)  
      handleClose()
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton style={{ display: 'flex', alignItems: 'center' }} size="small" onClick={handleClose}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2>{!!token ? 'Edit Token' : 'Add Token'}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <img style={{ width: '100px', height: '100px' }} src={editedToken?.logoURI} alt="icon" />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <TextField
              id="outlined-address-input"
              label={<Required>Address</Required>}
              type="address"
              value={editedToken?.address}
              onInput={!token ? updateFunction('address') : undefined}
              disabled={!!token}
            />
            <TextField
              id="chain-id-input"
              label={<Required>Chain Id</Required>}
              type="number"
              onChange={!token ? updateFunction('chainId') : undefined}
              disabled={!!token}
              value={editedToken?.chainId}
            />
          </div>
        </div>
        <TextField
          id="logo-uri-input"
          label="Logo URI"
          type="logo-uri"
          value={editedToken?.logoURI}
          onInput={updateFunction('logoURI')}
        />
        <TextField
          id="outlined-name-input"
          label={<Required>Name</Required>}
          type="name"
          value={editedToken?.name}
          onChange={updateFunction('name')}
        />

        <TextField
          id="outlined-number"
          label={<Required>Symbol</Required>}
          type="symbol"
          onInput={updateFunction('symbol')}
          value={editedToken?.symbol}
        />
        <TextField
          id="outlined-number"
          label={<Required>Decimals</Required>}
          type="number"
          onInput={updateFunction('decimals')}
          value={editedToken?.decimals}
        />
        <TextField
          style={{ marginTop: '12px'}}
          id="readonly-token-list"
          label="Token List"
          defaultValue={tokenListDisplayName}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <div
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '12px' }}
          onClick={() => !metRequirements && setShowRequiredMessage(true)}
        >
          {showRequiredMessage && !metRequirements && 
          <div style={{ color: 'red', margin: '8px 0px'}}>{ addressIsValid ? 'ChainId and address are required' : 'Token address must be valid'}</div>
          }
          <Button variant="outlined" onClick={async () => {await addTokenSubmit()}} disabled={!metRequirements}>
            Submit
          </Button>
        </div>
        <br></br>
        {!!editedToken && 
        <div style={{ wordWrap: "break-word"}}>
          {JSON.stringify(editedToken, null, 4)}
          </div>
        }
      </Box>
    </Modal>
  )
}

export default function Tokens({ tokens, tokenList }) {
  const [addingNewToken, setAddingNewToken] = useState(false)
  const [removedTokensMap, setRemovedTokensMap] = useState(new Map())
  const [addedTokensMap, setAddedTokensMap] = useState(new Map())
  const [editedTokensMap, setEditedTokensMap] = useState(new Map())
  const [editToken, setEditToken] = useState(null)
  const [isEditState, setIsEditState] = useState(false)
  const handleOpen = () => setAddingNewToken(true)
  const handleClose = () => {
    setAddingNewToken(false)
    setEditToken(null)
  }

  const addToTokenChangesMap = (token, changeType) => {
    const tokenChange = getTokenChange(changeType, token)
    if (changeType === ChangeType.ADD) {
      console.log('ADD TO TOKEN CHANGES MAP TYPE', changeType)
      console.log('ADD TO TOKEN CHANGES MAP TOKEN', token)
      setAddedTokensMap(new Map([...addedTokensMap, [tokenChange.tokenChangeKey, tokenChange.tokenChangeValue]]))
    }
    if (changeType === ChangeType.EDIT) {
      setEditedTokensMap(new Map([...editedTokensMap, [tokenChange.tokenChangeKey, tokenChange.tokenChangeValue]]))
    }
    if (changeType === ChangeType.REMOVE) {
      setRemovedTokensMap(new Map([...removedTokensMap, [tokenChange.tokenChangeKey, tokenChange.tokenChangeValue]]))
    }
  }

  const [value, setValue] = useState('')
  const sortedTokens = tokens.sort((a, b) => {
    return a.symbol > b.symbol ? 1 : a.symbol < b.symbol ? -1 : 0
  })

  function handleChange(e) {
    const { value } = e.target
    setValue(value)
  }

  const onSubmitTokenChanges = () => {
    updateList(tokenList, new Map([...addedTokensMap, ...removedTokensMap, ...editedTokensMap]))
    addedTokensMap.clear()
    removedTokensMap.clear()
    editedTokensMap.clear()
    setIsEditState(false)
  }

  const onCancelTokenChanges = () => {
    addedTokensMap.clear()
    removedTokensMap.clear()
    editedTokensMap.clear()
    console.log('added tokens map', addedTokensMap)
    console.log('removed tokens map', removedTokensMap)
    console.log('edited tokens map', editedTokensMap)
    setIsEditState(false)
  }

  const shouldDisplayEditModal = Boolean(!!editToken || addingNewToken)

  return (
    <ListWrapper>
      <ListHeader className="flex-between" style>
        <Title>List Tokens</Title>
        <div style={{ display: 'flex'}}>
          { !isEditState ?
          <Button variant="outlined" onClick={() => setIsEditState(true)} style={{ margin: '0px 12px'}}>Edit</Button>
          : 
          (
            <div> 
              <Button variant="contained" onClick={onCancelTokenChanges} style={{ margin: '0px 12px'}}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={onSubmitTokenChanges} style={{ margin: '0px 12px'}}>Submit</Button>
            </div>
          )
          }
          <Search handleChange={handleChange} value={value} setValue={setValue} />
        </div>
        <EditModal open={shouldDisplayEditModal} token={editToken} handleClose={handleClose} 
        addToTokenChangesMap={addToTokenChangesMap} tokenList={tokenList} addingNewToken={addingNewToken}
        />
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
          renderResults={(results) => {
            let changelistTokens = []
            let regularTokens = []
            results.forEach(
              (data) => {
                const tokenKey = data.chainId + '_' + data.address

                if (removedTokensMap.has(tokenKey)) {
                  const listItem = <ListItem
                  isEditedToken={true}
                isEditState={isEditState}
                onRemoveToken={() => addToTokenChangesMap(data, ChangeType.REMOVE)}
                onEditToken={() => setEditToken(data)} key={tokenKey} token={data} />
                  changelistTokens.push(<div key={tokenKey} style={{ backgroundColor: "#FF8080", borderRadius: "8px", padding: "4px", margin: "8px 0px", width: "100%"}}>{listItem}</div>)
                }
                else if (editedTokensMap.has(tokenKey)) {
                  const editedListItem =  <ListItem
                  isEditedToken={true}
                  isEditState={isEditState}
                  onRemoveToken={() => addToTokenChangesMap(data, ChangeType.REMOVE)}
                  onEditToken={() => setEditToken(data)} key={tokenKey} token={editedTokensMap.get(tokenKey).newTokenInfo} />
                  changelistTokens.push(<div key={tokenKey} style={{ backgroundColor: "#FAFA72", borderRadius: "8px", padding: "4px", margin: "8px 0px", width: "100%"}}>{editedListItem}</div>)
                } else {
                  const listItem = <ListItem
                  isEditedToken={false}
                isEditState={isEditState}
                onRemoveToken={() => addToTokenChangesMap(data, ChangeType.REMOVE)}
                onEditToken={() => setEditToken(data)} key={tokenKey} token={data} />
                  regularTokens.push(listItem)
                }
              })
            Array.from(addedTokensMap.keys()).forEach((tokenKey) => {
              const token = addedTokensMap.get(tokenKey).newTokenInfo
              const listItem = <ListItem
              isEditedToken={true}
                isEditState={isEditState}
                onRemoveToken={() => addToTokenChangesMap(token, ChangeType.REMOVE)}
                onEditToken={() => setEditToken(token)} key={tokenKey} token={token} />
              changelistTokens.unshift(<div key={tokenKey} style={{ backgroundColor: "#C0FFA1", borderRadius: "8px", padding: "4px", margin: "8px 0px", width: "100%"}}>{listItem}</div>)
            })
            const resultListItems =  [...changelistTokens, ...regularTokens]
            if (isEditState) {
              resultListItems.unshift(<Button variant="outlined" onClick={handleOpen} 
              key="add-token-button"
              style={{ marginBottom: '16px', display: 'flex'}}> + Add Token</Button>)
            }
            return results.length === 0
              ? 'None found!'
              : resultListItems
          }
          }
        />
      </TokenWrapper>
    </ListWrapper>
  )
}
