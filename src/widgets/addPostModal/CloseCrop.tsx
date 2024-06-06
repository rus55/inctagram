import React from 'react'

// import { Button, Typography } from '@/shared/components'
import { Button } from '@/shared/components/button'
import { Modal } from '@/shared/components/modals'
import { Typography } from '@/shared/components/typography'
import { useTranslation } from '@/shared/lib'

type Props = {
  openCloseCrop: boolean
  closeCrop: () => void
  onDiscard: () => void
  savePhotoInDraft?: () => void
}
export const CloseCrop = ({ openCloseCrop, closeCrop, onDiscard, savePhotoInDraft }: Props) => {
  const { t } = useTranslation()

  return (
    <Modal open={openCloseCrop} size={'sm'} title={t.post.title_close_modal} onClose={closeCrop}>
      <>
        <Typography variant={'regular_text_16'}>{t.post.text_close_modal}</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '18px' }}>
          <Button variant={'outline'} onClick={() => onDiscard()}>
            {t.post.discard_button}
          </Button>
          <Button onClick={savePhotoInDraft}>{t.post.save_draft}</Button>
        </div>
      </>
    </Modal>
  )
}
