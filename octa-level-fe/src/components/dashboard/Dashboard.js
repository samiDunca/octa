import { Link } from 'react-router-dom'
import DashNav from 'components/navigation/DashNav'
import styles from 'components/dashboard/Dashboard.module.css'
import { Layout, Card, Col, Row } from 'antd'
const { Meta } = Card

const Dashboard = () => {
  return (
    <div>
      <DashNav />
      <Layout>
        <div className={styles.layout}>
          <Row className={styles['card-container']}>
            <Col>
              <Link to="/assessments">
                <Card
                  hoverable
                  style={{ width: 210 }}
                  cover={
                    <img alt="assessment" src={require('assets/pictures/assessment-card.png')} />
                  }
                >
                  <Meta title="Masuri" />
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to="/offers">
                <Card
                  hoverable
                  style={{ width: 210 }}
                  cover={<img alt="offer" src={require('assets/pictures/offer-card.png')} />}
                >
                  <Meta title="Oferte" />
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to="/orders">
                <Card
                  hoverable
                  style={{ width: 210 }}
                  cover={<img alt="order" src={require('assets/pictures/order-card.png')} />}
                >
                  <Meta title="Comandă" />
                </Card>
              </Link>
            </Col>
          </Row>
          <Row className={styles['card-container']}>
            <Col>
              <Link to="/montages">
                <Card
                  hoverable
                  style={{ width: 210 }}
                  cover={<img alt="montage" src={require('assets/pictures/montage-card.png')} />}
                >
                  <Meta title="Montaj" />
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to="/clients">
                <Card
                  hoverable
                  style={{ width: 210 }}
                  cover={<img alt="client" src={require('assets/pictures/client-card.png')} />}
                >
                  <Meta title="Clienți" />
                </Card>
              </Link>
            </Col>
          </Row>
        </div>
      </Layout>
    </div>
  )
}

export default Dashboard
