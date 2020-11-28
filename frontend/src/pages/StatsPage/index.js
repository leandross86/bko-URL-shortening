import React from 'react';
import Header from '../../components/Header';
import { Container } from 'react-bootstrap';
import ShortenerService from '../../services/shortenerService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { StatsBox, StatsBoxTitle, StatsRow, StatsContainer} from './style';

class StatsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      shortenedURL: {},
      errorMessage: '',
    }
  }

  async componentDidMount() {
    const { code } = this.props.match.params;
    try {
      const service = new ShortenerService();
      const shortenedURL = await service.getStats(code);
      const parsedDate = parseISO(shortenedURL.updatedAt);
      const currentDate = new Date();
      const relativeDate = formatRelative(parsedDate, currentDate, {
        locale: ptBR
      });

      shortenedURL.relativeDate = relativeDate;

      this.setState({ isLoading: false, shortenedURL });
    } catch (error) {
      this.setState({ isLoading: false, errorMessage: "Ops! A URL solicitada não existe." });
    }
  }


  render() {
    const { errorMessage, shortenedURL } = this.state;
    return (
      <Container>
        <Header>Statistics: </Header>
        {errorMessage ? (
          <StatsContainer className='text-center'>
            <FontAwesomeIcon size='3x' color='#f8d7da' icon='exclamation-triangle' />
            <p className='m-3'>{errorMessage}</p>
            <a className="btn btn-primary" href="/">Shorten new URL</a>
          </StatsContainer>
        ) : (
          <StatsContainer className='text-center'>
            <p><b>https://bkopitu.tk/{shortenedURL.code}</b></p>
            <p>Redirects to: <br/>{shortenedURL.url}</p>
            <StatsRow>
              <StatsBox>
                <b>{shortenedURL.hits}</b>
                <StatsBoxTitle>Visits</StatsBoxTitle>
              </StatsBox>

              <StatsBox>
                <b>{shortenedURL.relativeDate}</b>
                <StatsBoxTitle>Last visit</StatsBoxTitle>
              </StatsBox>
            </StatsRow>
            <a className='btn btn-primary' href="/">Shorten new URL</a>
          </StatsContainer>
        )}
      </Container>
    )
  }
}

export default StatsPage;