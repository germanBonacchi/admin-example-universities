/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader, InputSearch } from 'vtex.styleguide'

import UniversityTable from './components/UniversityList'
import LoadingSpinner from './components/LoadingSpinner'

import './styles.global.css'

const AdminExample: FC = () => {
  const [universities, setUniversities] = useState([])
  const [contry, setContry] = useState('')
  const [loading, setLoading] = useState(false)

  async function fetchUniversities(contrySubmited: string) {
    setLoading(true)
    const parsedContry = contrySubmited.replace(/\s/g, '+')
    const url = `https://demo2--gbonacchi.myvtex.com/v0/demo/universities/${parsedContry}`

    console.log(url)
    const response = await fetch(url)

    const data = await response.json()

    console.log('data', data)

    setUniversities(
      data.map((item: any, index: number) => {
        const newItem = {
          id: index,
          name: item.name,
          country: item.country,
          webPage: item.web_pages[0],
        }

        return newItem
      })
    )
  }

  useEffect(() => {
    if (universities) {
      setLoading(false)
    }
  }, [universities])

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-example.hello-world" />}
        />
      }
    >
      <PageBlock variation="full">
        <div className="mb5">
          <InputSearch
            placeholder="Pais..."
            value={contry}
            size="regular"
            onChange={(e: any) => setContry(e.target.value)}
            onSubmit={(e: any) => {
              e.preventDefault()
              console.log('submitted! search this: ', e.target.value)
              fetchUniversities(e.target.value)
            }}
          />
        </div>
        {universities.length > 0 && !loading && (
          <UniversityTable data={universities} />
        )}
        {universities.length > 0 && loading && <LoadingSpinner />}
      </PageBlock>
    </Layout>
  )
}

export default AdminExample
