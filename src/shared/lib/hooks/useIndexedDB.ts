import { useEffect, useState } from 'react'

interface Photo {
  id: number
  imageUrl: string
}

interface UseIndexedDBProps {
  addPhoto: (imageUrl: string) => void
  getPhoto: (id: number, callback: (photo: string | undefined) => void) => void
  deletePhotos: () => void
  getAllPhotos: (callback: (photos: Photo[]) => void) => void
  isAddedPhoto: boolean
}

const useIndexedDB = (
  dbName: string,
  storeName: string,
  dbVersion: number = 1
): UseIndexedDBProps => {
  const [db, setDb] = useState<IDBDatabase | null>(null)
  const [isAddedPhoto, setIsAddedPhoto] = useState<boolean>(false)

  useEffect(() => {
    const request = indexedDB.open(dbName, dbVersion)

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = request.result

      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'imageUrl', autoIncrement: true })
      }
    }

    request.onsuccess = (event: Event) => {
      setDb((event.target as IDBOpenDBRequest).result)
    }

    request.onerror = (event: Event) => {
      console.error('Database error:', (event.target as IDBOpenDBRequest).error)
    }
  }, [])

  const addPhoto = (imageUrl: string) => {
    if (!db) return

    const transaction = db.transaction([storeName], 'readwrite')
    const objectStore = transaction.objectStore(storeName)

    const request = objectStore.add({ imageUrl })

    request.onsuccess = () => {
      console.log('Photo added to the database')
      setIsAddedPhoto(true)
    }

    request.onerror = (event: Event) => {
      console.error('Error adding photo:', (event.target as IDBRequest).error)
    }
  }

  const getPhoto = (id: number, callback: (photo: string | undefined) => void) => {
    if (!db) return

    const transaction = db.transaction([storeName], 'readonly')
    const objectStore = transaction.objectStore(storeName)

    const request = objectStore.get(id)

    request.onsuccess = (event: Event) => {
      callback((event.target as IDBRequest).result)
    }

    request.onerror = (event: Event) => {
      console.error('Error retrieving photo:', (event.target as IDBRequest).error)
    }
  }

  const deletePhotos = () => {
    if (!db) return

    const transaction = db.transaction([storeName], 'readwrite')
    const objectStore = transaction.objectStore(storeName)

    const request = objectStore.clear()

    request.onsuccess = () => {
      console.log('Photos deleted from the database')
      setIsAddedPhoto(false)
    }

    request.onerror = (event: Event) => {
      console.error('Error deleting photos:', (event.target as IDBRequest).error)
    }
  }

  const getAllPhotos = (callback: (photos: Photo[]) => void) => {
    if (!db) return

    const transaction = db.transaction([storeName], 'readonly')
    const objectStore = transaction.objectStore(storeName)

    const request = objectStore.getAll()

    request.onsuccess = (event: Event) => {
      callback((event.target as IDBRequest).result)
    }

    request.onerror = (event: Event) => {
      console.error('Error retrieving all photos:', (event.target as IDBRequest).error)
    }
  }

  return { addPhoto, getPhoto, deletePhotos, getAllPhotos, isAddedPhoto }
}

export default useIndexedDB
