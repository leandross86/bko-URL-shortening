import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotFoundMessage404 } from "./styles";
import { BlockContainer } from "../../styles/global";

class NotFoundPage extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Header>Your URL Shortener</Header>
          <BlockContainer className="text-center">
            <FontAwesomeIcon
              size="3x"
              color="#FF6961"
              icon="exclamation-triangle"
            />
            <NotFoundMessage404>Page not found.</NotFoundMessage404>
            <Link className="btn btn-primary" to="/">
              Shorten new URL
            </Link>
          </BlockContainer>
        </Container>
      </>
    );
  }
}

export default NotFoundPage;