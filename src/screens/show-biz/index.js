import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {white} from '../../components/config/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Avatar} from '../../components';
import {Icon} from 'src/components';

function ShowBiz() {
  return (
    <ScrollView
      style={{
        flex: 1,
        // backgroundColor:'#71977b'
      }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: '#000',
            fontWeight: '700',
          }}>
          My Biz
        </Text>
        <Text style={{textAlign: 'center', color: '#BDBDBD', fontSize: 12}}>
          Sell your Products here.
        </Text>
      </View>
      <View
        style={{
          margin: 10,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{width: '25%', alignItems: 'center', padding: 5}}>
          <Avatar
            icon={{
              name: 'book',
              size: 22,
            }}
            rounded
            size={55}
            overlayContainerStyle={{
              backgroundColor: '#000',
            }}
          >

          </Avatar>

          <Text style={styles.txtStyle}>TradeKhata</Text>
        </View>
        <View style={{width: '25%', alignItems: 'center', padding: 5}}>
          <Avatar
            icon={{
              name: 'clipboard',
              size: 22,
            }}
            rounded
            size={55}
            overlayContainerStyle={{
              backgroundColor: '#000',
            }}
          />
          <Text style={styles.txtStyle}>Post Your Requirment</Text>
        </View>
        <View style={{width: '25%', alignItems: 'center', padding: 5}}>
          <Avatar
            icon={{
              name: 'gift',
              size: 22,
            }}
            rounded
            size={55}
            overlayContainerStyle={{
              backgroundColor: '#000',
            }}
          />
          <Text style={styles.txtStyle}>Rewards</Text>
        </View>
        <View style={{width: '25%', alignItems: 'center', padding: 5}}>
          <Avatar
            icon={{
              name: 'gift',
              size: 14,
            }}
            rounded
            size={55}
            overlayContainerStyle={{
              backgroundColor: '#000',
            }}
          />
          <Text style={styles.txtStyle}>Services</Text>
        </View>
      </View>
      <View
        style={{
          margin: 10,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{width: '25%', alignItems: 'center', padding: 5}}>
          <Avatar
            icon={{
              name: 'percent',
              size: 14,
            }}
            rounded
            size={55}
            overlayContainerStyle={{
              backgroundColor: '#fff',
            }}
          />
          <Text style={styles.txtStyle}>Check GST</Text>
        </View>
        <View style={{width: '25%', alignItems: 'center', padding: 5}}>
          <Avatar
            icon={{
              name: 'percent',
              size: 14,
            }}
            rounded
            size={55}
            overlayContainerStyle={{
              backgroundColor: '#fff',
            }}
          />
          <Text style={styles.txtStyle}>Call Logs</Text>
        </View>
        <View style={{width: '25%', alignItems: 'center', padding: 5}}>
          <Avatar
            icon={{
              name: 'percent',
              size: 14,
            }}
            rounded
            size={55}
            overlayContainerStyle={{
              backgroundColor: '#fff',
            }}
          />
          <Text style={styles.txtStyle}>Buy Leads</Text>
        </View>
        <View style={{width: '25%', alignItems: 'center', padding: 5}}>
          <Avatar
            icon={{
              name: 'percent',
              size: 14,
            }}
            rounded
            size={55}
            overlayContainerStyle={{
              backgroundColor: '#fff',
            }}
          />
          <Text style={styles.txtStyle}>See All</Text>
        </View>
      </View>
      <View
        style={{display: 'flex', justifyContent: 'space-between', margin: 10}}>
        <View
          style={{display: 'flex', alignItems: 'center', padding: 5}}
          style={styles.promotionDiv}>
          <View>
            <Text style={styles.textName}>Products</Text>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 10,
            }}>
            <Avatar
              icon={{
                name: 'percent',
                size: 14,
              }}
              rounded
              size={45}
              overlayContainerStyle={{
                backgroundColor: '#fff',
              }}
            />
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                marginTop: 20,
                fontSize: 18,
              }}>
              5
            </Text>
          </View>
        </View>
        <View
          style={{display: 'flex', justifyContent: 'space-around'}}
          style={styles.promotionDiv}>
          <View>
            <Text style={styles.textName}>Orders</Text>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 10,
            }}>
            <Avatar
              icon={{
                name: 'percent',
                size: 14,
              }}
              rounded
              size={45}
              overlayContainerStyle={{
                backgroundColor: '#fff',
              }}
            />
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                marginTop: 20,
                fontSize: 18,
              }}>
              10
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  promotionDiv: {
    marginHorizontal: 10,
    marginVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2d3e50',
    height: 120,
    display: 'flex',
    justifyContent: 'space-around',
    padding: 5,
  },
  textName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginTop: 5,
    marginLeft: 10,
  },
  txtStyle: {
    marginTop: 10,
    borderWidth:1,
    borderColor:'#000',
    textAlign:'center'
  },
});

export default ShowBiz;
