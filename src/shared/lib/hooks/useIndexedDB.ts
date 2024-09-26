import { useEffect, useState } from 'react'

interface Photo {
  id: number
  imageUrl: string
}

interface Notification {
  id: number
  message: string
  notifyAt: Date
}

interface UseIndexedDBProps {
  addPhoto: (imageUrl: string) => void
  addNotification: (notifications: MessagesNotif, callback: () => void) => void
  getPhoto: (id: number, callback: (photo: string | undefined) => void) => void
  getNotification: (id: number, callback: (notification: Notification | undefined) => void) => void
  deletePhotos: () => void
  deleteNotifications: (keys: (IDBValidKey | IDBKeyRange)[]) => void
  getAllPhotos: (callback: (photos: Photo[]) => void) => void
  getAllNotifications: (callback: (notifications: MessagesNotif[]) => void) => void
  isAddedPhoto: boolean
}

const useIndexedDB = (
  dbName: string,
  storeNames: { photoStore?: string; notificationStore?: string },
  dbVersion: number = 1
): UseIndexedDBProps => {
  const [db, setDb] = useState<IDBDatabase | null>(null)
  const [isAddedPhoto, setIsAddedPhoto] = useState<boolean>(true)
  const [isDbReady, setIsDbReady] = useState<boolean>(false)

  useEffect(() => {
    const request = indexedDB.open(dbName, dbVersion)

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = request.result

      if (!db.objectStoreNames.contains(storeNames.photoStore as string)) {
        db.createObjectStore(storeNames.photoStore as string, {
          keyPath: 'id',
          autoIncrement: true,
        })
      }

      if (!db.objectStoreNames.contains(storeNames.notificationStore as string)) {
        db.createObjectStore(storeNames.notificationStore as string, {
          keyPath: 'id',
          autoIncrement: true,
        })
      }
    }

    request.onsuccess = (event: Event) => {
      setDb((event.target as IDBOpenDBRequest).result)
      setIsDbReady(true)
    }

    request.onerror = (event: Event) => {
      console.error('Database error:', (event.target as IDBOpenDBRequest).error)
    }
  }, [])

  const addPhoto = (imageUrl: string) => {
    if (!db || !storeNames.photoStore) return

    const transaction = db.transaction([storeNames.photoStore], 'readwrite')
    const objectStore = transaction.objectStore(storeNames.photoStore)

    const request = objectStore.add({ imageUrl })

    request.onsuccess = () => {
      setIsAddedPhoto(true)
    }

    request.onerror = (event: Event) => {
      console.error('Error adding photo:', (event.target as IDBRequest).error)
    }
  }

  const addNotification = (notification: MessagesNotif, callback: () => void) => {
    if (!isDbReady || !db || !storeNames.notificationStore) return

    const transaction = db.transaction([storeNames.notificationStore], 'readwrite')
    const objectStore = transaction.objectStore(storeNames.notificationStore)

    const request = objectStore.add(notification)

    request.onsuccess = () => {
      callback()
    }

    request.onerror = (event: Event) => {
      console.error('Error adding notification:', (event.target as IDBRequest).error)
    }
  }

  const getPhoto = (id: number, callback: (photo: string | undefined) => void) => {
    if (!isDbReady || !db || !storeNames.photoStore) return

    const transaction = db.transaction([storeNames.photoStore], 'readonly')
    const objectStore = transaction.objectStore(storeNames.photoStore)

    const request = objectStore.get(id)

    request.onsuccess = (event: Event) => {
      callback((event.target as IDBRequest).result)
    }

    request.onerror = (event: Event) => {
      console.error('Error retrieving photo:', (event.target as IDBRequest).error)
    }
  }

  const getNotification = (
    id: number,
    callback: (notification: Notification | undefined) => void
  ) => {
    if (!isDbReady || !db || !storeNames.notificationStore) return

    const transaction = db.transaction([storeNames.notificationStore], 'readonly')
    const objectStore = transaction.objectStore(storeNames.notificationStore)

    const request = objectStore.get(id)

    request.onsuccess = (event: Event) => {
      callback((event.target as IDBRequest).result)
    }

    request.onerror = (event: Event) => {
      console.error('Error retrieving notification:', (event.target as IDBRequest).error)
    }
  }

  const deletePhotos = () => {
    if (!isDbReady || !db || !storeNames.photoStore) return

    const transaction = db.transaction([storeNames.photoStore], 'readwrite')
    const objectStore = transaction.objectStore(storeNames.photoStore)

    const request = objectStore.clear()

    request.onsuccess = () => {
      setIsAddedPhoto(false)
    }

    request.onerror = (event: Event) => {
      console.error('Error deleting photos:', (event.target as IDBRequest).error)
    }
  }

  const deleteNotifications = (keys: (IDBValidKey | IDBKeyRange)[]) => {
    if (!isDbReady || !db || !storeNames.notificationStore) return

    const transaction = db.transaction([storeNames.notificationStore], 'readwrite')
    const objectStore = transaction.objectStore(storeNames.notificationStore)

    keys.forEach(key => {
      const request = objectStore.delete(key)

      request.onerror = (event: Event) => {
        console.error(
          `Error deleting notification with key ${key}:`,
          (event.target as IDBRequest).error
        )
      }
    })

    transaction.onerror = (event: Event) => {
      console.error('Transaction error:', (event.target as IDBTransaction).error)
    }
  }

  const getAllPhotos = (callback: (photos: Photo[]) => void) => {
    if (!isDbReady || !db || !storeNames.photoStore) return

    const transaction = db.transaction([storeNames.photoStore], 'readonly')
    const objectStore = transaction.objectStore(storeNames.photoStore)

    const request = objectStore.getAll()

    request.onsuccess = (event: Event) => {
      callback((event.target as IDBRequest).result)
    }

    request.onerror = (event: Event) => {
      console.error('Error retrieving all photos:', (event.target as IDBRequest).error)
    }
  }

  const getAllNotifications = (callback: (notifications: MessagesNotif[]) => void) => {
    if (!isDbReady || !db || !storeNames.notificationStore) return

    const transaction = db.transaction([storeNames.notificationStore], 'readonly')
    const objectStore = transaction.objectStore(storeNames.notificationStore)

    const request = objectStore.getAll()

    request.onsuccess = (event: Event) => {
      callback((event.target as IDBRequest).result)
    }

    request.onerror = (event: Event) => {
      console.error('Error retrieving all notifications:', (event.target as IDBRequest).error)
    }
  }

  return {
    addPhoto,
    addNotification,
    getPhoto,
    getNotification,
    deletePhotos,
    deleteNotifications,
    getAllPhotos,
    getAllNotifications,
    isAddedPhoto,
  }
}

export default useIndexedDB
