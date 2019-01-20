import React, { Component } from 'react';
import { View,  FlatList } from 'react-native';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import { List, 
ListItem, 
Body, Button,
Left, 
Right, 
Text, 
Container,Icon,
Content, Thumbnail, Title
} from 'native-base';

import {NOWPLAYING, KEY,IMAGES} from '../../api/endpoint';
import Header from '../../comp/Header';
class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
        np : [],
        page : 1,
        error : null,
        loading : false
    };
  }
  componentWillMount() {
      this._fetch();
  }


    _fetch(){
        const page = this.state;
        //this.setState({loading : true})
        axios.get(NOWPLAYING+'api_key='+KEY+'&page='+page)

        
        .then(res => this.setState({ np : res.data.results}))
        .catch(error => { this.setState({ error, loading: false }) 
        });
   

    }

    _renderItem = ({item}) => {
        return <List>
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{uri : IMAGES+item.poster_path}} />
                </Left>
                <Body>
                    
                   
                  
                  
                    <Text>
                        {item.title}
                    </Text>
                    <View style={{ flexDirection: 'row', paddingBottom: 2}}>

               
                    <Text note>RELEASE DATE: </Text>
                    <Text note>
                        {item.release_date}
                    </Text>
                    </View> 
                    
                    <Text note numberOfLines={4}>
                        {item.overview}
                    </Text>
                </Body>
                <Right>
                    <Button transparent onPress={() => Actions.moviedetails()}>
                        <Text>DETAILS</Text>
                    </Button>
                </Right>
            </ListItem>
            
            
          </List>;
    }

    _flatList(){
        if (this.state.np.length > 0 ) {
            return (
            
                    <FlatList
                        data={this.state.np}
                        renderItem={this._renderItem}
                        
                        keyExtractor={item => item.id.toString()} //warning virtualchild must string
                      
                    />
             

            );
        }
     
    }

  render() {
    return (
      <Container>
      <Header headerTitle="MOVIES"/>
      <Content>
    <Body>
        <Text>LIST NOW PLAYING</Text>
    </Body>
                {this._flatList()}
      </Content>
      
      </Container>
    );
  }
}

export default Movies;