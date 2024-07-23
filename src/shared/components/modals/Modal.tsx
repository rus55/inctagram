import React, { ComponentProps, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

import { CloseIcon } from './../../assets/icons/CloseIcon'
import s from './Modal.module.scss'

import { PostModalHeader } from '@/widgets/addPostModal/modalPostHeader'

export type ModalSize = 'lg' | 'md' | 'sm' | 'xs' | 's' | 'm' | 'l' | 'xl'
type Props = {
  children: ReactNode
  onClose?: () => void
  open: boolean
  showCloseButton?: boolean
  size?: ModalSize
  title?: string
  isPost?: boolean
  onInteractOutside?: (event: Event) => void
  closePostModal?: () => void
  onClickNext?: () => void
  isCropHeader?: boolean
  isHeaderDisabled?: boolean
  buttonText?: string
  disableButton?: any
} & ComponentProps<'div'>

const dropIn = {
  exit: {
    opacity: 0,
    y: '100vh',
  },
  hidden: {
    opacity: 0,
    x: '-50%',
    y: '-100vh',
  },
  visible: {
    opacity: 1,
    transition: {
      damping: 25,
      duration: 0.1,
      stiffness: 500,
      type: 'spring',
    },
    x: '-50%',
    y: '-50%',
  },
}

export const Modal = ({
  children,
  className,
  onClose,
  open = false,
  showCloseButton = true,
  size = 'md',
  title,
  isPost,
  onInteractOutside,
  onClickNext,
  closePostModal,
  isCropHeader,
  buttonText,
  disableButton,
  isHeaderDisabled,
}: Props) => {
  const handleOpenChange = () => {
    onClose?.()
  }
  const classNames = {
    content: getContentClassName(size, className),
    contentBoxModal: clsx(isPost ? s.postBox : s.contentBox),
  }

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={open}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                animate={{ opacity: 1 }}
                className={s.overlay}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
              className={classNames.content}
              forceMount
              onInteractOutside={onInteractOutside}
            >
              <motion.div animate={'visible'} exit={'exit'} initial={'hidden'} variants={dropIn}>
                {!isHeaderDisabled ? (
                  <>
                    {isCropHeader ? (
                      <PostModalHeader
                        closeModal={closePostModal}
                        title={title}
                        onNext={onClickNext}
                        buttonText={buttonText}
                        disableButton={disableButton}
                      />
                    ) : (
                      <header className={s.header}>
                        <Dialog.Title asChild>
                          <h2 className={s.title}>{title}</h2>
                        </Dialog.Title>

                        {showCloseButton && (
                          <Dialog.Close className={s.closeButton}>
                            <CloseIcon />
                          </Dialog.Close>
                        )}
                      </header>
                    )}
                  </>
                ) : (
                  <div className={s.closeButtonOutside}>
                    <Dialog.Close className={s.closeButton}>
                      <CloseIcon />
                    </Dialog.Close>
                  </div>
                )}
                <div className={classNames.contentBoxModal}>{children}</div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
function getContentClassName(size: ModalSize, className?: string) {
  const sizeClassName = getSizeClassName(size)

  return clsx(className, s.content, sizeClassName)
}

function getSizeClassName(size: ModalSize) {
  if (size === 'sm') {
    return s.sm
  }
  if (size === 'md') {
    return s.md
  }
  if (size === 'lg') {
    return s.lg
  }
  if (size === 'xs') {
    return s.xs
  }
  if (size === 's') {
    return s.s
  }
  if (size === 'm') {
    return s.m
  }
  if (size === 'l') {
    return s.l
  }
  if (size === 'xl') {
    return s.xl
  }
}
