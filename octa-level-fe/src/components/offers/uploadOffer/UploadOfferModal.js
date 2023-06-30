import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import * as CONSTANTS from './../../../GlobalConstants'

import { DeleteOutlined } from '@ant-design/icons'
import { Form, Input, Button, Modal, Mentions, List, message, Popconfirm } from 'antd'
import { v4 } from 'uuid'

import { storage } from './../../../firebase'
import { ref, uploadBytes, deleteObject, getDownloadURL, listAll } from 'firebase/storage'

import styles from 'components/offers/uploadOffer/UploadOfferModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'
import { deleteClient } from 'redux/client/ClientActions'
import { deleteSpecificDocuments, updateOffer } from 'redux/offer/OfferActions'

const UploadOfferModal = props => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()

  const [docLocationsToDelete, setDocLocationsToDelete] = useState([])
  const [selectedFiles, setSelectedFiles] = useState(undefined)
  const [newTypeOfFile, setNewTypeOfFile] = useState(undefined)
  const [currentFileData, setCurrentFileData] = useState(undefined)
  const [fileInfos, setFileInfos] = useState(undefined)

  const fileListRef = ref(storage, 'files/')

  useEffect(() => {
    console.log('suntem in useEffect uploadOfferModal')
    // console.log(props.record.offer?.offersUploaded)
    setFileInfos(props.record.offer?.offersUploaded)
  }, [props.triggerRerender, props.record])

  const handleCancel = () => {
    setSelectedFiles(undefined)
    props.handleCancel()
    form.resetFields()
  }

  const successMessage = message => {
    messageApi.open({
      type: 'success',
      content: message,
    })
  }

  const handleSubmit = async values => {
    if (
      currentFileData !== undefined &&
      selectedFiles !== undefined &&
      props.userInfo.role?.authorities.includes(CONSTANTS.WRITE_OFFER)
    ) {
      console.log('mergem catre update offer')
      let firebaseFileName = `${v4()}-${selectedFiles[0].name}`

      const fileRef = ref(
        storage,
        `octa/${props.record.client?.name}_${props.record.client?.phone}/oferte/${firebaseFileName}`,
      )

      uploadBytes(fileRef, selectedFiles[0]).then(response => {
        let file = {
          name: selectedFiles[0].name,
          location: `octa/${props.record.client?.name}_${props.record.client?.phone}/oferte/${firebaseFileName}`,
        }

        setNewTypeOfFile(file)
        dispatch(updateOffer(file, props.record.offer?._id)).then(response => {
          console.log('wait for the uploads offers after update: ', response?.offersUploaded)
          if (response !== 'eroare') {
            successMessage('Adăugarea s-a efectuat cu success')
            setFileInfos(response?.offersUploaded)
            setCurrentFileData(undefined)
            setNewTypeOfFile(undefined)
            setSelectedFiles(undefined)
          }
        })
      })
    }

    if (
      docLocationsToDelete.length > 0 &&
      props.userInfo.role?.authorities.includes(CONSTANTS.WRITE_OFFER)
    ) {
      closeOfferModalNoUpload()
    }

    // handleCancel()
    form.resetFields()
  }

  const deleteClientHandler = () => {
    props.userInfo.role?.authorities.includes(CONSTANTS.WRITE_CLIENT) &&
      dispatch(deleteClient(props.record.client?._id)).then(response => {
        if (response !== 'error') {
          console.log('we are going for the firebase docs 😈')
          if (fileInfos !== undefined && fileInfos?.length > 0) {
            fileInfos.map(file => {
              const refStorage = ref(storage, file.location)
              deleteObject(refStorage)
            })
          }
        }
      })

    props.handleCancel()
  }

  const selectFileHandler = async e => {
    console.log('suntem in selectFileHandler', e)
    if (newTypeOfFile !== undefined) {
      const refStorage = ref(storage, newTypeOfFile.location)
      await deleteObject(refStorage)
      setNewTypeOfFile(undefined)
    }

    if (e.target.files.length !== 0) {
      setSelectedFiles(e.target.files)
    }
    const file = e.target.files[0]
    const reader = new FileReader()

    function readFile(event) {
      return new Promise((resolve, reject) => {
        reader.onload = event => {
          resolve(event.target.result)
        }

        reader.onerror = err => {
          reject(err)
        }

        reader.readAsDataURL(file)
      })
    }

    readFile(e).then(onFulfilled => {
      var byteArray = reader.result
      setCurrentFileData(byteArray)
    })
  }

  const getLocationHandler = storageLocation => {
    const refStorage = ref(storage, `${storageLocation}`)
    getDownloadURL(refStorage).then(url => {
      window.open(url, '_blank')
    })
  }
  const noteToDeleteDocuments = index => {
    if (props.userInfo.role?.authorities.includes(CONSTANTS.WRITE_OFFER)) {
      setDocLocationsToDelete(prevArr => [fileInfos[index].location, ...prevArr])
      // documentsLocationsToDelete.push(fileInfos[index].location)
      const indexToDelete = index
      const filterFileInfos = fileInfos.filter((arrEl, index, array) => {
        return index !== indexToDelete
      })
      console.log(docLocationsToDelete)
      setFileInfos(filterFileInfos)
    }
  }

  const closeOfferModalNoUpload = () => {
    const documentsLocationToDeleteCopy = [...docLocationsToDelete]
    if (docLocationsToDelete.length > 0) {
      docLocationsToDelete.map((el, i) => {
        const refStorage = ref(storage, docLocationsToDelete[i])
        deleteObject(refStorage)
      })
    }

    if (documentsLocationToDeleteCopy.length > 0) {
      console.log(
        'exact inainte de apelul DISPATCH, docToDeleteCopy.length: ',
        documentsLocationToDeleteCopy.length,
      )
      console.log(documentsLocationToDeleteCopy)
      dispatch(deleteSpecificDocuments(documentsLocationToDeleteCopy, props.record?.offer._id))
    }
    setCurrentFileData(undefined)
    setNewTypeOfFile(undefined)
    setSelectedFiles(undefined)
    // documentsLocationsToDelete = []
    setDocLocationsToDelete([])
    successMessage('Ștergerea s-a efectuat cu succes')
  }

  const description = 'Sunteți sigur că doriți ștergerea acestui client?'

  return (
    <>
      {contextHolder}
      <Modal
        onCancel={handleCancel}
        onOk={form.submit}
        open={props.isOpen}
        cancelText="Anulează"
        okText="Salvează Modificări"
        okButtonProps={{
          disabled: !props.userInfo.role?.authorities.includes(CONSTANTS.WRITE_OFFER),
        }}
      >
        <div className={styles['edit-modal-subtitle-box']}>
          <div>
            <h1 className={styles['edit-modal-heading']}>Încarcă ofertă nouă</h1>
            <h4>Client: ({props.record.client?.name})</h4>
          </div>
          <Popconfirm
            title="Sunteți sigur că doriți să ștergeți clientul?"
            onConfirm={deleteClientHandler}
            onCancel={deleteClientHandler}
            okText="Da"
            cancelText="Nu"
          >
            <Button
              type="primary"
              disabled={!props.userInfo.role?.authorities.includes(CONSTANTS.WRITE_CLIENT)}
              danger
            >
              Șterge Client
            </Button>
          </Popconfirm>
        </div>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="file"
            rules={[
              {
                validator(rule, value) {
                  return new Promise((resolve, reject) => {
                    console.log(value)
                    if (value || docLocationsToDelete.length > 0) {
                      console.log('resolve')
                      resolve()
                    } else {
                      console.log(docLocationsToDelete.length)
                      console.log('reject')
                      reject()
                    }
                  })
                },
              },
            ]}
          >
            <Input
              type="file"
              onChange={e => selectFileHandler(e)}
              disabled={!props.userInfo.role?.authorities.includes(CONSTANTS.WRITE_OFFER)}
            />
          </Form.Item>

          {/* <List> */}
          {selectedFiles === undefined ? (
            <List.Item key="1">
              <Mentions
                className={styles['display-selected-offer']}
                placeholder="Ofertă Selectată"
                disabled
              />
            </List.Item>
          ) : (
            <List.Item key="2">
              <Button
                className={styles['display-selected-offer']}
                href={currentFileData}
                target="_blank"
                download={selectedFiles[0].name}
              >
                {selectedFiles[0].name}
              </Button>
            </List.Item>
          )}
          {/* </List> */}
          <div className={styles['display-offers-container']}>
            <List
              className={styles['offers-list']}
              header={<div>Oferte încărcate</div>}
              size="small"
              bordered
            >
              {fileInfos !== undefined && fileInfos.length > 0
                ? fileInfos.map((file, index) => (
                    <List.Item className={styles['offers-list-item']} key={index}>
                      <Button type="link" onClick={() => getLocationHandler(file.location)}>
                        {file.name}
                      </Button>
                      <DeleteOutlined
                        className={commonStyles.icon}
                        onClick={() => noteToDeleteDocuments(index)}
                      />
                    </List.Item>
                  ))
                : null}
            </List>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default UploadOfferModal
