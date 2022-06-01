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
  serviceType,
  accessType,
  setServiceType,
  setAccessType,
  addFiltersToUrl,
  className
}: {
  serviceType: string
  accessType: string
  setServiceType: React.Dispatch<React.SetStateAction<string>>
  setAccessType: React.Dispatch<React.SetStateAction<string>>
  addFiltersToUrl?: boolean
  className?: string
}): ReactElement {
  const queryParams = new URLSearchParams(window.location.search)
  const initialServiceFilter = queryParams.get(FilterOptions.ServiceType)
  const initialAccessFilter = queryParams.get(FilterOptions.AccessType)

  const navigate = useNavigate()
  const [serviceSelections, setServiceSelections] = useState<string[]>([
    initialServiceFilter
  ])
  const [accessSelections, setAccessSelections] = useState<string[]>([
    initialAccessFilter
  ])

  async function applyFilter(filter: Filters, filterType: FilterOptions) {
    filterType === FilterOptions.AccessType
      ? setAccessType(filter)
      : setServiceType(filter)
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

      if (filter && location.search.indexOf(filterType) === -1) {
        filterType === FilterOptions.AccessType
          ? (urlLocation = `${urlLocation}&accessType=${filter}`)
          : (urlLocation = `${urlLocation}&serviceType=${filter}`)
      }

      navigate(urlLocation)
    }
  }

  async function handleSelectedFilter(isSelected: boolean, value: Filters) {
    if (
      value === FilterByAccessOptions.Download ||
      value === FilterByAccessOptions.Compute
    ) {
      if (isSelected) {
        if (accessSelections.length > 1) {
          // both selected -> select the other one
          const otherValue = accessFilterItems.find(
            (p) => p.value !== value
          ).value
          await applyFilter(otherValue, FilterOptions.AccessType)
          setAccessSelections([otherValue])
        } else {
          // only the current one selected -> deselect it
          await applyFilter(undefined, FilterOptions.AccessType)
          setAccessSelections([])
        }
      } else {
        if (accessSelections.length && accessSelections[0]) {
          // one already selected -> both selected
          await applyFilter(undefined, FilterOptions.AccessType)
          setAccessSelections(accessFilterItems.map((p) => p.value))
        } else {
          // none selected -> select
          await applyFilter(value, FilterOptions.AccessType)
          setAccessSelections([value])
        }
      }
    } else {
      if (isSelected) {
        if (serviceSelections.length > 1) {
          const otherValue = serviceFilterItems.find(
            (p) => p.value !== value
          ).value
          await applyFilter(otherValue, FilterOptions.ServiceType)
          setServiceSelections([otherValue])
        } else {
          await applyFilter(undefined, FilterOptions.ServiceType)
          setServiceSelections([])
        }
      } else {
        if (serviceSelections.length && serviceSelections[0]) {
          await applyFilter(undefined, FilterOptions.ServiceType)
          setServiceSelections(serviceFilterItems.map((p) => p.value))
        } else {
          await applyFilter(value, FilterOptions.ServiceType)
          setServiceSelections([value])
        }
      }
    }
  }

  async function applyClearFilter(addFiltersToUrl: boolean) {
    setServiceSelections([])
    setAccessSelections([])
    setServiceType(undefined)
    setAccessType(undefined)
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
        const isServiceSelected =
          e.value === serviceType || serviceSelections.includes(e.value)
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
              handleSelectedFilter(isServiceSelected, e.value)
            }}
          >
            {e.display}
          </Button>
        )
      })}
      <div className={styles.separator} />
      {accessFilterItems.map((e, index) => {
        const isAccessSelected =
          e.value === accessType || accessSelections.includes(e.value)
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
              handleSelectedFilter(isAccessSelected, e.value)
            }}
          >
            {e.display}
          </Button>
        )
      })}
      {clearFilters.map((e, index) => {
        const showClear =
          accessSelections.length > 0 || serviceSelections.length > 0
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
