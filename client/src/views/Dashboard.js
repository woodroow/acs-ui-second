import React from 'react';
import {
  Container, Row, Col, NavLink
} from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';

import PageTitle from '../components/common/PageTitle';
import SmallStats from '../components/common/SmallStats';
import UsersOverview from '../components/blog/UsersOverview';
import PieChart from '../components/common/PieChart';

class Users extends React.Component<Props> {
  state = {
    data: [],
    fetching: true,
    events: {},
    typesDatasets: {}
  };

  async componentDidMount() {
    await this.loadData();
    await this.loadEvents();
    this.setState({ fetching: false });
  }

  getEvent = (event, index) => {
    const data = { count: event.COUNT, color: `rgba(0,123,255,0.${9 - (index * 2)})` };
    switch (event.EVN) {
      case 2:
        data.name = 'Вход';
        return data;
      case 4:
        data.name = 'Выход';
        return data;
      default:
        data.name = `Действие ${event.EVN}`;
        return data;
    }
  };

  async loadEvents() {
    const result = await fetch(
      '/api/statistics/events',
      {
        method: 'GET'
      },
    );
    const data = await result.json();
    if (!data) throw new Error('Failed to load');
    const { today, yesterday, types } = data;
    const hours = Array.from(new Array(24), (_, i) => (i === 0 ? 1 : i));
    const events = {
      labels: hours,
      datasets: [
        {
          label: 'Сегодня',
          fill: 'start',
          data: hours.map(hour => (today[hour] || 0)),
          backgroundColor: 'rgba(0,123,255,0.1)',
          borderColor: 'rgba(0,123,255,1)',
          pointBackgroundColor: '#ffffff',
          pointHoverBackgroundColor: 'rgb(0,123,255)',
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3
        },
        {
          label: 'Вчера',
          fill: 'start',
          data: hours.map(hour => (yesterday[hour] || 0)),
          backgroundColor: 'rgba(255,65,105,0.1)',
          borderColor: 'rgba(255,65,105,1)',
          pointBackgroundColor: '#ffffff',
          pointHoverBackgroundColor: 'rgba(255,65,105,1)',
          borderDash: [3, 3],
          borderWidth: 1,
          pointRadius: 0,
          pointHoverRadius: 2,
          pointBorderColor: 'rgba(255,65,105,1)'
        }
      ]
    };
    const typesData = types.map((type, index) => this.getEvent(type, index));
    const typesDatasets = {
      datasets: [
        {
          hoverBorderColor: '#ffffff',
          data: typesData.map(type => type.count),
          backgroundColor: typesData.map(type => type.color)
        }
      ],
      labels: typesData.map(type => type.name)
    };
    this.setState({ events, typesDatasets });
  }


  async loadData() {
    const result = await fetch(
      '/api/statistics',
      {
        method: 'GET'
      },
    );
    const data = await result.json();
    if (!data || !data.length) throw new Error('Failed to load');
    this.setState({ data });
  }

  render() {
    const {
      data,
      events,
      fetching,
      typesDatasets
    } = this.state;
    return (
      <Container fluid className='main-content-container px-4'>
        {!fetching && (
          <>
            <Row noGutters className='page-header py-4'>
              <PageTitle subtitle='Главная' className='text-sm-left mb-3' />
            </Row>
            <Row>
              {data.map((item, idx) => (
                <Col className='col-lg mb-4' key={item.name} {...{ md: '6', sm: '6', lg: '3' }}>
                  <SmallStats
                    id={`small-stats-${idx}`}
                    variation='1'
                    chartEnable={false}
                    label={item.name}
                    value={item.count}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              {/* Users Overview */}
              <Col lg='8' md='8' sm='12' className='mb-4'>
                <UsersOverview
                  title='События за сегодня'
                  chartData={events}
                  extra={(
                    <NavLink tag={RouteNavLink} to='/events' style={{ padding: 0, cursor: 'pointer' }}>
                      Посмотреть все события &rarr;
                    </NavLink>)}
                />
              </Col>
              <Col lg='4' md='4' sm='12' className='mb-4'>
                <PieChart title='Частые типы событий' chartData={typesDatasets} />
              </Col>
            </Row>
        </>
        )}
        
      </Container>
    );
  }
}
export default Users;
