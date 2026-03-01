import { useCallback, useMemo, useRef, useState, type ChangeEvent } from 'react'

import './App.css'
import DialogWrap from '@rc-component/dialog'
import JoditEditor from 'jodit-react'
import docx2html from 'docx2html'
import html2pdf from 'html2pdf.js'

const App = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const editorRef = useRef(null)
  const docxFileInputRef = useRef<HTMLInputElement>(null)
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

  const selectDocxFile = (e: any) => {
    console.log('select docx file pressed')
    docxFileInputRef.current?.click()
  }
  const importDocx = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    console.log('import from word pressed')
    if (e.target.files) {
      const file = e.target.files[0]
      docx2html(file).then((html: any) => {
        setContent(html.toString())
      })
    }
  }

  const exportPDF = () => {
    console.log('export to pdf pressed')
    console.log(content)
    html2pdf()
      .set({
        margin: 1,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(content)
      .save()
  }

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
        <>
          <div className='mb-3 d-flex justify-content-evenly'>
            <button onClick={selectDocxFile} className='btn btn-primary'>
              Импортировать из Word
            </button>
            <input
              type='file'
              accept='.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              className='d-none'
              ref={docxFileInputRef}
              onChange={importDocx}
            />
            <button onClick={exportPDF} className='btn btn-danger'>
              Экспортировать в PDF
            </button>
          </div>
          <JoditEditor
            ref={editorRef}
            value={content}
            config={editorConfig}
            tabIndex={1}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </>
      </DialogWrap>
    </div>
  )
}

export default App
