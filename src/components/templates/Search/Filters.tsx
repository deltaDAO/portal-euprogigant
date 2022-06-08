import React, { ReactElement, useState } from 'react'
import { useNavigate } from '@reach/router'
import classNames from 'classnames/bind'
import { addExistingParamsToUrl } from './utils'
import Button from '../../atoms/Button'
import styles from './Filters.module.css'
import {
  FilterByAccessOptions,
  FilterByTypeOptions,
  FilterOptions,
  Filters
} from '../../../models/SortAndFilters'

const cx = classNames.bind(styles)

const clearFilters = [{ display: 'Clear', value: '' }]

const serviceFilterItems = [
  { display: 'data sets', value: FilterByTypeOptions.Data },
  { display: 'algorithms', value: FilterByTypeOptions.Algorithm }
]

const accessFilterItems = [
  { display: 'download ', value: FilterByAccessOptions.Download },
  { display: 'compute ', value: FilterByAccessOptions.Compute }
]

export default function FilterPrice({
  setServiceType,
  setAccessType,
  addFiltersToUrl,
  className
}: {
  addFiltersToUrl?: boolean
  className?: string
  setAccessType?: (accessType: FilterByAccessOptions) => void
  setServiceType?: (serviceType: FilterByTypeOptions) => void
}): ReactElement {
  const queryParams = new URLSearchParams(window.location.search)
  const initialServiceFilter = queryParams.get(FilterOptions.ServiceType)
  const initialAccessFilter = queryParams.get(FilterOptions.AccessType)

  const navigate = useNavigate()
  const [serviceSelection, setServiceSelection] =
    useState<string>(initialServiceFilter)
  const [accessSelection, setAccessSelection] =
    useState<string>(initialAccessFilter)

  async function applyFilter(filter: Filters, filterType: FilterOptions) {
    if (addFiltersToUrl) {
      let urlLocation = ''
      if (filterType.localeCompare(FilterOptions.AccessType) === 0) {
        urlLocation = await addExistingParamsToUrl(location, [
          FilterOptions.AccessType
        ])
      } else {
        urlLocation = await addExistingParamsToUrl(location, [
          FilterOptions.ServiceType
        ])
      }

      if (filter && urlLocation.indexOf(filterType) === -1) {
        filterType === FilterOptions.AccessType
          ? (urlLocation = `${urlLocation}&accessType=${filter}`)
          : (urlLocation = `${urlLocation}&serviceType=${filter}`)
      }

      navigate(urlLocation)
    }
  }

  async function handleSelectedFilter(
    isSelected: boolean,
    value: Filters,
    filterType: FilterOptions
  ) {
    const updatedValue = isSelected ? undefined : value
    await applyFilter(updatedValue, filterType)

    if (filterType === FilterOptions.AccessType) {
      setAccessSelection(updatedValue)
      setAccessType(updatedValue as FilterByAccessOptions)
    } else {
      setServiceSelection(updatedValue)
      setServiceType(updatedValue as FilterByTypeOptions)
    }
  }

  async function applyClearFilter(addFiltersToUrl: boolean) {
    setAccessSelection(undefined)
    setServiceSelection(undefined)
    setAccessType(undefined)
    setServiceType(undefined)
    if (addFiltersToUrl) {
      let urlLocation = await addExistingParamsToUrl(location, [
        FilterOptions.AccessType,
        FilterOptions.ServiceType
      ])
      urlLocation = `${urlLocation}`
      navigate(urlLocation)
    }
  }

  const styleClasses = cx({
    filterList: true,
    [className]: className
  })

  return (
    <div className={styleClasses}>
      {serviceFilterItems.map((e, index) => {
        const isServiceSelected = e.value === serviceSelection
        const selectFilter = cx({
          [styles.selected]: isServiceSelected,
          [styles.filter]: true
        })
        return (
          <Button
            size="small"
            style="text"
            key={index}
            className={selectFilter}
            onClick={async () => {
              handleSelectedFilter(
                isServiceSelected,
                e.value,
                FilterOptions.ServiceType
              )
            }}
          >
            {e.display}
          </Button>
        )
      })}
      <div className={styles.separator} />
      {accessFilterItems.map((e, index) => {
        const isAccessSelected = e.value === accessSelection
        const selectFilter = cx({
          [styles.selected]: isAccessSelected,
          [styles.filter]: true
        })
        return (
          <Button
            size="small"
            style="text"
            key={index}
            className={selectFilter}
            onClick={async () => {
              handleSelectedFilter(
                isAccessSelected,
                e.value,
                FilterOptions.AccessType
              )
            }}
          >
            {e.display}
          </Button>
        )
      })}
      {clearFilters.map((e, index) => {
        const showClear = accessSelection || serviceSelection
        return (
          <Button
            size="small"
            style="text"
            key={index}
            className={showClear ? styles.showClear : styles.hideClear}
            onClick={async () => {
              applyClearFilter(addFiltersToUrl)
            }}
          >
            {e.display}
          </Button>
        )
      })}
    </div>
  )
}
