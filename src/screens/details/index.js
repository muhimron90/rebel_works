import React, { Component } from 'react';
import { View, StyleSheet, Dimensions,Image,FlatList,ImageBackground,TouchableOpacity } from 'react-native';

import {
  Segment,
  Body, Button,
  Left,
  Right,
  Text,
  Container, Icon,List,ListItem,
  Content, Thumbnail, Title,Spinner
} from 'native-base';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth= Dimensions.get("window").width;
import Header from '../../comp/Header';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import {EPDETAILS,KEY,IMAGES,NOWPLAYING} from '../../api/endpoint';


class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movDetails : [],
      simMovie : [],
      // id : this.props.id,
      loading: false,
      error : false,
      loadData : false
    };


  }

  componentDidMount() {
      this._fetch ();
      this._fetchSim();

  }


    _fetch (){
        this.setState({loading : true});
        const idmov = this.props.id;

        //this.setState({loading : true})
      axios.get(`${EPDETAILS}/${idmov}?api_key=${KEY}`)
       //axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=b1a59113d0436be3d805be222c83660d&language=en-US&page=1')

        .then(res => this.setState({ movDetails : res.data, loading : false}))
        .catch(error => { this.setState({ error : true , loading: false })
        });


    }

    _fetchSim(){
        this.setState({loading : true});
      const idmov = this.props.id;
      axios.get(`${EPDETAILS}/${idmov}/similar?api_key=${KEY}`)
      .then(res => this.setState({ simMovie : res.data.results, loading : false}))
      .catch(error => { this.setState({loading: false })
      });
    }

    // fetch_Data = () => {
    //   this.setState({loading : true});
    //   const idmov = this.props.id;
    //   Promise.all([
    //     axios.get(`${EPDETAILS}/${idmov}?api_key=${KEY}`),
    //     axios.get(`${EPDETAILS}/${idmov}/similar?api_key=${KEY}`)
    //
    //
    //
    //   ]).then(([
    //     resDetail,
    //     resSim
    //   ]) => {
    //     if(resDetail.length === 0 &&    resSim.length === 0)
    //     {
    //       this.setState({
    //         loadData : false
    //       });
    //     }else {
    //       this.setState({
    //         movDetails :   resDetail.data ,
    //         simMovie :    resSim.data.results
    //       });
    //     }
    //   }
    // )
    // .catch(error => this.setState({ error, Loading: false , loadData : false}));
    // }


    _renderItem = ({item}) => {
        return(


                <View style={{alignItems : 'center',backgroundColor : '#000', flexDirection : 'column'}}>
                <TouchableOpacity transparent onPress={() => Actions.moviedetails(
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
                 <ImageBackground  resizeMode={'contain'} source={{ uri: IMAGES + item.poster_path }}

                  style={{width : 150, height :150, opacity : 0.7}}
                  >
                    </ImageBackground>
                      </TouchableOpacity>
                    <Text style={{position : 'relative', color : '#fff', fontSize : 11}}>
                    {item.title}
                    </Text>



                    </View>




          );
    }

    _flatList(){

        if (this.state.simMovie.length > 0 || this.state.loading == 'false' ) {

            return (

                    <FlatList
                    horizontal={true}
                        data={this.state.simMovie}
                        renderItem={this._renderItem}

                        keyExtractor={item => item.id.toString()} //warning virtualchild must string

                    />


            );
        }else {
          return
            this.setState({loading : true});
           (<Spinner />);
        }

    }


  render() {
    const {id,title,poster_path,
      backdrop_path,
      popularity,vote_average,
      overview,release_date,vote_count,tagline,
      original_language} = this.state.movDetails;



    return (
      <Container>

       <Header hasTitle headerTitle="Details"/>






 <Content style={{backgroundColor : '#000'}}>
 <ImageBackground source={{uri : IMAGES+backdrop_path}} resizeMode={'cover'}
 style={styles.imageBackground}>

 </ImageBackground>
 <View style={styles.conpos}>

     <Image source={{ uri: IMAGES+poster_path}}
       resizeMode={'cover'} style={styles.poster}
     >

     </Image>


 </View>




 <Text style={[styles.colorText,styles.title]}>  {title} </Text>
 <Text style={styles.colorText}> Release Date : {release_date} </Text>
 <View style={{flexDirection : 'row'}}>
 <Image source={require('../../assets/star.png')}
style={styles.imageIcon} resizeMode={'contain'} />
<Text style={{color : '#fff'}}>{vote_average} </Text>

<Text style={{color : '#fff'}}>(</Text>
<Text style={{color : '#fff'}}>{vote_count}</Text>
<Text style={{color : '#fff'}}>)</Text>


  </View>


    <Text style={styles.colorText}> Language :{original_language}</Text>




   <View style={{paddingTop : deviceHeight * 0.1}}>

   <Text note style={[styles.bodyText, styles.italic,styles.Desc]}>Description:</Text>
    <Text numberOfLines={4} style={styles.bodyText}>{overview}</Text>

    <Text note style={[styles.bodyText, styles.italic,styles.padding]}>Tagline : {tagline}</Text>

     <Text style={[styles.TitleSeg]}>
     SIMILIAR MOVIES
     </Text>

     </View>
   {this._flatList()}
        </Content>

      </Container>

    );
  }
}

const styles = StyleSheet.create({
  containerTop : {
    backgroundColor: '#333'
  },
  imageBackground : {
    height: deviceHeight * 0.3,
    backgroundColor: '#333',
    opacity : 0.6
  },
  poster : {

    borderColor : '#fff',
    borderWidth : 2,
    position : 'absolute',
    width : 250 , height : 250
  },
  conpos : {
    flexDirection : 'column',
    justifyContent : 'center',
    marginLeft : deviceWidth * 0.05,

  },
  colorText : {
    color : '#fff',
    marginLeft : deviceWidth * 0.42,


  },
  title : {
    fontSize : 18,
        fontWeight :  '600',
  },
  italic :
  {
    fontStyle : 'italic'
  },
  imageIcon : {
    paddingTop : 5,
    width : 20,
    height : 20,
    marginLeft : deviceWidth * 0.42,
  },
  TitleSeg : {
    fontSize : 20,
        fontWeight : '600',
    paddingLeft : 10,
    color : '#fff',
    paddingTop : 25
  },
  bodyText : {
    color : '#fff',
    fontSize : 14,
    paddingLeft : 10,
    paddingRight : 10
  },
  Desc : {
    fontSize : 16,
    fontWeight :  '400'
  },
  padding : {
    paddingTop : 5
  }


});
export default Detail;
