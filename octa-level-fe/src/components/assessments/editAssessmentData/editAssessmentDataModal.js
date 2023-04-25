import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Button, Modal, Checkbox, Select, InputNumber } from 'antd'

import { updateAssessment } from 'redux/assessment/AssessmentActions'

import styles from 'components/assessments/editAssessmentData/EditAssessmentDataModal.module.css'
import commonStyles from 'sharedStyles/CommonStyles.module.css'

const { Option } = Select

const EditAssessmentDataModal = props => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      date: props.assessment.date,
      width: props.assessment.width,
      height: props.assessment.height,
      ceiling: props.assessment.ceiling,
      lintel: props.assessment.lintel === undefined ? 0 : props.assessment.lintel,
      panel: props.assessment.panel,
      color: props.assessment.color,
      engine: props.assessment.engine,
      highLift: props.assessment.highLift,
      angle: props.assessment.angle,
      quantity: props.assessment.quantity,
      handle: props.assessment.handle,
      latch: props.assessment.latch,
      crisisLatch: props.assessment.crisisLatch,
      comment: props.assessment.comment,
    })
    console.log('suntem in useEffect editAssessmentModal')
  }, [props.assessment, props.triggerRerender])

  const handleSubmit = values => {
    console.log(values)
    Object.entries(values).forEach(([key, value]) => {
      value === undefined ? (values[key] = 0) : (values[key] = value)
    })
    values['assessmentDatailsAvailable'] = true
    values['dateDetailsAddeded'] = new Date()
    dispatch(updateAssessment(values, props.assessment._id))
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

    form.setFieldsValue({ lintel: lintel })
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
      <Modal onOk={form.submit} open={props.isOpen} onCancel={handleCancel} width={700} centered>
        <h1 className={commonStyles['modal-heading']}>Detalii Măsuri</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <h3 className={styles.categories}>Dimensiuni</h3>
          <Input.Group className={styles.row}>
            <Input.Group className={styles.medium}>
              <Form.Item label="Lățime" name="width">
                <Input />
              </Form.Item>
              <Form.Item label="Inălțime" name="height">
                <Input type="number" onChange={calculateLintel} />
              </Form.Item>
            </Input.Group>
            <Input.Group className={styles.medium}>
              <Form.Item label="Tavan" name="ceiling">
                <Input type="number" onChange={calculateLintel} />
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
              <Input />
            </Form.Item>
          </Input.Group>
          <h3 className={styles.categories}>Specificații</h3>
          <Input.Group className={styles.row1}>
            <Input.Group className={styles.column2}>
              <Form.Item label="Culoare" name="color">
                <Select placeholder="Selecteaza o culoare">
                  <Option value="Alb">Alb</Option>
                  <Option value="Nuc">Nuc</Option>
                  <Option value="Antracit">Antracit</Option>
                  <Option value="Culoare Specială">Culoare Specială</Option>
                </Select>
              </Form.Item>

              <Form.Item name="engine" valuePropName="checked">
                <Checkbox>Motor</Checkbox>
              </Form.Item>
              <Form.Item name="handle" valuePropName="checked">
                <Checkbox>Mâner</Checkbox>
              </Form.Item>
              <Form.Item name="latch" valuePropName="checked">
                <Checkbox>Zăvor</Checkbox>
              </Form.Item>
              <Form.Item name="crisisLatch" valuePropName="checked">
                <Checkbox>Deblocator</Checkbox>
              </Form.Item>
            </Input.Group>
            <Input.Group className={styles.column2}>
              <Form.Item label="Tip Panou" name="panel">
                <Select placeholder="Selecteaza tipul de panou">
                  <Option value="Plano">Plano</Option>
                  <Option value="Dungat">Dungat</Option>
                  <Option value="RV">RV</Option>
                  <Option value="Casetat">Casetat</Option>
                </Select>
              </Form.Item>
              <Form.Item name="highLift" valuePropName="checked">
                <Checkbox>HighLift</Checkbox>
              </Form.Item>
              <Form.Item name="angle" label="angle">
                <InputNumber />
              </Form.Item>
              <Form.Item name="comment" label="Observații">
                <Input.TextArea />
              </Form.Item>
            </Input.Group>
          </Input.Group>
        </Form>
      </Modal>
    </>
  )
}

export default EditAssessmentDataModal
