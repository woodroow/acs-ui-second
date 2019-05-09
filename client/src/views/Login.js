
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form, FormInput, FormGroup, Container, Row, Col,
  Card,
  CardHeader,
  Alert,
  CardTitle,
  CardBody,
  CardFooter,
  Button
} from 'shards-react';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  authHandler = async () => {
    const { email, password } = this.state;
    if (!email || !password) {
      return this.setState({ error: true });
    }
    const result = await fetch('/api/auth/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    });
    if (!result || result.status !== 200) {
      return this.setState({ error: true });
    }
    const { history } = this.props;
    return history.push('/');
  };

  render() {
    const { error, email, password } = this.state;
    return (
      <Container>

        <Row style={{
          height: '100vh',
          alignContent: 'center'
        }}
        >
          <Col sm={{ size: 8, order: 2, offset: 2 }}>
            <Card>
              <CardHeader>
                <CardTitle>Авторизация</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <label htmlFor='#username'>Почта</label>
                    <FormInput
                      id='#email'
                      placeholder='email'
                      value={email}
                      onChange={this.handleChange('email')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor='#password'>Пароль</label>
                    <FormInput
                      type='password'
                      id='#password'
                      placeholder='Пароль'
                      autoComplete='my-password'
                      value={password}
                      onChange={this.handleChange('password')}
                    />
                  </FormGroup>
                </Form>
                <Alert open={error} theme='danger'>
                    Ошибка
                </Alert>
              </CardBody>
              <CardFooter style={{ textAlign: 'right' }}>
                <Button onClick={this.authHandler}>Войти &rarr;</Button>
              </CardFooter>
            </Card>

          </Col>
        </Row>
      </Container>
      
    );
  }
}

export default withRouter(Login);
