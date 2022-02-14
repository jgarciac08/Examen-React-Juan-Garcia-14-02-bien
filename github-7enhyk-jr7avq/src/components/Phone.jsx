import React from 'react';
import { Table } from 'react-bootstrap';
import { Card } from 'react-bootstrap';


class phone extends React.Component {
  constructor(props) {
    super(props);
    this.datosMarcas = React.createRef();
    this.state = { tableData: [], marcas: [], imagen: '', marca: '', sistema: '', dimension: '', almacenamiento: ''
    }
  }

  async componentDidMount() {
    const response = await fetch('https://api-mobilespecs.azharimm.site/v2/brands');
    const responseData = await response.json();
    const response2 = await fetch('https://api-mobilespecs.azharimm.site/v2/top-by-fans');
    const responseData2 = await response2.json();
    this.setState({
      tableData: responseData2.data.phones,
      marcas: responseData.data,
    })
  }

  async changeStateClicked(item) {
    const slugSelected = item.slug;
    const response = await fetch('https://api-mobilespecs.azharimm.site/v2/ ' + slugSelected);
    const responseData = await response.json();
    this.setState({
      imagen: responseData.data.thumbnail,
      marca: responseData.data.brand,
      sistemaOperativo: responseData.data.os,
      dimension: responseData.data.dimension,
      almacenamientogb: responseData.data.storage
    })
  }
  
  render(){
    return(
      <div id="phnej2">
      <select ref={this.datosMarcas}>
          {this.state.marcas.map((item) => {
            return (
              <option value={item.brand_name}>{item.brand_name}</option>
            );
          })}
        </select>        

        <Table>
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map((item) => {
              return (
                <tr onClick={() => this.changeStateClicked(item)}>
                  <td>{item.phone_name}</td>
                  <td>{item.slug}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.state.imagen} />
          <Card.Body>
            <Card.Text>Marca: {this.state.marca}</Card.Text>
            <Card.Text>Sistema operativo: {this.state.sistemaOperativo}</Card.Text>
            <Card.Text>Dimensión: {this.state.dimension}</Card.Text>
            <Card.Text>Almacenamiento GB: {this.state.almacenamientogb}</Card.Text>
          </Card.Body>          
        </Card>
      </div>
    );
  }

} export default phone;