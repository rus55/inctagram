import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v1 } from 'uuid'

import { CroppedAreaPixel } from '@/widgets/addProfilePhoto/addAvaWithoutRotation/AddAvatarModalWithoutRotation'

interface CropType {
  x: number
  y: number
}

export interface CropperState {
  id: string
  image: string
  crop: CropType
  zoom: number
  croppedAreaPixels: CroppedAreaPixel
  filterClass: string
  aspect: number
  originalImage: string
}

const initialState: CropperState[] = []

export const croppersSlice = createSlice({
  initialState,
  name: 'croppersSlice',
  reducers: {
    addNewPhoto: (state, action: PayloadAction<string>) => {
      const existingPhoto = state.find(cropper => cropper.image === action.payload)

      if (!existingPhoto) {
        const newData: CropperState = {
          id: v1(),
          image: action.payload,
          crop: { x: 0, y: 0 },
          zoom: 1,
          croppedAreaPixels: null,
          filterClass: '',
          aspect: 1,
          originalImage: '',
        }

        state.unshift(newData)
      }
    },
    deletePhoto: (state, action: PayloadAction<string>) => {
      const imageIndex = state.findIndex(image => image.id === action.payload)

      if (imageIndex !== -1) state.splice(imageIndex, 1)
    },
    setOriginalImage: (state, action: PayloadAction<string>) => {
      const cropper = state.find(img => img.image === action.payload)

      if (cropper) {
        cropper.originalImage = action.payload
      }
    },
    updatePhotos: (
      state,
      action: PayloadAction<{ id: string; image: string; croppedAreaPixels: CroppedAreaPixel }[]>
    ) => {
      const payload = action.payload

      payload.forEach(photo => {
        const { id, image, croppedAreaPixels } = photo
        const index = state.findIndex(img => img.id === id)

        if (index !== -1) {
          state[index].image = image
          state[index].croppedAreaPixels = croppedAreaPixels
        }
      })
    },
    updateCrop: (state, action: PayloadAction<{ id: string; crop: CropType }>) => {
      const { crop, id } = action.payload
      const photo = state.find(image => image.id === id)

      if (photo) photo.crop = crop
    },
    updateZoom: (state, action: PayloadAction<{ id: string; zoom: number }>) => {
      const photo = state.find(image => image.id === action.payload.id)

      if (photo) photo.zoom = action.payload.zoom
    },
    updateCroppedAreaPixels: (
      state,
      action: PayloadAction<{ id: string; croppedAreaPixels: CroppedAreaPixel }>
    ) => {
      const photo = state.find(image => image.id === action.payload.id)

      if (photo) photo.croppedAreaPixels = action.payload.croppedAreaPixels
    },
    updateFilterClass: (state, action: PayloadAction<{ id: string; filterClass: string }>) => {
      const photo = state.find(image => image.id === action.payload.id)

      if (photo) photo.filterClass = action.payload.filterClass
    },

    updateAspect: (state, action: PayloadAction<{ id: string; aspect: number }>) => {
      const photo = state.find(image => image.id === action.payload.id)

      if (photo) photo.aspect = action.payload.aspect
    },
    removeAllPhotos: state => {
      return initialState
    },
    setImage: (state, action: PayloadAction<{ image: CropperState[] }>) => {
      return action.payload.image.map(tl => ({ ...tl }))
    },
  },
})
export const {
  addNewPhoto,
  updateCrop,
  updateZoom,
  updateCroppedAreaPixels,
  updateFilterClass,
  updatePhotos,
  updateAspect,
  deletePhoto,
  removeAllPhotos,
  setOriginalImage,
} = croppersSlice.actions
