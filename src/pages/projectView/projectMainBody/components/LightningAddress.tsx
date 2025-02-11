import { Button, ButtonProps, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BoltIcon } from '../../../../components/icons'
import { Body1 } from '../../../../components/typography'
import {
  nostrColorsLight,
  primaryColorsLight,
  secondaryColors,
} from '../../../../styles'
import { copyTextToClipboard } from '../../../../utils'

interface ILightningQR extends ButtonProps {
  name: string
  isGeyser?: boolean
}

export const LightningAddress = ({ name, isGeyser, ...rest }: ILightningQR) => {
  const { t } = useTranslation()
  const [copy, setCopy] = useState(false)

  const handleAddressCopy = () => {
    copyTextToClipboard(name)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 2000)
  }

  return (
    <>
      <Tooltip
        label={
          copy
            ? t('Copied!')
            : t('Copy Lightning Address / Nostr identifier (NIP-05)')
        }
        placement="top"
        closeOnClick={false}
      >
        <Button
          size="sm"
          color="neutral.600"
          leftIcon={<BoltIcon height="16px" color={nostrColorsLight[400]} />}
          variant="secondary"
          onClick={handleAddressCopy}
          id="lightning-address"
          border="none"
          {...rest}
        >
          <Body1
            semiBold
            isTruncated
            background={`linear-gradient(270deg, ${
              isGeyser ? secondaryColors.blue : primaryColorsLight[500]
            } -0.1%, ${nostrColorsLight[400]} 99.9%)`}
            backgroundClip="text"
            flex={1}
          >
            {name}
          </Body1>
          {isGeyser && (
            <Body1
              semiBold
              background={`linear-gradient(270deg, ${primaryColorsLight[500]} -0.1%, ${secondaryColors.blue} 99.9%)`}
              backgroundClip="text"
            >
              @geyser.fund
            </Body1>
          )}
        </Button>
      </Tooltip>
    </>
  )
}
