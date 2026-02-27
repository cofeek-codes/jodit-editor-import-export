import { useCallback, useMemo, useRef, useState } from 'react'

import './App.css'
import DialogWrap from '@rc-component/dialog'
import JoditEditor from 'jodit-react'

const App = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const editor = useRef(null)

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: '',
      buttons: [
        'bold',
        'italic',
        'underline',
        '|',
        'ul',
        'ol',
        '|',
        'font',
        'fontsize',
        'brush',
        '|',
        'image',
        'link',
        '|',
        'align',
        'undo',
        'redo',
      ],
      height: 400,
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    [],
  )

  const handleBlur = useCallback((newContent: string) => {
    setContent(newContent)
  }, [])

  const handleChange = useCallback((newContent: string) => {
    // You can handle onChange here if needed
  }, [])

  return (
    <div className='h-100 container-fluid d-flex flex-row justify-content-center align-items-center'>
      <button
        className='btn btn-primary'
        onClick={() => setModalVisible(!modalVisible)}
      >
        Редактировать документ
      </button>
      <DialogWrap
        title='Редактирование документа'
        onClose={() => setModalVisible(false)}
        visible={modalVisible}
        animation='fade'
        maskAnimation='fade'
      >
        <JoditEditor
          ref={editor}
          value={content}
          config={editorConfig}
          tabIndex={1}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </DialogWrap>
    </div>
  )
}

export default App
