import {
  Box,
  Button,
  HStack,
  IconButton,
  Link,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import {
  languageFalgs,
  LanguageRequestUrl,
  languages,
} from '../../../constants'
import { allTranslations, EnglishTranslations } from '../../../translations'
import { ColorModeSwitcher } from '../../../utils'
import { SatSymbolIcon } from '../../icons'
import { Modal } from '../../layouts'

export const ModeChange = () => {
  const { i18n, t } = useTranslation()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const renderLanguages = Object.keys(allTranslations).map((key) => {
    const EnglishLength = Object.keys(EnglishTranslations).length
    const translation = allTranslations[key as keyof typeof allTranslations]
    const LanguageLength = Object.keys(translation).length
    const languageCoveragePercentage = (LanguageLength / EnglishLength) * 100

    const language = {
      key,
      translation,
      disabled: true,
    }

    if (languageCoveragePercentage >= 70) {
      language.disabled = false
      return language
    }

    return language
  })

  return (
    <>
      <HStack bgColor="neutral.200" borderRadius={8} mx={3} p={2} spacing={3}>
        <ColorModeSwitcher />
        <Tooltip label="currency">
          <IconButton
            bgColor="neutral.50"
            variant="primaryNeutral"
            aria-label="currency-convert"
            icon={<SatSymbolIcon color="neutral.600" />}
            isDisabled
          />
        </Tooltip>
        <Button
          bgColor="neutral.50"
          color="neutral.600"
          variant="primaryNeutral"
          // isDisabled
          // onClick={() => i18n.changeLanguage(lng)}
          onClick={onOpen}
        >
          {languages[i18n.resolvedLanguage as keyof typeof languages]}
        </Button>
      </HStack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xs"
        contentProps={{ maxWidth: '250px' }}
        title={t('Select language')}
      >
        <VStack pb={5}>
          {renderLanguages.map((lng) => (
            <Tooltip key={lng.key} label={lng.disabled ? t('Coming soon') : ''}>
              <Button
                style={{
                  fontWeight:
                    i18n.resolvedLanguage === lng.key ? 'bold' : 'normal',
                }}
                type="submit"
                onClick={() => {
                  i18n.changeLanguage(lng.key)
                  onClose()
                }}
                w={200}
                textAlign={'start'}
                isDisabled={lng.disabled}
              >
                <Box w="100%">
                  <Box as={'span'} w="100%" paddingRight={2}>
                    {languageFalgs[lng.key]}
                  </Box>
                  {languages[lng.key]}
                </Box>
              </Button>
            </Tooltip>
          ))}
        </VStack>
        <Link href={LanguageRequestUrl} isExternal>
          {t('Request a language')}
        </Link>
      </Modal>
    </>
  )
}