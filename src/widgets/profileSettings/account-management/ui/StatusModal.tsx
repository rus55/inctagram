import React from 'react'

import styles from './AccountManagement.module.scss'

import { Button, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'

type Props = {
  openModal: boolean
  titleModal: string
  textTypography: string
  callback: () => void
  textButton: string
}
export const StatusModal = ({
  openModal,
  titleModal,
  textTypography,
  callback,
  textButton,
}: Props) => {
  return (
    <Modal size={'sm'} open={openModal} title={titleModal}>
      <Typography variant={'regular_text_16'}>{textTypography}</Typography>
      <Button className={styles.successButton} fullWidth onClick={callback}>
        <Typography variant={'h3'}>{textButton}</Typography>
      </Button>
    </Modal>
  )
}
