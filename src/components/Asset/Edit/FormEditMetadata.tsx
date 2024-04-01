import { ReactElement, useEffect } from 'react'
import { Field, Form, useFormikContext } from 'formik'
import Input from '@shared/FormInput'
import FormActions from './FormActions'
import { useAsset } from '@context/Asset'
import { FormPublishData } from '@components/Publish/_types'
import { getFileInfo } from '@utils/provider'
import { getFieldContent } from '@utils/form'
import { isGoogleUrl } from '@utils/url'
import { MetadataEditForm } from './_types'
import consumerParametersContent from '../../../../content/publish/consumerParameters.json'
import { GaiaXInformation2210 } from 'src/@types/gaia-x/2210/GXInformation'
import styles from './FormEditMetadata.module.css'

export function checkIfTimeoutInPredefinedValues(
  timeout: string,
  timeoutOptions: string[]
): boolean {
  if (timeoutOptions.indexOf(timeout) > -1) {
    return true
  }
  return false
}

export default function FormEditMetadata({
  data,
  showPrice,
  isComputeDataset
}: {
  data: FormFieldContent[]
  showPrice: boolean
  isComputeDataset: boolean
}): ReactElement {
  const { asset } = useAsset()
  const { values, setFieldValue } = useFormikContext<
    FormPublishData & { gaiaXInformation: GaiaXInformation2210 }
  >()

  // This component is handled by Formik so it's not rendered like a "normal" react component,
  // so handleTimeoutCustomOption is called only once.
  // https://github.com/oceanprotocol/market/pull/324#discussion_r561132310
  // if (data && values) handleTimeoutCustomOption(data, values)

  const timeoutOptionsArray = data.filter(
    (field) => field.name === 'timeout'
  )[0].options as string[]

  if (isComputeDataset && timeoutOptionsArray.includes('Forever')) {
    const foreverOptionIndex = timeoutOptionsArray.indexOf('Forever')
    timeoutOptionsArray.splice(foreverOptionIndex, 1)
  } else if (!isComputeDataset && !timeoutOptionsArray.includes('Forever')) {
    timeoutOptionsArray.push('Forever')
  }

  useEffect(() => {
    const providerUrl = values?.services
      ? values?.services[0].providerUrl.url
      : asset.services[0].serviceEndpoint

    // if we have a sample file, we need to get the files' info before setting defaults links value
    asset?.metadata?.links?.[0] &&
      getFileInfo(asset.metadata.links[0], providerUrl, 'url').then(
        (checkedFile) => {
          // set valid false if url is using google drive
          if (isGoogleUrl(asset.metadata.links[0])) {
            setFieldValue('links', [
              {
                url: asset.metadata.links[0],
                valid: false
              }
            ])
            return
          }
          // initiate link with values from asset metadata
          setFieldValue('links', [
            {
              url: asset.metadata.links[0],
              type: 'url',
              ...checkedFile[0]
            }
          ])
        }
      )
  }, [])

  return (
    <Form>
      <Field {...getFieldContent('name', data)} component={Input} name="name" />

      <Field
        {...getFieldContent('description', data)}
        component={Input}
        name="description"
      />

      {showPrice && (
        <Field
          {...getFieldContent('price', data)}
          component={Input}
          name="price"
        />
      )}

      <Field
        {...getFieldContent('files', data)}
        component={Input}
        name="files"
      />

      <Field
        {...getFieldContent('links', data)}
        component={Input}
        name="links"
      />

      <Field
        {...getFieldContent('timeout', data)}
        component={Input}
        name="timeout"
      />

      <Field {...getFieldContent('tags', data)} component={Input} name="tags" />

      {asset.metadata.type === 'algorithm' && (
        <>
          <Field
            {...getFieldContent('usesConsumerParameters', data)}
            component={Input}
            name="usesConsumerParameters"
          />
          {(values as unknown as MetadataEditForm).usesConsumerParameters && (
            <Field
              {...getFieldContent(
                'consumerParameters',
                consumerParametersContent.consumerParameters.fields
              )}
              component={Input}
              name="consumerParameters"
            />
          )}
        </>
      )}
      <Field
        {...getFieldContent('allow', data)}
        component={Input}
        name="allow"
      />
      <Field {...getFieldContent('deny', data)} component={Input} name="deny" />
      <Field
        {...getFieldContent('paymentCollector', data)}
        component={Input}
        name="paymentCollector"
      />
      <Field
        {...getFieldContent('assetState', data)}
        component={Input}
        name="assetState"
      />
      <div className={styles.serviceContainer}>
        <h4>Service</h4>

        <Field
          {...getFieldContent('usesServiceConsumerParameters', data)}
          component={Input}
          name="service.usesConsumerParameters"
        />
        {(values as unknown as MetadataEditForm).service
          .usesConsumerParameters && (
          <Field
            {...getFieldContent(
              'consumerParameters',
              consumerParametersContent.consumerParameters.fields
            )}
            component={Input}
            name="service.consumerParameters"
          />
        )}
      </div>
      <Field
        {...getFieldContent('serviceCredential', data)}
        component={Input}
        name="gaiaXInformation.serviceSD"
      />
      <Field
        {...getFieldContent('accessTermsAndConditions', data)}
        component={Input}
        name="gaiaXInformation.termsAndConditions"
      />
      <Field
        {...getFieldContent('license', data)}
        component={Input}
        name="license"
      />
      {asset.metadata.type === 'dataset' && (
        <>
          <Field
            {...getFieldContent('containsPII', data)}
            component={Input}
            name="gaiaXInformation.containsPII"
          />
          {values.gaiaXInformation.containsPII === true && (
            <div className={styles.gdpr}>
              <Field
                {...getFieldContent('dataController', data)}
                component={Input}
                name="gaiaXInformation.PIIInformation.legitimateProcessing.dataController"
              />

              <Field
                {...getFieldContent('legalBasis', data)}
                component={Input}
                name="gaiaXInformation.PIIInformation.legitimateProcessing.legalBasis"
              />

              <Field
                {...getFieldContent('purpose', data)}
                component={Input}
                name="gaiaXInformation.PIIInformation.legitimateProcessing.purpose"
              />

              <Field
                {...getFieldContent('dataProtectionContactPoint', data)}
                component={Input}
                name="gaiaXInformation.PIIInformation.legitimateProcessing.dataProtectionContactPoint"
              />

              <Field
                {...getFieldContent('consentWithdrawalContactPoint', data)}
                component={Input}
                name="gaiaXInformation.PIIInformation.legitimateProcessing.consentWithdrawalContactPoint"
              />
            </div>
          )}
        </>
      )}
      <FormActions />
    </Form>
  )
}
