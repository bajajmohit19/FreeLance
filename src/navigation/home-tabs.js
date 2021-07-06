import React from 'react';
import { useSelector } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeDrawer from './home-drawer';
import Me from 'src/screens/profile/me';
import Cart from 'src/screens/cart/cart';
import Category from 'src/screens/shop/category';
import Leads from 'src/screens/leads';
import { authSelector } from 'src/modules/auth/selectors';
import Wishlist from 'src/screens/wishlist';
import Tabbar from 'src/containers/Tabbar';

import { homeTabs } from 'src/config/navigator';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const { auth } = useSelector((state) => ({
    auth: authSelector(state)

  })
  )

  return (
    <Tab.Navigator tabBar={(props) => <Tabbar {...props} />}>
      <Tab.Screen name={homeTabs.home_drawer} component={HomeDrawer} />
      <Tab.Screen name={homeTabs.shop} component={Category} />
       <Tab.Screen name={homeTabs.leads} component={Leads} />
      <Tab.Screen name={homeTabs.wish_list} component={Wishlist} />
      <Tab.Screen name={homeTabs.cart} component={Cart} />
      <Tab.Screen name={homeTabs.me} component={Me} />
    </Tab.Navigator>
  );
}
