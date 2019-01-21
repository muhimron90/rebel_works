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
Container,Icon,Spinner,
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
        loading : false,
        lastpage :0,
        refreshing : false
    };
  }
  componentWillMount() {
      this._fetch();
  }


    _fetch = () => {
      this.setState({loading : true, refreshing : true});
        const page  = this.state;
        //this.setState({loading : true})
        axios.get(`${NOWPLAYING}api_key=${KEY}&page=${page}`)


        .then(res => this.setState({
          np : page == 1 ? res.data.results : [...this.state.np, ...res.data.results],
          loading: (res.data.total_pages > 1) ? true : false,
          loading : false,
          page: res.data.page,
          lastpage : res.data.total_pages,
            refreshing: false
        }))
        .catch(error => { this.setState({ error, loading: false, refreshing : false })
        });


    };

    handleLoadMore = () => {
      // console.log('triggered');
      if(this.state.page <= this.state.lastpage){

        this.setState(
          {
            page: this.state.page + 1,
             loading: true
          },
          () => {
          this._fetch();
          }
        );

      }else{
        this.setState({
          loading: false
        });
      }

    };

    handleRefresh = () => {
      this.setState(
        {
          page: this.state.page,
          refreshing: true
        },
        () => {
          this._fetch();
        }
      );
    };

    renderFooter = () => {
      // if (!this.state.loading) return null;

      return (
        <View
          style={{
            paddingVertical: 20,
            paddingTop: 10
          }}
        >
          <Spinner />
        </View>
      );
    };

    _renderItem = ({item}) => {
        return(
        <List>
            <ListItem thumbnail large>
              <Left>
                <Thumbnail square source={{ uri: IMAGES + item.poster_path }} />
              </Left>
              <Body>
                <Text>{item.title}</Text>
                <View style={{ flexDirection: "row", paddingBottom: 2 }}>
                  <Text note>RELEASE DATE: </Text>
                  <Text note>{item.release_date}</Text>
                </View>

                <Text note numberOfLines={4}>
                  {item.overview}
                </Text>
              </Body>
              <Right>
                <Button transparent onPress={() => Actions.moviedetails(
                      {
                        id: item.id,
                        title : item.title,
                    poster_path: item.poster_path ,
                    backdrop_path: item.backdrop_path ,
                    popularity: item.popularity ,
                    vote_average: item.vote_average ,
                    overview: item.overview,
                    release_date: item.release_date,
                    vote_count : item.vote_count
                      }
                    )}>
                  <Text>DETAILS</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
          );
    }




    _flatList(){
        if (this.state.np.length > 0) {
            return (

                    <FlatList
                        data={this.state.np}
                        renderItem={this._renderItem}
                        onRefresh={this.handleRefresh}
                        refreshing={this.state.refreshing}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0.5}
                        keyExtractor={item => item.id.toString()}
                        ListFooterComponent={this.renderFooter}
                    />


            );
        }else {
          return ( <Spinner />);
        }

    }

  render() {
    return (
      <Container>
      <Header headerTitle="NOW PLAYING"/>
  
    <View>


                {this._flatList()}
      </View>

      </Container>
    );
  }
}

export default Movies;
