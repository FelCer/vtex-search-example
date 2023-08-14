import React, { useEffect } from 'react'

import {
  useSearchPageState,
  useSearchPage,
  useSearchPageStateDispatch,
} from 'vtex.search-page-context/SearchPageContext'

import { Button } from 'vtex.styleguide'

import { useQuery } from 'react-apollo'

import PRODUCT_DATA from '../graphql/getProduct.graphql'

import { searchContextProps } from '../interfaces/index'

const SearchContext = ({ productId }: searchContextProps) => {
  const searchPageState = useSearchPageState()
  const searchPage = useSearchPage()
  const { selectedFacets } = useSearchPage()
  const dispatch = useSearchPageStateDispatch()

  const { loading, data } = useQuery(PRODUCT_DATA, {
    variables: {
      productId
    },
  })

  const handleSwitchGallery = () => {
    dispatch({
      type: 'SWITCH_GALLERY_LAYOUT',
      args: { selectedGalleryLayout: (searchPageState?.selectedGalleryLayout === 'grid' ? 'list' : 'grid') },
    })
  }

  useEffect(() => {
    if (loading) return

    console.log('dataa', data)
  }, [loading, data])

  console.log('searchPageState', searchPageState)
  console.log('searchPage', searchPage)

  return (
    <div>
      <div style={{ color: 'white' }}>
        {selectedFacets.length > 0 ? (
          <>
            <h1 className=" w-100 tc blue">Brand</h1>
            <h2>{data?.product.productName}</h2>
            <h3>{data?.product.brand}</h3>
          </>
        ) : (
          ''
        )}
        <p>Exist selected facets</p>
      </div>
      <Button
        variation="primary"
        onClick={() => handleSwitchGallery()}
      >
        Change mode
      </Button>
    </div>
  )
}

SearchContext.defaultProps = {
  productId: '5'
}

SearchContext.schema = {
  title: "Search Context Example",
  type: "object",
  properties: {
    productId: {
      type: "string",
      title: "Product identifier",
      default: "5",
    },
  }
}

export default SearchContext