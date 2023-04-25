import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { showService} from './services';
import { Alert, Card, Row, Column, Button, Form } from './widgets';
import { createHashHistory } from 'history';


// for å kunne bytte url med kode, må dette med.
// Hvis man skal bytte url med html tag så bruk <NavLink to="url"/>
const history = createHashHistory();  

// i TypeScript kan man lage egen typer å definere variabler etter
type Show = {
  id: number,
  title: string,
  description: string,
  ratings?: number[] // ? betyr at variabelen kan bli utelatt
}

class Home extends Component {

  searchInput: string = "";
  shows: Show[] = []; // her bruker man egendefinert type

  render() {
    return (
      <Row>
          <Card title="Barne-TV programmer">
            <Form.Input 
              type='text'
              value={this.searchInput}
              onChange={(e) => this.searchInput = e.target.value}
              required={true}
              placeholder='Søk'
            />
            <Button.Success
              onClick={this.search}
            >
              Søk
            </Button.Success>
            <Button.Light
              onClick={this.reset}
            >
              Reset
            </Button.Light>
          </Card>

          {
          // ? her betyr at this.shows ikke trenger å være lastet inn enda,
          // og dermed kræsjer ikke programmet.
            this.shows?.map((show, index) => {
              return <ShowCard key={index} show={show} /> // show er her en egendefinert prop i komponenten ShowCard
            })
          }

          <Button.Light
            onClick={() => history.push("/new")}
          >
            Nytt barne-TV program
          </Button.Light>
      </Row>
    );
  }

  // reseter listen med show etter at man har søkt
  async reset(): Promise<void> { this.shows = await showService.getShows(); }

  // søker etter eksisterende show basert på tittel
  async search(): Promise<void> { this.shows = await showService.getShowByTitle(this.searchInput); }

  // henter default alle show
  async mounted(): Promise<void> { this.shows = await showService.getShows(); }
}

// hvis man skal sende inn egene props i en komponent må det settes opp slik.
class ShowCard extends Component<{ show: Show}> {

  rating: number = 0;

  render() {
    return (
      <Card title={this.props.show.title}>
        <Row>
          { this.props.show.description }
        </Row>
        <Row>
          Gjennomsnittelig terningskast: { this.rating.toFixed(2) }
        </Row>
        <NavLink
          to={`/rating/${this.props.show.id}`}
        >
          Gi en rating
        </NavLink>
      </Card>
    );
  }

  async mounted(): Promise<void> {
    // for å få tak i gjennomsnitt rating må man hente ut alle ratinger fra ShowRatings for showet
    this.props.show.ratings = await showService.getShowRatings(this.props.show.id);
    // summerer alle ratinger ved deretter å dele på antall ratinger
    this.rating = this.props.show.ratings ? (this.props.show.ratings?.reduce((a, b) => a + b, 0) / this.props.show.ratings?.length) : 0;
  }

}

class NewShow extends Component {

  show: Show = {
    id: 0,
    title: "",
    description: ""
  };

  render() {
    return (
      <Card title="Nytt program">
        <Row>
          <Form.Label>
            Tittel
          </Form.Label>
          <Form.Input
            type='text'
            value={this.show.title}
            onChange={(e) => this.show.title = e.target.value}
          />
        </Row>

        <Row>
          <Form.Label>
            Beskrivelse
          </Form.Label>
          <Form.Input
            type='text'
            value={this.show.description}
            onChange={(e) => this.show.description = e.target.value}
          />
        </Row>

        <br/>

        <Button.Success
          onClick={() => this.add()}
        >
          Opprett
        </Button.Success>

        <Button.Danger
          onClick={() => history.push("/")}
        >
          Tilbake
        </Button.Danger>
      </Card>
    ); 
  }

  async add(): Promise<void> { 
    // for å unngå at man kan sende inn tomme instanser så sjekker man om strengene man sender inn ikke er tomme.
    if (!this.show.title.length || !this.show.description.length) return;

    await showService.addNewShow(this.show); 
    history.push("/");
  }

}

class NewRating extends Component<{ match: { params: { id: string } } }> {

  rating: number = 0;

  render() {
    return (
      <Card title="Nytt program">
        <Row>
          <Form.Label>
            Rating
          </Form.Label>
          <Form.Input
            type='text'
            value={this.rating}
            onChange={(e) => this.rating = Number(e.target.value)}
          />
        </Row>

        <br/>

        <Button.Success
          onClick={() => this.add()}
        >
          Opprett
        </Button.Success>

        <Button.Danger
          onClick={() => history.push("/")}
        >
          Tilbake
        </Button.Danger>
      </Card>
    ); 
  }

  async add(): Promise<void> { 

    if (this.rating < 1 || this.rating > 6) return;

    await showService.addNewShowRating(this.rating, Number(this.props.match.params.id)); 
    history.push("/");
  }

}

// denne delen må alltid være med i en React app, for å kunne bruke ulike url'er og sider
let root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <div>
      <Alert />
      <HashRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={NewShow} />
          <Route exact path="/rating/:id" component={NewRating} />
        </div>
      </HashRouter>
    </div>
  );
