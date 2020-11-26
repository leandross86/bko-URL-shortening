import React from 'react';
import Header from '../../components/Header';
import ShortenerService from '../../services/shortenerService'
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import { ContentContainer, Form } from './styles';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      url: '',
      code: '',
      errorMessage: '',
    }
  }

  handleSubmit = async(event) => {
    event.preventDefault();
    const { url } = this.state;
    this.setState({ isLoading: true, errorMessage: ''});
    if(!url) {
      this.setState({ isLoading: false, errorMessage: 'Enter a URL to shorten.'})
    } else {
      try {
        const service = new ShortenerService();
        const result = await service.generate({ url });
        this.setState({ isLoading: false, code: result.code })
      } catch (error) {
        this.setState({ isLoading: false, errorMessage: 'Oops, there was an error trying to shorten the URL' })
      }
    }
  }

  copyToClipboard = () => {
    const element = this.inputURL;
    element.select();
    document.execCommand('copy')
  }

  render() {
    const { isLoading, errorMessage, code } = this.state;
    return (
      <Container>
        <Header>Your new URL shortener. </Header>
        <ContentContainer>
          <Form
            onSubmit={this.handleSubmit}
          >
            <InputGroup>
              <FormControl
                placeholder="Enter a URL to shorten"
                defaultValue=""
                onChange={e => this.setState({ url: e.target.value })}
              />
              <InputGroup.Append>
                <Button 
                  variant="primary" 
                  type="submit"
                >
                  Encurtar
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {isLoading ? (
              <Spinner animation='border' />
             ) : ( 
              code && (
                <>
                  <InputGroup>
                    <FormControl
                      autoFocus={true}
                      defaultValue={`http://bkopitu.tk/${code}`}
                      ref={(input) => this.inputURL = input}
                    />
                    <InputGroup.Append>
                      <Button 
                        variant="outline-secondary" 
                        onCLick={() => this.copyToClipboard()}
                      >
                        Copiar
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <p>To follow the statistics, visit http://bkopitu.tk/${code}</p>
                </>
               )
             )}
             {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
          </Form>
        </ContentContainer>        
      </Container>
    )
  }
}

export default HomePage;