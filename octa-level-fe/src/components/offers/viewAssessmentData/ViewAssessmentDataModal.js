import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateAssessment } from 'redux/assessment/AssessmentActions'
import { Form, Input, Button, Modal, Checkbox, Select, InputNumber, ConfigProvider } from 'antd'

import commonStyles from 'sharedStyles/CommonStyles.module.css'
import styles from 'components/offers/viewAssessmentData/ViewAssessmentDataModal.module.css'

const { Option } = Select

const ViewAssessmentDataModal = props => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    const assessment = props.record?.assessment
    form.setFieldsValue({
      date: assessment?.date,
      width: assessment?.width,
      height: assessment?.height,
      ceiling: assessment?.ceiling,
      lintel: assessment?.lintel === undefined ? 0 : assessment?.lintel,
      panel: assessment?.panel,
      color: assessment?.color,
      engine: assessment?.engine,
      highLift: assessment?.highLift,
      angle: assessment?.angle,
      quantity: assessment?.quantity,
      handle: assessment?.handle,
      latch: assessment?.latch,
      crisisLatch: assessment?.crisisLatch,
      comment: assessment?.comment,
    })
    console.log('suntem in useEffect editAssessmentModal')
  }, [props?.record, props.triggerRerender])

  const handleSubmit = values => {
    console.log(values)
    Object.entries(values).forEach(([key, value]) => {
      value === undefined ? (values[key] = 0) : (values[key] = value)
    })
    dispatch(
      updateAssessment(values, props.record.assessment._id, props.record.assessment.client._id),
    )
    props.handleCancel()
    form.resetFields()
  }
  const handleCancel = () => {
    props.handleCancel()
    form.resetFields()
  }

  const ceilingField = Form.useWatch('ceiling', form)
  const heightField = Form.useWatch('height', form)
  let lintel

  const setLintelFunction = (ceiling, height) => {
    let cl = parseInt(ceiling, 10)
    let hgt = parseInt(height, 10)
    lintel = cl - hgt
    // console.log(lintel)
    // if (lintel >= 0) setValue(oldValues => ({ ...oldValues, ['lintel']: lintel }))
    // if (lintel >= 0) {
    form.setFieldsValue({ lintel: lintel })
    // } else {
    // form.setFieldsValue({ lintel: 0 })
    // }
  }

  const calculateLintel = event => {
    let currId = event.target.id
    if (currId === 'ceiling') {
      if (heightField !== undefined) {
        setLintelFunction(event.target.value, heightField)
      }
    } else if (currId === 'height') {
      if (ceilingField !== undefined) {
        setLintelFunction(ceilingField, event.target.value)
      }
    }
  }
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              colorPrimary: 'red',
            },
          },
        }}
      >
        <Modal
          open={props.isOpen}
          onCancel={handleCancel}
          width={700}
          centered
          okButtonProps={{
            disabled: true,
          }}
          // className={styles['custom-modal']}
        >
          <h1 className={commonStyles['modal-heading']}>Detalii Măsuri (doar vizualizare)</h1>
          <h3>Client: {props.record.client?.name}</h3>
          <Form form={form} layout="vertical">
            <h3 className={styles.categories}>Dimensiuni</h3>
            <Input.Group className={styles.row}>
              <Input.Group className={styles.medium}>
                <Form.Item label="Lățime" name="width">
                  <Input readOnly />
                </Form.Item>
                <Form.Item label="Inălțime" name="height">
                  <Input type="number" onChange={calculateLintel} readOnly />
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles.medium}>
                <Form.Item label="Tavan" name="ceiling">
                  <Input type="number" onChange={calculateLintel} readOnly />
                </Form.Item>
                <Form.Item
                  label="Buiandrug"
                  name="lintel"
                  rules={[
                    {
                      validator(rule, value) {
                        return new Promise((resolve, reject) => {
                          if (value >= 0) {
                            resolve()
                          } else {
                            reject('valoare negativa')
                          }
                        })
                      },
                    },
                  ]}
                >
                  <Input disabled={false} readOnly />
                </Form.Item>
              </Input.Group>
              <Form.Item className={styles.medium2} label="Qty" name="quantity">
                <Input readOnly />
              </Form.Item>
            </Input.Group>
            <h3 className={styles.categories}>Specificații</h3>
            <Input.Group className={styles.row1}>
              <Input.Group className={styles.column2}>
                <Form.Item label="Culoare" name="color">
                  <Select placeholder="Selecteaza o culoare" open={false}>
                    <Option value="Alb">Alb</Option>
                    <Option value="Nuc">Nuc</Option>
                    <Option value="Antracit">Antracit</Option>
                    <Option value="Culoare Specială">Culoare Specială</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="engine" valuePropName="checked">
                  <Checkbox disabled>Motor</Checkbox>
                </Form.Item>
                <Form.Item name="handle" valuePropName="checked">
                  <Checkbox disabled>Mâner</Checkbox>
                </Form.Item>
                <Form.Item name="latch" valuePropName="checked">
                  <Checkbox disabled>Zăvor</Checkbox>
                </Form.Item>
                <Form.Item name="crisisLatch" valuePropName="checked">
                  <Checkbox disabled>Deblocator</Checkbox>
                </Form.Item>
              </Input.Group>
              <Input.Group className={styles.column2}>
                <Form.Item label="Tip Panou" name="panel">
                  <Select placeholder="Selecteaza tipul de panou" open={false}>
                    <Option value="Plano">Plano</Option>
                    <Option value="Dungat">Dungat</Option>
                    <Option value="RV">RV</Option>
                    <Option value="Casetat">Casetat</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="highLift" valuePropName="checked">
                  <Checkbox disabled>HighLift</Checkbox>
                </Form.Item>
                <Form.Item name="angle" label="angle">
                  <InputNumber readOnly />
                </Form.Item>
                <Form.Item name="comment" label="Observații">
                  <Input.TextArea readOnly />
                </Form.Item>
              </Input.Group>
            </Input.Group>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  )
}

export default ViewAssessmentDataModal
