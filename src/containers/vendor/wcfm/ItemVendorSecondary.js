// @flow
import React from 'react';
import {View, StyleSheet, ViewPropTypes, TouchableOpacity} from 'react-native';
import {ThemeConsumer, Text, Avatar, Icon, withTheme} from 'src/components';
import {yellow} from 'src/components/config/colors';
import {margin, padding, borderRadius} from 'src/components/config/spacing';

type Props = {
  store?: any,
  style?: ViewPropTypes,
  onPress?: () => void,
};

const ItemSecondary = (props: Props) => {
  const {store, style, onPress} = props;
  const {shop_name, logo, average_rating, image, product_name, original_price, name} = store;

  const Component = onPress ? TouchableOpacity : View;
  const componentProps = onPress ? {onPress} : {};
  const rating = parseFloat(average_rating) || 0.0;
  return (
    <ThemeConsumer>
      {({theme}) => (
        <Component
          style={[
            styles.container,
            {backgroundColor: theme.colors.bgColorSecondary},
            style && style,
          ]}
          {...componentProps}>
          <Avatar
            source={
              logo ? {uri: logo} : image ? {uri: image}  : require('src/assets/images/pDefault.png')
            }
            size={60}
            rounded
            containerStyle={styles.image}
          />
          <Text h5 medium style={styles.name}>
            {shop_name ? shop_name : name ? name : product_name? product_name : null}
          </Text>
          <View style={styles.viewRating}>
            <Text h5 colorThird medium style={styles.textRating}>
              {/* {console.log(average_rating  == null? "noo" :  average_rating.toFixed(1))} */}
              {average_rating  == null ? '0': average_rating}
            </Text>
            <Icon name="star" type="font-awesome" color={yellow} size={13} />
            

          </View>
          <View>
          <Text>
            {original_price}

            </Text>
          </View>
        </Component>
      )}
    </ThemeConsumer>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.large,
    width: 135,
    padding: padding.large,
    alignItems: 'center',
  },
  image: {
    marginBottom: margin.small + 1,
  },
  name: {
    marginBottom: 2,
    textAlign: 'center',
  },
  viewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRating: {
    marginRight: 5,
  },
});

export default ItemSecondary;
